let intentosTotales = 0;
let verificado = false;
const maxIntentos = 5;
const id_ejercicio = 21;
const today = new Date().toISOString().split("T")[0];

// Obtener intentos y fecha del localStorage
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Si es un nuevo día, reiniciar intentos
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

// Controlar si ya se acabaron los intentos
if (globalAttempts >= maxIntentos) {
  Swal.fire({
    icon: 'warning',
    title: 'Límite de intentos alcanzado',
    text: 'Ya no puedes volver a intentarlo hoy.',
    confirmButtonText: 'Aceptar'
  });
  document.getElementById('verificar').disabled = true;
  document.getElementById('reiniciar').style.display = 'none';
}

function verificarRespuestas() {
  if (verificado || globalAttempts >= maxIntentos) return;

  const preguntas = document.querySelectorAll('.pregunta');
  let correctas = 0;

  preguntas.forEach((p) => {
    const correcta = p.dataset.respuesta;
    const seleccionada = p.querySelector('input[type="radio"]:checked');
    const opciones = p.querySelectorAll('input[type="radio"]');
    const texto = p.querySelector('p');

    texto.classList.remove('correcto', 'incorrecto');

    if (seleccionada) {
      if (seleccionada.value === correcta) {
        texto.classList.add('correcto');
        texto.textContent += " ✔";
        correctas++;
      } else {
        texto.classList.add('incorrecto');
        texto.textContent += " ✘";
      }
      opciones.forEach(op => op.disabled = true);
    }
  });

  const calificacion = (correctas / preguntas.length) * 10;
  document.getElementById('mensaje').textContent =
    correctas === preguntas.length
      ? "¡Excelente! Todas tus respuestas son correctas 🎉"
      : `Respuestas correctas: ${correctas} de ${preguntas.length}`;
  document.getElementById('calificacion').textContent = `Calificación: ${calificacion.toFixed(1)} / 10`;

  document.getElementById('verificar').disabled = true;
  verificado = true;
  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  const fecha = today;

  // Enviar calificación
  fetch('/ejercicios_numeros/itinerario/guardar-calificacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion.toFixed(1),
      id_ejercicio,
      fecha
    })
  })
  .then(response => {
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${calificacion.toFixed(1)}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
            mostrarMensajeMotivacional(calificacion.toFixed(1));
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: 'No se pudo guardar tu calificación.',
        confirmButtonText: 'Aceptar'
      });
    }
  });

  // Mostrar botón de reinicio si hay intentos restantes
  if (globalAttempts < maxIntentos) {
    document.getElementById('reiniciar').style.display = 'inline';
  } else {
    document.getElementById('mensaje').textContent += " 😓 Ya no puedes volver a intentarlo.";
    document.getElementById('reiniciar').style.display = 'none';
  }
}

function reiniciarIntento() {
  const preguntas = document.querySelectorAll('.pregunta');
  preguntas.forEach(p => {
    const radios = p.querySelectorAll('input[type="radio"]');
    radios.forEach(r => {
      r.disabled = false;
      r.checked = false;
    });
    const texto = p.querySelector('p');
    texto.classList.remove('correcto', 'incorrecto');
    texto.textContent = texto.textContent.replace(" ✔", "").replace(" ✘", "");
  });

  document.getElementById('mensaje').textContent = '';
  document.getElementById('calificacion').textContent = '';
  document.getElementById('verificar').disabled = false;
  document.getElementById('reiniciar').style.display = 'none';
  verificado = false;
}

document.getElementById('verificar').addEventListener('click', verificarRespuestas);
document.getElementById('reiniciar').addEventListener('click', reiniciarIntento);

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