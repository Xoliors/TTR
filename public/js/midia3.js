const diasContainer = document.getElementById('dias-container');
const calendario = document.getElementById('calendario');
const guardarBtn = document.getElementById('guardar');
const reiniciarBtn = document.getElementById('reintentar');
const calificacionTexto = document.getElementById('calificacion');
const attemptsDiv = document.getElementById('attempts');

const id_ejercicio = 35;
const today = new Date().toISOString().split("T")[0];

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Resetear intentos si es un nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

// Mostrar intentos actuales
attemptsDiv.textContent = `Intentos hoy: ${globalAttempts}`;

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

// Crear inputs para cada día
diasSemana.forEach((nombre, i) => {
  const diaDiv = document.createElement('div');
  diaDiv.classList.add('dia');
  diaDiv.innerHTML = `<h3>🗓 ${nombre}</h3>`;
  for (let j = 1; j <= 6; j++) {
    const input = document.createElement('input');
    input.classList = 'caja';
    input.type = 'text';
    input.placeholder = `Actividad ${j}`;
    input.dataset.dia = i;
    diaDiv.appendChild(input);
  }
  diasContainer.appendChild(diaDiv);
});

function evaluarActividades() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const inputs = document.querySelectorAll('input[type="text"]');
  const actividadesPorDia = Array(diasSemana.length).fill(0);

  inputs.forEach(input => {
    if (input.value.trim() !== '') {
      const dia = parseInt(input.dataset.dia);
      actividadesPorDia[dia]++;
    }
  });

  const diasCompletos = actividadesPorDia.filter(act => act >= 4).length;
  const calificacion = (diasCompletos / diasSemana.length) * 10;

  calificacionTexto.textContent = `📊 Calificación: ${calificacion.toFixed(1)} / 10`;

  // Mostrar resumen
  calendario.innerHTML = '<h2>📘 Actividades Registradas</h2>';
  diasSemana.forEach((nombre, i) => {
    const div = document.createElement('div');
    div.classList.add('resultado-dia');
    div.innerHTML = `<strong>${nombre}:</strong><br>`;
    const actividades = Array.from(inputs)
      .filter(input => parseInt(input.dataset.dia) === i && input.value.trim() !== '');
    if (actividades.length > 0) {
      actividades.forEach(act => {
        div.innerHTML += `✅ ${act.value}<br>`;
      });
    } else {
      div.innerHTML += '❌ Sin actividades registradas.';
    }
    calendario.appendChild(div);
  });

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  attemptsDiv.textContent = `Intentos hoy: ${globalAttempts}`;

  if (globalAttempts >= 5) {
    guardarBtn.disabled = true;
    reiniciarBtn.style.display = 'none';
    calificacionTexto.textContent += ' 🔒 Ya no puedes intentar más veces.';
  } else {
    reiniciarBtn.style.display = 'inline-block';
  }

  // Enviar calificación
  fetch('/ejercicios_tercero/midia3/guardar-calificacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion.toFixed(1),
      id_ejercicio,
      fecha: today
    })
  })
  .then(response => response.json())
  .then(data => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${calificacion.toFixed(1)}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(calificacion.toFixed(1));
    });
  })
  .catch(error => {
    console.error('Error al guardar calificación:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar la calificación. Intenta más tarde.',
      confirmButtonText: 'Aceptar'
    });
  });
}

function reiniciar() {
  document.querySelectorAll('input[type="text"]').forEach(input => {
    input.value = '';
  });
  calificacionTexto.textContent = '';
  calendario.innerHTML = '';
  reiniciarBtn.style.display = 'none';
}

guardarBtn.onclick = evaluarActividades;
reiniciarBtn.onclick = reiniciar;

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