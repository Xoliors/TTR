const data = [
  { question: "1025 + 2175", answer: 3200, options: [2220, 1230, 9215, 3200, 4240] },
  { question: "4000 - 1800", answer: 2200, options: [1170, 2200, 685, 3490, 875] },
  { question: "1850 + 2150", answer: 4000, options: [4000, 2350, 3360, 3370, 4330] },
  { question: "3500 - 850", answer: 2650, options: [1640, 2150, 3160, 2650, 2530] },
  { question: "1450 + 1950", answer: 3400, options: [2190, 740, 3510, 2320, 3400] },
  { question: "5000 - 1350", answer: 3650, options: [3650, 1170, 2175, 4180, 3185] },
  { question: "1780 + 2250", answer: 4030, options: [2190, 4030, 830, 4320, 3280] },
  { question: "4750 - 1250", answer: 3500, options: [2420, 2530, 3500, 3270, 2930] },
  { question: "2200 + 1600", answer: 3800, options: [3260, 3270, 3280, 3800, 3250] },
  { question: "4600 - 1050", answer: 3550, options: [1240, 4250, 3260, 2270, 3550] }
];

const id_ejercicio = 13;
const today = new Date().toISOString().split("T")[0];
const keyDate = `lastAttemptDate_${id_ejercicio}`;
const keyAttempts = `globalAttempts_${id_ejercicio}`;

let lastAttemptDate = localStorage.getItem(keyDate) || "";
let globalAttempts = parseInt(localStorage.getItem(keyAttempts)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(keyDate, today);
  localStorage.setItem(keyAttempts, globalAttempts);
}

const maxAttempts = 5;
const intentosDiv = document.getElementById("intentos");
intentosDiv.textContent = `Intentos: ${globalAttempts}/${maxAttempts}`;

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

document.getElementById("submit").addEventListener("click", async () => {
  if (globalAttempts >= maxAttempts) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
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
  localStorage.setItem(keyAttempts, globalAttempts);
  intentosDiv.textContent = `Intentos: ${globalAttempts}/${maxAttempts}`;

  // Enviar calificación
  try {
    await fetch("/ejercicios_tercero/sr3/guardar-calificacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intento: globalAttempts,
        calificacion: score,
        id_ejercicio,
        fecha: today
      })
    });

    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${score}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(score);
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al guardar',
      text: 'No se pudo registrar la calificación.',
      confirmButtonText: 'Aceptar'
    });
  }

  if (globalAttempts < maxAttempts) {
    document.getElementById("retry").style.display = "inline-block";
  }

  document.getElementById("submit").disabled = true;
});

document.getElementById("retry").addEventListener("click", () => {
  createExercises();
  document.getElementById("score").textContent = "";
  document.getElementById("retry").style.display = "none";
  document.getElementById("submit").disabled = false;
});

createExercises();

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