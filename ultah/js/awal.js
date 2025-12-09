// Delay sebelum konten muncul
window.onload = function () {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    typeWriter();
  }, 5000); // delay 5 detik
};

// === Music Player Logic ===
const songs = [
  {
    title: "Monokrom",
    artist: "TULUS",
    path: "sound/monokrom.mp3",
    cover: "img/Monokrom.jpeg",
  },
];
let currentSongIndex = 0;

const music = document.getElementById("bg-music");
const musicIcon = document.getElementById("music-icon");
const musicPlayerCard = document.getElementById("music-player-card");

const playPauseBtn = document.getElementById("play-pause-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const songTitleEl = document.getElementById("song-title");
const songArtistEl = document.getElementById("song-artist");
const albumArt = document.querySelector(".album-art img");

let isPlaying = false;
let cardVisible = false;

function loadSong(song) {
  songTitleEl.textContent = song.title;
  songArtistEl.textContent = song.artist;
  albumArt.src = song.cover;
  music.src = song.path;
}

function playSong() {
  music.play();
}

function pauseSong() {
  music.pause();
}

function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadSong(songs[currentSongIndex]);
  playSong();
}

function nextSong() {
  currentSongIndex++;
  if (currentSongIndex > songs.length - 1) {
    currentSongIndex = 0;
  }
  loadSong(songs[currentSongIndex]);
  playSong();
}

function toggleMusic() {
  cardVisible = !cardVisible;
  if (cardVisible) {
    musicPlayerCard.classList.add("show");
    if (!isPlaying) {
      playSong();
    }
  } else {
    musicPlayerCard.classList.remove("show");
  }
}

function handlePlayPause() {
  if (music.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

music.onplay = () => {
  isPlaying = true;
  musicIcon.src = "img/pause.png";
  playIcon.classList.add("hidden");
  pauseIcon.classList.remove("hidden");
};

music.onpause = () => {
  isPlaying = false;
  musicIcon.src = "img/SP.png";
  playIcon.classList.remove("hidden");
  pauseIcon.classList.add("hidden");
};

playPauseBtn.addEventListener("click", handlePlayPause);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong); // Otomatis putar lagu selanjutnya saat selesai

// Update Waktu dan Progress Bar
const progressBar = document.getElementById("music-progress");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");
const progressContainer = document.getElementById("progress-container");

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

music.addEventListener("loadedmetadata", () => {
  totalDurationEl.textContent = formatTime(music.duration);
});

music.addEventListener("timeupdate", () => {
  const progress = (music.currentTime / music.duration) * 100;
  progressBar.style.width = `${progress}%`;
  currentTimeEl.textContent = formatTime(music.currentTime);
});

function setProgress(e) {
  const width = this.clientWidth; // Lebar total progress bar container
  const clickX = e.offsetX; // Posisi klik horizontal di dalam elemen
  const duration = music.duration;

  if (duration) {
    // Pastikan durasi lagu sudah tersedia
    music.currentTime = (clickX / width) * duration;
  }
}

progressContainer.addEventListener("click", setProgress);

// Muat lagu pertama saat halaman dibuka
loadSong(songs[currentSongIndex]);

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
const colors = ["#00f0ff", "#0077ff", "#ffffff"];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

for (let i = 0; i < 100; i++) {
  pieces.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10 - 10,
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < pieces.length; i++) {
    let p = pieces[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
  update();
}

function update() {
  for (let i = 0; i < pieces.length; i++) {
    let p = pieces[i];
    p.y += Math.pow(p.d, 2) + 1;
    p.x += Math.sin(p.y * 0.01);
    if (p.y > canvas.height) {
      p.x = Math.random() * canvas.width;
      p.y = 0;
    }
  }
}
setInterval(draw, 33);

// teks
const fullText =
  "Selamat ulang tahun ke 16 keknya atau 15, untuk sahabat terbaikku. Aku bersyukur pernah dipertemukan dengan orang sebaik kamu. Semoga apa pun yang kamu impikan bisa tercapai, dan semoga tahun ini membawa lebih banyak kebahagiaan, kesempatan, dan keberhasilan. Tetap kuat, tetap baik, tetap jadi kamu, dan kita sudah berteman lebih dari 1 tahun dan saya juga belum tau nama asli kamu, spil dong biar gak bingung mau manggil apa hehe. Happy birthday again! 🎉🎂💖";
const typingElement = document.getElementById("typing-text");
const cursor = document.getElementById("cursor");
let index = 0;

function typeWriter() {
  if (index < fullText.length) {
    typingElement.innerHTML += fullText.charAt(index);
    index++;
    setTimeout(typeWriter, 75);
  } else {
    cursor.style.display = "none";
  }
}
