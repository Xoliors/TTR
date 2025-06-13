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
      }).then(() => {
        mostrarMensajeMotivacional(correctos.toFixed(1));
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

function mostrarMensajeMotivacional(calificacionRaw) {
  let calificacion = Number(calificacionRaw);
  let mensaje = "";

  const bajo = [
    "Te hace falta más práctica, ¡no te desanimes!",
    "Aún hay áreas que mejorar, sigue esforzándote.",
    "Estás comenzando, cada error es una oportunidad de aprender.",
    "No fue tu mejor intento, pero puedes mejorar mucho más.",
    "Sigue practicando, estás en el camino del aprendizaje.",
    "Con dedicación lo lograrás, ¡ánimo!",
    "Todavía no lo dominas, pero vas por buen camino.",
    "Este resultado es una base para seguir creciendo.",
    "Requiere más atención y práctica, no te rindas.",
    "Vuelve a intentarlo, cada paso cuenta."
  ];

  const medio = [
    "¡Estuviste cerca! Solo falta un poco más de práctica.",
    "Buen trabajo, sigue así y lo lograrás.",
    "¡Por poco! No te rindas, vas muy bien.",
    "Vas por buen camino, ¡ánimo!",
    "¡Casi lo consigues! Un poco más de esfuerzo y lo lograrás.",
    "Buen intento, no estás lejos del objetivo.",
    "Continúa así, tu esfuerzo está dando frutos.",
    "¡Sigue practicando! Estás muy cerca del 10.",
    "Buen desempeño, te falta poco para la perfección.",
    "¡Excelente progreso! No te detengas."
  ];

  const alto = [
    "¡Fabuloso! Estás haciendo un trabajo increíble.",
    "¡Lo lograste! Sigue así.",
    "¡Excelente resultado! Tu esfuerzo se nota.",
    "¡Perfecto! Se nota tu dedicación.",
    "¡Muy bien hecho! Continúa aprendiendo con entusiasmo.",
    "¡Genial! Estás dominando este tema.",
    "¡Brillante! Sigue manteniendo ese nivel.",
    "¡Orgulloso de tu progreso!",
    "¡Gran trabajo! Estás aprendiendo de forma excelente.",
    "¡Sigue así! El éxito es tuyo."
  ];

  const cero = [
  "Todos empezamos desde cero, lo importante es seguir intentando.",
  "No te preocupes, fallar es parte del proceso de aprender.",
  "Hoy no fue tu día, pero puedes hacerlo mucho mejor, sigue practicando.",
  "¡No te rindas! Cada error te acerca más al acierto.",
  "Es solo el comienzo, lo importante es que sigas aprendiendo.",
  "Los grandes logros comienzan con pequeños pasos, ¡inténtalo de nuevo!",
  "Aprender toma tiempo, lo lograrás con práctica.",
  "Un tropiezo no define tu camino. ¡Ánimo!",
  "A veces fallar nos enseña más que acertar. ¡Sigue adelante!",
  "Tener 0 hoy no significa que no puedas tener 10 mañana. ¡Confía en ti!"
];

  if (calificacion === 0) {
    mensaje = cero[Math.floor(Math.random() * cero.length)];
  } else if (calificacion >= 0 && calificacion < 6) {
    mensaje = bajo[Math.floor(Math.random() * bajo.length)];
  } else if (calificacion >= 6 && calificacion <= 8) {
    mensaje = medio[Math.floor(Math.random() * medio.length)];
  } else if (calificacion >= 9 && calificacion <= 10) {
    mensaje = alto[Math.floor(Math.random() * alto.length)];
  } else {
    mensaje = "Calificación no válida.";
  }

  Swal.fire({
    icon: 'info',
    title: 'Resultado',
    text: mensaje,
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false,   // ← No cerrar al hacer clic fuera
    allowEscapeKey: false       // ← No cerrar al presionar Esc
  });
}