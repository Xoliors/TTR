const MAX_ATTEMPTS = 5;
const id_ejercicio = 4;
const today = new Date().toISOString().split("T")[0];
const fecha = today;

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

let correctAnswers = 0;
let footballCount = 0;
let basketballCount = 0;
let baseballCount = 0;

document.getElementById("intentos").innerText = `Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;

function generateObjects() {
  if (globalAttempts >= MAX_ATTEMPTS) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  footballCount = Math.floor(Math.random() * 101);
  basketballCount = Math.floor(Math.random() * 101);
  baseballCount = Math.floor(Math.random() * 101);

  const footballs = Array.from({ length: footballCount }, () => `<span>⚽</span>`);
  const basketballs = Array.from({ length: basketballCount }, () => `<span>🏀</span>`);
  const baseballs = Array.from({ length: baseballCount }, () => `<span>⚾</span>`);

  const objectsArray = [...footballs, ...basketballs, ...baseballs];
  const objectsDiv = document.getElementById("objects");
  objectsDiv.innerHTML = objectsArray.join(" ");

  document.getElementById("questionsSection").style.display = "block";
  resetInputs();
  document.getElementById("sacarBtn").disabled = true;
}

function resetInputs() {
  ["countFootballInput", "countBasketballInput", "countBaseballInput", "totalObjectsInput"].forEach(id => {
    document.getElementById(id).value = "";
    document.getElementById(id).disabled = false;
  });
  document.getElementById("resultText").innerHTML = "";
}

function disableInputs() {
  ["countFootballInput", "countBasketballInput", "countBaseballInput", "totalObjectsInput"].forEach(id => {
    document.getElementById(id).disabled = true;
  });
}

function checkAnswers() {
  if (globalAttempts >= MAX_ATTEMPTS) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const footballAnswer = parseInt(document.getElementById("countFootballInput").value.trim());
  const basketballAnswer = parseInt(document.getElementById("countBasketballInput").value.trim());
  const baseballAnswer = parseInt(document.getElementById("countBaseballInput").value.trim());
  const totalObjectsAnswer = parseInt(document.getElementById("totalObjectsInput").value.trim());

  let correct = 0;
  if (footballAnswer === footballCount) correct++;
  if (basketballAnswer === basketballCount) correct++;
  if (baseballAnswer === baseballCount) correct++;

  const totalObjectsCount = footballCount + basketballCount + baseballCount;
  if (totalObjectsAnswer === totalObjectsCount) correct++;

  const grade = Math.round((correct / 4) * 10);
  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  document.getElementById("intentos").innerText = `Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;

  fetch("/ejercicios_tercero/caja3/guardar-calificacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: grade,
      id_ejercicio,
      fecha
    }),
  })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${grade}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        mostrarMensajeMotivacional(grade.toFixed(1));
      });
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar la calificación.',
        confirmButtonText: 'Aceptar'
      });
    });

  document.getElementById("resultText").innerHTML =
    `✅ Respuestas correctas: ${correct}/4<br>📊 Calificación: <strong>${grade}/10</strong>`;

  if (globalAttempts < MAX_ATTEMPTS) {
    document.getElementById("retryBtn").style.display = "inline-block";
  } else {
    document.getElementById("retryBtn").style.display = "none";
    document.getElementById("resultText").innerHTML += "<br>🚫 Ya no puedes volver a intentarlo.";
    disableInputs();
  }
}

function retry() {
  if (globalAttempts < MAX_ATTEMPTS) {
    document.getElementById("sacarBtn").disabled = false;
    resetInputs();
    document.getElementById("questionsSection").style.display = "none";
    document.getElementById("retryBtn").style.display = "none";
  }
}

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

  if (calificacion >= 0 && calificacion < 6) {
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