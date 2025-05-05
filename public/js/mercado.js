const MAX_ATTEMPTS = 5;
  let globalAttempts = 0;
  let fruitCount = 0;

  function generateFruits() {
    fruitCount = Math.floor(Math.random() * 21) + 10;
    const fruitsDiv = document.getElementById("fruits");
    fruitsDiv.innerHTML = "";
    for (let i = 0; i < fruitCount; i++) {
      const fruit = document.createElement("span");
      fruit.textContent = "🍎";
      fruitsDiv.appendChild(fruit);
    }
  }

  function checkAnswers() {
    const count = parseInt(document.getElementById("countInput").value.trim());
    const group5 = parseInt(document.getElementById("group5Input").value.trim());
    const group10 = parseInt(document.getElementById("group10Input").value.trim());
    const sticks = document.getElementById("stickInput").value.trim();

    let correct = 0;
    if (count === fruitCount) correct++;
    if (group5 === Math.floor(fruitCount / 5)) correct++;
    if (group10 === Math.floor(fruitCount / 10)) correct++;
    if (sticks === "|".repeat(fruitCount)) correct++;

    const grade = Math.round((correct / 4) * 10);
    globalAttempts++;

    let result = `✅ Respuestas correctas: ${correct}/4<br>📊 Calificación: <strong>${grade}/10</strong><br>Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;

    if (grade === 10) {
      result += "<br>🎉 ¡Excelente! ¡Eres un experto contando frutas! 🍎🍎🍎";
    }

    document.getElementById("resultText").innerHTML = result;

    if (globalAttempts < MAX_ATTEMPTS) {
      document.getElementById("retryBtn").style.display = "inline-block";
    } else {
      document.getElementById("retryBtn").style.display = "none";
      document.getElementById("resultText").innerHTML += "<br>🚫 Ya no puedes volver a intentarlo.";
      disableInputs();
    }
  }

  function disableInputs() {
    ["countInput", "group5Input", "group10Input", "stickInput"].forEach(id => {
      document.getElementById(id).disabled = true;
    });
  }

  function enableInputs() {
    ["countInput", "group5Input", "group10Input", "stickInput"].forEach(id => {
      document.getElementById(id).disabled = false;
      document.getElementById(id).value = "";
    });
  }

  function retry() {
    if (globalAttempts < MAX_ATTEMPTS) {
      generateFruits();
      enableInputs();
      document.getElementById("resultText").innerHTML = "";
      document.getElementById("retryBtn").style.display = "none";
    }
  }

  generateFruits();