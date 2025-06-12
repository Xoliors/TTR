let globalAttempts = parseInt(localStorage.getItem('globalAttempts')) || 0;
let lastAttemptDate = localStorage.getItem('lastAttemptDate');
const today = new Date().toISOString().split('T')[0];
const id_ejercicio = 12;

// Si la fecha cambió, reiniciar intentos
if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem('globalAttempts', globalAttempts);
    localStorage.setItem('lastAttemptDate', today);
}

// Función para actualizar el mensaje de intentos y calificación
function actualizarMensaje(calificacion = '') {
    let msgBox = document.getElementById('mensajeIntentosCalificacion');
    if (!msgBox) {
        // Crear caja si no existe
        msgBox = document.createElement('div');
        msgBox.id = 'mensajeIntentosCalificacion';
        msgBox.style.marginTop = '10px';

        // Estilos para cuadro transparente con borde sutil
        msgBox.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; // fondo blanco con transparencia
        msgBox.style.border = '1px solid rgba(255, 255, 255, 0.3)'; // borde sutil blanco semi-transparente
        msgBox.style.borderRadius = '8px';
        msgBox.style.padding = '8px 12px';
        msgBox.style.color = 'red'; // texto blanco para contraste (ajustar si fondo cambia)
        msgBox.style.fontWeight = '500';
        msgBox.style.fontSize = '14px';
        msgBox.style.textAlign = 'center';
        msgBox.style.width = 'fit-content';
        msgBox.style.margin = '10px auto 0 auto'; // centrado horizontal con margen arriba

        const verificarBtn = document.getElementById('verificarBtn');
        verificarBtn.insertAdjacentElement('afterend', msgBox);
    }
    msgBox.innerHTML = `Intento ${globalAttempts} de 5` + (calificacion !== '' ? ` | Calificación: ${calificacion}/10` : '');
}


// Crear botón Reintentar debajo de Verificar (solo si no existe)
function crearBotonReintentar() {
    if (document.getElementById('btnReintentar')) return;

    const btnReintentar = document.createElement('button');
    btnReintentar.id = 'btnReintentar';
    btnReintentar.className = 'but';
    btnReintentar.innerText = 'Reintentar';
    btnReintentar.style.marginTop = '10px';
    btnReintentar.onclick = reiniciar;

    const verificarBtn = document.getElementById('verificarBtn');
    verificarBtn.insertAdjacentElement('afterend', btnReintentar);
    btnReintentar.style.display = 'none'; // oculto inicialmente
}
// Permitir que los elementos sean arrastrados
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

// Permitir que los recuadros reciban el elemento arrastrado
function allowDrop(ev) {
    ev.preventDefault();
}
// Función para soltar el elemento en el recuadro y contar
function drop(ev, recuadroId, goal) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let droppedItem = document.getElementById(data);

    // Verifica si el item ya está dentro del recuadro
    let recuadro = document.getElementById(recuadroId);

    // Clonamos el item para permitir agregar más de un elemento
    let clonedItem = droppedItem.cloneNode(true);
    clonedItem.style.position = "relative"; // Asegura que los elementos se ubiquen de forma flexible
    clonedItem.setAttribute("draggable", "false"); // Hace que el item dentro del recuadro no sea arrastrable
    clonedItem.onclick = function () { eliminarElemento(clonedItem, recuadro); }; // Añadir función de eliminación

    // Añadir el elemento al recuadro
    recuadro.appendChild(clonedItem);
}

// Función para eliminar el último elemento dentro del recuadro
function eliminarElemento(recuadroId) {
    let recuadro = document.getElementById(recuadroId);

    // Verifica si el recuadro tiene al menos un hijo
    if (recuadro.hasChildNodes()) {
        recuadro.removeChild(recuadro.lastChild); // Eliminar el último elemento
    }
}

// Verificar respuestas y enviar calificación
async function verificar() {
    if (globalAttempts >= 5) {
        Swal.fire({
            icon: 'warning',
            title: '¡Sin intentos!',
            text: 'Ya has usado los 5 intentos de hoy.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    globalAttempts++;
    localStorage.setItem('globalAttempts', globalAttempts);
    localStorage.setItem('lastAttemptDate', today);

    let correctos = 0;
    if (document.getElementById("recuadro1").childElementCount === 16) correctos++;
    if (document.getElementById("recuadro2").childElementCount === 9) correctos++;
    if (document.getElementById("recuadro3").childElementCount === 12) correctos++;
    if (document.getElementById("recuadro4").childElementCount === 7) correctos++;
    if (document.getElementById("recuadro5").childElementCount === 21) correctos++;

    let calificacion = correctos * 2;

    await Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${correctos}/10.`,
        confirmButtonText: 'Aceptar'
    }).then(() => {
        mostrarMensajeMotivacional(correctos.toFixed(1));
      });

    actualizarMensaje(calificacion);

    // Enviar datos
    const fecha = new Date().toISOString().split('T')[0];
    try {
        await fetch('/ejercicios_numeros/fiesta/guardar-calificacion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                intento: globalAttempts,
                calificacion: correctos,
                id_ejercicio,
                fecha
            })
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error al guardar',
            text: 'Hubo un problema al guardar tu calificación.',
            confirmButtonText: 'Aceptar'
        });
    }

    if (globalAttempts >= 5) {
        bloquearInteraccion();
        document.getElementById('btnReintentar').style.display = 'inline-block';
    }
}

// Reiniciar ejercicio y permitir intentar de nuevo
function reiniciar() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`recuadro${i}`).innerHTML = '';
        document.getElementById(`recuadro${i}`).classList.remove('bloqueado');
    }

    document.getElementById("verificarBtn").classList.remove("bloqueado");
    document.getElementById('btnReintentar').style.display = 'none';
    actualizarMensaje('');
}

// Al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    crearBotonReintentar();
    actualizarMensaje();

    if (globalAttempts >= 5) {
        bloquearInteraccion();
        document.getElementById('btnReintentar').style.display = 'inline-block';
    }
});

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

  const cero = [
  "Todos empezamos desde cero, lo importante es seguir intentando.",
  "No te preocupes, fallar es parte del proceso de aprender.",
  "Hoy no fue tu día, pero puedes hacerlo mucho mejor, sigue practicando.",
  "¡No te rindas! Cada error te acerca más al acierto.",
  "Es solo el comienzo, lo importante es que sigas aprendiendo.",
  "Los grandes logros comienzan con pequeños pasos, ¡inténtalo de nuevo!",
  "Aprender toma tiempo, lo lograrás con práctica.",
  "Un tropiezo no define tu camino. ¡Ánimo!",
  "A veces fallar nos enseña más que acertar. ¡Sigue adelante!",
  "Tener 0 hoy no significa que no puedas tener 10 mañana. ¡Confía en ti!"
];

  if (calificacion === 0) {
    mensaje = cero[Math.floor(Math.random() * cero.length)];
  } else if (calificacion >= 1 && calificacion <= 5) {
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