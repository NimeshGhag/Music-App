import { playlist } from "../services/songServices.js";
import{playMusic}from"../player/audio.js"

let songsList = document.querySelector(".song-list");
const backBtn = document.querySelector('.back-btn');
backBtn.addEventListener('click',()=>{
   history.back() 
})
function renderSongs() {
    let browseSongs = "";

    playlist.forEach((e, i) => {
        browseSongs += `  <div class="song-item" data-index="${i}">
                    <div class="song">
                        <img src="${e.img}"
                            alt="Thumbnail" />
                        <div class="song-info">
                            <h4>${e.title}</h4>
                            <small>${
                                window.innerWidth < 500
                                    ? e.artist.slice(0, 10) + "..."
                                    : window.innerWidth < 2000
                                    ? e.artist.slice(0, 25) + "..."
                                    : e.artist
                            }
                            </small>
                        </div>

                    </div>
                    <button class="dot-btn"><i class="ri-more-2-line"></i></button>
                </div>`;
    });

    songsList.innerHTML = browseSongs;
    playMusic();

}

// Initial render
renderSongs();
// Re-render songs when window is resized
window.addEventListener("resize", () => {
    renderSongs();
});
