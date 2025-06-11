const id_ejercicio = 1;
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;
const maxGlobalAttempts = 5;
let currentCompleted = {};
let verifiedCount = 0;

// Reiniciar intentos si es un nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

function resetState() {
  currentCompleted = { 1: null, 2: null, 3: null, 4: null, 5: null };
  verifiedCount = 0;

  for (let i = 1; i <= 5; i++) {
    const input = document.getElementById(`input${i}`);
    const button = document.querySelector(`#ex${i} button`);
    const result = document.getElementById(`result${i}`);

    if (input && button && result) {
      input.value = '';
      input.disabled = false;
      button.disabled = false;
      result.textContent = '';
    }
  }

  const finalScoreElem = document.getElementById("finalScore");
  const retryBtn = document.getElementById("retryBtn");

  if (finalScoreElem) finalScoreElem.innerHTML = '';
  if (retryBtn) retryBtn.style.display = 'none';
}

function checkSequence(id) {
  if (currentCompleted[id] !== null) return;

  const input = document.getElementById(`input${id}`);
  const userInput = input.value.trim();
  const { start, end } = sequences[id];
  const correct = Array.from({ length: end - start + 1 }, (_, i) => i + start).join(" ");
  const resultDiv = document.getElementById(`result${id}`);

  if (userInput === correct) {
    resultDiv.textContent = "✅ ¡Correcto!";
    resultDiv.style.color = "green";
    currentCompleted[id] = true;
  } else {
    resultDiv.textContent = "❌ Incorrecto.";
    resultDiv.style.color = "red";
    currentCompleted[id] = false;
  }

  input.disabled = true;
  document.querySelector(`#ex${id} button`).disabled = true;
  verifiedCount++;

  if (verifiedCount === 5) {
    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
    showScore();
  }
}

function showScore() {
  const score = Object.values(currentCompleted).filter(v => v === true).length;
  const grade = Math.round((score / 5) * 10);
  const fecha = today;

  fetch("/ejercicios_segundo/ema2/guardar-calificacion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: grade,
      id_ejercicio,
      fecha
    })
  });

  Swal.fire({
    icon: 'success',
    title: '¡Calificación registrada!',
    text: `Tu calificación fue de ${grade}/10.`,
    confirmButtonText: 'Aceptar'
  }).then(() => {
      mostrarMensajeMotivacional(grade.toFixed(1));
    });

  const finalScoreElem = document.getElementById("finalScore");
  const retryBtn = document.getElementById("retryBtn");

  if (finalScoreElem) {
    finalScoreElem.innerHTML = `Intento ${globalAttempts} de ${maxGlobalAttempts}. Calificación: <strong>${grade}/10</strong>.`;
  }

  if (globalAttempts < maxGlobalAttempts) {
    if (retryBtn) retryBtn.style.display = "inline-block";
  } else {
    if (retryBtn) retryBtn.style.display = "none";
    if (finalScoreElem) finalScoreElem.innerHTML += "<br>❌ Ya no puedes volver a intentar.";
  }
}

function retry() {
  if (globalAttempts < maxGlobalAttempts) {
    resetState();
  } else {
    Swal.fire({
      icon: 'error',
      title: '¡Sin intentos disponibles!',
      text: 'Ya has alcanzado el número máximo de intentos para hoy.',
      confirmButtonText: 'Aceptar'
    });
  }
}

const sequences = {
  1: { start: 100, end: 130 },
  2: { start: 450, end: 480 },
  3: { start: 90, end: 120 },
  4: { start: 670, end: 700 },
  5: { start: 970, end: 1000 }
};

resetState();

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