function updateMenu() {
    const backBtn = document.getElementById('backBtn');
    const audioSection = document.getElementById('teste');

    if (window.innerWidth < 910) {
        if (backBtn) backBtn.style.display = "block";
    } else {
        if (backBtn) backBtn.style.display = "none";
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
updateButton();
window.addEventListener('resize', () => {
    updateMenu();
});