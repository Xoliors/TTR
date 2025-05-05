let globalAttempts = 0;
const maxGlobalAttempts = 5;
let currentCompleted = {};
let verifiedCount = 0;
const exerciseIDs = [300, 200, 800, 520, 910];

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
    showScore();
  }
}

function showScore() {
  const score = Object.values(currentCompleted).filter(v => v === true).length;
  const grade = Math.round((score / exerciseIDs.length) * 10);
  let message = `Intento ${globalAttempts} de ${maxGlobalAttempts}. Calificación: <strong>${grade}/10</strong> (${score} de ${exerciseIDs.length} ejercicios correctos).`;

  document.getElementById("finalScore").innerHTML = message;

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
  }
}

resetState();