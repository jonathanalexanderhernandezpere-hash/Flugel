// ===================================
// CONFIGURACIÓN
// ===================================

// CAMBIA ESTA FECHA A LA FECHA OBJETIVO (Año, Mes-1, Día, Hora, Minuto, Segundo)
const TARGET_DATE = new Date(2026, 5, 1, 0, 0, 0).getTime(); // 15 de Junio de 2026

// CAMBIA ESTE ID POR EL ID DE TU VIDEO DE YOUTUBE
// Ejemplo: si tu video es https://www.youtube.com/watch?v=dQw4w9WgXcQ
// El ID es: dQw4w9WgXcQ
const YOUTUBE_VIDEO_ID = "K5Ni6Zh6MCY"; // Lofi hip hop - beats to relax/study to

// ===================================
// VARIABLES GLOBALES
// ===================================

let player;
let countdownInterval;
let sakuraPetals = [];
let lightParticles = [];

// ===================================
// INICIALIZACIÓN
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initSakuraCanvas();
    initLightParticles();
    startCountdown();
    setupMusicControls();
});

// ===================================
// API DE YOUTUBE
// ===================================

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
            autoplay: 0,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            rel: 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // Esperamos interacción del usuario para reproducir
    document.addEventListener('click', function initAudio() {
        if (player && player.playVideo) {
            player.playVideo();
            player.setVolume(30); // Volumen al 30%
            hideAudioInstruction();
            document.removeEventListener('click', initAudio);
        }
    }, { once: true });
}

function onPlayerStateChange(event) {
    // Mantener el loop
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

// ===================================
// CONTROLES DE MÚSICA
// ===================================

function setupMusicControls() {
    const musicToggle = document.getElementById('music-toggle');
    const musicText = document.getElementById('music-text');
    let isPlaying = true;

    musicToggle.addEventListener('click', function() {
        if (!player) return;

        if (isPlaying) {
            player.pauseVideo();
            musicText.textContent = 'Reanudar música';
            musicToggle.querySelector('.music-icon').textContent = '🔇';
        } else {
            player.playVideo();
            musicText.textContent = 'Pausar música';
            musicToggle.querySelector('.music-icon').textContent = '🎵';
        }
        isPlaying = !isPlaying;
    });
}

function hideAudioInstruction() {
    const instruction = document.getElementById('audio-instruction');
    if (instruction) {
        instruction.style.opacity = '0';
        setTimeout(() => {
            instruction.classList.add('hidden');
        }, 500);
    }
}

// ===================================
// CONTADOR REGRESIVO
// ===================================

function startCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        showEnterButton();
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function showEnterButton() {
    document.getElementById('countdown-container').style.display = 'none';
    document.getElementById('waiting-message').style.display = 'none';
    document.getElementById('enter-button').classList.remove('hidden');
    
    // Cambiar título
    const titleLine2 = document.querySelector('.title-line-2');
    const titleLine3 = document.querySelector('.title-line-3');
    titleLine2.textContent = '¡Ha llegado el momento!';
    titleLine3.textContent = 'Tu sorpresa te espera...';
}

// ===================================
// PÉTALOS DE CEREZO (CANVAS)
// ===================================

function initSakuraCanvas() {
    const canvas = document.getElementById('sakura-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Crear pétalos
    for (let i = 0; i < 50; i++) {
        sakuraPetals.push(createPetal());
    }

    // Animar
    animateSakura(ctx, canvas);

    // Responsive
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function createPetal() {
    return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight - window.innerHeight,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
        speed: Math.random() * 1 + 0.5,
        size: Math.random() * 15 + 10,
        swingSpeed: Math.random() * 0.02 + 0.01,
        swingDistance: Math.random() * 50 + 30,
        swingOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.6 + 0.4
    };
}

function animateSakura(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sakuraPetals.forEach(function(petal, index) {
        // Movimiento de caída con balanceo
        petal.y += petal.speed;
        petal.rotation += petal.rotationSpeed;
        
        const swing = Math.sin((petal.y * petal.swingSpeed) + petal.swingOffset) * petal.swingDistance;
        const currentX = petal.x + swing;

        // Dibujar pétalo
        ctx.save();
        ctx.translate(currentX, petal.y);
        ctx.rotate(petal.rotation * Math.PI / 180);
        ctx.globalAlpha = petal.opacity;

        // Forma del pétalo (óvalo estilizado)
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size / 2, petal.size, 0, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, petal.size);
        gradient.addColorStop(0, '#ffb7c5');
        gradient.addColorStop(0.5, '#ffd4e5');
        gradient.addColorStop(1, '#ffb7c5');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();

        // Reiniciar pétalo cuando sale de la pantalla
        if (petal.y > canvas.height + 50) {
            sakuraPetals[index] = createPetal();
            sakuraPetals[index].y = -50;
        }
    });

    requestAnimationFrame(function() {
        animateSakura(ctx, canvas);
    });
}

// ===================================
// PARTÍCULAS DE LUZ
// ===================================

function initLightParticles() {
    const container = document.getElementById('light-particles');
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.background = 'rgba(255, 255, 255, 0.8)';
        particle.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(particle);
    }
}

// Añadir animación de partículas flotantes al CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) translateX(0);
        }
        50% {
            transform: translateY(-20vh) translateX(50px);
        }
        100% {
            transform: translateY(-100vh) translateX(0);
        }
    }
`;
document.head.appendChild(style);
