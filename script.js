window.addEventListener('DOMContentLoaded', function() {
    const menuHTML = `
        <div class="menu" id="navMenu">
            <a href="https://hiperd.github.io/WebFrontEnd/">Início</a>
            <a style="color:rgb(192, 197, 124);">Idris M</a>
            <a href="https://hiperd.github.io/WebFrontEnd/Hammerhead">Hammerhead</a>
            <a href="https://hiperd.github.io/WebFrontEnd/890-Jump">890 Jump</a>
            <a href="https://hiperd.github.io/WebFrontEnd/Reclaimer">Reclaimer</a>
            <a href="https://hiperd.github.io/WebFrontEnd/Hull-C">Hull C</a>
        </div>
    `;

    function gerarMenu(destaque) {
        const itens = [
            { nome: 'Início', href: 'https://hiperd.github.io/WebFrontEnd/' },
            { nome: 'Idris M', href: 'https://hiperd.github.io/WebFrontEnd/Idris-M' },
            { nome: 'Hammerhead', href: 'https://hiperd.github.io/WebFrontEnd/Hammerhead' },
            { nome: '890 Jump', href: 'https://hiperd.github.io/WebFrontEnd/890-Jump' },
            { nome: 'Reclaimer', href: 'https://hiperd.github.io/WebFrontEnd/Reclaimer' },
            { nome: 'Hull C', href: 'https://hiperd.github.io/WebFrontEnd/Hull-C' },
        ];

        return `
            <div class="menu" id="navMenu">
                ${itens.map(item => `
                    <a href="${item.href}" ${item.nome === destaque ? 'style="color:rgb(192, 197, 124); font-weight:bold;"' : ''}>
                        ${item.nome}
                    </a>
                `).join('')}
            </div>
        `;
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

        if (window.innerWidth < 1040) {
            if (existingMenu) {
                existingMenu.remove();
            }
            if (backBtn) backBtn.style.display = "block";
        } else {
            if (!existingMenu && navbar && audioSection) {
                const menuHTML = gerarMenu(getDestaquePagina());
                audioSection.insertAdjacentHTML('beforebegin', menuHTML);
            }
            if (backBtn) backBtn.style.display = "none";
        }
    }

    // Executa ao carregar a página e ao redimensionar
    window.addEventListener('DOMContentLoaded', updateMenu);
    window.addEventListener('resize', updateMenu);


    function removeMenuIfNeeded() {
        const menu = document.getElementById('navMenu');
        if (window.innerWidth < 910 && menu) {
            menu.remove();
        }
    }

    // Verifica ao carregar a página
    window.addEventListener('load', removeMenuIfNeeded);

    // Verifica ao redimensionar
    window.addEventListener('resize', removeMenuIfNeeded);

    function toggleColapsar() {
        const conteudo = document.getElementById("conteudoColapsavel");
        conteudo.classList.toggle("ativo");
        const btn = document.querySelector(".btn-colapsar");
        if (conteudo.classList.contains("ativo")) {
            btn.textContent = "Esconder Especificações";
        } else {
            btn.textContent = "Mostrar Especificações";
        }
    }  
    
    const imagens = [
        "Idris_M/img1.png",
        "Idris_M/img2.jpg",
        "Idris_M/img3.png",
        "Idris_M/img4.png",
        "Idris_M/img5.jpg"
    ];
    let indice = 0;
    function atualizarGaleria() {
        document.getElementById("imagemPrincipal").src = imagens[indice];
        const mosaico = document.getElementById("mosaico");
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
    atualizarGaleria();
    
    // Troca automática a cada 3 segundos
    setInterval(() => {
        trocarImagem(1);
    }, 3000);

    // Esconde o menu ao rolar
    let prevScrollpos = window.pageYOffset;

    window.onscroll = function () {
        const currentScrollPos = window.pageYOffset;
        const header = document.getElementById("header");
        const backBtn = document.getElementById("backBtn");

        if (prevScrollpos > currentScrollPos) {
            // Mostra o header e o botão
            header.style.top = "0";
            if (backBtn) backBtn.style.top = "80px";
        } else {
            // Esconde o header e o botão
            header.style.top = "-80px";
            if (backBtn) backBtn.style.top = "20px";
        }

        prevScrollpos = currentScrollPos;
    }
    const audio = document.getElementById('myAudio');
    const playPauseBtn = document.getElementById('playPause');
    const progress = document.getElementById('progress');
    audio.volume = 0.1;

    // Atualiza o estado visual do botão
    function updateButton() {
        playPauseBtn.textContent = audio.paused ? '▶' : '⏹';
    }

    // Evento de clique para play/pause
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    // Eventos do áudio para atualizar o botão automaticamente
    audio.addEventListener('play', updateButton);
    audio.addEventListener('pause', updateButton);

    // Atualiza a barra de progresso
    audio.addEventListener('timeupdate', () => {
        progress.value = (audio.currentTime / audio.duration) * 100;
    });

    // Avançar/retroceder pela barra
    progress.addEventListener('input', () => {
        audio.currentTime = (progress.value / 100) * audio.duration;
    });

    // Garante que o botão reflita o estado inicial ao carregar
    window.addEventListener('DOMContentLoaded', () => {
        updateButton();
    });
});