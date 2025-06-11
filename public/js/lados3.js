let figuraArrastrada = null;
let id_ejercicio = 28;
let today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;
const maxIntentos = 5;
const fecha = today;

// Reiniciar contador si cambia de día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

// Mostrar intentos al cargar
document.addEventListener("DOMContentLoaded", () => {
  actualizarIntentosUI();
});

// Drag & Drop
document.querySelectorAll('.figura').forEach(figura => {
  figura.addEventListener('dragstart', ev => {
    figuraArrastrada = figura;
  });
});

function allowDrop(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.add("over");
}

function drop(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.remove("over");
  if (figuraArrastrada) {
    figuraArrastrada.setAttribute("draggable", "false");
    ev.currentTarget.appendChild(figuraArrastrada);
    figuraArrastrada = null;

    // Ocultar menú si ya no hay figuras
    const figurasContainer = document.getElementById("figuras");
    if (figurasContainer.children.length === 0) {
      figurasContainer.style.display = "none";
    }
  }
}

function verificar() {
  if (globalAttempts >= maxIntentos) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const total = 15;
  let correctas = 0;

  const categorias = document.querySelectorAll(".categoria");
  categorias.forEach(cat => {
    const tipo = cat.getAttribute("data-clasificacion");
    const imgs = cat.querySelectorAll("img");

    imgs.forEach(img => {
      if (img.getAttribute("data-clasificacion") === tipo) {
        correctas++;
      }
    });
  });

  const calificacion = Math.round((correctas / total) * 10);
  document.getElementById("resultado").innerText = `Calificación: ${calificacion}/10`;

  // Incrementar intentos
  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  actualizarIntentosUI();

  // Enviar calificación al servidor
  fetch('/ejercicios_tercero/lados3/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion,
      id_ejercicio,
      fecha
    })
  }).then(res => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${calificacion}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(calificacion);
    });
  }).catch(err => {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo registrar la calificación.',
      confirmButtonText: 'Aceptar'
    });
  });
}

function reiniciarJuego() {
  // Recargar la página para reiniciar la actividad
  location.reload();
}

function actualizarIntentosUI() {
  const restantes = Math.max(0, maxIntentos - globalAttempts);
  document.getElementById("intentos").innerText = `Intentos restantes: ${restantes}`;
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