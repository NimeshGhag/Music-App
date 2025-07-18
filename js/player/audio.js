export const audio = new Audio();
export let currentSongIndex = null;
import { playlist } from "../services/songServices.js";
import {updateMiniPlayer , setUpMiniPlayerControls} from './mini-player.js';

setUpMiniPlayerControls();

export function playSong(song, index) {
    audio.src = song.url;
    audio.play();
    currentSongIndex = index;
}

export function playMusic() {
    document.querySelectorAll(".song , .song-item").forEach((songDiv) => {
        songDiv.addEventListener("click", (e) => {
            const songIndex = songDiv.dataset.index;
            const selectedSong = playlist[songIndex];
            playSong(selectedSong, songIndex);
            updateMiniPlayer(selectedSong);
        });
    });
}
