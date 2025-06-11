const id_ejercicio = 31;
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Reinicia intentos si es un nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

document.getElementById("attempts").textContent = `Intentos hoy: ${globalAttempts}`;

const objetos = {
  huevo: 30,
  sandia: 4000,
  pan: 50,
  carne: 3000,
  champagne: 500,
  lapiz: 1,
  chile: 25,
  queso: 100,
  agua: 1000
};

const respuestas = {
  bascula1: 11655,
  bascula2: 15000,
  bascula3: 2700,
  bascula4: 17175,
  bascula5: 6830
};

let pesosActuales = {
  bascula1: 0,
  bascula2: 0,
  bascula3: 0,
  bascula4: 0,
  bascula5: 0
};

let objetosColocados = {
  bascula1: [],
  bascula2: [],
  bascula3: [],
  bascula4: [],
  bascula5: []
};

function permitirArrastre(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function permitirSoltar(event) {
  event.preventDefault();
}

function soltarObjeto(event, basculaId) {
  event.preventDefault();
  let objetoId = event.dataTransfer.getData("text");
  let peso = objetos[objetoId];

  pesosActuales[`bascula${basculaId}`] += peso;
  objetosColocados[`bascula${basculaId}`].push(objetoId);

  actualizarPeso(basculaId);
}

function actualizarPeso(basculaId) {
  const pesoElemento = document.getElementById(`peso${basculaId}`);
  if (pesoElemento) {
    const peso = pesosActuales[`bascula${basculaId}`];
    pesoElemento.textContent = peso >= 1000
      ? (peso / 1000).toFixed(3) + "kg"
      : peso + "g";
  }
}

function verificarRespuestas() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'warning',
      title: 'Límite alcanzado',
      text: 'Has alcanzado el número máximo de intentos para hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  document.getElementById("attempts").textContent = `Intentos hoy: ${globalAttempts}`;

  let calificacion = 0;

  Object.keys(respuestas).forEach(bascula => {
    const diferencia = Math.abs(respuestas[bascula] - pesosActuales[bascula]);
    if (diferencia < 100) calificacion++;
  });

  const calificacionFinal = (calificacion / 5) * 10;
  document.getElementById("resultado").textContent = `Calificación: ${calificacionFinal.toFixed(1)} / 10`;

  // Enviar datos al servidor
  fetch("/ejercicios_segundo/bascula/guardar-calificacion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacionFinal,
      id_ejercicio,
      fecha: today
    })
  })
  .then(res => res.json())
  .then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${calificacionFinal.toFixed(1)}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(calificacionFinal.toFixed(1));
    });
  })
  .catch(err => {
    Swal.fire({
      icon: 'error',
      title: 'Error al guardar',
      text: 'Ocurrió un error al guardar tu calificación.',
      confirmButtonText: 'Aceptar'
    });
  });
}

function reiniciarEjercicio() {
  pesosActuales = {
    bascula1: 0,
    bascula2: 0,
    bascula3: 0,
    bascula4: 0,
    bascula5: 0
  };
  objetosColocados = {
    bascula1: [],
    bascula2: [],
    bascula3: [],
    bascula4: [],
    bascula5: []
  };

  document.getElementById("resultado").textContent = '';
  for (let i = 1; i <= 5; i++) {
    actualizarPeso(i);
  }

  Swal.fire({
    icon: 'info',
    title: 'Reinicio',
    text: 'Puedes intentar nuevamente.',
    confirmButtonText: 'Aceptar'
  });
}

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