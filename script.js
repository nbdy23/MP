const songList = [
    {
        name: "Listen Before You Sleep",
        artist: "Rich Before",
        src: "songs/song1.mp3",
        cover: "covers/cover1.jpg"
    },
    {
        name: "I Hope This Finds You",
        artist: "Rich Before",
        src: "songs/song2.mp3",
        cover: "covers/cover1.jpg"
    },
    {
        name: "Bensound Acoustic Breeze",
        artist: "Rich Before",
        src: "songs/song3.mp3",
        cover: "covers/cover1.jpg"
    },
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const fillBar = document.querySelector('.fill-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const cover = document.querySelector('.cover');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    song.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(song.duration);
    });
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songList[index];
    artistName.textContent = artist;
    musicName.textContent = name;
    cover.style.backgroundImage = `url(${thumb})`;
    song.src = src;
}

function updateProgress() {
    if(song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;
        currentTimeEl.textContent = formatTime(song.currentTime);
        durationEl.textContent = formatTime(song.duration);
    }
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60) || 0;
    const sec = Math.floor(seconds % 60) || 0;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
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