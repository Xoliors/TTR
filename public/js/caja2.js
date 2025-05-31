const MAX_ATTEMPTS = 5;
const id_ejercicio = 4;
const today = new Date().toISOString().split("T")[0];

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Reset de intentos si es un nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

let correctAnswers = 0;
let footballCount = 0;
let basketballCount = 0;
let baseballCount = 0;

function generateObjects() {
  if (globalAttempts >= MAX_ATTEMPTS) {
    Swal.fire({
      icon: 'error',
      title: '¡Intentos agotados!',
      text: 'Ya no puedes volver a intentarlo hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  footballCount = Math.floor(Math.random() * 31);
  basketballCount = Math.floor(Math.random() * 31);
  baseballCount = Math.floor(Math.random() * 31);

  const footballs = Array.from({ length: footballCount }, () => `<span>⚽</span>`);
  const basketballs = Array.from({ length: basketballCount }, () => `<span>🏀</span>`);
  const baseballs = Array.from({ length: baseballCount }, () => `<span>⚾</span>`);

  const objectsArray = [...footballs, ...basketballs, ...baseballs];
  document.getElementById("objects").innerHTML = objectsArray.join(" ");
  document.getElementById("questionsSection").style.display = "block";
  resetInputs();
  document.getElementById("sacarBtn").disabled = true;
}

function resetInputs() {
  ["countFootballInput", "countBasketballInput", "countBaseballInput", "totalObjectsInput"].forEach(id => {
    document.getElementById(id).value = "";
    document.getElementById(id).disabled = false;
  });
  document.getElementById("resultText").innerHTML = "";
}

function checkAnswers() {
  if (globalAttempts >= MAX_ATTEMPTS) {
    Swal.fire({
      icon: 'error',
      title: '¡Intentos agotados!',
      text: 'Ya no puedes volver a intentarlo hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const footballAnswer = parseInt(document.getElementById("countFootballInput").value.trim());
  const basketballAnswer = parseInt(document.getElementById("countBasketballInput").value.trim());
  const baseballAnswer = parseInt(document.getElementById("countBaseballInput").value.trim());
  const totalObjectsAnswer = parseInt(document.getElementById("totalObjectsInput").value.trim());

  let correct = 0;
  if (footballAnswer === footballCount) correct++;
  if (basketballAnswer === basketballCount) correct++;
  if (baseballAnswer === baseballCount) correct++;

  const totalObjectsCount = footballCount + basketballCount + baseballCount;
  if (totalObjectsAnswer === totalObjectsCount) correct++;

  const grade = Math.round((correct / 4) * 10);
  globalAttempts++;

  // Actualizar localStorage
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);

  document.getElementById("resultText").innerHTML =
    `✅ Respuestas correctas: ${correct}/4<br>📊 Calificación: <strong>${grade}/10</strong><br>Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;

  // Enviar calificación
  const fecha = today;
  fetch("/ejercicios_segundo/caja2/guardar-calificacion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: grade,
      id_ejercicio,
      fecha
    })
  })
  .then(res => res.json())
  .then(data => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${grade}/10.`,
      confirmButtonText: 'Aceptar'
    });
  })
  .catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Error al guardar',
      text: 'Hubo un problema al registrar la calificación.',
      confirmButtonText: 'Aceptar'
    });
    console.error("Error al guardar:", error);
  });

  if (globalAttempts < MAX_ATTEMPTS) {
    document.getElementById("retryBtn").style.display = "inline-block";
  } else {
    document.getElementById("retryBtn").style.display = "none";
    document.getElementById("resultText").innerHTML += "<br>🚫 Ya no puedes volver a intentarlo.";
    disableInputs();
  }
}

function disableInputs() {
  ["countFootballInput", "countBasketballInput", "countBaseballInput", "totalObjectsInput"].forEach(id => {
    document.getElementById(id).disabled = true;
  });
}

function retry() {
  if (globalAttempts < MAX_ATTEMPTS) {
    document.getElementById("sacarBtn").disabled = false;
    resetInputs();
    document.getElementById("questionsSection").style.display = "none";
    document.getElementById("retryBtn").style.display = "none";
  }
}