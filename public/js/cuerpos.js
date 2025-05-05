let selectedItem = null;
let connections = new Map();
let intentos = parseInt(localStorage.getItem("intentosRelacion") || "0");

const svg = document.getElementById("lines");
const btnReintentar = document.getElementById("btnReintentar");
const btnCalificar = document.getElementById("btnCalificar");

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
    connections.forEach((definition, term) => {
        let termRect = term.getBoundingClientRect();
        let defRect = definition.getBoundingClientRect();
        let containerRect = document.querySelector(".container").getBoundingClientRect();

        let x1 = termRect.right - containerRect.left;
        let y1 = termRect.top + termRect.height / 2 - containerRect.top;
        let x2 = defRect.left - containerRect.left;
        let y2 = defRect.top + defRect.height / 2 - containerRect.top;

        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        svg.appendChild(line);
    });
}

function removeLine(item) {
    connections.delete(item);
    drawLines();
}

function calificarEjercicio() {
    if (intentos >= 5) return;

    intentos++;
    localStorage.setItem("intentosRelacion", intentos);

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
    resultText += `\nIntento ${intentos}/5\nTu calificación es: ${calificacion.toFixed(1)}/10.`;

    document.getElementById('result').innerText = resultText;
    localStorage.setItem('calificacionRelacion', calificacion.toFixed(1));

    if (intentos >= 5) {
        bloquearEjercicio();
    } else {
        btnReintentar.style.display = "inline-block";
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
