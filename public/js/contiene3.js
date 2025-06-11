const id_ejercicio = 25;
  const today = new Date().toISOString().split("T")[0];
  let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
  let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

  if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  }

  document.getElementById("intentos").textContent = `Intentos de hoy: ${globalAttempts} / 5`;

  function generateRandomExercises(total = 10) {
    const exercises = [];
    while (exercises.length < total) {
      const divisor = Math.floor(Math.random() * 11) + 2;   // 2 a 12
      const quotient = Math.floor(Math.random() * 12) + 1;  // 1 a 12
      const dividend = divisor * quotient;
      const question = `${dividend} ÷ ${divisor}`;
      if (!exercises.some(e => e.question === question)) {
        exercises.push({ question, answer: quotient });
      }
    }
    return exercises;
  }

  let exercises = generateRandomExercises();

  function createExercises() {
    const leftContainer = document.getElementById("exercises-left");
    const rightContainer = document.getElementById("exercises-right");
    leftContainer.innerHTML = "";
    rightContainer.innerHTML = "";

    exercises.forEach((item, index) => {
      const exercise = document.createElement("div");
      exercise.className = "exercise";
      exercise.id = `exercise-${index}`;
      exercise.innerHTML = `
        <div class="question">${item.question} =</div>
        <input type="number" id="answer-${index}" placeholder="Tu respuesta">
        <div class="icon" id="icon-${index}"></div>
      `;
      (index < 5 ? leftContainer : rightContainer).appendChild(exercise);
    });

    document.getElementById("score").textContent = "";
  }

  function calificarEjercicio() {
    if (globalAttempts >= 5) {
      Swal.fire({
        icon: 'warning',
        title: '¡Sin intentos!',
        text: 'Por el día de hoy has terminado tus intentos.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    let correct = 0;

    exercises.forEach((item, index) => {
      const input = document.getElementById(`answer-${index}`);
      const icon = document.getElementById(`icon-${index}`);
      const userAnswer = parseInt(input.value);

      if (userAnswer === item.answer) {
        icon.innerHTML = "✓";
        icon.className = "icon correct-icon";
        correct++;
      } else {
        icon.innerHTML = "✗";
        icon.className = "icon incorrect-icon";
      }
    });

    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
    document.getElementById("intentos").textContent = `Intentos de hoy: ${globalAttempts} / 5`;

    const fecha = today;

    fetch("/ejercicios_tercero/divisiones3/guardar-calificacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        intento: globalAttempts,
        calificacion: correct,
        id_ejercicio,
        fecha
      })
    })
    .then(response => response.json())
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${correct}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        mostrarMensajeMotivacional(correct.toFixed(1));
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar la calificación.',
        confirmButtonText: 'Aceptar'
      });
    });
  }

  function reiniciarEjercicio() {
    exercises = generateRandomExercises(); // Generar nuevos
    createExercises();
    document.getElementById("score").textContent = "";
  }

  document.getElementById("reiniciar").addEventListener("click", reiniciarEjercicio);
  document.querySelector(".bn").addEventListener("click", calificarEjercicio);

  createExercises();

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

  if (calificacion >= 1 && calificacion <= 5) {
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