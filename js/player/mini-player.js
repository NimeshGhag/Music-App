import { audio, currentSongIndex, playSong } from "./audio.js";
import { playlist } from "../services/songServices.js";

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
    const playBtn = document.getElementById("mini-play-button");
    const nextBtn = document.querySelector("#next-button");
    const prevBtn = document.querySelector("#prev-button");
    const progressCon = document.querySelector(".progress-bar");
    const progressBar = document.querySelector(".progress");
    const thumbBar = document.querySelector(".thumb");

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
        let nextIndex = (currentSongIndex + 1) % playlist.length;
        let nextSong = playlist[nextIndex];
        if (nextSong) {
            playSong(nextSong, nextIndex);
            updateMiniPlayer(nextSong);
        }
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
    });

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
