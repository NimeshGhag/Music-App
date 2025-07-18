import { playlist } from "../services/songServices.js";
import { artists } from "../services/songServices.js";
import { Albums } from "../services/songServices.js";
import { backgroundPoster } from "../services/songServices.js";
import{playMusic}from"../player/audio.js"


let trending = document.querySelector(".songs-con");
let topArtist = document.querySelector(".top-artist");
let topAlbum = document.querySelector(".top-albums");

//hero section elements
let heroSection = document.querySelector(".hero");
let heroCon = document.querySelector(".hero-con");
let tittleEl = document.querySelector(".song-info h1");
let artistEl = document.querySelector(".song-info h3");
let dots = document.querySelectorAll(".dot");


function trendingRender() {
    let trendingSongs = "";
    playlist.slice(0, 3).forEach((e, i) => {
        trendingSongs += `<div class="song" data-index="${i}">
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
    playMusic();
    
}



function topArt() {
    let artist = "";
    artists.forEach((e) => {
        artist += `    <div class="artist">
                        <div class="artist-img">
                            <img src="${e.img}"
                                alt="">
                        </div>
                        <div class="artist-name">
                            <h4>${e.name}</h4>
                        </div>
                    </div>`;
    });

    topArtist.innerHTML = artist;
}

function topAlbums() {
    let album = "";
    Albums.forEach((e) => {
        album += `    <div class="artist ">
                        <div class="artist-img">
                            <img src="${e.img}"
                                alt="">
                        </div>
                        <div class="artst-name">
                            <h4>${e.name}</h4>
                        </div>
                    </div>`;
    });

    topAlbum.innerHTML = album;
}

//hero element function
let currentIndex = 0;

function updateHeroContent() {
    const bgData = backgroundPoster[currentIndex];

    //slide animation
    heroSection.classList.remove("slide-in");
    heroSection.classList.add("slide-out");
    heroCon.classList.remove("slide-in");
    heroCon.classList.add("slide-out");

    setTimeout(() => {
        heroSection.style.backgroundImage = bgData.img;
        tittleEl.textContent = bgData.tittle;
        artistEl.textContent = bgData.artist;
        heroSection.classList.remove("slide-out");
        heroSection.classList.add("slide-in");
        heroCon.classList.remove("slide-out");
        heroCon.classList.add("slide-in");
    }, 1050);

    dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentIndex);
    });

    currentIndex = (currentIndex + 1) % backgroundPoster.length;
}

updateHeroContent();
setInterval(updateHeroContent, 5000);

// Initial render
trendingRender();
topArt();
topAlbums();

// Re-render songs when window is resized
window.addEventListener("resize", () => {
    trendingRender();
    topArt();
    topAlbums();
});
