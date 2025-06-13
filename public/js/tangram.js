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
    }).then(() => {
        mostrarMensajeMotivacional(calificacion.toFixed(1));
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

function reiniciar() {
  ['c1','c2','c3','c4','c5','c6','c7','r1','r2','r3','r4','r5','r6','r7','r8','r9']
    .forEach(id => document.getElementById(id).value = '');
  for (let i = 1; i <= 16; i++) {
    const span = document.getElementById('check' + i);
    span.textContent = '';
    span.style.color = '';
  }
  document.getElementById('nota').textContent = '';
  document.getElementById('verifBtn').disabled = false;
  document.getElementById('reinBtn').style.display = 'none';
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