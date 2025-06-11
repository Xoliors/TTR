const MAX_ATTEMPTS = 5;
  let globalAttempts = 0;
  let correctAnswers = 0;
  const exercises = [];

  // Genera una serie numérica con un paso aleatorio
  function generateSeries(step) {
    let start = Math.floor(Math.random() * 3000) + 1; // Empieza en un número aleatorio entre 1 y 1000
    let series = [start];
    let missingIndex = Math.floor(Math.random() * 4); // El número faltante estará en uno de los primeros 4 lugares
    for (let i = 1; series[i - 1] + step <= 3000 && i < 6; i++) {
      series.push(series[i - 1] + step);
    }

    // Se elimina el número en el índice "missingIndex" para que el alumno lo complete
    const correctNumber = series[missingIndex];
    series[missingIndex] = '___';

    return { series, correctNumber, missingIndex };
  }

  // Genera 8 ejercicios
  function generateExercises() {
    const exercisesContainer = document.getElementById("exercisesContainer");
    exercisesContainer.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      let step = [2, 5, 10][Math.floor(Math.random() * 3)]; // El paso será aleatorio entre 2, 5 y 10
      const { series, correctNumber, missingIndex } = generateSeries(step);
      exercises.push({ series, correctNumber, missingIndex });

      exercisesContainer.innerHTML += `
        <div class="exercise">
          <p class="sm"><strong>Ejercicio ${i + 1}:</strong> Completa la serie:</p>
          <p class="sm">${series.join(' → ')}</p>
          <input class="tr" type="text" id="answer${i}" placeholder="Escribe el número que falta">
        </div>
      `;
    }
    document.getElementById("retryBtn").style.display = 'none';
    document.getElementById("resultText").textContent = '';
  }

  // Verifica las respuestas del alumno
  function checkAnswers() {
    globalAttempts++;
    correctAnswers = 0;

    for (let i = 0; i < 8; i++) {
      const answer = document.getElementById(`answer${i}`).value.trim();
      const correctNumber = exercises[i].correctNumber;

      if (parseInt(answer) === correctNumber) {
        correctAnswers++;
      }
    }

    // Mostrar calificación por intento
    let score = (correctAnswers / 8) * 10; // Calificación sobre 10
    score = Math.round(score);

    document.getElementById("resultText").innerHTML = `
      <strong>Resultado del intento ${globalAttempts}:</strong><br>
      Respuestas correctas: ${correctAnswers}/8<br>
      Calificación del intento: <strong>${score}/10</strong>
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
      generateExercises();
    }
  }

  // Inicializar el ejercicio
  generateExercises();