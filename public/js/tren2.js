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
        }).then(() => {
          mostrarMensajeMotivacional(score.toFixed(1));
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

  function mostrarMensajeMotivacional(calificacionRaw) {
  let calificacion = Number(calificacionRaw);
  let mensaje = "";

  const bajo = [
    "Te hace falta más práctica, ¡no te desanimes!",
    "Aún hay áreas que mejorar, sigue esforzándote.",
    "Estás comenzando, cada error es una oportunidad de aprender.",
    "No fue tu mejor intento, pero puedes mejorar mucho más.",
    "Sigue practicando, estás en el camino del aprendizaje.",
    "Con dedicación lo lograrás, ¡ánimo!",
    "Todavía no lo dominas, pero vas por buen camino.",
    "Este resultado es una base para seguir creciendo.",
    "Requiere más atención y práctica, no te rindas.",
    "Vuelve a intentarlo, cada paso cuenta."
  ];

  const medio = [
    "¡Estuviste cerca! Solo falta un poco más de práctica.",
    "Buen trabajo, sigue así y lo lograrás.",
    "¡Por poco! No te rindas, vas muy bien.",
    "Vas por buen camino, ¡ánimo!",
    "¡Casi lo consigues! Un poco más de esfuerzo y lo lograrás.",
    "Buen intento, no estás lejos del objetivo.",
    "Continúa así, tu esfuerzo está dando frutos.",
    "¡Sigue practicando! Estás muy cerca del 10.",
    "Buen desempeño, te falta poco para la perfección.",
    "¡Excelente progreso! No te detengas."
  ];

  const alto = [
    "¡Fabuloso! Estás haciendo un trabajo increíble.",
    "¡Lo lograste! Sigue así.",
    "¡Excelente resultado! Tu esfuerzo se nota.",
    "¡Perfecto! Se nota tu dedicación.",
    "¡Muy bien hecho! Continúa aprendiendo con entusiasmo.",
    "¡Genial! Estás dominando este tema.",
    "¡Brillante! Sigue manteniendo ese nivel.",
    "¡Orgulloso de tu progreso!",
    "¡Gran trabajo! Estás aprendiendo de forma excelente.",
    "¡Sigue así! El éxito es tuyo."
  ];

  const cero = [
  "Todos empezamos desde cero, lo importante es seguir intentando.",
  "No te preocupes, fallar es parte del proceso de aprender.",
  "Hoy no fue tu día, pero puedes hacerlo mucho mejor, sigue practicando.",
  "¡No te rindas! Cada error te acerca más al acierto.",
  "Es solo el comienzo, lo importante es que sigas aprendiendo.",
  "Los grandes logros comienzan con pequeños pasos, ¡inténtalo de nuevo!",
  "Aprender toma tiempo, lo lograrás con práctica.",
  "Un tropiezo no define tu camino. ¡Ánimo!",
  "A veces fallar nos enseña más que acertar. ¡Sigue adelante!",
  "Tener 0 hoy no significa que no puedas tener 10 mañana. ¡Confía en ti!"
];

  if (calificacion === 0) {
    mensaje = cero[Math.floor(Math.random() * cero.length)];
  } else if (calificacion >= 0 && calificacion < 6) {
    mensaje = bajo[Math.floor(Math.random() * bajo.length)];
  } else if (calificacion >= 6 && calificacion <= 8) {
    mensaje = medio[Math.floor(Math.random() * medio.length)];
  } else if (calificacion >= 9 && calificacion <= 10) {
    mensaje = alto[Math.floor(Math.random() * alto.length)];
  } else {
    mensaje = "Calificación no válida.";
  }

  Swal.fire({
    icon: 'info',
    title: 'Resultado',
    text: mensaje,
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false,   // ← No cerrar al hacer clic fuera
    allowEscapeKey: false       // ← No cerrar al presionar Esc
  });
}