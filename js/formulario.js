/* Añadimos un DOMContentLoaded porque el script esta intentando acceder 
a los elementos del html cuando todavía no ha conseguido cargar y así nos
aseguramos de que haya cargado antes de ejecutar el código
*/

// Link agua: https://reinspirit.com/8-recursos-css-y-js-para-incluir-un-efecto-liquido-en-la-web/
// link luces: https://www.treeweb.es/TreeWeb/Articulos/HTML-y-CSS/Efecto-linterna
// link transporte: https://es.pinterest.com/pin/9499849194558565/
// link segundaVida: https://ar.pinterest.com/pin/242983342383827369/   o   https://ar.pinterest.com/pin/480829697733767367/
// link basura: https://www.youtube.com/watch?v=MkbrESdbNpY

document.addEventListener("DOMContentLoaded", function () {
    // Lista de preguntas
    const preguntas = [
        {
            texto: "¿Apagas las luces al salir de una habitación?",
            opciones: { "Siempre": 100, "A veces": 50, "Nunca": 0 },
            id: "luces"
        },
        {
            texto: "¿Cierras el grifo mientras te lavas los dientes?",
            opciones: { "Sí": 100, "No": 0 },
            id: "agua"
        },
        {
            texto: "¿Cuánto tiempo tardas en la ducha?",
            opciones: { "Menos de 5 minutos": 100, "Entre 5 y 10 minutos": 50, "Más de 10 minutos": 0 },
            id: "agua"
        },
        {
            texto: "¿Separas la basura en casa?",
            opciones: { "Sí": 100, "No": 0 },
            id: "basura"
        },
        {
            texto: "¿Qué transporte usas más para ir al colegio?",
            opciones: { "Bicicleta o caminando": 100, "Transporte público": 50, "Coche propio": 0 },
            id: "transporte"
        },
        {
            texto: "¿Reutilizas las hojas de papel cuando quedan en blanco por un lado?",
            opciones: { "Siempre": 100, "A veces": 50, "Nunca": 0 },
            id: "segundaVida"
        },
        {
            texto: "¿Qué haces con los restos de comida que sobran en casa?",
            opciones: { "Los guardo para comer más tarde": 100, "Los tiro a la basura": 0 },
            id: "segundaVida"
        },
        {
            texto: "¿Sabes qué va en cada contenedor de reciclaje (plásticos, papel, vidrio, etc.)?",
            opciones: { "Sí": 100, "Más o menos": 50, "No": 0 },
            id: "basura"
        },
        {
            texto: "¿Qué haces con tus juguetes rotos o que ya no usas?",
            opciones: { "Los arreglo o regalo": 100, "Los guardo sin usarlos": 50, "Los tiro a la basura": 0 },
            id: "segundaVida"
        },
        {
            texto: "¿Llevas tu desayuno o almuerzo en recipientes reutilizables o en bolsas de plástico?",
            opciones: { "Reutilizables": 100, "Bolsas de plástico": 0 },
            id: "segundaVida"
        },
        {
            texto: "Cuando juegas en el parque o en la playa, ¿recoges tu basura antes de irte?",
            opciones: { "Siempre": 100, "A veces": 50, "Nunca": 0 },
            id: "basura"
        },
        {
            texto: "¿Qué haces con las botellas de agua que usas en el colegio?",
            opciones: { "Las llevo a casa para reutilizarlas": 100, "Las tiro en la basura de reciclaje": 50, "Las dejo en el colegio": 0 },
            id: "segundaVida"
        },
        {
            texto: "Si ves un papel en el suelo de la escuela o parque, ¿qué haces?",
            opciones: { "Lo recojo y tiro a la basura": 100, "No hago nada": 0 },
            id: "basura"
        },
        {
            texto: "Cuando usas agua para jugar o lavar cosas, ¿la dejas correr todo el tiempo?",
            opciones: { "No, cierro el grifo cuando no la uso": 100, "Sí": 0 },
            id: "agua"
        },
        {
            texto: "¿Cuántas veces reutilizas una botella de plástico antes de desecharla?",
            opciones: { "Muchas veces": 100, "Una o dos veces": 50, "Ninguna": 0 },
            id: "agua"
        }
    ];

    // Seleccionar aleatoriamente 4 preguntas
    const preguntasSeleccionadas = [];
    while (preguntasSeleccionadas.length < 4) {
        const randomIndex = Math.floor(Math.random() * preguntas.length);
        if (!preguntasSeleccionadas.includes(preguntas[randomIndex])) {
            preguntasSeleccionadas.push(preguntas[randomIndex]);
        }
    }

    // Estado actual
    let preguntaActual = 0;
    const respuestas = {};

    // Renderizar pregunta
    function mostrarPregunta() {
        const pregunta = preguntasSeleccionadas[preguntaActual];
        const preguntaDiv = document.getElementById("pregunta");
        preguntaDiv.innerHTML = `
            <label>${pregunta.texto}</label>
            ${Object.keys(pregunta.opciones).map(opcion => `
                <input type="radio" name="${pregunta.id}" value="${pregunta.opciones[opcion]}" ${respuestas[pregunta.id] === `${pregunta.opciones[opcion]}` ? "checked" : ""}> ${opcion}
            `).join("<br>")}
        `;

        // Mostrar/Ocultar botones
        document.getElementById("prev").style.display = preguntaActual === 0 ? "none" : "inline-block";
        document.getElementById("next").style.display = preguntaActual === preguntasSeleccionadas.length - 1 ? "none" : "inline-block";
        document.getElementById("submit").style.display = preguntaActual === preguntasSeleccionadas.length - 1 ? "inline-block" : "none";
    }

    // Navegación entre preguntas
    document.getElementById("prev").addEventListener("click", function() {
        guardarRespuesta();
        preguntaActual--;
        mostrarPregunta();
    });

    document.getElementById("next").addEventListener("click", function() {
        guardarRespuesta();
        preguntaActual++;
        mostrarPregunta();
    });

    // Guardar respuesta seleccionada
    function guardarRespuesta() {
        const pregunta = preguntasSeleccionadas[preguntaActual];
        const seleccion = document.querySelector(`input[name="${pregunta.id}"]:checked`);
        if (seleccion) {
            respuestas[pregunta.id] = seleccion.value;
        }
    }

    // Procesar formulario al enviar
    document.getElementById("sostenibilidadForm").addEventListener("submit", function(event) {
        event.preventDefault();
        guardarRespuesta();

        let total = 0;
        let respondidas = 0;
        for (let respuesta in respuestas) {
            total += parseInt(respuestas[respuesta]);
            respondidas++;
        }

        const media = total / respondidas;
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = `<p>¡Tu puntuación de sostenibilidad es <span>${media}%</span>!</p>`;
    });

    // Inicializar formulario
    mostrarPregunta();
});