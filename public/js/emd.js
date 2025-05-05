let globalAttempts = 0;
const maxGlobalAttempts = 5;
let currentCompleted = {};
let verifiedCount = 0;

function resetState() {
  currentCompleted = {
    120: null,
    60: null,
    70: null,
    80: null
  };
  verifiedCount = 0;

  [120, 60, 70, 80].forEach(num => {
    document.getElementById(`input${num}`).value = '';
    document.getElementById(`input${num}`).disabled = false;
    document.querySelector(`#ex${num} button`).disabled = false;
    document.getElementById(`result${num}`).textContent = '';
  });

  document.getElementById("finalScore").innerHTML = '';
  document.getElementById("retryBtn").style.display = 'none';
}

function checkDescending(start, end) {
  if (currentCompleted[start] !== null) return; // Ya verificado este número

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

  // Bloquear campo y botón después de verificar
  input.disabled = true;
  document.querySelector(`#ex${start} button`).disabled = true;

  verifiedCount++;

  if (verifiedCount === 4) {
    globalAttempts++;
    showScore();
  }
}

function showScore() {
  const score = Object.values(currentCompleted).filter(v => v === true).length;
  const grade = Math.round((score / 4) * 10);
  let message = `Intento ${globalAttempts} de ${maxGlobalAttempts}. Calificación: <strong>${grade}/10</strong> (${score} de 4 ejercicios correctos).`;

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

resetState(); // Inicialización