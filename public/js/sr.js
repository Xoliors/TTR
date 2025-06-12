const data = [
  { question: "12 + 25", answer: 37, options: [100, 33, 75, 90, 5, 12, 37, 45, 60, 28] },
  { question: "45 - 12", answer: 33, options: [28, 40, 12, 33, 51, 7, 65, 30, 15, 118] },
  { question: "50 + 23", answer: 73, options: [70, 73, 80, 5, 101, 91, 10, 63, 22, 35] },
  { question: "80 - 25", answer: 55, options: [60, 81, 52, 40, 115, 15, 27, 78, 55, 3] },
  { question: "34 + 45", answer: 79, options: [47, 76, 80, 18, 66, 29, 101, 79, 92, 10] },
  { question: "90 - 45", answer: 45, options: [2, 35, 40, 50, 90, 10, 72, 25, 63, 45] },
  { question: "60 + 30", answer: 90, options: [18, 80, 85, 1, 90, 120, 75, 44, 39, 70] },
  { question: "100 - 20", answer: 80, options: [70, 85, 41, 13, 99, 55, 60, 80, 5, 24] },
  { question: "58 + 42", answer: 100, options: [98, 100, 96, 45, 30, 17, 89, 67, 20, 54] },
  { question: "110 - 25", answer: 85, options: [90, 65, 80, 27, 34, 85, 11, 44, 10, 112] }
];

const maxAttempts = 5;
const id_ejercicio = 13;
const urlGuardar = '/ejercicios_numeros/syr/guardar-calificacion';

let globalAttempts = 0;
let lastAttemptDate = null;

function getTodayDateStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // yyyy-mm-dd
}

function loadAttempts() {
  const storedDate = localStorage.getItem('lastAttemptDate');
  const storedAttempts = parseInt(localStorage.getItem('globalAttempts')) || 0;
  const today = getTodayDateStr();

  if (storedDate !== today) {
    globalAttempts = 0;
    lastAttemptDate = today;
    localStorage.setItem('lastAttemptDate', today);
    localStorage.setItem('globalAttempts', '0');
  } else {
    globalAttempts = storedAttempts;
    lastAttemptDate = storedDate;
  }
}

function saveAttempts() {
  localStorage.setItem('globalAttempts', globalAttempts.toString());
  localStorage.setItem('lastAttemptDate', lastAttemptDate);
}

function actualizarMensaje(calificacion = '') {
  let msgBox = document.getElementById('mensajeIntentosCalificacion');
  if (!msgBox) {
    msgBox = document.createElement('div');
    msgBox.id = 'mensajeIntentosCalificacion';
    msgBox.style.marginTop = '10px';
    msgBox.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    msgBox.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    msgBox.style.borderRadius = '8px';
    msgBox.style.padding = '8px 12px';
    msgBox.style.color = 'white';
    msgBox.style.fontWeight = '500';
    msgBox.style.fontSize = '14px';
    msgBox.style.textAlign = 'center';
    msgBox.style.width = 'fit-content';
    msgBox.style.margin = '10px auto 0 auto';

    const verificarBtn = document.getElementById('submit');
    verificarBtn.insertAdjacentElement('afterend', msgBox);
  }
  msgBox.innerHTML = `Intento ${globalAttempts} de ${maxAttempts}` + (calificacion !== '' ? ` | Calificación: ${calificacion}/10` : '');
}

// --- Manejo del ejercicio y lógica ---

function createExercises() {
  const container = document.getElementById("exercises");
  container.innerHTML = "";
  data.forEach((item, index) => {
    const exercise = document.createElement("div");
    exercise.className = "exercise";
    exercise.dataset.answer = item.answer;

    exercise.innerHTML = `
      <div class="question">${item.question} =</div>
      <div class="drop-container">
        <div class="drop-zone" data-index="${index}"></div>
        <div class="result-icon" id="result-${index}"></div>
      </div>
      <div class="choices">
        ${item.options.map(opt => `<div class="draggable" draggable="true" data-value="${opt}">${opt}</div>`).join('')}
      </div>
    `;

    container.appendChild(exercise);
  });
  enableDragDrop();
}

function enableDragDrop() {
  const draggables = document.querySelectorAll(".draggable");
  const dropZones = document.querySelectorAll(".drop-zone");

  draggables.forEach(el => {
    el.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", e.target.dataset.value);
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener("dragover", e => e.preventDefault());
    zone.addEventListener("drop", e => {
      e.preventDefault();
      const value = e.dataTransfer.getData("text");
      zone.textContent = value;
      zone.dataset.value = value;
    });
  });
}

async function guardarCalificacion(intento, calificacion, fecha) {
  try {
    const response = await fetch(urlGuardar, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intento,
        calificacion,
        id_ejercicio,
        fecha
      }),
    });
    if (!response.ok) {
      throw new Error('Error al guardar la calificación');
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar la calificación. Intenta más tarde.',
      confirmButtonText: 'Aceptar'
    });
  }
}

function reiniciarEjercicios() {
  createExercises();
  document.getElementById("score").textContent = "";
  document.getElementById("retry").style.display = "none";
  document.getElementById("submit").disabled = false;
  actualizarMensaje();
}

// Evento para verificar respuestas
document.getElementById("submit").addEventListener("click", async () => {
  loadAttempts();

  if (globalAttempts >= maxAttempts) {
    Swal.fire({
      icon: 'warning',
      title: 'Intentos agotados',
      text: `Ya has utilizado los ${maxAttempts} intentos disponibles para hoy.`,
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const dropZones = document.querySelectorAll(".drop-zone");
  let correct = 0;

  dropZones.forEach((zone, index) => {
    const expected = data[index].answer;
    const resultIcon = document.getElementById(`result-${index}`);
    if (Number(zone.dataset.value) === expected) {
      correct++;
      resultIcon.textContent = "✅";
      resultIcon.className = "result-icon correct";
    } else {
      resultIcon.textContent = "❌";
      resultIcon.className = "result-icon incorrect";
    }
  });

  const score = Math.round((correct / data.length) * 10);
  document.getElementById("score").textContent = `Tu calificación: ${score}/10`;

  globalAttempts++;
  lastAttemptDate = getTodayDateStr();
  saveAttempts();

  actualizarMensaje(score);

  await guardarCalificacion(globalAttempts, score, lastAttemptDate);

  if (score === 10 || globalAttempts >= maxAttempts) {
    document.getElementById("submit").disabled = true;
    document.getElementById("retry").style.display = "none";

    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${score}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(score.toFixed(1));
    });

  } else {
    // Mostrar botón reintentar solo si no agotó intentos y no sacó 10
    document.getElementById("retry").style.display = "inline-block";
  }
});

// Evento botón reintentar
document.getElementById("retry").addEventListener("click", () => {
  reiniciarEjercicios();
});

// Inicializamos y cargamos intentos previos
loadAttempts();
createExercises();
actualizarMensaje();
document.getElementById("retry").style.display = "none";

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
  } else if (calificacion >= 1 && calificacion <= 5) {
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
