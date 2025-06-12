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
      }).then(() => {
        mostrarMensajeMotivacional(score.toFixed(1));
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
  } else if (calificacion >= 1 && calificacion <= 5) {
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