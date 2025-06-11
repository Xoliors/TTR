const correctAnswers = [
    "novecientos noventa y tres",
    "ochocientos setenta y dos",
    "cuatrocientos cincuenta y seis",
    "mil doscientos veintiuno",
    "seiscientos cincuenta y ocho"
  ];

  let completed = [null, null, null, null, null];
  let globalAttempts = 0;
  const maxGlobalAttempts = 5;

  function checkAnswer(index) {
    if (completed[index] !== null) return;

    const input = document.getElementById(`input${index}`);
    const userInput = input.value.trim().toLowerCase();
    const resultDiv = document.getElementById(`result${index}`);

    if (userInput === correctAnswers[index]) {
      resultDiv.textContent = "✅ ¡Correcto!";
      resultDiv.style.color = "green";
      completed[index] = true;
    } else {
      resultDiv.textContent = "❌ Incorrecto.";
      resultDiv.style.color = "red";
      completed[index] = false;
    }

    input.disabled = true;
    document.querySelector(`#ex${index} button`).disabled = true;

    if (completed.every(v => v !== null)) {
      globalAttempts++;
      showScore();
    }
  }

  function showScore() {
    const score = completed.filter(v => v === true).length;
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
    if (globalAttempts >= maxGlobalAttempts) return;

    completed = [null, null, null, null, null];
    for (let i = 0; i < 5; i++) {
      document.getElementById(`input${i}`).value = '';
      document.getElementById(`input${i}`).disabled = false;
      document.querySelector(`#ex${i} button`).disabled = false;
      document.getElementById(`result${i}`).textContent = '';
    }
    document.getElementById("finalScore").innerHTML = '';
    document.getElementById("retryBtn").style.display = 'none';
  }