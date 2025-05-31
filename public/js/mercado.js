const MAX_ATTEMPTS = 5;
let globalAttempts = Number(localStorage.getItem('mercadoAttempts'));
if (isNaN(globalAttempts)) globalAttempts = 0;

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

  // Muestra intento actual si ya hubo intentos
  if (globalAttempts > 0) {
    document.getElementById("resultText").innerHTML = `Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;
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
  localStorage.setItem('mercadoAttempts', globalAttempts); // Guardar intento

  // Guardar calificación en el servidor
  fetch('/ejercicios_numeros/mercado/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: grade,
      id_ejercicio: 3, // Cambia este ID si aplica
      fecha: new Date().toISOString().split('T')[0]
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
    localStorage.removeItem('mercadoAttempts');
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
    document.getElementById("resultText").innerHTML = `Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;
    document.getElementById("retryBtn").style.display = "none";
  }
}

// Inicializa
generateFruits();