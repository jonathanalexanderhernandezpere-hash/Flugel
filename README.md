# 🌸 Proyecto Cartas Interactivo

Página web interactiva con contador regresivo y colección de 23 cartas con estilo anime/manhwa.

## 📁 Estructura del Proyecto

```
proyecto-cartas/
├── index.html           # Página de countdown (inicio)
├── main.html           # Página principal con las 23 cartas
├── css/
│   ├── countdown.css   # Estilos de la página de countdown
│   ├── main.css        # Estilos de la página principal
│   └── cartas.css      # Estilos compartidos para todas las cartas
├── js/
│   ├── countdown.js    # Lógica del contador y animaciones
│   └── main.js         # Lógica de las cartas y modal
├── cartas/
│   ├── carta-1.html    # Primera carta (ejemplo completo)
│   ├── carta-2.html    # Segunda carta (ejemplo completo)
│   ├── carta-3.html    # Tercera carta (ejemplo completo)
│   ├── carta-4.html    # Cartas 4-23 (debes crear con tu contenido)
│   └── ...
└── README.md           # Este archivo
```

## ⚙️ Configuración Inicial

### 1. Configurar la fecha objetivo del countdown

Edita el archivo `js/countdown.js` en la línea 7:

```javascript
// CAMBIA ESTA FECHA (Año, Mes-1, Día, Hora, Minuto, Segundo)
const TARGET_DATE = new Date(2026, 5, 15, 0, 0, 0).getTime(); // 15 de Junio de 2026
```

**Importante:** Los meses en JavaScript van de 0-11 (0=Enero, 11=Diciembre)

### 2. Configurar la música de YouTube

**Para la página de countdown** (index.html):
Edita `js/countdown.js` en la línea 13:

```javascript
const YOUTUBE_VIDEO_ID = "jfKfPfyJRdk"; // Cambia por tu ID de video
```

**Para la página principal** (main.html):
Edita `js/main.js` en la línea 7:

```javascript
const MAIN_YOUTUBE_VIDEO_ID = "4xDzrJKXOOY"; // Cambia por tu ID de video
```

**¿Cómo obtener el ID de YouTube?**
- URL del video: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- El ID es: `dQw4w9WgXcQ`

### 3. Crear las 23 cartas

Ya tienes 3 cartas de ejemplo (carta-1.html, carta-2.html, carta-3.html).

**Para crear las cartas restantes (4-23):**

1. Copia una de las cartas de ejemplo
2. Renómbrala (por ejemplo: `carta-4.html`)
3. Edita el contenido:
   - Cambia el número en `<div class="card-number-display">4</div>`
   - Cambia el título `<h2 class="card-title">Tu Título Aquí</h2>`
   - Edita el contenido en `<div class="card-body">...</div>`
   - Puedes usar diferentes estilos cambiando la clase del body:
     - `class="card-style-1"` (fondo crema/dorado)
     - `class="card-style-2"` (fondo rosa claro)
     - `class="card-style-3"` (fondo lavanda claro)

**Ejemplo de estructura de carta:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carta 4</title>
    <link rel="stylesheet" href="../css/cartas.css">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Cormorant+Garamond:wght@300;400;600;700&family=Playfair+Display:wght@400;600;900&display=swap" rel="stylesheet">
</head>
<body class="card-style-1">
    
    <div class="decorative-border top-left"></div>
    <div class="decorative-border top-right"></div>
    <div class="decorative-border bottom-left"></div>
    <div class="decorative-border bottom-right"></div>
    
    <div class="card-header">
        <div class="card-number-display">4</div>
        <div class="card-ornament-top">✦ ❖ ✦</div>
    </div>
    
    <div class="card-content">
        <h2 class="card-title">Tu Título Aquí</h2>
        
        <div class="card-body">
            <p>Tu contenido aquí...</p>
            
            <div class="divider">✧ ✧ ✧</div>
            
            <p>Más contenido...</p>
            
            <div class="quote">
                "Tu cita especial aquí"
            </div>
            
            <p>Conclusión...</p>
        </div>
        
        <div class="card-signature">Tu firma,</div>
    </div>
    
</body>
</html>
```

## 🚀 Subir a GitHub Pages

### Paso 1: Crear repositorio en GitHub

1. Ve a GitHub.com e inicia sesión
2. Haz clic en el botón "+" (arriba a la derecha) y selecciona "New repository"
3. Nombre del repositorio: `nombre-que-quieras` (ejemplo: `cartas-especiales`)
4. Marca como "Public"
5. **NO** inicialices con README
6. Haz clic en "Create repository"

### Paso 2: Subir archivos

**Opción A - Interfaz Web (más fácil):**

1. En tu repositorio recién creado, haz clic en "uploading an existing file"
2. Arrastra TODA la carpeta `proyecto-cartas` (o selecciona todos los archivos)
3. Asegúrate de mantener la estructura de carpetas:
   ```
   css/
   js/
   cartas/
   index.html
   main.html
   ```
4. Haz clic en "Commit changes"

**Opción B - Línea de comandos (Git):**

```bash
cd proyecto-cartas
git init
git add .
git commit -m "Primera versión"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

### Paso 3: Activar GitHub Pages

1. En tu repositorio, ve a "Settings" (Configuración)
2. En el menú lateral, haz clic en "Pages"
3. En "Source", selecciona "main" branch
4. En "folder", selecciona "/ (root)"
5. Haz clic en "Save"
6. ¡Espera unos minutos!

Tu página estará disponible en:
```
https://TU-USUARIO.github.io/TU-REPO/
```

## 🎨 Personalización Adicional

### Cambiar colores

Edita las variables CSS en cada archivo CSS:

**countdown.css:**
```css
:root {
    --sakura-pink: #ffb7c5;
    --sakura-light: #ffd4e5;
    /* etc... */
}
```

**main.css:**
```css
:root {
    --luxury-gold: #d4af37;
    --deep-gold: #b8860b;
    /* etc... */
}
```

### Personalizar textos

- **Página de countdown:** Edita directamente `index.html`
- **Página principal:** Edita `main.html`
- **Títulos y frases:** Busca en los archivos HTML

## 🔧 Solución de Problemas

### La música no suena

1. Verifica que los IDs de YouTube sean correctos
2. Haz clic en la pantalla (los navegadores requieren interacción del usuario)
3. Verifica la consola del navegador (F12) para ver errores

### Las cartas no se desbloquean

1. Asegúrate de hacer scroll hasta el final de cada carta
2. Verifica que los archivos `carta-X.html` existan en la carpeta `cartas/`
3. Limpia el localStorage del navegador si quieres reiniciar el progreso

### El contador no funciona

1. Verifica que la fecha esté en el formato correcto
2. Asegúrate de que la fecha sea futura (no pasada)
3. Revisa la consola del navegador para errores

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (versiones recientes)
- ✅ Dispositivos móviles (responsive)
- ✅ Tablets

## 🎯 Características

- ✨ Contador regresivo con animación de pétalos de cerezo
- 🎵 Música de fondo (YouTube)
- 🔒 Sistema de desbloqueo progresivo de cartas
- 📱 Diseño responsive (móviles y desktop)
- 💾 Progreso guardado en localStorage
- 🎨 Animaciones suaves y elegantes
- 📜 Efecto de sobre que se abre

## 📝 Notas Importantes

1. **Todas las cartas deben existir:** Asegúrate de crear las 23 cartas (carta-1.html hasta carta-23.html)
2. **Rutas relativas:** No cambies la estructura de carpetas
3. **Fuentes de Google:** Requieren conexión a internet
4. **LocalStorage:** El progreso se guarda en el navegador del usuario
5. **Videos de YouTube:** Deben ser públicos y permitir embedding

## 💡 Ideas de Contenido para las Cartas

- Recuerdos especiales
- Razones por las que aprecias a alguien
- Momentos favoritos compartidos
- Planes futuros
- Agradecimientos
- Reflexiones personales
- Citas inspiradoras
- Historias cortas
- Mensajes motivacionales

---

¡Disfruta creando tu página web interactiva! 🌸✨
