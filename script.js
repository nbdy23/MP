const songList = [
    {
        Name: "Song One",
        Artist: "Artist A",
        src: "songs/song1.mp3",
        cover: "covers/cover1.jpg"
    }
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const playBtn = document.queryElementById('play');
const prevBtn = document.queryElementById('prev');
const nextBtn = document.queryElementById('next');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.querySelector('.cover');
const prog = document.querySelector('.prog');

let song = new Audio();
let currentSong = 0;
let plating = false;

document.addEventListener('DOMContentLoaded', () =>{
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(Index) {
    const { name, artist, src, cover: thumb } = songList[Index];
    artistName.innerHTML = artist;
    musicName.innerHTML = name;
    cover.computedStyleMap.backgroundImage = `url(${thumb})`;
    song.src = src;
}

function updateProgress() {
    if(song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration)
        const currentTime = formatTime(song.currentTime);
        time.innerHTML = `${currentTime} / ${duration}`;

    }
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60) || 0;
    const sec = Math.floor(seconds % 60) || 0;
    return `${min}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if(playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songList.length) % songList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}