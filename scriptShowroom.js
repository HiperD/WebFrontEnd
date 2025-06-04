// --- Menu Dinâmico ---
function gerarMenu(destaque) {
    const itens = [
        { nome: 'Início', href: 'https://hiperd.github.io/WebFrontEnd/' },
        { nome: 'Showroom', href: 'https://hiperd.github.io/WebFrontEnd/Showroom' },
        { nome: 'Idris M', href: 'https://hiperd.github.io/WebFrontEnd/Idris-M' },
        { nome: 'Hammerhead', href: 'https://hiperd.github.io/WebFrontEnd/Hammerhead' },
        { nome: '890 Jump', href: 'https://hiperd.github.io/WebFrontEnd/890-Jump' },
        { nome: 'Reclaimer', href: 'https://hiperd.github.io/WebFrontEnd/Reclaimer' },
        { nome: 'Hull C', href: 'https://hiperd.github.io/WebFrontEnd/Hull-C' },
    ];
    return `<div class="menu" id="navMenu">
        ${itens.map(item => `
            <a href="${item.href}" ${item.nome === destaque ? 'style="color:rgb(192, 197, 124); font-weight:bold;"' : ''}>
                ${item.nome}
            </a>`).join('')}
    </div>`;
}



function updateMenu() {
    const navbar = document.querySelector('.navbar');
    const existingMenu = document.getElementById('navMenu');
    const backBtn = document.getElementById('backBtn');
    const audioSection = document.getElementById('teste');

    if (window.innerWidth < 1260) {
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
    if (window.innerWidth < 1260 && menu) {
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