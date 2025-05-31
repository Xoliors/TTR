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