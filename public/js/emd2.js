const id_ejercicio = 2;
const maxGlobalAttempts = 5;
const exerciseIDs = [300, 200, 800, 520, 910];
let verifiedCount = 0;
let currentCompleted = {};
let today = new Date().toISOString().split("T")[0];

// Manejo de intentos desde localStorage
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

function resetState() {
  currentCompleted = {
    300: null,
    200: null,
    800: null,
    520: null,
    910: null
  };
  verifiedCount = 0;

  exerciseIDs.forEach(id => {
    document.getElementById(`input${id}`).value = '';
    document.getElementById(`input${id}`).disabled = false;
    document.querySelector(`#ex${id} button`).disabled = false;
    document.getElementById(`result${id}`).textContent = '';
  });

  document.getElementById("finalScore").innerHTML = '';
  document.getElementById("retryBtn").style.display = 'none';
}

function checkDescending(start, end) {
  if (currentCompleted[start] !== null) return;

  if (globalAttempts >= maxGlobalAttempts) {
    Swal.fire({
      icon: 'error',
      title: 'Límite de intentos alcanzado',
      text: 'Ya no puedes realizar más intentos hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const input = document.getElementById(`input${start}`);
  const userInput = input.value.trim();
  const correct = Array.from({ length: start - end + 1 }, (_, i) => start - i).join(" ");
  const resultDiv = document.getElementById(`result${start}`);

  if (userInput === correct) {
    resultDiv.textContent = "✅ ¡Correcto!";
    resultDiv.style.color = "green";
    currentCompleted[start] = true;
  } else {
    resultDiv.textContent = "❌ Incorrecto.";
    resultDiv.style.color = "red";
    currentCompleted[start] = false;
  }

  input.disabled = true;
  document.querySelector(`#ex${start} button`).disabled = true;

  verifiedCount++;

  if (verifiedCount === exerciseIDs.length) {
    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
    showScore();
  }
}

function showScore() {
  const score = Object.values(currentCompleted).filter(v => v === true).length;
  const grade = Math.round((score / exerciseIDs.length) * 10);
  const fecha = today;

  // Mostrar calificación
  Swal.fire({
    icon: 'success',
    title: '¡Calificación registrada!',
    text: `Tu calificación fue de ${grade}/10.`,
    confirmButtonText: 'Aceptar'
  }).then(() => {
      mostrarMensajeMotivacional(grade.toFixed(1));
    });

  // Mostrar mensaje en HTML
  let message = `Intento ${globalAttempts} de ${maxGlobalAttempts}. Calificación: <strong>${grade}/10</strong> (${score} de ${exerciseIDs.length} ejercicios correctos).`;
  document.getElementById("finalScore").innerHTML = message;

  // Enviar calificación al backend
  fetch('/ejercicios_segundo/emd2/guardar-calificacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: grade,
      id_ejercicio,
      fecha
    })
  }).catch(err => {
    console.error('Error al guardar la calificación:', err);
  });

  if (globalAttempts < maxGlobalAttempts) {
    document.getElementById("retryBtn").style.display = "inline-block";
  } else {
    document.getElementById("retryBtn").style.display = "none";
    document.getElementById("finalScore").innerHTML += "<br>❌ Ya no puedes volver a intentar.";
  }
}

function retry() {
  if (globalAttempts < maxGlobalAttempts) {
    resetState();
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Límite de intentos alcanzado',
      text: 'Ya no puedes volver a intentar hoy.',
      confirmButtonText: 'Aceptar'
    });
  }
}

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