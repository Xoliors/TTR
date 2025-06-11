const id_ejercicio = 8;
const maxIntentos = 5;
const today = new Date().toISOString().split("T")[0];

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

const datos = [
  { a: '🍎', cantidadA: 70, b: '🍌', cantidadB: 37, r: 107, opciones: [106, 108, 107, 100] },
  { a: '🍓', cantidadA: 128, b: '🥝', cantidadB: 66, r: 194, opciones: [190, 195, 194, 185] },
  { a: '🍌', cantidadA: 153, b: '🍉', cantidadB: 131, r: 284, opciones: [284, 280, 290, 273] },
  { a: '🍇', cantidadA: 192, b: '🍍', cantidadB: 71, r: 263, opciones: [260, 263, 270, 250] }
];

datos.forEach((dato, i) => {
  const ejercicio = document.createElement('div');
  ejercicio.className = 'ejercicio';
  const frutaA = Array.from({ length: dato.cantidadA }, () => `<span>${dato.a}</span>`).join('');
  const frutaB = Array.from({ length: dato.cantidadB }, () => `<span>${dato.b}</span>`).join('');
  ejercicio.innerHTML = `
    <div>
      <div class="cantidad">${dato.cantidadA} frutas</div>
      <div class="emoji-box">${frutaA}</div>
    </div>
    <div class="simbolo">+</div>
    <div>
      <div class="cantidad">${dato.cantidadB} frutas</div>
      <div class="emoji-box">${frutaB}</div>
    </div>
    <div class="simbolo">=</div>
    <div>
      <div class="drop-zone" id="drop${i}" ondrop="drop(event, ${i})" ondragover="allowDrop(event)"></div>
      <div id="feedback${i}"></div>
    </div>
    <div class="opciones">
      ${dato.opciones.map(num => `<div class="numero" draggable="true" ondragstart="drag(event)" data-value="${num}">${num}</div>`).join('')}
    </div>
  `;
  document.getElementById('ejercicios').appendChild(ejercicio);
});

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.getAttribute('data-value'));
}

function drop(ev, id) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const dropZone = document.getElementById("drop" + id);
  dropZone.textContent = data;
  dropZone.setAttribute("data-value", data);
}

function verificar() {
  if (document.getElementById("verificarBtn").disabled) return;

  if (globalAttempts >= maxIntentos) {
    Swal.fire({
      icon: 'warning',
      title: 'Límite de intentos alcanzado',
      text: 'Ya has usado los 5 intentos permitidos para hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  let aciertos = 0;
  datos.forEach((dato, i) => {
    const drop = document.getElementById("drop" + i);
    const feedback = document.getElementById("feedback" + i);
    feedback.innerHTML = "";
    if (drop.getAttribute("data-value") == dato.r) {
      aciertos++;
      drop.style.borderColor = 'green';
      feedback.innerHTML = '<span class="palomita">✔</span>';
    } else {
      drop.style.borderColor = 'red';
      feedback.innerHTML = '<span class="tache">✘</span>';
    }
  });

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  const calificacion = (aciertos / datos.length) * 10;
  const fecha = today;

  document.getElementById("resultadoFinal").textContent = `Intento ${globalAttempts} de ${maxIntentos}`;
  document.getElementById("calificacion").textContent = `Calificación: ${calificacion.toFixed(1)}`;

  fetch('/ejercicios_segundo/sume2/guardar-calificacion', {
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
  }).then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${calificacion.toFixed(1)}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
        mostrarMensajeMotivacional(calificacion.toFixed(1));
      });
  }).catch(() => {
    Swal.fire({
      icon: 'error',
      title: 'Error al guardar',
      text: 'Hubo un problema al registrar tu calificación.',
      confirmButtonText: 'Aceptar'
    });
  });

  document.getElementById("verificarBtn").disabled = true;
  document.getElementById("verificarBtn").classList.add("bloqueado");

  if (globalAttempts < maxIntentos) {
    document.getElementById("reiniciarBtn").style.display = "inline-block";
  }
}

function reiniciar() {
  if (globalAttempts >= maxIntentos) return;

  document.getElementById("verificarBtn").disabled = false;
  document.getElementById("verificarBtn").classList.remove("bloqueado");
  document.getElementById("resultadoFinal").textContent = '';
  document.getElementById("calificacion").textContent = '';
  document.getElementById("reiniciarBtn").style.display = "none";

  datos.forEach((_, i) => {
    const drop = document.getElementById("drop" + i);
    const feedback = document.getElementById("feedback" + i);
    drop.textContent = '';
    drop.removeAttribute("data-value");
    drop.style.borderColor = '#0288d1';
    feedback.innerHTML = '';
  });
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