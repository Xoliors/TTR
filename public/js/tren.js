const MAX_ATTEMPTS = 5;
let globalAttempts = Number(localStorage.getItem('globalAttemptsTren'));
if (isNaN(globalAttempts)) globalAttempts = 0;

let correctAnswers = 0;
const exercises = [];

// Genera una serie numérica con un paso aleatorio
function generateSeries(step) {
  let start = Math.floor(Math.random() * 10) + 1;
  let series = [start];
  let missingIndex = Math.floor(Math.random() * 4);
  for (let i = 1; series[i - 1] + step <= 120 && i < 6; i++) {
    series.push(series[i - 1] + step);
  }
  const correctNumber = series[missingIndex];
  series[missingIndex] = '___';
  return { series, correctNumber, missingIndex };
}

// Genera 8 ejercicios
function generateExercises() {
  const exercisesContainer = document.getElementById("exercisesContainer");
  exercisesContainer.innerHTML = '';
  exercises.length = 0;

  for (let i = 0; i < 8; i++) {
    let step = [2, 5, 10][Math.floor(Math.random() * 3)];
    const { series, correctNumber, missingIndex } = generateSeries(step);
    exercises.push({ series, correctNumber, missingIndex });

    exercisesContainer.innerHTML += `
      <div class="exercise">
        <p class="sd"><strong>Ejercicio ${i + 1}:</strong> Completa la serie:</p>
        <p class="sm">${series.join(' → ')}</p>
        <input class="tr" type="text" id="answer${i}" placeholder="Escribe el número que falta" ${globalAttempts >= MAX_ATTEMPTS ? "disabled" : ""}>
      </div>
    `;
  }

  document.getElementById("retryBtn").style.display = 'none';
  document.getElementById("resultText").textContent = '';

  if (globalAttempts >= MAX_ATTEMPTS) {
    Swal.fire({
      icon: 'warning',
      title: 'Límite de intentos alcanzado',
      text: 'Ya no puedes realizar más intentos.',
      confirmButtonText: 'Aceptar'
    });
  }
}

// Verifica las respuestas del alumno
function checkAnswers() {
  if (globalAttempts >= MAX_ATTEMPTS) return;

  correctAnswers = 0;

  for (let i = 0; i < 8; i++) {
    const answer = document.getElementById(`answer${i}`).value.trim();
    const correctNumber = exercises[i].correctNumber;

    if (parseInt(answer) === correctNumber) {
      correctAnswers++;
    }
  }

  let score = Math.round((correctAnswers / 8) * 10);
  globalAttempts++;
  localStorage.setItem('globalAttemptsTren', globalAttempts);

  document.getElementById("resultText").innerHTML = `
    <strong>Resultado del intento ${globalAttempts}:</strong><br>
    Respuestas correctas: ${correctAnswers}/8<br>
    Calificación del intento: <strong>${score}/10</strong>
  `;

  // Enviar calificación al servidor
  const id_ejercicio = 5;
  const fecha = new Date().toISOString().split('T')[0];

  fetch('/ejercicios_numeros/tren/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: score,
      id_ejercicio,
      fecha
    })
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
      text: `Tu calificación fue de ${score}/10.`,
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

  if (globalAttempts < MAX_ATTEMPTS) {
    document.getElementById("retryBtn").style.display = 'inline-block';
  } else {
    document.getElementById("retryBtn").style.display = 'none';
    Swal.fire({
      icon: 'info',
      title: 'Has alcanzado el límite de intentos',
      text: 'Ya no puedes volver a intentarlo.',
      confirmButtonText: 'Aceptar'
    });
    disableInputs();
    localStorage.removeItem('globalAttemptsTren');
  }
}

function disableInputs() {
  for (let i = 0; i < 8; i++) {
    const input = document.getElementById(`answer${i}`);
    if (input) input.disabled = true;
  }
}

function retry() {
  if (globalAttempts < MAX_ATTEMPTS) {
    generateExercises();
  }
}

// Inicializar ejercicio
generateExercises();