const numbers = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80];
let shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);

function createGame() {
  const questionsDiv = document.getElementById("questions");
  const answersDiv = document.getElementById("answers");

  questionsDiv.innerHTML = "";
  answersDiv.innerHTML = "";

  numbers.forEach((num, index) => {
    let question = document.createElement("div");
    question.style.display = "flex";
    question.style.alignItems = "center";
    question.style.justifyContent = "space-between";
    question.style.marginBottom = "12px";
    question.innerHTML = `
      <span style="font-size: 22px; font-weight: bold;">8 x ${index + 1} =</span> 
      <div class="drop-zone" data-answer="${num}" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
      <span class="result-icon" style="width: 35px;"></span>
    `;
    questionsDiv.appendChild(question);
  });

  shuffledNumbers.forEach(num => {
    let answer = document.createElement("div");
    answer.classList.add("number");
    answer.innerText = num;
    answer.draggable = true;
    answer.id = "num-" + num;
    answer.ondragstart = drag;
    answersDiv.appendChild(answer);
  });
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  let draggedId = event.dataTransfer.getData("text");
  let draggedElement = document.getElementById(draggedId);

  if (event.target.innerHTML === "") {
    event.target.appendChild(draggedElement);
    draggedElement.style.width = "100%";
    draggedElement.style.height = "100%";
    draggedElement.style.lineHeight = "50px";
    draggedElement.style.textAlign = "center";
  }
}

function verificar() {
  let dropZones = document.querySelectorAll(".drop-zone");
  let correctCount = 0;

  dropZones.forEach(zone => {
    let expectedAnswer = zone.getAttribute("data-answer");
    let selectedNumber = zone.innerText.trim();
    let resultIcon = zone.nextElementSibling;

    if (selectedNumber === expectedAnswer) {
      resultIcon.innerHTML = "✔️";
      resultIcon.className = "correct";
      correctCount++;
    } else {
      resultIcon.innerHTML = "❌";
      resultIcon.className = "incorrect";
    }
  });

  let score = (correctCount / numbers.length) * 10;
  document.getElementById("score").innerText = `🎉 Puntaje: ${score.toFixed(1)} / 10`;
}

createGame();