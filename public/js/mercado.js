const MAX_ATTEMPTS = 5;
let globalAttempts = Number(localStorage.getItem('mercadoAttempts'));
if (isNaN(globalAttempts)) globalAttempts = 0;

let fruitCount = 0;

function generateFruits() {
  fruitCount = Math.floor(Math.random() * 21) + 10;
  const fruitsDiv = document.getElementById("fruits");
  fruitsDiv.innerHTML = "";
  for (let i = 0; i < fruitCount; i++) {
    const fruit = document.createElement("span");
    fruit.textContent = "🍎";
    fruitsDiv.appendChild(fruit);
  }

  // Muestra intento actual si ya hubo intentos
  if (globalAttempts > 0) {
    document.getElementById("resultText").innerHTML = `Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;
  }
}

function checkAnswers() {
  const count = parseInt(document.getElementById("countInput").value.trim());
  const group5 = parseInt(document.getElementById("group5Input").value.trim());
  const group10 = parseInt(document.getElementById("group10Input").value.trim());
  const sticks = document.getElementById("stickInput").value.trim();

  let correct = 0;
  if (count === fruitCount) correct++;
  if (group5 === Math.floor(fruitCount / 5)) correct++;
  if (group10 === Math.floor(fruitCount / 10)) correct++;
  if (sticks === "|".repeat(fruitCount)) correct++;

  const grade = Math.round((correct / 4) * 10);
  globalAttempts++;
  localStorage.setItem('mercadoAttempts', globalAttempts); // Guardar intento

  // Guardar calificación en el servidor
  fetch('/ejercicios_numeros/mercado/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: grade,
      id_ejercicio: 3, // Cambia este ID si aplica
      fecha: new Date().toISOString().split('T')[0]
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
      text: `Tu calificación fue de ${grade}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(grade.toFixed(1));
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

  let result = `✅ Respuestas correctas: ${correct}/4<br>📊 Calificación: <strong>${grade}/10</strong><br>Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;

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
    localStorage.removeItem('mercadoAttempts');
  }
}

function disableInputs() {
  ["countInput", "group5Input", "group10Input", "stickInput"].forEach(id => {
    document.getElementById(id).disabled = true;
  });
}

function enableInputs() {
  ["countInput", "group5Input", "group10Input", "stickInput"].forEach(id => {
    document.getElementById(id).disabled = false;
    document.getElementById(id).value = "";
  });
}

function retry() {
  if (globalAttempts < MAX_ATTEMPTS) {
    generateFruits();
    enableInputs();
    document.getElementById("resultText").innerHTML = `Intento ${globalAttempts} de ${MAX_ATTEMPTS}`;
    document.getElementById("retryBtn").style.display = "none";
  }
}

// Inicializa
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