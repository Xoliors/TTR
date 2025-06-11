let intentos = 0;
let globalAttempts = 0;
const maxIntentos = 5;

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
    if (intentos >= maxIntentos) {
        Swal.fire({
            icon: 'info',
            title: 'Límite de intentos alcanzado',
            text: 'No puedes intentar de nuevo hasta mañana.'
        });
        return;  // Sale para no hacer nada más
    }

    intentos++;
    globalAttempts++;

    let correctos = 0;
    const expected = [25, 30, 28, 30, 42];
    const recuadros = ["recuadro1", "recuadro2", "recuadro3", "recuadro4", "recuadro5"];

    recuadros.forEach((id, idx) => {
        if (document.getElementById(id).childElementCount === expected[idx]) correctos++;
    });

    const score = Math.round((correctos / 5) * 10);
    const mensaje = document.getElementById("mensaje");

    const attemptResult = `
      <div class="attempt-result">
        <strong>Intento ${globalAttempts}: ${score === 10 ? '✅ Correcto' : score >= 6 ? '⚠️ Parcial' : '❌ Incorrecto'}</strong><br>
        Aciertos: ${correctos} de 5<br><br>
        Calificación del intento: <strong>${score}</strong>
      </div>
    `;

    // Mostrar resultado solo si no se completó todo o no se agotaron los intentos
    if (intentos < maxIntentos) {
        mensaje.innerHTML = attemptResult;
    } else {
        mensaje.innerHTML = "";
    }

    // Enviar calificación al servidor
    const id_ejercicio = 9;
    const fecha = new Date().toISOString().split('T')[0];

    fetch('/ejercicios_numeros/picnic/guardar-calificacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCsrfToken()
        },
        body: JSON.stringify({
            intento: globalAttempts,
            calificacion: score,
            id_ejercicio,
            fecha
        })
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al guardar la calificación.");
        return response.json();
    })
    .then(data => {
        Swal.fire({
            icon: score === 10 ? 'success' : score >= 6 ? 'warning' : 'error',
            title: score === 10 ? '¡Correcto!' : score >= 6 ? 'Casi lo logras...' : 'Incorrecto',
            html: attemptResult,
            confirmButtonText: 'OK'
        })
        .then(() => {
            mostrarMensajeMotivacional(score.toFixed(1));
        });
    })
    .catch(error => {
        Swal.fire({
            icon: 'info',
            title: 'Límite de intentos alcanzado',
            text: 'No puedes intentar de nuevo hasta mañana.'
        });
        console.error("Error:", error);
    });

    if (intentos >= maxIntentos) {
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

function getCsrfToken() {
    const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
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