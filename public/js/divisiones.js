const id_ejercicio = 38;
const today = new Date().toISOString().split("T")[0];
const keyDate = `lastAttemptDate_${id_ejercicio}`;
const keyAttempts = `globalAttempts_${id_ejercicio}`;
let lastAttemptDate = localStorage.getItem(keyDate) || "";
let globalAttempts = parseInt(localStorage.getItem(keyAttempts)) || 0;
const maxIntentos = 5;

// Reiniciar intentos si es un nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(keyDate, today);
  localStorage.setItem(keyAttempts, globalAttempts);
}

// Si ya se alcanzaron los intentos, bloquear campos
if (globalAttempts >= maxIntentos) {
  Swal.fire({
    icon: 'info',
    title: 'Has alcanzado el máximo de intentos por hoy.',
    text: 'Podrás intentarlo nuevamente mañana.',
    confirmButtonText: 'Aceptar'
  });
  bloquearCampos();
}

function verificar() {
  if (globalAttempts >= maxIntentos) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos disponibles!',
      text: 'Has alcanzado el número máximo de intentos para hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  let total = 0;
  let correctos = 0;

  document.querySelectorAll('.ejercicio').forEach(ejercicio => {
    const respuestas = ejercicio.dataset.respuesta.split(',').map(Number);
    const inputs = ejercicio.querySelectorAll('input');
    total += respuestas.length;

    inputs.forEach((input, i) => {
      const valor = parseInt(input.value);
      if (valor === respuestas[i]) {
        input.classList.add('correcto');
        input.classList.remove('incorrecto');
        correctos++;
      } else {
        input.classList.add('incorrecto');
        input.classList.remove('correcto');
      }
    });
  });

  const finalScore = Math.round((correctos / total) * 10);
  const fecha = today;

  Swal.fire({
    icon: 'success',
    title: '¡Calificación registrada!',
    text: `Tu calificación fue de ${finalScore}/10.`,
    confirmButtonText: 'Aceptar'
  }).then(() => {
      mostrarMensajeMotivacional(finalScore.toFixed(1));
  });

  // Enviar calificación al servidor
  fetch("/ejercicios_segundo/divisiones/guardar-calificacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      intento: globalAttempts + 1,
      calificacion: finalScore,
      id_ejercicio,
      fecha
    })
  });

  globalAttempts++;
  localStorage.setItem(keyAttempts, globalAttempts);

  document.getElementById('resultado').textContent = `Intento ${globalAttempts}: Tu calificación es ${finalScore} / 10`;

  document.getElementById('verificarBtn').disabled = true;
  document.getElementById('intentarBtn').style.display = (globalAttempts < maxIntentos) ? "block" : "none";

  if (globalAttempts >= maxIntentos) {
    bloquearCampos();
    document.getElementById('resultado').textContent += " — Has alcanzado el número máximo de intentos.";
  }
}

function intentarDeNuevo() {
  document.querySelectorAll('input').forEach(input => {
    input.value = "";
    input.classList.remove('correcto', 'incorrecto');
  });
  document.getElementById('verificarBtn').disabled = false;
  document.getElementById('intentarBtn').style.display = "none";
  document.getElementById('resultado').textContent = "";
}

function bloquearCampos() {
  document.querySelectorAll('input').forEach(input => {
    input.disabled = true;
  });
  document.getElementById('verificarBtn').disabled = true;
  document.getElementById('intentarBtn').disabled = true;
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