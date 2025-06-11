const terms = [
    { name: "Hexágono", pair: "hexagono" },
    { name: "Pentágono", pair: "pentagono" },
    { name: "Esfera", pair: "esfera" },
    { name: "Heptágono", pair: "heptagono" },
    { name: "Prisma Triangular", pair: "prisma-triangular" },
    { name: "Octágono", pair: "octagono" },
    { name: "Pirámide", pair: "piramide" },
    { name: "Trapecio", pair: "trapecio" },
    { name: "Rombo", pair: "rombo" },
    { name: "Cubo", pair: "cubo" }
];

const definitions = [
    { text: "Figura con seis lados.", pair: "hexagono" },
    { text: "Figura con cinco lados.", pair: "pentagono" },
    { text: "Figura redonda.", pair: "esfera" },
    { text: "Polígono con siete lados.", pair: "heptagono" },
    { text: "Cuerpo con bases triangulares.", pair: "prisma-triangular" },
    { text: "Polígono con ocho lados.", pair: "octagono" },
    { text: "Cuerpo con base poligonal.", pair: "piramide" },
    { text: "Figura con dos lados paralelos de diferente tamaño.", pair: "trapecio" },
    { text: "Cuadrilátero con lados iguales.", pair: "rombo" },
    { text: "Cuerpo con seis caras cuadradas.", pair: "cubo" }
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
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

function calificarEjercicio() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'warning',
      title: 'Límite de intentos alcanzado',
      text: 'Ya no tienes más intentos disponibles hoy.',
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
  globalAttempts++;

  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  fetch("/ejercicios_segundo/def/guardar-calificacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: score,
      id_ejercicio,
      fecha: today
    })
  })
  .then(res => res.json())
  .then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${score.toFixed(1)}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
        mostrarMensajeMotivacional(score.toFixed(1));
    });
    document.getElementById('result').innerText =
      `Respuestas correctas: ${correctCount} de ${total}\n` +
      `Calificación: ${score.toFixed(1)}/10`;
  })
  .catch(err => {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un error al guardar la calificación.',
      confirmButtonText: 'Aceptar'
    });
  });
}

// Botón de reinicio
const resultDiv = document.getElementById("result");
const retryButton = document.createElement("button");
retryButton.id = "retryBtn";
retryButton.className = "retry-btn";
retryButton.textContent = "🔄 Volver a Intentar";
retryButton.onclick = retry;
resultDiv.insertAdjacentElement("afterend", retryButton);

function retry() {
  connections.clear();
  drawLines();
  document.getElementById('result').innerText = "";
  Swal.fire({
    icon: 'info',
    title: 'Reinicio',
    text: 'Puedes volver a intentar el ejercicio.',
    confirmButtonText: 'Aceptar'
  });
}

function reiniciar() {
  ['c1','c2','c3','c4','c5','c6','c7','r1','r2','r3','r4','r5','r6','r7','r8','r9']
    .forEach(id => document.getElementById(id).value = '');
  for (let i = 1; i <= 16; i++) {
    const span = document.getElementById('check' + i);
    span.textContent = '';
    span.style.color = '';
  }
  document.getElementById('nota').textContent = '';
  document.getElementById('verifBtn').disabled = false;
  document.getElementById('reinBtn').style.display = 'none';
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