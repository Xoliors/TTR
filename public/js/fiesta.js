let intentos = 0;
const maxIntentos = 5;
const respuestasCorrectas = {
    ratones: 10, // Modifica el número de ratones que deben quedar
    caballos: 5, // Modifica el número de caballos que deben quedar
    dragones: 12  // Modifica el número de dragones que deben quedar
};

document.getElementById('verificarBtn').addEventListener('click', function() {
    if (intentos >= maxIntentos) {
        alert("¡Has alcanzado el número máximo de intentos!");
        return;
    }

    intentos++;

    const respuestaRatones = parseInt(document.getElementById('respuestaRatones').value);
    const respuestaCaballos = parseInt(document.getElementById('respuestaCaballos').value);
    const respuestaDragones = parseInt(document.getElementById('respuestaDragones').value);

    if (isNaN(respuestaRatones) || isNaN(respuestaCaballos) || isNaN(respuestaDragones)) {
        alert("Por favor, ingresa solo números en las respuestas.");
        return;
    }

    let respuestasCorrectasCount = 0;
let mensaje = `<span style="color: black;">Intento #${intentos}:</span> `;


    // Verificar respuestas
    if (respuestaRatones === respuestasCorrectas.ratones) {
        respuestasCorrectasCount++;
        mensaje += `<br><span style="color:green;">Ratones: ✓ (Correcto)</span>`;
    } else {
        mensaje += `<br><span style="color:red;">Ratones: ✘ (Incorrecto)</span>`;
    }

    if (respuestaCaballos === respuestasCorrectas.caballos) {
        respuestasCorrectasCount++;
        mensaje += `<br><span style="color:green;">Caballos: ✓ (Correcto)</span>`;
    } else {
        mensaje += `<br><span style="color:red;">Caballos: ✘ (Incorrecto)</span>`;
    }

    if (respuestaDragones === respuestasCorrectas.dragones) {
        respuestasCorrectasCount++;
        mensaje += `<br><span style="color:green;">Dragones: ✓ (Correcto)</span>`;
    } else {
        mensaje += `<br><span style="color:red;">Dragones: ✘ (Incorrecto)</span>`;
    }

    let calificacion = (respuestasCorrectasCount / 3) * 10;

    if (respuestasCorrectasCount === 3) {
        mensaje +=`<br><p style="color:black;"> ¡Felicidades! Respondiste todas correctamente.</p>`;
    } else if (respuestasCorrectasCount === 2) {
        mensaje += `<br><p style="color:black;">¡Casi! Dos respuestas correctas.</p>`;
    } else if (respuestasCorrectasCount === 1) {
        mensaje += `<br><p style="color:black;">Tienes una respuesta correcta. ¡Intenta de nuevo! </p>`;
    } else {
        mensaje +=  `<br><p style="color:black;">Ninguna respuesta es correcta. ¡Intenta nuevamente!</p>`;
    }

    document.getElementById('resultado').innerHTML = mensaje;
    document.getElementById('calificacion').innerText = `Calificación: ${calificacion.toFixed(1)}/10`;

    if (intentos < maxIntentos) {
        document.getElementById('intentarOtro').style.display = "block";
    }

    if (intentos === maxIntentos) {
        document.getElementById('verificarBtn').disabled = true;
    }
});

document.getElementById('intentarBtn').addEventListener('click', function() {
    document.getElementById('respuestaRatones').value = '';
    document.getElementById('respuestaCaballos').value = '';
    document.getElementById('respuestaDragones').value = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('calificacion').innerText = '';
    document.getElementById('intentarOtro').style.display = "none";
    document.getElementById('verificarBtn').disabled = false;
});