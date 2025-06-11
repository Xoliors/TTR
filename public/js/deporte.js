let id_ejercicio = 25;
let today = new Date().toISOString().split("T")[0];
let intentosMaximos = 5;

let lastAttemptDateKey = `lastAttemptDate_${id_ejercicio}`;
let globalAttemptsKey = `globalAttempts_${id_ejercicio}`;

let lastAttemptDate = localStorage.getItem(lastAttemptDateKey) || "";
let globalAttempts = parseInt(localStorage.getItem(globalAttemptsKey)) || 0;

// Si es un nuevo día, reiniciar intentos
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(lastAttemptDateKey, today);
  localStorage.setItem(globalAttemptsKey, globalAttempts);
}

let intentos = intentosMaximos - globalAttempts;
let bloqueado = (intentos <= 0);

// Mostrar intentos restantes
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("intentosRestantes").textContent = intentos;
  if (bloqueado) document.getElementById("btnReiniciar").disabled = true;
});

function crearCasillas(idContenedor, cantidad) {
  const contenedor = document.getElementById(idContenedor);
  contenedor.innerHTML = "";
  for (let i = 0; i < cantidad; i++) {
    const zona = document.createElement("span");
    zona.className = "dropzone";
    zona.ondrop = drop;
    zona.ondragover = allowDrop;
    contenedor.appendChild(zona);
  }
}

function allowDrop(ev) {
  if (!bloqueado) ev.preventDefault();
}

function drag(ev) {
  if (!bloqueado) ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  if (!bloqueado) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    const original = document.getElementById(id);
    const clone = original.cloneNode(true);
    clone.removeAttribute("id");
    clone.setAttribute("draggable", "false");
    clone.classList.remove("draggable");
    ev.target.innerHTML = "";
    ev.target.appendChild(clone);
  }
}

function calificar() {
  if (bloqueado) return;

  let gallinas = document.querySelectorAll("#zonaGallinas .dropzone");
  let cisnes = document.querySelectorAll("#zonaCisnes .dropzone");
  let arboles = document.querySelectorAll("#zonaArboles .dropzone");
  let flores = document.querySelectorAll("#zonaFlores .dropzone");

  let gallinasUsadas = 0, cisnesUsados = 0, arbolesUsados = 0, floresUsadas = 0;

  gallinas.forEach(z => { if (z.textContent === "⚽️") gallinasUsadas++; });
  cisnes.forEach(z => { if (z.textContent === "⚽️") cisnesUsados++; });
  arboles.forEach(z => { if (z.textContent === "🌳") arbolesUsados++; });
  flores.forEach(z => { if (z.textContent === "🌸") floresUsadas++; });

  let correctas = 0;

  if (gallinasUsadas === 6) {
    document.getElementById("iconGallinas").textContent = "✅";
    correctas++;
  } else {
    document.getElementById("iconGallinas").textContent = "❌";
  }

  if (cisnesUsados === 9) {
    document.getElementById("iconCisnes").textContent = "✅";
    correctas++;
  } else {
    document.getElementById("iconCisnes").textContent = "❌";
  }

  if (arbolesUsados === 5) {
    document.getElementById("iconArboles").textContent = "✅";
    correctas++;
  } else {
    document.getElementById("iconArboles").textContent = "❌";
  }

  if (floresUsadas === 4) {
    document.getElementById("iconFlores").textContent = "✅";
    correctas++;
  } else {
    document.getElementById("iconFlores").textContent = "❌";
  }

  const calificacion = (correctas / 4) * 10;
  document.getElementById("mensajeResultado").textContent = `Calificación: ${calificacion}`;

  globalAttempts++;
  localStorage.setItem(globalAttemptsKey, globalAttempts);

  intentos = intentosMaximos - globalAttempts;
  document.getElementById("intentosRestantes").textContent = intentos;

  // Enviar resultado
  fetch('/ejercicios_numeros/deporte/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion,
      id_ejercicio,
      fecha: today
    })
  });

  Swal.fire({
    icon: 'success',
    title: '¡Calificación registrada!',
    text: `Tu calificación fue de ${calificacion}/10.`,
    confirmButtonText: 'Aceptar'
  }).then(() => {
      mostrarMensajeMotivacional(calificacion.toFixed(1));
  });
  // Bloquear si se agotaron
  if (intentos <= 0) {
    bloqueado = true;
    document.getElementById("btnReiniciar").disabled = true;
  }

  document.getElementById("btnCalificar").disabled = true;
}

function reiniciar() {
  if (intentos > 0) {
    // Reiniciar zonas y estado
    document.querySelectorAll('.dropzone').forEach(zone => zone.innerHTML = '');
    document.getElementById("mensajeResultado").textContent = '';
    document.getElementById("iconGallinas").textContent = '';
    document.getElementById("iconCisnes").textContent = '';
    document.getElementById("iconArboles").textContent = '';
    document.getElementById("iconFlores").textContent = '';
    bloqueado = false;
    document.getElementById("btnCalificar").disabled = false;
  } else {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Has alcanzado el número máximo de intentos para hoy.',
      confirmButtonText: 'Aceptar'
    });
    document.getElementById("btnReiniciar").disabled = true;
  }
}

window.onload = function () {
  crearCasillas("zonaGallinas", 16);
  crearCasillas("zonaCisnes", 16);
  crearCasillas("zonaArboles", 16);
  crearCasillas("zonaFlores", 16);
};

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