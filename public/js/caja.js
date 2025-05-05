const MAX_ATTEMPTS = 5;
let globalAttempts = 0;
let correctAnswers = 0;
let objectCount = 0;

// Genera una cantidad aleatoria de objetos y los muestra en la caja
function generateObjects() {
  if (globalAttempts < MAX_ATTEMPTS) {
    objectCount = Math.floor(Math.random() * 16) + 5; // entre 5 y 20 objetos
    const objectsArray = Array.from({ length: objectCount }, (_, i) => "<span>🪀</span>"); // cajas misteriosas
    const objectsDiv = document.getElementById("objects");
    objectsDiv.innerHTML = objectsArray.join(" ");
    document.getElementById("questionsSection").style.display = "block";
    resetInputs();
    document.getElementById("sacarBtn").disabled = true; // Desactivar el botón después de sacar objetos
  }
}

function resetInputs() {
  document.getElementById("countInput").value = "";
  document.getElementById("stickInput").value = "";
  document.getElementById("resultText").innerHTML = "";
}

// Verifica las respuestas del alumno
function checkAnswers() {
  const count = parseInt(document.getElementById("countInput").value.trim());
  const sticks = document.getElementById("stickInput").value.trim();

  let correct = 0;
  if (count === objectCount) correct++;
  if (sticks === "|".repeat(objectCount)) correct++;

  const grade = Math.round((correct / 2) * 10);
  globalAttempts++;

  document.getElementById("resultText").innerHTML =
    `✅ Respuestas correctas: ${correct}/2<br>📊 Calificación: <strong>${grade}/10</strong><br>Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;

  // Si el alumno aún tiene intentos disponibles
  if (globalAttempts < MAX_ATTEMPTS) {
    document.getElementById("retryBtn").style.display = "inline-block";
  } else {
    document.getElementById("retryBtn").style.display = "none";
    document.getElementById("resultText").innerHTML += "<br>🚫 Ya no puedes volver a intentarlo.";
    disableInputs();
  }
}

// Bloquea las entradas después de 5 intentos
function disableInputs() {
  ["countInput", "stickInput"].forEach(id => {
    document.getElementById(id).disabled = true;
  });
}

// Vuelve a habilitar los inputs y permite otro intento
function retry() {
  if (globalAttempts < MAX_ATTEMPTS) {
    // Habilitar los inputs para intentar de nuevo
    document.getElementById("sacarBtn").disabled = false;
    resetInputs();
    document.getElementById("questionsSection").style.display = "none";
    document.getElementById("retryBtn").style.display = "none";
  }
}