// Intenta obtener el número de intentos globales del almacenamiento local
let globalAttempts = Number(localStorage.getItem('globalAttempts'));
if (isNaN(globalAttempts)) globalAttempts = 0;

const maxGlobalAttempts = 5;
let currentCompleted = {};
let verifiedCount = 0;

// Reinicia los valores para un nuevo intento
function resetState() {
  currentCompleted = {
    120: null,
    60: null,
    70: null,
    80: null
  };
  verifiedCount = 0;

  [120, 60, 70, 80].forEach(num => {
    document.getElementById(`input${num}`).value = '';
    document.getElementById(`input${num}`).disabled = false;
    document.querySelector(`#ex${num} button`).disabled = false;
    document.getElementById(`result${num}`).textContent = '';
  });

  document.getElementById("finalScore").innerHTML = '';
  document.getElementById("retryBtn").style.display = 'none';
}

function checkDescending(start, end) {
  if (currentCompleted[start] !== null) return; // Ya verificado este número

  const input = document.getElementById(`input${start}`);
  const userInput = input.value.trim();
  const correct = Array.from({ length: start - end + 1 }, (_, i) => start - i).join(" ");
  const resultDiv = document.getElementById(`result${start}`);

  if (userInput === correct) {
    resultDiv.textContent = "✅ ¡Correcto!";
    resultDiv.style.color = "green";
    currentCompleted[start] = true;
  } else {
    resultDiv.textContent = "❌ Incorrecto.";
    resultDiv.style.color = "red";
    currentCompleted[start] = false;
  }

  // Bloquear campo y botón después de verificar
  input.disabled = true;
  document.querySelector(`#ex${start} button`).disabled = true;

  verifiedCount++;

  if (verifiedCount === 4) {
    globalAttempts++;
    showScore();
  }
}

// Muestra el puntaje final e intenta guardar la calificación en el servidor
function showScore() {
  const score = Object.values(currentCompleted).filter(v => v === true).length;
  const grade = Math.round((score / 4) * 10);
  const id_ejercicio = 1; // ID fijo del ejercicio
  const fecha = new Date().toISOString().split('T')[0];


  fetch('/ejercicios_numeros/ema/guardar-calificacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: grade,
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

  let message = `Intento ${globalAttempts} de ${maxGlobalAttempts}. Calificación: <strong>${grade}/10</strong> (${score} de 4 ejercicios correctos).`;
  document.getElementById("finalScore").innerHTML = message;

  if (globalAttempts < maxGlobalAttempts) {
    document.getElementById("retryBtn").style.display = "inline-block";
  } else {
    document.getElementById("retryBtn").style.display = "none";
    document.getElementById("finalScore").innerHTML += "<br>❌ Ya no puedes volver a intentar.";
  }

  if (globalAttempts >= maxGlobalAttempts) {
    localStorage.removeItem('globalAttempts');  // Limpia si ya no hay más intentos
  }
}

// Permite reintentar si hay intentos disponibles
function retry() {
  if (globalAttempts < maxGlobalAttempts) {
    resetState();
  }
}

// Inicializa todo
resetState();

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
