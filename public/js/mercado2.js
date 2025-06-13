const id_ejercicio = 3;
const MAX_ATTEMPTS = 5;
let today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

let fruitCount = 0;

function generateFruits() {
  fruitCount = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
  const fruitsDiv = document.getElementById("fruits");
  fruitsDiv.innerHTML = "";

  let remainingFruits = fruitCount;
  let boxNumber = 1;

  while (remainingFruits > 0 || boxNumber <= 2) {
    const fruitBoxWrapper = document.createElement("div");
    fruitBoxWrapper.classList.add("fruit-box-wrapper");

    const boxLabel = document.createElement("div");
    boxLabel.classList.add("box-label");
    boxLabel.textContent = `Caja ${boxNumber++} (50 manzanas)`;

    const boxCount = document.createElement("div");
    boxCount.classList.add("box-count");
    boxCount.textContent = `${remainingFruits > 50 ? 50 : remainingFruits} manzanas`;

    const fruitBox = document.createElement("div");
    fruitBox.classList.add("fruit-box");

    let fruitCountInBox = Math.min(50, remainingFruits);
    for (let i = 0; i < fruitCountInBox; i++) {
      const fruit = document.createElement("span");
      fruit.textContent = "🍎";
      fruitBox.appendChild(fruit);
    }

    fruitBoxWrapper.appendChild(boxLabel);
    fruitBoxWrapper.appendChild(boxCount);
    fruitBoxWrapper.appendChild(fruitBox);

    fruitsDiv.appendChild(fruitBoxWrapper);
    remainingFruits -= fruitCountInBox;
  }
}

function checkAnswers() {
  if (globalAttempts >= MAX_ATTEMPTS) {
    Swal.fire({
      icon: 'error',
      title: 'Sin intentos disponibles',
      text: 'Ya has utilizado todos tus intentos para hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const count = parseInt(document.getElementById("countInput").value.trim());
  const group50 = parseInt(document.getElementById("group50Input").value.trim());
  const group20 = parseInt(document.getElementById("group20Input").value.trim());
  const group15 = parseInt(document.getElementById("group15Input").value.trim());
  const group10 = parseInt(document.getElementById("group10Input").value.trim());

  let correct = 0;
  if (count === fruitCount) correct++;
  if (group50 === Math.floor(fruitCount / 50)) correct++;
  if (group20 === Math.floor(fruitCount / 20)) correct++;
  if (group15 === Math.floor(fruitCount / 15)) correct++;
  if (group10 === Math.floor(fruitCount / 10)) correct++;

  const grade = Math.round((correct / 5) * 10);
  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  const fecha = today;

  fetch("/ejercicios_segundo/mercado2/guardar-calificacion", {
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
  });

  Swal.fire({
    icon: 'success',
    title: '¡Calificación registrada!',
    text: `Tu calificación fue de ${grade}/10.`,
    confirmButtonText: 'Aceptar'
  }).then(() => {
      mostrarMensajeMotivacional(grade.toFixed(1));
    });

  let result = `✅ Respuestas correctas: ${correct}/5<br>📊 Calificación: <strong>${grade}/10</strong><br>Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;
  if (grade === 10) {
    result += "<br>🎉 ¡Excelente! ¡Eres un experto contando frutas! 🍎🍎🍎";
  }

  document.getElementById("resultText").innerHTML = result;

  if (globalAttempts < MAX_ATTEMPTS) {
    document.getElementById("retryBtn").style.display = "inline-block";
  } else {
    document.getElementById("retryBtn").style.display = "none";
    document.getElementById("resultText").innerHTML += "<br>🚫 Ya no puedes volver a intentarlo.";
    disableInputs();
  }
}

function disableInputs() {
  ["countInput", "group50Input", "group20Input", "group15Input", "group10Input"].forEach(id => {
    document.getElementById(id).disabled = true;
  });
}

function enableInputs() {
  ["countInput", "group50Input", "group20Input", "group15Input", "group10Input"].forEach(id => {
    document.getElementById(id).disabled = false;
    document.getElementById(id).value = "";
  });
}

function retry() {
  if (globalAttempts < MAX_ATTEMPTS) {
    generateFruits();
    enableInputs();
    document.getElementById("resultText").innerHTML = "";
    document.getElementById("retryBtn").style.display = "none";
  }
}

generateFruits();

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