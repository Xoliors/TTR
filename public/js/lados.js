const id_ejercicio = 28;
const today = new Date().toISOString().split("T")[0];
const fecha = today;

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

// Actualiza la visualización de intentos al cargar la página
function updateAttemptsDisplay() {
    const attemptsDiv = document.getElementById("attempts");
    if (attemptsDiv) {
    attemptsDiv.innerText = `Intentos hoy: ${globalAttempts}`;
    } else {
    console.warn('No se encontró el elemento #attempts');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateAttemptsDisplay();
});

function checkAnswers() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'error',
      title: '¡Sin intentos disponibles!',
      text: 'Has alcanzado el número máximo de intentos para hoy. Vuelve mañana.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  let score = 0;
  const answers = {
    input1: "5",
    input2: "6",
    input3: "4",
    input4: "7",
    input5: "4",
    input6: "8",
    input7: "4",
    input8: "4",
    input9: "3"
  };

  const total = Object.keys(answers).length;
  for (let i = 1; i <= total; i++) {
    const input = document.getElementById(`input${i}`);
    let userAnswer = input.value.trim();
    if (userAnswer === answers[`input${i}`]) score++;
  }

  const grade = (score / total) * 10;

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  updateAttemptsDisplay(); // Actualiza el contador en pantalla

  fetch("/ejercicios_segundo/lados/guardar-calificacion", {
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
  .then(response => {
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${grade.toFixed(1)}/10.`,
        confirmButtonText: 'Aceptar'
      });
    } else {
      throw new Error("Error en la respuesta del servidor");
    }
  })
  .catch(() => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo registrar tu calificación.',
      confirmButtonText: 'Aceptar'
    });
  });
}

function retry() {
  for (let i = 1; i <= 9; i++) {
    document.getElementById(`input${i}`).value = "";
  }
  document.getElementById("result").innerText = "";
}

function resetAttempts() {
  Swal.fire({
    title: 'Ya no tienes intentos el día de hoy',
    text: "Sin intentos",
    icon: 'warning',
  });
}
