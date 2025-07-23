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
    });
 
}

export function resetProgessBar() {
    const progressBar = document.querySelector(".progress");
    const thumbBar = document.querySelector(".thumb");
    progressBar.style.width = `0%`;
    thumbBar.style.left = `0%`;
}
