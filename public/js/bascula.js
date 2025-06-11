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