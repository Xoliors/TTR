const MAX_ATTEMPTS = 5;
let globalAttempts = 0;
let correctAnswers = 0;
let footballCount = 0;
let basketballCount = 0;
let baseballCount = 0;

function generateObjects() {
  if (globalAttempts < MAX_ATTEMPTS) {
    footballCount = Math.floor(Math.random() * 31); // Entre 0 y 20 pelotas de fútbol
    basketballCount = Math.floor(Math.random() * 31); // Entre 0 y 20 pelotas de baloncesto
    baseballCount = Math.floor(Math.random() * 31); // Entre 0 y 20 pelotas de béisbol

    const footballs = Array.from({ length: footballCount }, () => `<span>⚽</span>`);
    const basketballs = Array.from({ length: basketballCount }, () => `<span>🏀</span>`);
    const baseballs = Array.from({ length: baseballCount }, () => `<span>⚾</span>`);

    const objectsArray = [...footballs, ...basketballs, ...baseballs];
    const objectsDiv = document.getElementById("objects");
    objectsDiv.innerHTML = objectsArray.join(" ");
    
    document.getElementById("questionsSection").style.display = "block";
    resetInputs();
    document.getElementById("sacarBtn").disabled = true; // Desactivar botón
  }
}

function resetInputs() {
  document.getElementById("countFootballInput").value = "";
  document.getElementById("countBasketballInput").value = "";
  document.getElementById("countBaseballInput").value = "";
  document.getElementById("totalObjectsInput").value = "";
  document.getElementById("resultText").innerHTML = "";
}

function checkAnswers() {
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

  document.getElementById("resultText").innerHTML =
    `✅ Respuestas correctas: ${correct}/4<br>📊 Calificación: <strong>${grade}/10</strong><br>Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;

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