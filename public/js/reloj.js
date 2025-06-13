const id_ejercicio = 34;
const today = new Date().toISOString().split("T")[0];
const lastAttemptKey = `lastAttemptDate_${id_ejercicio}`;
const globalAttemptsKey = `globalAttempts_${id_ejercicio}`;
const verificarBtn = document.getElementById('verificar');
const reiniciarBtn = document.getElementById('reiniciar');
const resultadoDiv = document.getElementById('resultado');
const attemptsDiv = document.getElementById('attempts');
const botones = document.querySelectorAll('.reloj input');

// Obtener valores del localStorage
let lastAttemptDate = localStorage.getItem(lastAttemptKey) || "";
let globalAttempts = parseInt(localStorage.getItem(globalAttemptsKey)) || 0;

// Reiniciar intentos si es un nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(lastAttemptKey, today);
  localStorage.setItem(globalAttemptsKey, globalAttempts);
}

// Actualizar visualmente los intentos
function actualizarContador() {
  attemptsDiv.textContent = `Intentos hoy: ${globalAttempts}`;
}
actualizarContador();

function verificarRespuestas() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  let correctas = 0;
  botones.forEach((input) => {
    const respuesta = input.value.trim();
    const respuestaCorrecta = input.dataset.respuesta;

    if (respuesta === respuestaCorrecta) {
      input.style.borderColor = 'green';
      correctas++;
    } else {
      input.style.borderColor = 'red';
    }
  });

  const calificacion = (correctas / botones.length) * 10;
  resultadoDiv.innerHTML = correctas === botones.length
    ? '¡Todas las respuestas son correctas!'
    : `Tuviste ${correctas} respuestas correctas de ${botones.length}.`;

  const califTexto = document.createElement('p');
  califTexto.textContent = `Calificación: ${calificacion.toFixed(1)} / 10`;
  resultadoDiv.appendChild(califTexto);

  globalAttempts++;
  localStorage.setItem(globalAttemptsKey, globalAttempts);
  actualizarContador();

  // Enviar resultados al servidor
  const fecha = today;
  fetch('/ejercicios_tercero/reloj/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion.toFixed(1),
      id_ejercicio,
      fecha
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject(res))
  .then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${calificacion.toFixed(1)}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(calificacion.toFixed(1));
    });
  })
  .catch(() => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un problema al guardar la calificación.',
      confirmButtonText: 'Aceptar'
    });
  });

  reiniciarBtn.style.display = 'block';
}

function reiniciar() {
  botones.forEach((input) => {
    input.value = '';
    input.style.borderColor = '#00796b';
  });
  resultadoDiv.textContent = '';
  reiniciarBtn.style.display = 'none';
}

// Asignar eventos
verificarBtn.addEventListener('click', verificarRespuestas);
reiniciarBtn.addEventListener('click', reiniciar);

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

  if (calificacion >= 0 && calificacion < 6) {
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