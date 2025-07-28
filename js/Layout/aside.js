import { nav } from "./footer.js";
const sidebar = document.querySelector(".sidebar");
const profile = document.querySelector(".all-con header .profile");

sidebar.addEventListener("click", (e) => {
    nav(e);
});

profile.addEventListener("click", () => {
    profile.style.cursor = "pointer";
    sidebar.style.transform = "translateX(0)";
});

document.addEventListener("click", (e) => {
    const isInsideSidebar = sidebar.contains(e.target);
    const isProfileClick = profile.contains(e.target);

    if (!isInsideSidebar && !isProfileClick && window.innerWidth < 1024) {
        sidebar.style.transform = "translateX(-100%)";
    }
});