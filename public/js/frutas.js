const fruitBank = document.getElementById("fruit-bank");
const checkBtn = document.getElementById("check");
const resultDiv = document.getElementById("result");
const fruitSelect = document.getElementById("fruit-select");
const inputAnswer = document.getElementById("input-answer");
let attempts = 0;
let fruitType = "🍍"; // Por defecto piña

// Actualiza el tipo de fruta según la selección
fruitSelect.addEventListener("change", () => {
  const selectedFruit = fruitSelect.value;
  if (selectedFruit === "manzana") {
    fruitType = "🍎";
  } else if (selectedFruit === "piña") {
    fruitType = "🍍";
  } else if (selectedFruit === "kiwi") {
    fruitType = "🥝";
  } else if (selectedFruit === "fresa") {
    fruitType = "🍓";
  }
  fillBank(); // Llama a la función para mostrar la barra de frutas
});

// Crea la fruta seleccionada
function createFruit() {
  const fruit = document.createElement("div");
  fruit.className = "fruit";
  fruit.textContent = fruitType;
  fruit.draggable = true;
  fruit.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", "fruit");
    e.dataTransfer.setDragImage(fruit, 0, 0);
  });
  return fruit;
}

// Llena el banco de frutas con 25 frutas
function fillBank() {
  fruitBank.innerHTML = ""; // Limpiar banco de frutas
  for (let i = 0; i < 25; i++) {
    fruitBank.appendChild(createFruit());
  }
  fruitBank.style.visibility = "visible"; // Hacer visible el banco de frutas
}

// Permitir el arrastre
function allowDrop(event) {
  event.preventDefault();
}

// Colocar la fruta
function drop(event) {
  event.preventDefault();
  if (!event.target.classList.contains("person")) return;

  const draggedFruit = document.querySelector(".fruit.dragging");
  if (draggedFruit && fruitBank.contains(draggedFruit)) {
    event.target.appendChild(draggedFruit);
  }
}

// Manejar los eventos de arrastre
document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("fruit")) {
    e.target.classList.add("dragging");
  }
});

document.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("fruit")) {
    e.target.classList.remove("dragging");
  }
});

// Revisar las respuestas
checkBtn.addEventListener("click", () => {
  attempts++;

  let correctCount = 0;
  const people = document.querySelectorAll(".person");

  // Evaluar los 5 recuadros
  people.forEach((person) => {
    const fruitCount = person.querySelectorAll(".fruit").length;
    if (fruitCount === 5) {
      correctCount++;
    }
  });

  // Evaluar la respuesta final
  const finalAnswer = parseInt(inputAnswer.value);
  if (finalAnswer === 5) {
    correctCount++;
  }

  // Calificación
  const score = (correctCount / 6) * 10;

  resultDiv.textContent = `Tu calificación es: ${score.toFixed(2)}`;
});