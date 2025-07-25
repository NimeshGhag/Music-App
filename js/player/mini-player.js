import { audio, currentSongIndex, playSong } from "./audio.js";
import { playlist } from "../services/songServices.js";
let check = 0;
let isRepeat = false;

export function updateMiniPlayer(song) {
    document.querySelector(".track img").src = song.img;
    document.querySelector(".track-name h3").textContent = song.title;
    document.querySelector(".track-name small").textContent = song.artist.slice(
        0,
        10
    );
    document.querySelector("#mini-play-button i").className =
        "ri-pause-mini-fill";
}

export function setUpMiniPlayerControls() {
    const body = document.body;
    const playBtn = document.getElementById("mini-play-button");
    const nextBtn = document.querySelector("#next-button");
    const prevBtn = document.querySelector("#prev-button");
    const shufBtn = document.querySelector("#shuffle-button");
    const repeatBtn = document.querySelector("#loop-button");
    const progressCon = document.querySelector(".progress-bar");
    const progressBar = document.querySelector(".progress");
    const thumbBar = document.querySelector(".thumb");
    const fullScreenIcon = document.getElementById("full-screen");
    const miniPlayer = document.querySelector(".mini-player");

    playBtn.addEventListener("click", () => {
        const icon = playBtn.querySelector("i");
        if (!audio.src) return;

        if (audio.paused) {
            audio.play();
            icon.className = "ri-pause-mini-fill";
        } else {
            audio.pause();
            icon.className = "ri-play-mini-fill";
        }
    });

    nextBtn.addEventListener("click", () => {
        playNextSong();
    });

    prevBtn.addEventListener("click", () => {
        let prevIndex =
            (currentSongIndex - 1 + playlist.length) % playlist.length;
        let prevSong = playlist[prevIndex];
        if (prevSong) {
            playSong(prevSong, prevIndex);
            updateMiniPlayer(prevSong);
        }
    });

    shufBtn.addEventListener("click", () => {
        if (check === 0) {
            shufBtn.style.color = "#5773FB";
            check = 1;
        } else {
            check = 0;
            shufBtn.style.color = "#fff";
        }
    });

    repeatBtn.addEventListener("click", () => {
        isRepeat = !isRepeat;
        repeatBtn.style.color = isRepeat ? "#5773FB" : "#fff";
    });

    audio.addEventListener("timeupdate", () => {
        let current = audio.currentTime;
        let total = audio.duration;
        if (!total || isNaN(total)) return;

        let percent = (current / total) * 100;
        progressBar.style.width = `${percent}%`;
        thumbBar.style.left = `${percent}%`;
    });

    audio.addEventListener("ended", () => {
        resetProgessBar();
        const icon = playBtn.querySelector("i");
        icon.className = "ri-play-mini-fill";
        if (isRepeat) {
            playSong(playlist[currentSongIndex], currentSongIndex);
            updateMiniPlayer(playlist[currentSongIndex]);
        } else {
            playNextSong();
        }
    });

    //volume Slider
    const volumeSlider = document.querySelector(".volume input[type=range]");

    audio.volume = volumeSlider.value;
    updateVolumeSlider(volumeSlider.value);

    volumeSlider.addEventListener("input", () => {
        const value = parseFloat(volumeSlider.value);
        audio.volume = value;
        updateVolumeSlider(value);
    });

    function updateVolumeSlider(value) {
        const volumePercent = value * 100 + "%";
        volumeSlider.style.setProperty("--progress", volumePercent);
    }

    //full screen
    function fullScreen() {
        body.classList.add("fade-out");
        setTimeout(() => {
            window.location.href = "/html/player.html";
        }, 400);
    }

    if (window.innerWidth < 1000) {
        miniPlayer.addEventListener("click", () => {
            fullScreen();
        });
    }else{
        fullScreenIcon.addEventListener("click", () => {
            fullScreen();
        });
    }

    // song progress
    progressCon.addEventListener("click", (e) => {
        const clickX = e.offsetX;
        const barWidth = progressCon.clientWidth;

        const clickPersent = clickX / barWidth;

        if (audio.duration && !isNaN(audio.duration)) {
            audio.currentTime = clickPersent * audio.duration;
        }
    });

    let isDragging = false;
    let per = 0;

    function onMouseMove(e) {
        const mouseX = e.clientX;
        const barWidth = progressCon.clientWidth;
        const barStartX = progressCon.getBoundingClientRect().left;
        const relativeX = mouseX - barStartX;
        per = (relativeX / barWidth) * 100;
        if (per < 0) {
            per = 0;
        } else if (per > 100) {
            per = 100;
        }

        progressBar.style.width = `${per}%`;
        thumbBar.style.left = `${per}%`;
    }

    function onMouseUp() {
        isDragging = false;
        audio.currentTime = (per / 100) * audio.duration;
        document.body.style.userSelect = "auto";

        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
    }
    thumbBar.addEventListener("mousedown", (e) => {
        isDragging = true;
        document.body.style.userSelect = "none";
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    });
}

export function resetProgessBar() {
    const progressBar = document.querySelector(".progress");
    const thumbBar = document.querySelector(".thumb");
    progressBar.style.width = `0%`;
    thumbBar.style.left = `0%`;
}

function playNextSong() {
    if (check === 1) {
        let randomIdx = Math.floor(Math.random() * playlist.length);
        if (randomIdx === currentSongIndex) {
            randomIdx = (randomIdx + 1) % playlist.length;
        }
        const song = playlist[randomIdx];
        playSong(song, randomIdx);
        updateMiniPlayer(song);
    } else {
        let nextIndex = (currentSongIndex + 1) % playlist.length;
        let nextSong = playlist[nextIndex];
        if (nextSong) {
            playSong(nextSong, nextIndex);
            updateMiniPlayer(nextSong);
        }
    }
}
