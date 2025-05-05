let intentos = 5;
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

  bloqueado = true;
  document.getElementById("btnCalificar").disabled = true;
}

function reiniciar() {
  if (intentos > 1) {
    intentos--;
    document.getElementById("intentosRestantes").textContent = intentos;

    // Reiniciar zonas y restablecer todo
    document.querySelectorAll('.dropzone').forEach(zone => zone.innerHTML = '');

    document.getElementById("mensajeResultado").textContent = '';
    document.getElementById("iconGallinas").textContent = '';
    document.getElementById("iconCisnes").textContent = '';
    
    bloqueado = false;
    document.getElementById("btnCalificar").disabled = false;
  } else {
    alert("¡Has alcanzado el número máximo de intentos!");
    document.getElementById("btnReiniciar").disabled = true;
  }
}

window.onload = function() {
  crearCasillas("zonaGallinas", 16);
  crearCasillas("zonaCisnes", 16);
};