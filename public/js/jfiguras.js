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
        }).then(() => {
            mostrarMensajeMotivacional(calificacion.toFixed(1));
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