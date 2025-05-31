const MAX_INTENTOS = 5;
const ID_EJERCICIO = 8;
const API_URL = "/ejercicios_numeros/picnic/guardar-calificacion";

const respuestasCorrectas = {
    conejitos: 17,
    vacas: 15,
    perros: 18
};

const today = new Date().toISOString().split('T')[0];
let intentos = parseInt(localStorage.getItem("picnic_intentos")) || 0;
let lastAttemptDate = localStorage.getItem("picnic_fecha") || today;

if (lastAttemptDate !== today) {
    intentos = 0;
    localStorage.setItem("picnic_intentos", intentos);
    localStorage.setItem("picnic_fecha", today);
}

const verificarBtn = document.getElementById('verificarBtn');
const intentarOtroBtn = document.getElementById('intentarBtn');
const intentarOtroDiv = document.getElementById('intentarOtro');

function actualizarEstadoIntentos() {
    if (intentos >= MAX_INTENTOS) {
        verificarBtn.disabled = true;
        intentarOtroDiv.style.display = 'none';
        Swal.fire({
            icon: 'warning',
            title: 'Límite de intentos',
            text: "¡Has alcanzado el número máximo de intentos para hoy!"
        });
    } else {
        verificarBtn.disabled = false;
    }
}

verificarBtn.addEventListener('click', function() {
    if (intentos >= MAX_INTENTOS) {
        Swal.fire({
            icon: 'warning',
            title: 'Límite de intentos',
            text: "¡Has alcanzado el número máximo de intentos!"
        });
        return;
    }

    const respuestaConejitos = parseInt(document.getElementById('respuestaConejitos').value);
    const respuestaVacas = parseInt(document.getElementById('respuestaVacas').value);
    const respuestaPerros = parseInt(document.getElementById('respuestaPerros').value);

    if (isNaN(respuestaConejitos) || isNaN(respuestaVacas) || isNaN(respuestaPerros)) {
        Swal.fire({
            icon: 'error',
            title: 'Entrada inválida',
            text: "Por favor, ingresa solo números en las respuestas."
        });
        return;
    }

    let respuestasCorrectasCount = 0;
    if (respuestaConejitos === respuestasCorrectas.conejitos) respuestasCorrectasCount++;
    if (respuestaVacas === respuestasCorrectas.vacas) respuestasCorrectasCount++;
    if (respuestaPerros === respuestasCorrectas.perros) respuestasCorrectasCount++;

    let calificacion = 0;
    if (respuestasCorrectasCount === 3) {
        calificacion = 10;
    } else if (respuestasCorrectasCount === 2) {
        calificacion = 7;
    } else if (respuestasCorrectasCount === 1) {
        calificacion = 5;
    } else {
        calificacion = 0;
    }

    intentos++;
    localStorage.setItem("picnic_intentos", intentos);
    localStorage.setItem("picnic_fecha", today);

    let mensaje = "Intento #" + intentos + ": ";
    const resultadoEl = document.getElementById('resultado');
    const calificacionEl = document.getElementById('calificacion');

    // Determinar mensaje y aplicar estilos
    if (respuestasCorrectasCount === 3) {
        mensaje += "¡Felicidades! Respondiste todas correctamente.";
        resultadoEl.style.backgroundColor = "";  // sin color especial
        resultadoEl.style.color = "blue";
    } else if (respuestasCorrectasCount === 2) {
        mensaje += "¡Casi! Dos respuestas correctas.";
        resultadoEl.style.backgroundColor = "yellow";
        resultadoEl.style.color = "black";
    } else if (respuestasCorrectasCount === 1) {
        mensaje += "Tienes una respuesta correcta. ¡Intenta de nuevo!";
        resultadoEl.style.backgroundColor = "orange";
        resultadoEl.style.color = "white";
    } else {
        mensaje += "Ninguna respuesta es correcta. ¡Intenta nuevamente!";
        resultadoEl.style.backgroundColor = "red";
        resultadoEl.style.color = "orange";
    }

    // Mostrar mensaje y calificación
    resultadoEl.innerText = mensaje;
    calificacionEl.innerText = `Calificación: ${calificacion}/10`;
    calificacionEl.style.color = "blue";

    if (intentos < MAX_INTENTOS) {
        intentarOtroDiv.style.display = "block";
    } else {
        intentarOtroDiv.style.display = "none";
    }

    verificarBtn.disabled = true;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            intento: intentos,
            calificacion,
            id_ejercicio: ID_EJERCICIO,
            fecha: today
        }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || 'Error al guardar la calificación');
            });
        }
        return response.json();
    })
    .then(() => {
        Swal.fire({
            icon: 'success',
            title: '¡Calificación registrada!',
            text: `Tu calificación fue de ${calificacion}/10.`,
            confirmButtonText: 'Aceptar'
        });
    })
    .catch(error => {
        console.error('Error:', error.message);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
            confirmButtonText: 'Aceptar'
        });
    });
});

intentarOtroBtn.addEventListener('click', function() {
    document.getElementById('respuestaConejitos').value = '';
    document.getElementById('respuestaVacas').value = '';
    document.getElementById('respuestaPerros').value = '';
    document.getElementById('resultado').innerText = '';
    document.getElementById('calificacion').innerText = '';
    intentarOtroDiv.style.display = "none";

    if (intentos < MAX_INTENTOS) {
        verificarBtn.disabled = false;
    } else {
        verificarBtn.disabled = true;
        Swal.fire({
            icon: 'warning',
            title: 'Límite de intentos',
            text: "¡Has alcanzado el número máximo de intentos para hoy!"
        });
    }
});

actualizarEstadoIntentos();
