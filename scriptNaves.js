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

function getDestaquePagina() {
    const path = window.location.pathname;
    if (path.includes('Idris-M')) return 'Idris M';
    if (path.includes('Hammerhead')) return 'Hammerhead';
    if (path.includes('890-Jump')) return '890 Jump';
    if (path.includes('Reclaimer')) return 'Reclaimer';
    if (path.includes('Hull-C')) return 'Hull C';
    return 'Início';
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
            audioSection.insertAdjacentHTML('beforebegin', gerarMenu(getDestaquePagina()));
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

// --- Galeria ---
const pathParts = window.location.pathname.split('/');
const folder = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
const imagens = [
    `https://hiperd.github.io/WebFrontEnd/${folder}/img1.png`,
    `https://hiperd.github.io/WebFrontEnd/${folder}/img2.png`,
    `https://hiperd.github.io/WebFrontEnd/${folder}/img3.png`,
    `https://hiperd.github.io/WebFrontEnd/${folder}/img4.png`,
    `https://hiperd.github.io/WebFrontEnd/${folder}/img5.png`
];
let indice = 0;

function atualizarGaleria() {
    const imagemPrincipal = document.getElementById("imagemPrincipal");
    const mosaico = document.getElementById("mosaico");

    imagemPrincipal.src = imagens[indice];
    mosaico.innerHTML = "";
    for (let i = 1; i < 5; i++) {
        let imgIndex = (indice + i) % imagens.length;
        const img = document.createElement("img");
        img.src = imagens[imgIndex];
        img.alt = `Imagem ${imgIndex + 1} da Nave`;
        mosaico.appendChild(img);
    }
}

function trocarImagem(direcao) {
    indice = (indice + direcao + imagens.length) % imagens.length;
    atualizarGaleria();
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

// --- Colapsar ---
function toggleColapsar() {
    const conteudo = document.getElementById("conteudoColapsavel");
    const btn = document.querySelector(".btn-colapsar");
    conteudo.classList.toggle("ativo");
    btn.textContent = conteudo.classList.contains("ativo") ? "Esconder Especificações" : "Mostrar Especificações";
}

const btnColapsar = document.getElementById('btnColapsar');
if (btnColapsar) btnColapsar.addEventListener('click', toggleColapsar);

// --- Botões de troca ---
const btnAnterior = document.getElementById('btnAnterior');
const btnProximo = document.getElementById('btnProximo');
if (btnAnterior && btnProximo) {
    btnAnterior.addEventListener('click', () => trocarImagem(-1));
    btnProximo.addEventListener('click', () => trocarImagem(1));
}

// --- Scroll header ---
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    const header = document.getElementById("header");
    const backBtn = document.getElementById("backBtn");

    if (prevScrollpos > currentScrollPos) {
        header.style.top = "0";
        if (backBtn) backBtn.style.top = "80px";
    } else {
        header.style.top = "-80px";
        if (backBtn) backBtn.style.top = "20px";
    }
    prevScrollpos = currentScrollPos;
};

// --- Inicialização ---
updateMenu();
removeMenuIfNeeded();
atualizarGaleria();
updateButton();
setInterval(() => trocarImagem(1), 3000);
window.addEventListener('resize', () => {
    updateMenu();
    removeMenuIfNeeded();
});