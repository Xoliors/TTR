const id_ejercicio = 9;
const maxIntentos = 5;
const today = new Date().toISOString().split("T")[0];

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

// Mostrar intentos en el HTML
const spanIntentos = document.getElementById("intentosSpan");
if (spanIntentos) spanIntentos.textContent = `Intentos disponibles: ${maxIntentos - globalAttempts}`;

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev, recuadroId) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const droppedItem = document.getElementById(data);
  const recuadro = document.getElementById(recuadroId);

  const clonedItem = droppedItem.cloneNode(true);
  clonedItem.setAttribute("draggable", "false");
  recuadro.appendChild(clonedItem);
}

function eliminarElemento(recuadroId) {
  const recuadro = document.getElementById(recuadroId);
  if (recuadro.hasChildNodes()) {
    recuadro.removeChild(recuadro.lastChild);
  }
}

function verificar() {
  if (globalAttempts >= maxIntentos) {
    Swal.fire({
      icon: 'error',
      title: '¡Sin intentos disponibles!',
      text: 'Has alcanzado el máximo de intentos para hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  if (spanIntentos) spanIntentos.textContent = `Intentos disponibles: ${maxIntentos - globalAttempts}`;

  let correctos = 0;
  if (document.getElementById("recuadro1").childElementCount === 50) correctos++;
  if (document.getElementById("recuadro2").childElementCount === 53) correctos++;
  if (document.getElementById("recuadro3").childElementCount === 62) correctos++;
  if (document.getElementById("recuadro4").childElementCount === 50) correctos++;
  if (document.getElementById("recuadro5").childElementCount === 40) correctos++;

  const calificacion = (correctos / 5) * 10;
  const mensaje = document.getElementById("mensaje");
  mensaje.innerHTML = `Calificación: ${calificacion.toFixed(1)} / 10`;

  fetch('/ejercicios_segundo/conteo2/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion.toFixed(1),
      id_ejercicio,
      fecha: today
    })
  });

  Swal.fire({
    icon: 'success',
    title: '¡Calificación registrada!',
    text: `Tu calificación fue de ${calificacion.toFixed(1)}/10.`,
    confirmButtonText: 'Aceptar'
  });

  if (globalAttempts >= maxIntentos || correctos === 5) {
    document.querySelectorAll("button, img").forEach(el => el.classList.add("bloqueado"));
    document.getElementById("verificarBtn").disabled = true;
  } else {
    document.getElementById("intentarBtn").style.display = "inline-block";
  }
}

function reiniciar() {
  document.querySelectorAll(".recuadro").forEach(recuadro => recuadro.innerHTML = "");
  document.getElementById("mensaje").innerHTML = "";
  document.getElementById("intentarBtn").style.display = "none";
}
