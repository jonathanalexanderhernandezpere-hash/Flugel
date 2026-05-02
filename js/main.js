// ===================================
// CONFIGURACIÓN
// ===================================

// ID del video de YouTube para la página principal
const MAIN_YOUTUBE_VIDEO_ID = "4xDzrJKXOOY"; // Peaceful Piano Music

// ===================================
// VARIABLES GLOBALES
// ===================================

let playerMain;
let isPlayingMain = true;
let currentCardIndex = 0;

// Estado de las cartas (se guarda en localStorage)
const STORAGE_KEY = 'cards_state';

// ===================================
// INICIALIZACIÓN
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initCardsGrid();
    initGoldenParticles();
    setupModalClose();
});

// ===================================
// API DE YOUTUBE
// ===================================

function onYouTubeIframeAPIReady() {
    playerMain = new YT.Player('youtube-player-main', {
        videoId: MAIN_YOUTUBE_VIDEO_ID,
        playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: MAIN_YOUTUBE_VIDEO_ID,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            rel: 0
        },
        events: {
            'onReady': onPlayerMainReady,
            'onStateChange': onPlayerMainStateChange
        }
    });
}

function onPlayerMainReady(event) {
    event.target.playVideo();
    event.target.setVolume(20);
    setupMusicControlsMain();
}

function onPlayerMainStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playerMain.playVideo();
    }
}

function setupMusicControlsMain() {
    const musicToggle = document.getElementById('music-toggle-main');
    
    musicToggle.addEventListener('click', function() {
        if (!playerMain) return;

        if (isPlayingMain) {
            playerMain.pauseVideo();
            musicToggle.classList.add('paused');
        } else {
            playerMain.playVideo();
            musicToggle.classList.remove('paused');
        }
        isPlayingMain = !isPlayingMain;
    });
}

// ===================================
// GESTIÓN DE CARTAS
// ===================================

function initCardsGrid() {
    const grid = document.querySelector('.cards-grid');
    const cardsState = loadCardsState();
    
    for (let i = 1; i <= 23; i++) {
        const card = createCardElement(i, cardsState);
        grid.appendChild(card);
    }
}

function createCardElement(number, cardsState) {
    const card = document.createElement('div');
    card.className = 'card-item';
    card.dataset.cardNumber = number;
    
    // Determinar estado de la carta
    const isRead = cardsState.read.includes(number);
    const isUnlocked = number === 1 || cardsState.read.includes(number - 1);
    
    if (isRead) {
        card.classList.add('read');
    }
    if (!isUnlocked) {
        card.classList.add('locked');
    }
    
    card.innerHTML = `
        <div class="card-front">
            <div class="card-number">${number}</div>
            <div class="card-title">Carta ${number}</div>
            <div class="card-ornament">❖</div>
            <div class="card-status">${isRead ? 'Leída' : (isUnlocked ? 'Disponible' : 'Bloqueada')}</div>
        </div>
    `;
    
    if (isUnlocked) {
        card.addEventListener('click', function() {
            openCard(number);
        });
    }
    
    return card;
}

function openCard(number) {
    currentCardIndex = number;
    
    const modal = document.getElementById('card-modal');
    const envelope = modal.querySelector('.envelope');
    const iframe = document.getElementById('letter-iframe');
    
    // Cargar contenido de la carta
    iframe.src = `cartas/carta-${number}.html`;
    
    // Mostrar modal
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Animar sobre
    setTimeout(() => {
        envelope.classList.add('opening');
    }, 500);
    
    // Configurar detección de scroll en el iframe
    setupScrollDetection(iframe, number);
}

function setupScrollDetection(iframe, cardNumber) {
    iframe.addEventListener('load', function() {
        try {
            const iframeWindow = iframe.contentWindow;
            const iframeDocument = iframe.contentDocument || iframeWindow.document;
            
            // Detectar cuando se hace scroll hasta el final
            iframeDocument.addEventListener('scroll', function() {
                const scrollTop = iframeDocument.documentElement.scrollTop || iframeDocument.body.scrollTop;
                const scrollHeight = iframeDocument.documentElement.scrollHeight || iframeDocument.body.scrollHeight;
                const clientHeight = iframeDocument.documentElement.clientHeight || iframeDocument.body.clientHeight;
                
                // Si llegó al final (con un margen de 50px)
                if (scrollTop + clientHeight >= scrollHeight - 50) {
                    markCardAsRead(cardNumber);
                }
            });
            
            // También marcar como leída si el contenido es corto y no necesita scroll
            setTimeout(function() {
                const scrollHeight = iframeDocument.documentElement.scrollHeight || iframeDocument.body.scrollHeight;
                const clientHeight = iframeDocument.documentElement.clientHeight || iframeDocument.body.clientHeight;
                
                if (scrollHeight <= clientHeight + 50) {
                    markCardAsRead(cardNumber);
                }
            }, 1000);
            
        } catch (e) {
            // Por seguridad, marcar como leída después de 30 segundos
            setTimeout(function() {
                markCardAsRead(cardNumber);
            }, 30000);
        }
    });
}

function markCardAsRead(cardNumber) {
    const cardsState = loadCardsState();
    
    if (!cardsState.read.includes(cardNumber)) {
        cardsState.read.push(cardNumber);
        saveCardsState(cardsState);
        
        // Actualizar visualmente
        const cardElement = document.querySelector(`[data-card-number="${cardNumber}"]`);
        if (cardElement) {
            cardElement.classList.add('read');
        }
        
        // Desbloquear siguiente carta
        unlockNextCard(cardNumber);
    }
}

function unlockNextCard(currentNumber) {
    if (currentNumber < 23) {
        const nextCardElement = document.querySelector(`[data-card-number="${currentNumber + 1}"]`);
        if (nextCardElement && nextCardElement.classList.contains('locked')) {
            nextCardElement.classList.remove('locked');
            
            // Actualizar estado
            const statusElement = nextCardElement.querySelector('.card-status');
            if (statusElement) {
                statusElement.textContent = 'Disponible';
            }
            
            // Añadir evento de clic
            nextCardElement.addEventListener('click', function() {
                openCard(currentNumber + 1);
            });
            
            // Animación de desbloqueo
            nextCardElement.style.animation = 'none';
            setTimeout(() => {
                nextCardElement.style.animation = 'unlockAnimation 1s ease-out';
            }, 10);
        }
    }
}

// Animación de desbloqueo
const unlockStyle = document.createElement('style');
unlockStyle.textContent = `
    @keyframes unlockAnimation {
        0% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(unlockStyle);

// ===================================
// MODAL
// ===================================

function setupModalClose() {
    const modal = document.getElementById('card-modal');
    const overlay = modal.querySelector('.modal-overlay');
    
    overlay.addEventListener('click', function() {
        closeModal();
    });
}

function closeModal() {
    const modal = document.getElementById('card-modal');
    const envelope = modal.querySelector('.envelope');
    const iframe = document.getElementById('letter-iframe');
    
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        envelope.classList.remove('opening');
        iframe.src = '';
    }, 400);
}

// ===================================
// PERSISTENCIA
// ===================================

function loadCardsState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        return JSON.parse(saved);
    }
    return {
        read: [] // Array de números de cartas leídas
    };
}

function saveCardsState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ===================================
// PARTÍCULAS DORADAS
// ===================================

function initGoldenParticles() {
    const container = document.getElementById('golden-particles');
    
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.background = 'radial-gradient(circle, #ffd700 0%, #d4af37 100%)';
        particle.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.8)';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `floatGolden ${Math.random() * 15 + 15}s linear infinite`;
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.opacity = Math.random() * 0.4 + 0.2;
        
        container.appendChild(particle);
    }
}

// Añadir animación de partículas doradas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatGolden {
        0% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
        }
        25% {
            transform: translateY(75vh) translateX(30px) rotate(90deg);
        }
        50% {
            transform: translateY(50vh) translateX(-20px) rotate(180deg);
        }
        75% {
            transform: translateY(25vh) translateX(40px) rotate(270deg);
        }
        100% {
            transform: translateY(-20vh) translateX(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(particleStyle);
          
