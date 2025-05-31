const fruitBank = document.getElementById("fruit-bank"); 
const checkBtn = document.getElementById("check");
const resultDiv = document.getElementById("result");
const fruitSelect = document.getElementById("fruit-select");
const inputAnswer = document.getElementById("input-answer");

const id_ejercicio = 24;
const today = new Date().toISOString().split("T")[0];

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

let fruitType = "🍍"; // Por defecto piña

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
  fillBank();
});

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

function fillBank() {
  fruitBank.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    fruitBank.appendChild(createFruit());
  }
  fruitBank.style.visibility = "visible";
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  if (!event.target.classList.contains("person")) return;

  const draggedFruit = document.querySelector(".fruit.dragging");
  if (draggedFruit && fruitBank.contains(draggedFruit)) {
    event.target.appendChild(draggedFruit);
  }
}

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

checkBtn.addEventListener("click", () => {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'warning',
      title: '¡Has agotado tus intentos!',
      text: 'Ya no puedes realizar más intentos por hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  let correctCount = 0;
  const people = document.querySelectorAll(".person");

  people.forEach((person) => {
    const fruitCount = person.querySelectorAll(".fruit").length;
    if (fruitCount === 5) {
      correctCount++;
    }
  });

  const finalAnswer = parseInt(inputAnswer.value);
  if (finalAnswer === 5) {
    correctCount++;
  }

  const score = (correctCount / 6) * 10;
  const fecha = today;

  fetch('/ejercicios_segundo/frutas/guardar-calificacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: score,
      id_ejercicio,
      fecha
    })
  })
  .then(response => {
    if (!response.ok) throw new Error('Error al guardar la calificación');
    return response.json();
  })
  .then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${score.toFixed(2)}/10.`,
      confirmButtonText: 'Aceptar'
    });
    resultDiv.textContent = `Tu calificación es: ${score.toFixed(2)}`;
  })
  .catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  });
});

// Botón de reinicio
const retryButton = document.createElement("button");
retryButton.id = "retryBtn";
retryButton.className = "retry-btn";
retryButton.textContent = "🔄 Volver a Intentar";
retryButton.onclick = () => {
  fillBank();
  inputAnswer.value = "";
  const people = document.querySelectorAll(".person");
  people.forEach(person => person.innerHTML = "");
  resultDiv.textContent = "";
};
resultDiv.insertAdjacentElement("afterend", retryButton);