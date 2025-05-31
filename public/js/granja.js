const id_ejercicio = 24;
const today = new Date().toISOString().split("T")[0];

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

let bloqueado = false;

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

  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'warning',
      title: '¡Has alcanzado el número máximo de intentos!',
      text: 'Inténtalo de nuevo mañana.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  let gallinas = document.querySelectorAll("#zonaGallinas .dropzone");
  let cisnes = document.querySelectorAll("#zonaCisnes .dropzone");
  let gallinasUsadas = 0;
  let cisnesUsados = 0;

  gallinas.forEach(z => { if (z.textContent === "🐔") gallinasUsadas++; });
  cisnes.forEach(z => { if (z.textContent === "🦢") cisnesUsados++; });

  let correctas = 0;

  if (gallinasUsadas === 9) {
    document.getElementById("iconGallinas").textContent = "✅";
    correctas++;
  } else {
    document.getElementById("iconGallinas").textContent = "❌";
  }

  if (cisnesUsados === 7) {
    document.getElementById("iconCisnes").textContent = "✅";
    correctas++;
  } else {
    document.getElementById("iconCisnes").textContent = "❌";
  }

  const calificacion = (correctas / 2) * 10;
  document.getElementById("mensajeResultado").textContent = `Calificación: ${calificacion}`;

  // Incrementar e insertar intentos
  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  const fecha = today;

  fetch('/ejercicios_numeros/granja/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion,
      id_ejercicio,
      fecha
    })
  }).then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${calificacion}/10.`,
      confirmButtonText: 'Aceptar'
    });
  });

  bloqueado = true;
  document.getElementById("btnCalificar").disabled = true;

  if (globalAttempts >= 5) {
    document.getElementById("btnReiniciar").disabled = true;
  }
}

function reiniciar() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'warning',
      title: '¡Límite de intentos alcanzado!',
      text: 'Ya no puedes intentar más hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  document.querySelectorAll('.dropzone').forEach(zone => zone.innerHTML = '');

  document.getElementById("mensajeResultado").textContent = '';
  document.getElementById("iconGallinas").textContent = '';
  document.getElementById("iconCisnes").textContent = '';

  bloqueado = false;
  document.getElementById("btnCalificar").disabled = false;
}

window.onload = function () {
  crearCasillas("zonaGallinas", 16);
  crearCasillas("zonaCisnes", 16);
  document.getElementById("intentosRestantes").textContent = 5 - globalAttempts;
};
