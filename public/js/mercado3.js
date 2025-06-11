const MAX_ATTEMPTS = 5;
let globalAttempts = 0;
let fruitCount = 0;

function generateFruits() {
  fruitCount = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
  const fruitsDiv = document.getElementById("fruits");
  fruitsDiv.innerHTML = "";

  let remainingFruits = fruitCount;
  let boxNumber = 1;

  while (remainingFruits > 0) {
    const fruitBoxWrapper = document.createElement("div");
    fruitBoxWrapper.classList.add("fruit-box-wrapper");

    const boxLabel = document.createElement("div");
    boxLabel.classList.add("box-label");
    boxLabel.textContent = `Caja ${boxNumber++} (hasta 100 manzanas)`;

    const fruitBox = document.createElement("div");
    fruitBox.classList.add("fruit-box");

    const fruitCountInBox = Math.min(100, remainingFruits);
    const boxCount = document.createElement("div");
    boxCount.classList.add("box-count");
    boxCount.textContent = `${fruitCountInBox} manzanas`;

    for (let i = 0; i < fruitCountInBox; i++) {
      const fruit = document.createElement("span");
      fruit.textContent = "🍎";
      fruitBox.appendChild(fruit);
    }

    fruitBoxWrapper.appendChild(boxLabel);
    fruitBoxWrapper.appendChild(boxCount);
    fruitBoxWrapper.appendChild(fruitBox);
    fruitsDiv.appendChild(fruitBoxWrapper);

    remainingFruits -= fruitCountInBox;
  }
}

function checkAnswers() {
  const count = parseInt(document.getElementById("countInput").value.trim());
  const group100 = parseInt(document.getElementById("group100Input").value.trim());
  const group50 = parseInt(document.getElementById("group50Input").value.trim());
  const group25 = parseInt(document.getElementById("group25Input").value.trim());
  const group10 = parseInt(document.getElementById("group10Input").value.trim());

  let correct = 0;
  if (count === fruitCount) correct++;
  if (group100 === Math.floor(fruitCount / 100)) correct++;
  if (group50 === Math.floor(fruitCount / 50)) correct++;
  if (group25 === Math.floor(fruitCount / 25)) correct++;
  if (group10 === Math.floor(fruitCount / 10)) correct++;

  const grade = Math.round((correct / 5) * 10);
  globalAttempts++;

  let result = `✅ Respuestas correctas: ${correct}/5<br>📊 Calificación: <strong>${grade}/10</strong><br>Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;

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
  ["countInput", "group100Input", "group50Input", "group25Input", "group10Input"].forEach(id => {
    document.getElementById(id).disabled = true;
  });
}

function enableInputs() {
  ["countInput", "group100Input", "group50Input", "group25Input", "group10Input"].forEach(id => {
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