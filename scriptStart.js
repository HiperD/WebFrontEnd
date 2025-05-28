// --- Menu Dinâmico ---
function gerarMenu(destaque) {
    return `<div class="menu" id="navMenu">
                <a href="#nave1">Idris M</a>
                <a href="#nave2">Hammerhead</a>
                <a href="#nave3">890 Jump</a>
                <a href="#nave4">Reclaimer</a>
                <a href="#nave5">Hull C</a>
            </div>`;
}



function updateMenu() {
    const navbar = document.querySelector('.navbar');
    const existingMenu = document.getElementById('navMenu');
    const backBtn = document.getElementById('backBtn');
    const audioSection = document.getElementById('teste');

    if (window.innerWidth < 910) {
        if (existingMenu) existingMenu.remove();
        if (backBtn) backBtn.style.display = "block";
    } else {
        if (!existingMenu && navbar && audioSection) {
            audioSection.insertAdjacentHTML('beforebegin', gerarMenu());
        }
        if (backBtn) backBtn.style.display = "none";
    }
}

function removeMenuIfNeeded() {
    const menu = document.getElementById('navMenu');
    if (window.innerWidth < 910 && menu) {
        menu.remove();
    }
}

// --- Áudio ---
const audio = document.getElementById('myAudio');
const playPauseBtn = document.getElementById('playPause');
const progress = document.getElementById('progress');
audio.volume = 0.1;

function updateButton() {
    playPauseBtn.textContent = audio.paused ? '▶' : '⏹';
}

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) audio.play();
    else audio.pause();
});

audio.addEventListener('play', updateButton);
audio.addEventListener('pause', updateButton);
audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});
progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// --- Scroll header ---
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    const header = document.getElementById("header");
    const backBtn = document.getElementById("backBtn");

    if (prevScrollpos > currentScrollPos) {
        header.style.top = "0";
    } else {
        header.style.top = "-80px";
    }
    prevScrollpos = currentScrollPos;
};

// --- Inicialização ---
updateMenu();
removeMenuIfNeeded();
window.addEventListener('resize', () => {
    updateMenu();
    removeMenuIfNeeded();
});