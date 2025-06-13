const id_ejercicio = 5;
const MAX_ATTEMPTS = 5;
const today = new Date().toISOString().split("T")[0];
const fecha = today;

// Inicialización desde localStorage
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Reiniciar intentos si la fecha cambió
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

// Mostrar intentos actuales
function updateIntentos() {
  document.getElementById("intentos").innerText = `Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;
}

let correctAnswers = 0;
const exercises = [];

function generateSeries(step) {
  let start = Math.floor(Math.random() * 3000) + 1;
  let series = [start];
  let missingIndex = Math.floor(Math.random() * 4);
  for (let i = 1; series[i - 1] + step <= 3000 && i < 6; i++) {
    series.push(series[i - 1] + step);
  }
  const correctNumber = series[missingIndex];
  series[missingIndex] = '___';
  return { series, correctNumber, missingIndex };
}

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
        <p class="sm"><strong>Ejercicio ${i + 1}:</strong> Completa la serie:</p>
        <p class="sm">${series.join(' → ')}</p>
        <input class="tr" type="text" id="answer${i}" placeholder="Escribe el número que falta">
      </div>
    `;
  }

  document.getElementById("retryBtn").style.display = 'none';
  document.getElementById("resultText").textContent = '';
  updateIntentos();
}

function checkAnswers() {
  if (globalAttempts >= MAX_ATTEMPTS) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  correctAnswers = 0;
  for (let i = 0; i < 8; i++) {
    const answer = document.getElementById(`answer${i}`).value.trim();
    const correctNumber = exercises[i].correctNumber;
    if (parseInt(answer) === correctNumber) {
      correctAnswers++;
    }
  }

  let score = Math.round((correctAnswers / 8) * 10);

  document.getElementById("resultText").innerHTML = `
    <strong>Resultado del intento ${globalAttempts}:</strong><br>
    Respuestas correctas: ${correctAnswers}/8<br>
    Calificación del intento: <strong>${score}/10</strong>
  `;
  updateIntentos();

  // Enviar datos al servidor
  fetch('/ejercicios_tercero/tren3/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: score,
      id_ejercicio,
      fecha
    })
  }).then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${score}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(score.toFixed(1));
    });
  });

  if (globalAttempts < MAX_ATTEMPTS) {
    document.getElementById("retryBtn").style.display = 'inline-block';
  } else {
    document.getElementById("retryBtn").style.display = 'none';
  }
}

function retry() {
  if (globalAttempts < MAX_ATTEMPTS) {
    generateExercises();
  }
}

// Inicializar
generateExercises();

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