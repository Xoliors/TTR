const id_ejercicio = 20;
const maxIntentos = 5;
const today = new Date().toISOString().split("T")[0];
const lastAttemptDateKey = `lastAttemptDate_${id_ejercicio}`;
const globalAttemptsKey = `globalAttempts_${id_ejercicio}`;

let lastAttemptDate = localStorage.getItem(lastAttemptDateKey) || "";
let globalAttempts = parseInt(localStorage.getItem(globalAttemptsKey)) || 0;

// Reiniciar contador si es un nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(lastAttemptDateKey, today);
  localStorage.setItem(globalAttemptsKey, globalAttempts);
}

function checkAnswers() {
  if (globalAttempts >= maxIntentos) {
    Swal.fire({
      icon: 'error',
      title: 'Límite de intentos alcanzado',
      text: 'Has alcanzado el máximo de 5 intentos para hoy. Intenta de nuevo mañana.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const buildingAnswer = document.getElementById('building').value;
  const personAnswer = document.getElementById('person').value;
  const caterpillarAnswer = document.getElementById('caterpillar').value;
  const treeAnswer = document.getElementById('tree').value;
  const flagAnswer = document.getElementById('flag').value;

  const correctAnswers = ['2', '1', '1', '2', '2'];

  let score = 0;
  const totalQuestions = 5;

  if (buildingAnswer === correctAnswers[0]) score++;
  if (personAnswer === correctAnswers[1]) score++;
  if (caterpillarAnswer === correctAnswers[2]) score++;
  if (treeAnswer === correctAnswers[3]) score++;
  if (flagAnswer === correctAnswers[4]) score++;

  const calificacion = ((score / totalQuestions) * 10).toFixed(2);

  globalAttempts++;
  localStorage.setItem(globalAttemptsKey, globalAttempts);
  localStorage.setItem(lastAttemptDateKey, today);

  // Enviar calificación al backend
  fetch('/ejercicios_numeros/co/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion,
      id_ejercicio,
      fecha: today
    })
  })
  .then(response => response.json())
  .then(data => {
    if (globalAttempts >= maxIntentos) {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${calificacion}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        mostrarBotonReintentar();
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Intento ${globalAttempts} de ${maxIntentos}. Tu calificación fue de ${calificacion}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        mostrarMensajeMotivacional(calificacion);
      });
    }
  })
  .catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Error al registrar la calificación',
      text: 'Por favor intenta nuevamente.',
      confirmButtonText: 'Aceptar'
    });
  });
}

function mostrarBotonReintentar() {
  let btn = document.getElementById('btnReintentar');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'btnReintentar';
    btn.innerText = 'Intentar de nuevo';
    btn.style.marginTop = '10px';
    btn.onclick = reiniciarEjercicios;
    document.body.appendChild(btn);
  }
  btn.style.display = 'inline-block';
}

function reiniciarEjercicios() {
  // Reiniciar intentos y fecha para permitir nuevos intentos hoy
  globalAttempts = 0;
  localStorage.setItem(globalAttemptsKey, globalAttempts);
  localStorage.setItem(lastAttemptDateKey, today);

  // Ocultar botón reintentar
  const btn = document.getElementById('btnReintentar');
  if (btn) btn.style.display = 'none';

  // Limpiar campos y resultado
  ['building', 'person', 'caterpillar', 'tree', 'flag'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = '';
  });
  const resultDiv = document.getElementById('result');
  if (resultDiv) resultDiv.innerText = '';

  Swal.fire({
    icon: 'info',
    title: 'Ejercicio reiniciado',
    text: 'Puedes intentar el ejercicio de nuevo.',
    confirmButtonText: 'Aceptar'
  });
}

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

  if (calificacion >= 1 && calificacion <= 5) {
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
