const id_ejercicio = 29;
const today = new Date().toISOString().split("T")[0];
const fecha = today;

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Si la fecha guardada no es hoy, reinicia intentos
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

// Actualiza el contador en pantalla
function updateAttemptsDisplay() {
  const attemptsDiv = document.getElementById("attempts");
  if (attemptsDiv) {
    attemptsDiv.innerText = `Intentos hoy: ${globalAttempts} / 5`;
  }
}

// Mostrar u ocultar botón reintentar
function toggleRetryButton(show) {
  const retryBtn = document.getElementById("reintentar");
  if (!retryBtn) return;
  retryBtn.style.display = show ? "inline-block" : "none";
}

// Al cargar DOM
document.addEventListener("DOMContentLoaded", () => {
  updateAttemptsDisplay();
  toggleRetryButton(false);
});

// Manejar submit del form
document.getElementById("quizForm").addEventListener("submit", function(e) {
  e.preventDefault();

  if (globalAttempts >= 5) {
    Swal.fire({
      icon: "error",
      title: "¡Sin intentos disponibles!",
      text: "Has alcanzado el número máximo de intentos para hoy. Vuelve mañana.",
      confirmButtonText: "Aceptar"
    });
    return;
  }

  const respuestasCorrectas = ["Círculo", "Triángulo", "Trapecio", "Cuadrado", "Pentágono"];
  const seleccionadas = [...document.querySelectorAll("input[name='figura']:checked")].map(cb => cb.value);
  const lados = parseInt(document.getElementById("lados").value);
  let aciertos = 0;

  respuestasCorrectas.forEach(r => {
    if (seleccionadas.includes(r)) aciertos++;
  });

  if (lados === 28) aciertos++;

  const calificacion = (aciertos / 6) * 10;

  // Incrementar intentos y guardar en localStorage
  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);

  updateAttemptsDisplay();

  // Enviar calificación al backend
  fetch("/ejercicios_segundo/tangram/guardar-calificacion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion,
      id_ejercicio,
      fecha
    })
  })
  .then(response => {
    if (!response.ok) throw new Error("Error en la respuesta del servidor");
    return response.json();
  })
  .then(() => {
    Swal.fire({
      icon: "success",
      title: "¡Calificación registrada!",
      text: `Tu calificación fue de ${calificacion.toFixed(1)}/10.`,
      confirmButtonText: "Aceptar"
    });

    document.getElementById("resultado").textContent = `Calificación: ${calificacion.toFixed(1)} / 10`;

    if (globalAttempts < 5) {
      toggleRetryButton(true);
    } else {
      toggleRetryButton(false);
      document.querySelector("button[type='submit']").disabled = true;
      Swal.fire({
        icon: "info",
        title: "Intentos agotados",
        text: "Ya no tienes más intentos para hoy. Vuelve mañana.",
        confirmButtonText: "Aceptar"
      });
    }
  })
  .catch(() => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo registrar tu calificación.",
      confirmButtonText: "Aceptar"
    });
  });
});

// Evento para botón reintentar
document.getElementById("reintentar").addEventListener("click", function() {
  document.getElementById("quizForm").reset();
  document.getElementById("resultado").textContent = "";
  toggleRetryButton(false);
  document.querySelector("button[type='submit']").disabled = false;
});