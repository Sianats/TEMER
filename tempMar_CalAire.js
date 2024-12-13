// Reemplaza 'tu_api_key_aqui' con tu clave API de AEMET
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaWxvcG5hdkB0ZWxlY28udXB2LmVzIiwianRpIjoiYzQ4YzM4MjgtMDU1Yi00ZTkyLWJiZGItMDE3NjdhOGU0YmFmIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE3MzMwNTg1MTAsInVzZXJJZCI6ImM0OGMzODI4LTA1NWItNGU5Mi1iYmRiLTAxNzY3YThlNGJhZiIsInJvbGUiOiIifQ.C66DD-Al4CBkRpgjgfpmOLIkW5Ded457IVudwTnTnZA';

// Elementos donde se mostrará la información
const temperaturaAguaEl = document.getElementById('temperatura-agua');
const imagenElemento = document.getElementById('imagen-satelite');


// Función para obtener la imagen de temperatura del agua
async function obtenerImagenTemperatura() {
    try {
        const respuesta = await fetch(`https://opendata.aemet.es/opendata/api/satelites/producto/sst/?api_key=${API_KEY}`);
        if (!respuesta.ok) {
            throw new Error(`Error al obtener la URL de la imagen: ${respuesta.status}`);
        }
        const datos = await respuesta.json();

        // Verificar que se obtuvo la URL de la imagen
        const urlImagen = datos.datos;
        if (!urlImagen) {
            throw new Error("No se recibió una URL válida para la imagen.");
        }

        // Establecer la URL de la imagen en el elemento del DOM
        imagenElemento.src = urlImagen;
    } catch (error) {
        console.error("Error al obtener la imagen:", error);
        temperaturaAguaEl.textContent = 'Error de conexión. Por favor, intenta más tarde.';
    }
}


// Llamar a las funciones para obtener datos al cargar la página
obtenerImagenTemperatura();

