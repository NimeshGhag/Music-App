import { playlist } from "../services/songServices.js";
import { artists } from "../services/songServices.js";

let trending = document.querySelector(".songs-con");
let topArtist = document.querySelector(".top-artist");

function trendingRender() {
    let trendingSongs = "";
    playlist.slice(0, 3).forEach((e, i) => {
        trendingSongs += `<div class="song">
                            <div class="song-tittle">
                                <small>${String(i + 1).padStart(2, "0")}</small>
                                <img src="${e.img}" alt="">
                                <div class="song-tittle_info">
                                    <h4>${e.title}</h4>
                                    <small>${
                                        window.innerWidth < 500
                                            ? e.artist.slice(0, 10) + "..."
                                            : window.innerWidth < 2000
                                            ? e.artist.slice(0, 10) + "..."
                                            : e.artist
                                    }</small>
                                </div>
                            </div>
                            <div class="song-info">
                                <small>3.45</small>
                                <button><i class="ri-play-mini-fill"></i></button>
                                <i class="ri-heart-line"></i>
                            </div>
                        </div>`;
    });

    trending.innerHTML = trendingSongs;
}

function topartist() {
    let artist = "";
    artists.forEach((e) => {
        artist += `    <div class="artist">
                        <div class="artist-img">
                            <img src="${e.img}"
                                alt="">
                        </div>
                        <div class="artst-name">
                            <h4>${e.name}</h4>
                        </div>
                    </div>`
    });

    topArtist.innerHTML = artist;
}

// Initial render
trendingRender();
topartist();

// Re-render songs when window is resized
window.addEventListener("resize", () => {
    trendingRender();
    topartist();
});
