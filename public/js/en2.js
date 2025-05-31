const MAX_ATTEMPTS = 5;
const id_ejercicio = 6;
const today = new Date().toISOString().split("T")[0];
const attemptKey = `globalAttempts_${id_ejercicio}`;
const dateKey = `lastAttemptDate_${id_ejercicio}`;

let globalAttempts = parseInt(localStorage.getItem(attemptKey)) || 0;
let lastAttemptDate = localStorage.getItem(dateKey) || "";

// Reiniciar si la fecha ha cambiado
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(dateKey, today);
  localStorage.setItem(attemptKey, globalAttempts);
}

let correctAnswers2 = 0, correctAnswers5 = 0, correctAnswers10 = 0;

// Genera la tabla de números en el rango especificado y múltiplos dados
function generateTable(tableId, start, end, multiple, colorClass) {
  const tableContainer = document.getElementById(tableId);
  tableContainer.innerHTML = '';

  for (let i = start; i <= end; i++) {
    const cell = document.createElement("div");
    cell.classList.add("table-cell");
    cell.textContent = i;
    cell.id = `${tableId}-cell-${i}`;
    tableContainer.appendChild(cell);

    // Event listener para permitir colorear las celdas
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
      icon: 'error',
      title: '¡Límite de intentos!',
      text: 'Has alcanzado el número máximo de intentos para hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  globalAttempts++;
  localStorage.setItem(attemptKey, globalAttempts);

  // Verificar múltiplos de 2
  correctAnswers2 = 0;
  for (let i = 101; i <= 200; i++) {
    const cell = document.getElementById(`tableContainer2-cell-${i}`);
    if (i % 2 === 0 && cell.classList.contains('colored-red')) {
      correctAnswers2++;
    }
  }

  // Verificar múltiplos de 5
  correctAnswers5 = 0;
  for (let i = 201; i <= 300; i++) {
    const cell = document.getElementById(`tableContainer5-cell-${i}`);
    if (i % 5 === 0 && cell.classList.contains('colored-blue')) {
      correctAnswers5++;
    }
  }

  // Verificar múltiplos de 10
  correctAnswers10 = 0;
  for (let i = 301; i <= 400; i++) {
    const cell = document.getElementById(`tableContainer10-cell-${i}`);
    if (i % 10 === 0 && cell.classList.contains('colored-green')) {
      correctAnswers10++;
    }
  }

  const totalQuestions = Math.floor((200 - 101) / 2) + Math.floor((300 - 201) / 5) + Math.floor((400 - 301) / 10);
  const totalCorrect = correctAnswers2 + correctAnswers5 + correctAnswers10;
  const score = Math.round((totalCorrect / totalQuestions) * 10);

  document.getElementById("resultText").innerHTML = `
    <strong>Resultado del intento ${globalAttempts}:</strong><br>
    Múltiplos de 2: ${correctAnswers2} correctos<br>
    Múltiplos de 5: ${correctAnswers5} correctos<br>
    Múltiplos de 10: ${correctAnswers10} correctos<br>
    Calificación: ${score}/10
  `;

  // Enviar datos al servidor
  fetch("/ejercicios_segundo/en2/guardar-calificacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: score,
      id_ejercicio,
      fecha: today
    })
  }).then(response => {
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${score}/10.`,
        confirmButtonText: 'Aceptar'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: 'Hubo un problema al registrar tu calificación.',
        confirmButtonText: 'Intentar de nuevo'
      });
    }
  }).catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Error de red',
      text: 'No se pudo conectar con el servidor.',
      confirmButtonText: 'Aceptar'
    });
  });

  // Mostrar o no el botón de volver a intentar
  if (globalAttempts < MAX_ATTEMPTS) {
    document.getElementById("retryBtn").style.display = 'inline-block';
  } else {
    document.getElementById("retryBtn").style.display = 'none';
  }
}

// Vuelve a habilitar las entradas para un nuevo intento
function retry() {
  if (globalAttempts < MAX_ATTEMPTS) {
    generateTable("tableContainer2", 101, 200, 2, 'colored-red');
    generateTable("tableContainer5", 201, 300, 5, 'colored-blue');
    generateTable("tableContainer10", 301, 400, 10, 'colored-green');
    document.getElementById("resultText").innerHTML = '';
    document.getElementById("retryBtn").style.display = 'none';
  }
}

// Inicializar el ejercicio
generateTable("tableContainer2", 101, 200, 2, 'colored-red');
generateTable("tableContainer5", 201, 300, 5, 'colored-blue');
generateTable("tableContainer10", 301, 400, 10, 'colored-green');
