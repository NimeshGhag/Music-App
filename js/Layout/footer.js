let mini = document.querySelector(".mini-player");
const footerNav = document.querySelector(".footer-nav");
export function updateMini(song) {
    mini.classList.remove("hide");
    if (window.innerWidth <= 768) {
        mini.style.backgroundColor = song.bgColor;
    } else {
        mini.style.backgroundColor = "#18181C";
    }
}

export const nav = (e) => {
    const tabElem = e.target.closest("[data-tab]");
    if (!tabElem) return;
    const tabId = tabElem.dataset.tab;

    let targetPath = "";
    switch (tabId) {
        case "home-tab":
            targetPath = "/html/index.html";
            break;

        case "libiry-tab":
            targetPath = "/html/browse.html";
            break;
    }
    if (window.location.pathname === targetPath) return;
    window.location.href = targetPath;
};

footerNav.addEventListener("click", (e) => {
    nav(e);
});
