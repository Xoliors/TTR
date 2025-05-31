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
