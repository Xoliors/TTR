// Intenta obtener el número de intentos globales del almacenamiento local
let globalAttempts = Number(localStorage.getItem('globalAttempts'));
if (isNaN(globalAttempts)) globalAttempts = 0;

const maxGlobalAttempts = 5;
let currentCompleted = {};
let verifiedCount = 0;

// Reinicia los valores para un nuevo intento
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

// Verifica si la secuencia ingresada es correcta
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
    localStorage.setItem('globalAttempts', globalAttempts);  // Guarda correctamente
    showScore();
  }
}

// Muestra el puntaje final e intenta guardar la calificación en el servidor
function showScore() {
  const score = Object.values(currentCompleted).filter(v => v === true).length;
  const grade = Math.round((score / 4) * 10);
  const id_ejercicio = 1; // ID fijo del ejercicio
  const fecha = new Date().toISOString().split('T')[0];

  fetch('/ejercicios_numeros/ema/guardar-calificacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
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

  let message = `Intento ${globalAttempts} de ${maxGlobalAttempts}. Calificación: <strong>${grade}/10</strong> (${score} de 4 ejercicios correctos).`;
  document.getElementById("finalScore").innerHTML = message;

  if (globalAttempts < maxGlobalAttempts) {
    document.getElementById("retryBtn").style.display = "inline-block";
  } else {
    document.getElementById("retryBtn").style.display = "none";
    document.getElementById("finalScore").innerHTML += "<br>❌ Ya no puedes volver a intentar.";
  }

  if (globalAttempts >= maxGlobalAttempts) {
    localStorage.removeItem('globalAttempts');  // Limpia si ya no hay más intentos
  }
}

// Permite reintentar si hay intentos disponibles
function retry() {
  if (globalAttempts < maxGlobalAttempts) {
    resetState();
  }
}

// Inicializa todo
resetState();
