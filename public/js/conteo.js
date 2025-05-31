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
