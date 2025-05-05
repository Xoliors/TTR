const MAX_ATTEMPTS = 5;
let globalAttempts = 0;
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
    cell.addEventListener('click', function() {
      // Colorea las celdas si están dentro del patrón que corresponde
      if (i % multiple === 0) {
        // Alternar entre colorear o quitar el color
        if (cell.classList.contains(colorClass)) {
          cell.classList.remove(colorClass);
        } else {
          cell.classList.add(colorClass);
        }
      }
    });
  }
}

// Verifica los patrones coloreados por el alumno
function checkPatterns() {
  globalAttempts++;
  let correctAnswers = 0;

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

  // Calificación total
  const totalQuestions = Math.floor((200 - 101) / 2) + Math.floor((300 - 201) / 5) + Math.floor((400 - 301) / 10);
  const totalCorrect = correctAnswers2 + correctAnswers5 + correctAnswers10;
  const score = Math.round((totalCorrect / totalQuestions) * 10);  // Asegura que la calificación no supere 10

  // Mostrar calificación total después de cada intento
  document.getElementById("resultText").innerHTML = `
    <strong>Resultado del intento ${globalAttempts}:</strong><br>
    Múltiplos de 2: ${correctAnswers2} correctos<br>
    Múltiplos de 5: ${correctAnswers5} correctos<br>
    Múltiplos de 10: ${correctAnswers10} correctos<br>
    Calificación: ${score}/10
  `;

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