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

function calificarEjercicio() {
    let correctCount = 0;
    connections.forEach((def, term) => {
        if (term.dataset.pair === def.dataset.pair) correctCount++;
    });
    const total = terms.length;
    const score = (correctCount/total)*10;
    document.getElementById('result').innerText =
        `Respuestas correctas: ${correctCount} de ${total}\n`+
        `Calificación: ${score.toFixed(1)}/10`;
}