let intentos = 0;
const maxIntentos = 5;
const id_ejercicio = 15;
const rutaGuardar = '/ejercicios_numeros/jfiguras/guardar-calificacion';
const textosOriginalesDrop = {};

window.onload = () => {
    const drops = document.querySelectorAll('.drop-area');
    drops.forEach(drop => {
        textosOriginalesDrop[drop.id] = drop.innerHTML;
    });
    verificarFechaYActualizarIntentos();
};

function verificarFechaYActualizarIntentos() {
    const today = new Date().toISOString().split('T')[0];
    let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
    let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

    if (lastAttemptDate !== today) {
        intentos = 0;
        localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
        localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
    } else {
        intentos = parseInt(localStorage.getItem("intentosJFiguras") || "0");
    }

    actualizarIntentos();
    if (intentos >= maxIntentos) bloquearJuego();
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const droppedElement = document.getElementById(data);
    const dropTarget = event.target;

    if (dropTarget.classList.contains("drop-area")) {
        dropTarget.innerHTML = "";
        dropTarget.appendChild(droppedElement);
    }
}

function calificar() {
    if (intentos >= maxIntentos) {
        Swal.fire({
            icon: 'error',
            title: 'Límite alcanzado',
            text: 'Ya no tienes más intentos disponibles.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    const respuestas = {
        "dropLineaRecta": "lineaRecta",
        "dropLineaCurva": "lineaCurva",
        "dropCaraPlana": "caraPlana",
        "dropCaraCurva": "caraCurva",
        "dropCirculo": "circulo",
        "dropCuadrado": "cuadrado",
        "dropRombo": "rombo",
        "dropTriangulo": "triangulo",
        "dropVertice": "vertice",
        "dropTrapecio": "trapecio",
        "dropRectangulo": "rectangulo"
    };

    let correctAnswers = 0;
    for (let dropArea in respuestas) {
        const drop = document.getElementById(dropArea);
        const droppedElement = drop.firstChild;
        const droppedId = (droppedElement && droppedElement.classList?.contains('figura')) ? droppedElement.id : null;

        if (droppedId === respuestas[dropArea]) {
            correctAnswers++;
        }
    }

    const calificacion = (correctAnswers / 11) * 10;
    document.getElementById("resultado").innerText = `Tu calificación es: ${calificacion.toFixed(1)}`;

    intentos++;
    localStorage.setItem("intentosJFiguras", intentos.toString());

    if (intentos >= maxIntentos) bloquearJuego();

    const fecha = new Date().toISOString().split('T')[0];

    fetch(rutaGuardar, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            intento: intentos,
            calificacion: calificacion.toFixed(1),
            id_ejercicio,
            fecha
        })
    }).then(() => {
        Swal.fire({
            icon: 'success',
            title: '¡Calificación registrada!',
            text: `Tu calificación fue de ${calificacion.toFixed(1)}/10.`,
            confirmButtonText: 'Aceptar'
        });
    });

    document.getElementById("btnReintentar").style.display = "inline-block";
    actualizarIntentos();
}

function actualizarIntentos() {
    const texto = intentos >= maxIntentos ?
        "Has alcanzado el número máximo de intentos." :
        `Intentos restantes: ${maxIntentos - intentos}`;
    document.getElementById("intentosRestantes").innerText = texto;
}

function intentarDeNuevo() {
    if (intentos >= maxIntentos) return;

    const figuras = document.querySelectorAll('.figura');
    const contenedor = document.querySelector('.containert');
    const drops = document.querySelectorAll('.drop-area');

    drops.forEach(drop => {
        drop.innerHTML = textosOriginalesDrop[drop.id] || "";
    });

    figuras.forEach(figura => {
        if (!contenedor.contains(figura)) {
            contenedor.appendChild(figura);
        }
    });

    document.getElementById("resultado").innerText = "";
}

function bloquearJuego() {
    const botones = document.querySelectorAll('button');
    botones.forEach(btn => btn.disabled = true);
}