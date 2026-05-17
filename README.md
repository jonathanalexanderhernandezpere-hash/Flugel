# 🌸 Para Ti — Guía de configuración

## Estructura de archivos

```
tu-repositorio/
├── index.html        ← Página de entrada (cuenta atrás + pixel art)
├── menu.html         ← Menú con las 23 cartas
├── carta.html        ← Página dinámica de cada carta
├── music/
│   ├── entrada.mp3   ← Música de la página de entrada
│   ├── menu.mp3      ← Música del menú
│   ├── carta_01.mp3  ← Música individual de cada carta
│   ├── carta_02.mp3
│   ├── ...
│   └── carta_23.mp3
└── README.md
```

---

## 1. Subir a GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser privado o público)
2. Sube todos los archivos HTML
3. Crea la carpeta `music/` y sube tus archivos MP3
4. Ve a **Settings → Pages → Source: main branch / root**
5. Tu sitio estará en: `https://tu-usuario.github.io/tu-repositorio/`

---

## 2. Cambiar la fecha de la cuenta atrás

En `index.html`, busca esta línea y cambia la fecha:

```js
const TARGET = new Date('2026-12-31T00:00:00');
```

Formato: `YYYY-MM-DDTHH:MM:SS`

---

## 3. Editar el contenido de las cartas

En `carta.html`, busca el objeto `LETTERS` y edita cada carta:

```js
const LETTERS = {
  1: {
    content: `<p>Tu texto aquí...</p>`,
    from: 'Tu nombre o firma',
    song: 'music/carta_01.mp3',
    songTitle: 'Nombre de la canción'
  },
  // ...
}
```

Cada `content` acepta HTML. Usa `<p>` para párrafos, `<em>` para cursiva.

---

## 4. Añadir las canciones

- Coloca los archivos MP3 en la carpeta `music/`
- Nombres exactos: `entrada.mp3`, `menu.mp3`, `carta_01.mp3` ... `carta_23.mp3`
- Formatos compatibles: MP3, OGG, WAV
- Si usas otros nombres, actualiza los `src` en cada archivo HTML

---

## 5. Personalizar

### Cambiar el nombre/firma
En `carta.html`, en el objeto `LETTERS`, edita el campo `from` de cada carta.

### Cambiar la música de la entrada
En `index.html`:
```html
<audio id="bg-music" loop>
  <source src="music/entrada.mp3" type="audio/mpeg">
</audio>
```

### Cambiar colores
Cada archivo usa variables CSS en `:root {}`. Los colores principales son:
- `--gold` / `--gold-l`: dorado
- `--sakura`: rosa cerezo
- `--burgundy`: burdeos del papel

---

## 6. Sistema de desbloqueo

- La primera carta (1) siempre está disponible
- Cada carta requiere **1 minuto de lectura** para desbloquear la siguiente
- El estado se guarda en `localStorage` del navegador del usuario
- Si el usuario borra el caché del navegador, el progreso se reinicia

---

## 7. Notas importantes

- Los archivos de música **no están incluidos** — debes añadirlos tú
- GitHub Pages tiene límite de 1GB por repositorio (suficiente para MP3)
- Para máxima compatibilidad, usa MP3 a 128kbps
- El sitio funciona completamente offline una vez cargado

---

*Hecho con ✦ para alguien especial*
