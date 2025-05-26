const MAX_ATTEMPTS = 5;
let globalAttempts = Number(localStorage.getItem('globalAttemptsCaja'));
if (isNaN(globalAttempts)) globalAttempts = 0;

let correctAnswers = 0;
let objectCount = 0;

// Genera una cantidad aleatoria de objetos y los muestra en la caja
function generateObjects() {
  if (globalAttempts < MAX_ATTEMPTS) {
    objectCount = Math.floor(Math.random() * 16) + 5; // entre 5 y 20 objetos
    const objectsArray = Array.from({ length: objectCount }, () => "<span>🪀</span>");
    const objectsDiv = document.getElementById("objects");
    objectsDiv.innerHTML = objectsArray.join(" ");
    document.getElementById("questionsSection").style.display = "block";
    resetInputs();
    document.getElementById("sacarBtn").disabled = true;
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
  localStorage.setItem('globalAttemptsCaja', globalAttempts);

  document.getElementById("resultText").innerHTML =
    `✅ Respuestas correctas: ${correct}/2<br>📊 Calificación: <strong>${grade}/10</strong><br>Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;

  // Enviar calificación
  const id_ejercicio = 4; // ID que decidas asignar
  const fecha = new Date().toISOString().split('T')[0];

  fetch('/ejercicios_numeros/caja/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: grade,
      id_ejercicio,
      fecha
    })
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.message || 'Error al guardar la calificación');
      });
    }
    return response.json();
  })
  .then(data => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${grade}/10.`,
      confirmButtonText: 'Aceptar'
    });
  })
  .catch(error => {
    console.error('Error:', error.message);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message,
      confirmButtonText: 'Aceptar'
    });
  });

  if (globalAttempts < MAX_ATTEMPTS) {
    document.getElementById("retryBtn").style.display = "inline-block";
  } else {
    document.getElementById("retryBtn").style.display = "none";
    document.getElementById("resultText").innerHTML += "<br>🚫 Ya no puedes volver a intentarlo.";
    disableInputs();
    localStorage.removeItem('globalAttemptsCaja'); // Limpia si ya no hay más intentos
  }
}

function disableInputs() {
  ["countInput", "stickInput"].forEach(id => {
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