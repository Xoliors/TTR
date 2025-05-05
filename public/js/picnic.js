
        let intentos = 0;
        const maxIntentos = 5;
        const respuestasCorrectas = {
            conejitos: 17,
            vacas: 15,
            perros: 18
        };

        document.getElementById('verificarBtn').addEventListener('click', function() {
            if (intentos >= maxIntentos) {
                alert("¡Has alcanzado el número máximo de intentos!");
                return;
            }

            intentos++;

            const respuestaConejitos = parseInt(document.getElementById('respuestaConejitos').value);
            const respuestaVacas = parseInt(document.getElementById('respuestaVacas').value);
            const respuestaPerros = parseInt(document.getElementById('respuestaPerros').value);

            if (isNaN(respuestaConejitos) || isNaN(respuestaVacas) || isNaN(respuestaPerros)) {
                alert("Por favor, ingresa solo números en las respuestas.");
                return;
            }

            let calificacion = 0;

let respuestasCorrectasCount = 0;

if (respuestaConejitos === respuestasCorrectas.conejitos) {
    respuestasCorrectasCount++;
}
if (respuestaVacas === respuestasCorrectas.vacas) {
    respuestasCorrectasCount++;
}
if (respuestaPerros === respuestasCorrectas.perros) {
    respuestasCorrectasCount++;
}

if (respuestasCorrectasCount === 3) {
    calificacion = 10; // Todas las respuestas son correctas
} else if (respuestasCorrectasCount === 2) {
    calificacion = 7; // Dos respuestas correctas
} else if (respuestasCorrectasCount === 1) {
    calificacion = 5; // Una respuesta correcta
} else {
    calificacion = 0; // Ninguna respuesta correcta
}

let mensaje = "Intento #" + intentos + ": ";

if (respuestasCorrectasCount === 3) {
    mensaje += "¡Felicidades! Respondiste todas correctamente.";
} else if (respuestasCorrectasCount === 2) {
    mensaje += "¡Casi! Dos respuestas correctas.";
} else if (respuestasCorrectasCount === 1) {
    mensaje += "Tienes una respuesta correcta. ¡Intenta de nuevo!";
} else {
    mensaje += "Ninguna respuesta es correcta. ¡Intenta nuevamente!";
}


            document.getElementById('resultado').innerText = mensaje;
            document.getElementById('calificacion').innerText = `Calificación: ${calificacion}/10`;

            if (intentos < maxIntentos) {
                document.getElementById('intentarOtro').style.display = "block";
            }

            if (intentos === maxIntentos) {
                document.getElementById('verificarBtn').disabled = true;
            }
        });

        document.getElementById('intentarBtn').addEventListener('click', function() {
            document.getElementById('respuestaConejitos').value = '';
            document.getElementById('respuestaVacas').value = '';
            document.getElementById('respuestaPerros').value = '';
            document.getElementById('resultado').innerText = '';
            document.getElementById('calificacion').innerText = '';
            document.getElementById('intentarOtro').style.display = "none";
            document.getElementById('verificarBtn').disabled = false;
        });
  