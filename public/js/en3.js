const MAX_ATTEMPTS = 5;
const id_ejercicio = 6;
const today = new Date().toISOString().split("T")[0];
const keyDate = `lastAttemptDate_${id_ejercicio}`;
const keyAttempts = `globalAttempts_${id_ejercicio}`;

let lastAttemptDate = localStorage.getItem(keyDate) || "";
let globalAttempts = parseInt(localStorage.getItem(keyAttempts)) || 0;

// Reiniciar intentos si la fecha cambió
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(keyDate, today);
  localStorage.setItem(keyAttempts, globalAttempts);
}

document.getElementById("intentos").innerText = `Intentos usados: ${globalAttempts}/${MAX_ATTEMPTS}`;

let correctAnswers2 = 0, correctAnswers5 = 0, correctAnswers10 = 0;

function generateTable(tableId, start, end, multiple, colorClass) {
  const tableContainer = document.getElementById(tableId);
  tableContainer.innerHTML = '';

  for (let i = start; i <= end; i++) {
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

function checkPatterns() {
  if (globalAttempts >= MAX_ATTEMPTS) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  globalAttempts++;
  localStorage.setItem(keyAttempts, globalAttempts);
  document.getElementById("intentos").innerText = `Intentos usados: ${globalAttempts}/${MAX_ATTEMPTS}`;

  correctAnswers2 = 0;
  for (let i = 401; i <= 500; i++) {
    const cell = document.getElementById(`tableContainer2-cell-${i}`);
    if (i % 2 === 0 && cell.classList.contains('colored-red')) {
      correctAnswers2++;
    }
  }

  correctAnswers5 = 0;
  for (let i = 501; i <= 600; i++) {
    const cell = document.getElementById(`tableContainer5-cell-${i}`);
    if (i % 5 === 0 && cell.classList.contains('colored-blue')) {
      correctAnswers5++;
    }
  }

  correctAnswers10 = 0;
  for (let i = 601; i <= 700; i++) {
    const cell = document.getElementById(`tableContainer10-cell-${i}`);
    if (i % 10 === 0 && cell.classList.contains('colored-green')) {
      correctAnswers10++;
    }
  }

  const totalQuestions = ((500 - 401 + 1) / 2) + ((600 - 501 + 1) / 5) + ((700 - 601 + 1) / 10);
  const totalCorrect = correctAnswers2 + correctAnswers5 + correctAnswers10;
  const calificacion = (totalCorrect / totalQuestions) * 10;
  const fecha = today;

  document.getElementById("resultText").innerHTML = `
    <strong>Resultado del intento ${globalAttempts}:</strong><br>
    Múltiplos de 2: ${correctAnswers2} correctos<br>
    Múltiplos de 5: ${correctAnswers5} correctos<br>
    Múltiplos de 10: ${correctAnswers10} correctos<br>
    Calificación: ${calificacion.toFixed(1)}/10
  `;

  fetch('/ejercicios_tercero/en3/guardar-calificacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion.toFixed(1),
      id_ejercicio,
      fecha
    })
  })
    .then(response => {
      if (!response.ok) throw new Error("Error al enviar los datos.");
      return response.json();
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${calificacion.toFixed(1)}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        mostrarMensajeMotivacional(calificacion.toFixed(1));
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar la calificación.',
        confirmButtonText: 'Aceptar'
      });
      console.error(error);
    });

  document.getElementById("retryBtn").style.display = globalAttempts < MAX_ATTEMPTS ? 'inline-block' : 'none';
}

function retry() {
  if (globalAttempts < MAX_ATTEMPTS) {
    generateTable("tableContainer2", 401, 500, 2, 'colored-red');
    generateTable("tableContainer5", 501, 600, 5, 'colored-blue');
    generateTable("tableContainer10", 601, 700, 10, 'colored-green');
    document.getElementById("resultText").innerHTML = '';
    document.getElementById("retryBtn").style.display = 'none';
  }
}

// Inicializar tablas
generateTable("tableContainer2", 401, 500, 2, 'colored-red');
generateTable("tableContainer5", 501, 600, 5, 'colored-blue');
generateTable("tableContainer10", 601, 700, 10, 'colored-green');

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