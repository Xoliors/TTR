const data = [
  { question: "150 + 75", answer: 225, options: [220, 230, 215, 225, 240] },
  { question: "120 - 40", answer: 80, options: [70, 80, 85, 90, 75] },
  { question: "200 + 150", answer: 350, options: [340, 350, 360, 370, 330] },
  { question: "300 - 150", answer: 150, options: [140, 150, 160, 170, 130] },
  { question: "180 + 120", answer: 300, options: [290, 300, 310, 320, 280] },
  { question: "250 - 75", answer: 175, options: [165, 170, 175, 180, 185] },
  { question: "100 + 200", answer: 300, options: [290, 300, 310, 320, 280] },
  { question: "450 - 200", answer: 250, options: [240, 250, 260, 270, 230] },
  { question: "180 + 90", answer: 270, options: [260, 270, 280, 290, 250] },
  { question: "400 - 150", answer: 250, options: [240, 250, 260, 270, 230] }
];

const id_ejercicio = 13;
const maxAttempts = 5;
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

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

document.getElementById("submit").addEventListener("click", () => {
  if (globalAttempts >= maxAttempts) {
    Swal.fire({
      icon: 'error',
      title: '¡Límite de intentos alcanzado!',
      text: 'Ya has usado tus 5 intentos del día. Inténtalo mañana.',
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
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  // Enviar calificación
  fetch('/ejercicios_segundo/sr2/guardar-calificacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: score,
      id_ejercicio,
      fecha: today
    })
  })
  .then(response => response.json())
  .then(data => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${score}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
        mostrarMensajeMotivacional(score.toFixed(1));
      });
  })
  .catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Error al registrar',
      text: 'Hubo un problema al registrar tu calificación.',
      confirmButtonText: 'Aceptar'
    });
    console.error(error);
  });

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