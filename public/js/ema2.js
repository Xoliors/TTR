const sequences = {
    1: { start: 100, end: 130 },
    2: { start: 450, end: 480 },
    3: { start: 90, end: 120 },
    4: { start: 670, end: 700 },
    5: { start: 970, end: 1000 }
  };

  let globalAttempts = 0;
  const maxGlobalAttempts = 5;
  let currentCompleted = {};
  let verifiedCount = 0;

  function resetState() {
    currentCompleted = { 1: null, 2: null, 3: null, 4: null, 5: null };
    verifiedCount = 0;

    for (let i = 1; i <= 5; i++) {
      document.getElementById(`input${i}`).value = '';
      document.getElementById(`input${i}`).disabled = false;
      document.querySelector(`#ex${i} button`).disabled = false;
      document.getElementById(`result${i}`).textContent = '';
    }

    document.getElementById("finalScore").innerHTML = '';
    document.getElementById("retryBtn").style.display = 'none';
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
      showScore();
    }
  }

  function showScore() {
    const score = Object.values(currentCompleted).filter(v => v === true).length;
    const grade = Math.round((score / 5) * 10);
    let message = `Intento ${globalAttempts} de ${maxGlobalAttempts}. Calificación: <strong>${grade}/10</strong> (${score} de 5 ejercicios correctos).`;

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