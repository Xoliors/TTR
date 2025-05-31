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