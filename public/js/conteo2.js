let intentos = 0;
const maxIntentos = 5;

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
    intentos++;
    let correctos = 0;
    if (document.getElementById("recuadro1").childElementCount === 50) correctos++;
    if (document.getElementById("recuadro2").childElementCount === 53) correctos++;
    if (document.getElementById("recuadro3").childElementCount === 62) correctos++;
    if (document.getElementById("recuadro4").childElementCount === 50) correctos++;
    if (document.getElementById("recuadro5").childElementCount === 40) correctos++;

    const calificacion = (correctos / 5) * 10;
    const mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = `Calificación: ${calificacion.toFixed(1)} / 10`;

    if (intentos >= maxIntentos || correctos === 5) {
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