const terms = [
    { name: "Óvalo", pair: "ovalo" },
    { name: "Triángulo isósceles", pair: "triangulo-isosceles" },
    { name: "Triángulo escaleno", pair: "triangulo-escaleno" },
    { name: "Triángulo equilátero", pair: "triangulo-equilatero" },
    { name: "Prisma", pair: "prisma" },
    { name: "Prisma rectangular", pair: "prisma-rectangular" },
    { name: "Prisma triangular", pair: "prisma-triangular" },
    { name: "Pirámide hexagonal", pair: "piramide-hexagonal" },
    { name: "Arista", pair: "arista" },
    { name: "Vértice", pair: "vertice" }
];

const definitions = [
    { text: "Figura curva parecida a un círculo estirado.", pair: "ovalo" },
    { text: "Triángulo con dos lados iguales y uno diferente.", pair: "triangulo-isosceles" },
    { text: "Triángulo con todos los lados de diferente longitud.", pair: "triangulo-escaleno" },
    { text: "Triángulo con todos los lados iguales.", pair: "triangulo-equilatero" },
    { text: "Cuerpo geométrico con dos bases iguales y caras laterales rectangulares.", pair: "prisma" },
    { text: "Prisma con base en forma de rectángulo.", pair: "prisma-rectangular" },
    { text: "Prisma con base en forma de triángulo.", pair: "prisma-triangular" },
    { text: "Pirámide cuya base tiene seis lados.", pair: "piramide-hexagonal" },
    { text: "Línea donde se unen dos caras de una figura tridimensional.", pair: "arista" },
    { text: "Punto donde se encuentran dos o más aristas.", pair: "vertice" }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(terms);
shuffle(definitions);

const termsColumn = document.getElementById('terms');
const definitionsColumn = document.getElementById('definitions');

terms.forEach(term => {
    const div = document.createElement('div');
    div.classList.add('item');
    div.textContent = term.name;
    div.dataset.pair = term.pair;
    termsColumn.appendChild(div);
});

definitions.forEach(def => {
    const div = document.createElement('div');
    div.classList.add('item');
    div.textContent = def.text;
    div.dataset.pair = def.pair;
    definitionsColumn.appendChild(div);
});

let selectedItem = null;
let connections = new Map();
const svg = document.getElementById("lines");

document.querySelectorAll('#terms .item').forEach(term => {
    term.addEventListener('click', () => {
        if (connections.has(term)) {
            removeLine(term);
            return;
        }
        selectedItem = term;
    });
});

document.querySelectorAll('#definitions .item').forEach(def => {
    def.addEventListener('click', () => {
        if (selectedItem && !connections.has(selectedItem)) {
            connections.set(selectedItem, def);
            drawLines();
            selectedItem = null;
        }
    });
});

function drawLines() {
    svg.innerHTML = "";
    connections.forEach((def, term) => {
        const tR = term.getBoundingClientRect();
        const dR = def.getBoundingClientRect();
        const cR = document.querySelector(".ct").getBoundingClientRect();
        const x1 = tR.right - cR.left;
        const y1 = tR.top + tR.height/2 - cR.top;
        const x2 = dR.left - cR.left;
        const y2 = dR.top + dR.height/2 - cR.top;
        const line = document.createElementNS("http://www.w3.org/2000/svg","line");
        line.setAttribute("x1",x1);
        line.setAttribute("y1",y1);
        line.setAttribute("x2",x2);
        line.setAttribute("y2",y2);
        svg.appendChild(line);
    });
}

function removeLine(item) {
    const def = connections.get(item);
    connections.delete(item);
    connections.delete(def);
    drawLines();
}

const id_ejercicio = 26;
const today = new Date().toISOString().split("T")[0];
const lastAttemptKey = `lastAttemptDate_${id_ejercicio}`;
const attemptKey = `globalAttempts_${id_ejercicio}`;

let lastAttemptDate = localStorage.getItem(lastAttemptKey) || "";
let globalAttempts = parseInt(localStorage.getItem(attemptKey)) || 0;

// Reiniciar intentos si es un nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(lastAttemptKey, today);
  localStorage.setItem(attemptKey, globalAttempts);
}

document.getElementById("intentos").innerText = `Intentos: ${globalAttempts}/5`;

document.getElementById("reiniciar").addEventListener("click", () => {
  connections.clear();
  drawLines();
});

function calificarEjercicio() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  let correctCount = 0;
  connections.forEach((def, term) => {
    if (term.dataset.pair === def.dataset.pair) correctCount++;
  });

  const total = terms.length;
  const score = (correctCount / total) * 10;
  const fecha = today;

  globalAttempts++;
  localStorage.setItem(attemptKey, globalAttempts);
  document.getElementById("intentos").innerText = `Intentos: ${globalAttempts}/5`;

  // Mostrar resultados
  document.getElementById('result').innerText =
    `Respuestas correctas: ${correctCount} de ${total}\n` +
    `Calificación: ${score.toFixed(1)}/10`;

  // Enviar resultado
  fetch('/ejercicios_tercero/def3/guardar-calificacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: score.toFixed(1),
      id_ejercicio,
      fecha
    })
  }).then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${score.toFixed(1)}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(score.toFixed(1));
    });
    if (globalAttempts >= 5) {
      document.getElementById('verifBtn').disabled = true;
    }
  })
  .catch(err => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err,
      confirmButtonText: 'Aceptar'
    });
  });
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