
const MAX_ATTEMPTS = 5;
let globalAttempts = Number(localStorage.getItem('globalAttemptsMultiplos'));
if (isNaN(globalAttempts)) globalAttempts = 0;

let correctAnswers2 = 0, correctAnswers5 = 0, correctAnswers10 = 0;

// Genera la tabla de números del 1 al 100
function generateTable(tableId, multiple, colorClass) {
  const tableContainer = document.getElementById(tableId);
  tableContainer.innerHTML = '';

  for (let i = 1; i <= 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("table-cell");
    cell.textContent = i;
    cell.id = `${tableId}-cell-${i}`;
    tableContainer.appendChild(cell);

    cell.addEventListener('click', function () {
      if (i % multiple === 0) {
        cell.classList.toggle(colorClass);
      }
    });
  }
}

// Verifica los patrones coloreados por el alumno
function checkPatterns() {
  if (globalAttempts >= MAX_ATTEMPTS) {
    Swal.fire({
      icon: 'warning',
      title: 'Límite de intentos alcanzado',
      text: 'Ya no puedes volver a intentarlo.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  globalAttempts++;
  localStorage.setItem('globalAttemptsMultiplos', globalAttempts);

  let correctAnswers = 0;

  // Verificar múltiplos de 2
  correctAnswers2 = 0;
  for (let i = 1; i <= 100; i++) {
    const cell = document.getElementById(`tableContainer2-cell-${i}`);
    if (i % 2 === 0 && cell.classList.contains('colored-red')) {
      correctAnswers2++;
    }
  }

  // Verificar múltiplos de 5
  correctAnswers5 = 0;
  for (let i = 1; i <= 100; i++) {
    const cell = document.getElementById(`tableContainer5-cell-${i}`);
    if (i % 5 === 0 && cell.classList.contains('colored-blue')) {
      correctAnswers5++;
    }
  }

  // Verificar múltiplos de 10
  correctAnswers10 = 0;
  for (let i = 1; i <= 100; i++) {
    const cell = document.getElementById(`tableContainer10-cell-${i}`);
    if (i % 10 === 0 && cell.classList.contains('colored-green')) {
      correctAnswers10++;
    }
  }

  const totalCorrect = correctAnswers2 + correctAnswers5 + correctAnswers10;
  const totalQuestions = (100 / 2) + (100 / 5) + (100 / 10);
  const score = Math.round((totalCorrect / totalQuestions) * 10);

  document.getElementById("resultText").innerHTML = `
    <strong>Resultado del intento ${globalAttempts}:</strong><br>
    Múltiplos de 2: ${correctAnswers2} correctos<br>
    Múltiplos de 5: ${correctAnswers5} correctos<br>
    Múltiplos de 10: ${correctAnswers10} correctos<br>
    Calificación: ${score}/10
  `;

  // Enviar calificación al backend
  const id_ejercicio = 6;
  const fecha = new Date().toISOString().split('T')[0];

  fetch('/ejercicios_numeros/en/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: score,
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
      text: `Tu calificación fue de ${score}/10.`,
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
    document.getElementById("retryBtn").style.display = 'inline-block';
  } else {
    document.getElementById("retryBtn").style.display = 'none';
    document.getElementById("resultText").innerHTML += "<br>🚫 Ya no puedes volver a intentarlo.";
    localStorage.removeItem('globalAttemptsMultiplos');
  }
}

function retry() {
  if (globalAttempts < MAX_ATTEMPTS) {
    generateTable("tableContainer2", 2, 'colored-red');
    generateTable("tableContainer5", 5, 'colored-blue');
    generateTable("tableContainer10", 10, 'colored-green');
    document.getElementById("resultText").innerHTML = '';
    document.getElementById("retryBtn").style.display = 'none';
  }
}

// Inicializa las tablas al cargar la página
generateTable("tableContainer2", 2, 'colored-red');
generateTable("tableContainer5", 5, 'colored-blue');
generateTable("tableContainer10", 10, 'colored-green');