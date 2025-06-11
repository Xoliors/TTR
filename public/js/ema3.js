const id_ejercicio = 1;
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

const maxGlobalAttempts = 5;
let completed = [null, null, null, null, null];
const correctAnswers = [
  "novecientos noventa y tres",
  "ochocientos setenta y dos",
  "cuatrocientos cincuenta y seis",
  "mil doscientos veintiuno",
  "seiscientos cincuenta y ocho"
];

function checkAnswer(index) {
  if (completed[index] !== null) return;

  if (globalAttempts >= maxGlobalAttempts) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const input = document.getElementById(`input${index}`);
  const userInput = input.value.trim().toLowerCase();
  const resultDiv = document.getElementById(`result${index}`);

  if (userInput === correctAnswers[index]) {
    resultDiv.textContent = "✅ ¡Correcto!";
    resultDiv.style.color = "green";
    completed[index] = true;
  } else {
    resultDiv.textContent = "❌ Incorrecto.";
    resultDiv.style.color = "red";
    completed[index] = false;
  }

  input.disabled = true;
  document.querySelector(`#ex${index} button`).disabled = true;

  if (completed.every(v => v !== null)) {
    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
    showScore();
  }
}

function showScore() {
  const score = completed.filter(v => v === true).length;
  const grade = Math.round((score / 5) * 10);
  const fecha = today;

  const message = `Intento ${globalAttempts} de ${maxGlobalAttempts}. Calificación: <strong>${grade}/10</strong> (${score} de 5 ejercicios correctos).`;

  document.getElementById("finalScore").innerHTML = message;

  fetch("/ejercicios_tercero/ema3/guardar-calificacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: grade,
      id_ejercicio,
      fecha
    })
  })
    .then(response => response.json())
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${grade}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        mostrarMensajeMotivacional(grade.toFixed(1));
      });
    })
    .catch(error => {
      console.error("Error al guardar la calificación:", error);
    });

  if (globalAttempts < maxGlobalAttempts) {
    document.getElementById("retryBtn").style.display = "inline-block";
  } else {
    document.getElementById("retryBtn").style.display = "none";
    document.getElementById("finalScore").innerHTML += "<br>❌ Ya no puedes volver a intentar.";
  }
}

function retry() {
  if (globalAttempts >= maxGlobalAttempts) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    })
    return;
  }

  completed = [null, null, null, null, null];
  for (let i = 0; i < 5; i++) {
    document.getElementById(`input${i}`).value = '';
    document.getElementById(`input${i}`).disabled = false;
    document.querySelector(`#ex${i} button`).disabled = false;
    document.getElementById(`result${i}`).textContent = '';
  }
  document.getElementById("finalScore").innerHTML = '';
  document.getElementById("retryBtn").style.display = 'none';
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