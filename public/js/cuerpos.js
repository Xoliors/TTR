let selectedItem = null;
let connections = new Map();
const id_ejercicio = 14;
const ruta_guardado = "/ejercicios_numeros/cuerpos/guardar-calificacion";
const maxIntentos = 5;

const svg = document.getElementById("lines");
const btnReintentar = document.getElementById("btnReintentar");
const btnCalificar = document.getElementById("btnCalificar");

// Verifica si es un nuevo día
const today = new Date().toISOString().split('T')[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem("intentosRelacion", "0");
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

if (globalAttempts >= maxIntentos) {
    bloquearEjercicio();
}

document.querySelectorAll('#terms .item').forEach(term => {
    term.addEventListener('click', () => {
        if (btnCalificar.disabled) return;
        if (connections.has(term)) {
            removeLine(term);
            return;
        }
        selectedItem = term;
    });
});

document.querySelectorAll('#definitions .item').forEach(definition => {
    definition.addEventListener('click', () => {
        if (btnCalificar.disabled) return;
        if (selectedItem && !connections.has(selectedItem)) {
            connections.set(selectedItem, definition);
            drawLines();
            selectedItem = null;
        }
    });
});

function drawLines() {
    svg.innerHTML = "";

    const container = document.getElementById("ejercicio").querySelector(".ct");
    const containerRect = container.getBoundingClientRect();
    svg.setAttribute("width", containerRect.width);
    svg.setAttribute("height", containerRect.height);

    connections.forEach((definition, term) => {
        let termRect = term.getBoundingClientRect();
        let defRect = definition.getBoundingClientRect();

        let x1 = termRect.right - containerRect.left;
        let y1 = termRect.top + termRect.height / 2 - containerRect.top;
        let x2 = defRect.left - containerRect.left;
        let y2 = defRect.top + defRect.height / 2 - containerRect.top;

        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "2");
        svg.appendChild(line);
    });
}

function removeLine(item) {
    connections.delete(item);
    drawLines();
}

function calificarEjercicio() {
    if (globalAttempts >= maxIntentos) {
        Swal.fire({
            icon: 'error',
            title: '¡Sin intentos!',
            text: 'Has alcanzado el número máximo de intentos para hoy.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    globalAttempts++;
    localStorage.setItem("intentosRelacion", globalAttempts);
    localStorage.setItem("fechaRelacion", today);

    let correctCount = 0;
    let totalCount = 9;
    let resultText = '';

    connections.forEach((definition, term) => {
        let correct = term.dataset.pair === definition.dataset.pair;
        if (correct) {
            correctCount++;
            resultText += `${term.innerText}  ✅ Correcto\n`;
        } else {
            resultText += `${term.innerText} ❌ Incorrecto\n`;
        }
    });

    let calificacion = (correctCount / totalCount) * 10;
    resultText += `\nIntento ${globalAttempts}/${maxIntentos}\nTu calificación es: ${calificacion.toFixed(1)}/10.`;

    document.getElementById('result').innerText = resultText;
    btnReintentar.style.display = "inline-block";

    fetch(ruta_guardado, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            intento: globalAttempts,
            calificacion: calificacion.toFixed(1),
            id_ejercicio,
            fecha: today
        })
    })
    .then(() => {
        Swal.fire({
            icon: 'success',
            title: '¡Calificación registrada!',
            text: `Tu calificación fue de ${calificacion.toFixed(1)}/10.`,
            confirmButtonText: 'Aceptar'
        }).then(() => {
            mostrarMensajeMotivacional(calificacion.toFixed(1));
        });
    });

    if (globalAttempts >= maxIntentos) {
        bloquearEjercicio();
    }
}

function bloquearEjercicio() {
    btnCalificar.disabled = true;
    document.querySelectorAll('.item').forEach(item => {
        item.style.pointerEvents = "none";
        item.style.opacity = "0.5";
    });
    btnReintentar.disabled = true;
    document.getElementById('result').innerText += "\nHas alcanzado el número máximo de intentos.";
}

function reintentarEjercicio() {
    connections.clear();
    selectedItem = null;
    drawLines();
    document.getElementById('result').innerText = '';
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