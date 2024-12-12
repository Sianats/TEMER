let canvas = document.getElementById("scratch");
let container = document.querySelector(".question-container");
let context = canvas.getContext("2d");
let isRevealed = false; // Bandera para verificar si ya se reveló la pregunta

const init = () => {
    // Limpiar canvas y reiniciar variables
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.pointerEvents = "auto";
    isRevealed = false;

    // Configurar dimensiones del canvas según el contenedor
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Crear una nueva instancia de Image para evitar caché
    const image = new Image();
    image.src = "../imagenes/suciedad.jpg"; // Ruta de la imagen
    image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
};

// Reiniciar eventos para evitar conflictos
const resetCanvasEvents = () => {
    const newCanvas = canvas.cloneNode(true);
    canvas.parentNode.replaceChild(newCanvas, canvas);
    canvas = newCanvas;
    context = canvas.getContext("2d");
    attachEvents(); // Vuelve a asignar eventos
};

// Función para asignar eventos al canvas
const attachEvents = () => {
    let mouseX = 0;
    let mouseY = 0;
    let isDragged = false;

    // Detectar dispositivo táctil
    let deviceType = "mouse";
    const isTouchDevice = () => {
        try {
            document.createEvent("TouchEvent");
            deviceType = "touch";
            return true;
        } catch (e) {
            deviceType = "mouse";
            return false;
        }
    };

    // Obtener posición del ratón/táctil
    const getXY = (e) => {
        const rectLeft = canvas.getBoundingClientRect().left;
        const rectTop = canvas.getBoundingClientRect().top;
        mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
        mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
    };

    isTouchDevice();

    // Iniciar raspado
    canvas.addEventListener("mousedown", (event) => {
        if (isRevealed) return;
        isDragged = true;
        getXY(event);
        scratch(mouseX, mouseY);
    });

    // Continuar raspando
    canvas.addEventListener("mousemove", (event) => {
        if (isRevealed) return;
        if (isDragged) {
            getXY(event);
            scratch(mouseX, mouseY);
        }
    });

    // Finalizar raspado
    canvas.addEventListener("mouseup", () => {
        isDragged = false;
        checkReveal();
    });

    // Manejo para táctil
    canvas.addEventListener("touchstart", (event) => {
        if (isRevealed) return;
        isDragged = true;
        getXY(event);
        scratch(mouseX, mouseY);
    });

    canvas.addEventListener("touchmove", (event) => {
        if (isRevealed) return;
        if (isDragged) {
            getXY(event);
            scratch(mouseX, mouseY);
        }
    });

    canvas.addEventListener("touchend", () => {
        isDragged = false;
        checkReveal();
    });

    canvas.addEventListener("mouseleave", () => {
        isDragged = false;
    });
};

// Dibujar el área raspada
const scratch = (x, y) => {
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x, y, 30, 0, 2 * Math.PI);
    context.fill();
};

// Verificar si se ha revelado suficiente área
const checkReveal = () => {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let clearedPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
            clearedPixels++;
        }
    }

    const totalPixels = canvas.width * canvas.height;
    const clearedPercentage = (clearedPixels / totalPixels) * 100;

    if (clearedPercentage > 50) {
        isRevealed = true;
        disableScratch();
    }
};

// Deshabilitar el canvas
const disableScratch = () => {
    canvas.style.pointerEvents = "none";
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.querySelector(".question-container").style.display = "block";
};

// Inicializar cuando se cargue
window.onload = () => {
    init();
    attachEvents();
};
