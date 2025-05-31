let globalAttempts = parseInt(localStorage.getItem('globalAttempts')) || 0;
const maxIntentos = 5;
const respuestasCorrectas = {
  ratones: 10,
  caballos: 5,
  dragones: 12
};

const id_ejercicio = 11;
const ruta_guardar = '/ejercicios_numeros/fiesta/guardar-calificacion';

const today = new Date().toLocaleDateString();
const lastAttemptDate = localStorage.getItem('lastAttemptDate');

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem('globalAttempts', globalAttempts);
  localStorage.setItem('lastAttemptDate', today);
}

document.getElementById('verificarBtn').addEventListener('click', function () {
  if (globalAttempts >= maxIntentos) {
    Swal.fire({
      icon: 'error',
      title: '¡Límite alcanzado!',
      text: 'Has alcanzado el número máximo de intentos para hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const respuestaRatones = parseInt(document.getElementById('respuestaRatones').value);
  const respuestaCaballos = parseInt(document.getElementById('respuestaCaballos').value);
  const respuestaDragones = parseInt(document.getElementById('respuestaDragones').value);

  if (isNaN(respuestaRatones) || isNaN(respuestaCaballos) || isNaN(respuestaDragones)) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos',
      text: 'Por favor, ingresa solo números en las respuestas.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  globalAttempts++;
  localStorage.setItem('globalAttempts', globalAttempts);

  let correctos = 0;
  let mensaje = `<span style="color: black;">Intento #${globalAttempts}:</span>`;

  if (respuestaRatones === respuestasCorrectas.ratones) {
    correctos++;
    mensaje += `<br><span style="color:green;">Ratones: ✓ (Correcto)</span>`;
  } else {
    mensaje += `<br><span style="color:red;">Ratones: ✘ (Incorrecto)</span>`;
  }

  if (respuestaCaballos === respuestasCorrectas.caballos) {
    correctos++;
    mensaje += `<br><span style="color:green;">Caballos: ✓ (Correcto)</span>`;
  } else {
    mensaje += `<br><span style="color:red;">Caballos: ✘ (Incorrecto)</span>`;
  }

  if (respuestaDragones === respuestasCorrectas.dragones) {
    correctos++;
    mensaje += `<br><span style="color:green;">Dragones: ✓ (Correcto)</span>`;
  } else {
    mensaje += `<br><span style="color:red;">Dragones: ✘ (Incorrecto)</span>`;
  }

  const calificacion = (correctos / 3) * 10;

  if (correctos === 3) {
    mensaje += `<br><p style="color:black;">¡Felicidades! Respondiste todas correctamente.</p>`;
  } else if (correctos === 2) {
    mensaje += `<br><p style="color:black;">¡Casi! Dos respuestas correctas.</p>`;
  } else if (correctos === 1) {
    mensaje += `<br><p style="color:black;">Tienes una respuesta correcta. ¡Intenta de nuevo!</p>`;
  } else {
    mensaje += `<br><p style="color:black;">Ninguna respuesta es correcta. ¡Intenta nuevamente!</p>`;
  }

  document.getElementById('resultado').innerHTML = mensaje;
  document.getElementById('calificacion').innerText = `Calificación: ${calificacion.toFixed(1)}/10`;

  document.getElementById('intentarOtro').style.display = "block";

  if (globalAttempts === maxIntentos) {
    document.getElementById('verificarBtn').disabled = true;
  }

  // Enviar calificación al servidor
  const fecha = new Date().toISOString().split('T')[0];

  fetch(ruta_guardar, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: correctos,
      id_ejercicio,
      fecha
    })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Error al guardar la calificación.");
      }
      return res.json();
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${correctos}/10.`,
        confirmButtonText: 'Aceptar'
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'info',
        title: 'Límite de intentos alcanzado',
        text: 'No puedes intentar de nuevo hasta mañana.',
        confirmButtonText: 'Aceptar'
      });
    });
});

document.getElementById('intentarBtn').addEventListener('click', function () {
  document.getElementById('respuestaRatones').value = '';
  document.getElementById('respuestaCaballos').value = '';
  document.getElementById('respuestaDragones').value = '';
  document.getElementById('resultado').innerHTML = '';
  document.getElementById('calificacion').innerText = '';
  document.getElementById('intentarOtro').style.display = "none";
  document.getElementById('verificarBtn').disabled = false;
});
