const id_ejercicio = 9;
const today = new Date().toISOString().split("T")[0];
const fecha = today;

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

const maxIntentos = 5;

function actualizarContador() {
    document.getElementById("intentos").innerText = `Intentos: ${globalAttempts}/${maxIntentos}`;
}

actualizarContador();

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev, recuadroId, goal) {
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
            icon: 'warning',
            title: '¡Sin intentos!',
            text: 'Por el día de hoy haz terminado tus intentos',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
    actualizarContador();

    let correctos = 0;
    if (document.getElementById("recuadro1").childElementCount === 15) correctos++;
    if (document.getElementById("recuadro2").childElementCount === 27) correctos++;
    if (document.getElementById("recuadro3").childElementCount === 80) correctos++;
    if (document.getElementById("recuadro4").childElementCount === 100) correctos++;
    if (document.getElementById("recuadro5").childElementCount === 20) correctos++;

    const calificacion = (correctos / 5) * 10;
    const mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = `Calificación: ${calificacion.toFixed(1)} / 10`;

    fetch('/ejercicios_tercero/conteo3/guardar-calificacion', {
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
    });

    Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${calificacion.toFixed(1)}/10.`,
        confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(calificacion.toFixed(1));
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