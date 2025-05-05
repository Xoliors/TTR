let globalAttempts = 0;
  const maxGlobalAttempts = 5;
  let currentCompleted = {};
  let verifiedCount = 0;

  function resetState() {
    currentCompleted = {
      20: null,
      30: null,
      40: null,
      50: null
    };
    verifiedCount = 0;

    [20, 30, 40, 50].forEach(num => {
      document.getElementById(`input${num}`).value = '';
      document.getElementById(`input${num}`).disabled = false;
      document.querySelector(`#ex${num} button`).disabled = false;
      document.getElementById(`result${num}`).textContent = '';
    });

    document.getElementById("finalScore").innerHTML = '';
    document.getElementById("retryBtn").style.display = 'none';
  }

  function checkSequence(limit) {
    if (currentCompleted[limit] !== null) return;

    const input = document.getElementById(`input${limit}`);
    const userInput = input.value.trim();
    const correct = Array.from({ length: limit }, (_, i) => i + 1).join(" ");
    const resultDiv = document.getElementById(`result${limit}`);

    if (userInput === correct) {
      resultDiv.textContent = "✅ ¡Correcto!";
      resultDiv.style.color = "green";
      currentCompleted[limit] = true;
    } else {
      resultDiv.textContent = "❌ Incorrecto.";
      resultDiv.style.color = "red";
      currentCompleted[limit] = false;
    }

    input.disabled = true;
    document.querySelector(`#ex${limit} button`).disabled = true;
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

  // Inicializa todo
  resetState();