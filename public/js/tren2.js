const MAX_ATTEMPTS = 5;
  const id_ejercicio = 5;
  const today = new Date().toISOString().split("T")[0];

  let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
  let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

  if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  }

  let correctAnswers = 0;
  const exercises = [];

  function generateSeries(step) {
    let start = Math.floor(Math.random() * 1000) + 1;
    let series = [start];
    let missingIndex = Math.floor(Math.random() * 4);
    for (let i = 1; series[i - 1] + step <= 1000 && i < 6; i++) {
      series.push(series[i - 1] + step);
    }

    const correctNumber = series[missingIndex];
    series[missingIndex] = '___';

    return { series, correctNumber, missingIndex };
  }

  function generateExercises() {
    if (globalAttempts >= MAX_ATTEMPTS) {
      Swal.fire({
        icon: 'warning',
        title: '¡Límite de intentos alcanzado!',
        text: 'Ya no puedes volver a intentarlo hoy.',
        confirmButtonText: 'Aceptar'
      });
      document.getElementById("retryBtn").style.display = 'none';
      return;
    }

    const exercisesContainer = document.getElementById("exercisesContainer");
    exercisesContainer.innerHTML = '';
    exercises.length = 0; // Limpiar ejercicios anteriores

    for (let i = 0; i < 8; i++) {
      let step = [2, 5, 10][Math.floor(Math.random() * 3)];
      const { series, correctNumber, missingIndex } = generateSeries(step);
      exercises.push({ series, correctNumber, missingIndex });

      exercisesContainer.innerHTML += `
        <div class="exercise">
          <p class="sd"><strong>Ejercicio ${i + 1}:</strong> Completa la serie:</p>
          <p class="sm">${series.join(' → ')}</p>
          <input class="tr" type="text" id="answer${i}" placeholder="Escribe el número que falta">
        </div>
      `;
    }

    document.getElementById("retryBtn").style.display = 'none';
    document.getElementById("resultText").textContent = '';
  }

  function checkAnswers() {
    if (globalAttempts >= MAX_ATTEMPTS) {
      Swal.fire({
        icon: 'warning',
        title: 'Límite alcanzado',
        text: 'Ya usaste tus 5 intentos del día.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    correctAnswers = 0;

    for (let i = 0; i < 8; i++) {
      const answer = document.getElementById(`answer${i}`).value.trim();
      const correctNumber = exercises[i].correctNumber;

      if (parseInt(answer) === correctNumber) {
        correctAnswers++;
      }
    }

    let score = Math.round((correctAnswers / 8) * 10);
    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

    const fecha = today;

    document.getElementById("resultText").innerHTML = `
      <strong>Resultado del intento ${globalAttempts}:</strong><br>
      Respuestas correctas: ${correctAnswers}/8<br>
      Calificación del intento: <strong>${score}/10</strong>
    `;

    // Enviar resultado
    fetch('/ejercicios_segundo/tren2/guardar-calificacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intento: globalAttempts,
        calificacion: score,
        id_ejercicio,
        fecha
      })
    })
    .then(response => {
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
          title: 'Error al guardar',
          text: 'No se pudo guardar la calificación.',
          confirmButtonText: 'Aceptar'
        });
      }
    });

    if (globalAttempts < MAX_ATTEMPTS) {
      document.getElementById("retryBtn").style.display = 'inline-block';
    } else {
      document.getElementById("retryBtn").style.display = 'none';
    }
  }

  function retry() {
    if (globalAttempts < MAX_ATTEMPTS) {
      generateExercises();
    }
  }

  // Inicializar
  window.onload = generateExercises;