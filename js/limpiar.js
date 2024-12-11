let canvas = document.getElementById("scratch");
let container = document.querySelector(".question-container");
let context = canvas.getContext("2d");
let isRevealed = false; // Bandera para verificar si ya se reveló la pregunta

const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
canvas.width = containerWidth;
canvas.height = containerHeight;

const init = () => {
    const image = new Image();
    image.src = "../imagenes/suciedad.jpg"; // Ruta de la imagen
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    isRevealed = false;  //Reiniciar estado
    //canvas.style.pointerEvents = "auto";  Habilitar interacciones
};

//initially mouse X and mouse Y positions are 0
let mouseX = 0;
let mouseY = 0;
let isDragged = false;

//Events for touch and mouse
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

//Detech touch device
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent. It would fail for desktops and throw error.
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

//Get left and top of canvas
let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;

//Exact x and y position of mouse/touch
const getXY = (e) => {
  mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
  mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
};

isTouchDevice();
//Start Scratch
canvas.addEventListener(events[deviceType].down, (event) => {
    if (isRevealed) return; // No hacer nada si ya está revelado
    isDragged = true;
  //Get x and y position
  getXY(event);
  scratch(mouseX, mouseY);
});

//mousemove/touchmove
canvas.addEventListener(events[deviceType].move, (event) => {
  
    if (isRevealed) return; // No hacer nada si ya está revelado
    
    if (!isTouchDevice()) {
    event.preventDefault();
    } 
    
    if (isDragged) {
        getXY(event);
        scratch(mouseX, mouseY);
    }
});

//stop drawing
canvas.addEventListener(events[deviceType].up, () => {
  isDragged = false;
  checkReveal(); // Verificar si se ha revelado suficiente área
});


//If mouse leaves the square
canvas.addEventListener("mouseleave", () => {
  isDragged = false;
});

const scratch = (x, y) => {
  //destination-out draws new shapes behind the existing canvas content
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  //arc makes circle - x,y,radius,start angle,end angle
  context.arc(x, y, 30, 0, 2 * Math.PI);
  context.fill();
};

const checkReveal = () => {
    // Obtener la cantidad de píxeles visibles
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
    // Si se ha revelado más del 50%, deshabilitar el canvas
    if (clearedPercentage > 50) {
      isRevealed = true;
      disableScratch();
    }
  };
  const disableScratch = () => {
    // Quitar todos los eventos del canvas
    canvas.style.pointerEvents = "none";

  // Limpiar completamente el canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

    // Mostrar la pregunta
    document.querySelector(".question-container").style.display = "block";
};

window.onload = init();