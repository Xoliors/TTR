const data = [
    { question: "12 + 25", answer: 37, options: [100, 33, 75, 90, 5, 12, 37, 45, 60, 28] },
    { question: "45 - 12", answer: 33, options: [28, 40, 12, 33, 51, 7, 65, 30, 15, 118] },
    { question: "50 + 23", answer: 73, options: [70, 73, 80, 5, 101, 91, 10, 63, 22, 35] },
    { question: "80 - 25", answer: 55, options: [60, 81, 52, 40, 115, 15, 27, 78, 55, 3] },
    { question: "34 + 45", answer: 79, options: [47, 76, 80, 18, 66, 29, 101, 79, 92, 10] },
    { question: "90 - 45", answer: 45, options: [2, 35, 40, 50, 90, 10, 72, 25, 63, 45] },
    { question: "60 + 30", answer: 90, options: [18, 80, 85, 1, 90, 120, 75, 44, 39, 70] },
    { question: "100 - 20", answer: 80, options: [70, 85, 41, 13, 99, 55, 60, 80, 5, 24] },
    { question: "58 + 42", answer: 100, options: [98, 106, 96, 45, 30, 17, 89, 67, 20, 54] },
    { question: "110 - 25", answer: 85, options: [90, 65, 80, 27, 34, 85, 11, 44, 10, 112] }
  ];

  let attempts = 0;
  const maxAttempts = 5;

  function createExercises() {
    const container = document.getElementById("exercises");
    container.innerHTML = "";
    data.forEach((item, index) => {
      const exercise = document.createElement("div");
      exercise.className = "exercise";
      exercise.dataset.answer = item.answer;

      exercise.innerHTML = `
        <div class="question">${item.question} =</div>
        <div class="drop-container">
          <div class="drop-zone" data-index="${index}"></div>
          <div class="result-icon" id="result-${index}"></div>
        </div>
        <div class="choices">
          ${item.options.map(opt => `<div class="draggable" draggable="true" data-value="${opt}">${opt}</div>`).join('')}
        </div>
      `;

      container.appendChild(exercise);
    });
    enableDragDrop();
  }

  function enableDragDrop() {
    const draggables = document.querySelectorAll(".draggable");
    const dropZones = document.querySelectorAll(".drop-zone");

    draggables.forEach(el => {
      el.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text", e.target.dataset.value);
      });
    });

    dropZones.forEach(zone => {
      zone.addEventListener("dragover", e => e.preventDefault());
      zone.addEventListener("drop", e => {
        e.preventDefault();
        const value = e.dataTransfer.getData("text");
        zone.textContent = value;
        zone.dataset.value = value;
      });
    });
  }

  document.getElementById("submit").addEventListener("click", () => {
    const dropZones = document.querySelectorAll(".drop-zone");
    let correct = 0;

    dropZones.forEach((zone, index) => {
      const expected = data[index].answer;
      const resultIcon = document.getElementById(`result-${index}`);
      if (Number(zone.dataset.value) === expected) {
        correct++;
        resultIcon.textContent = "✅";
        resultIcon.className = "result-icon correct";
      } else {
        resultIcon.textContent = "❌";
        resultIcon.className = "result-icon incorrect";
      }
    });

    const score = Math.round((correct / data.length) * 10);
    document.getElementById("score").textContent = `Tu calificación: ${score}/10`;
    attempts++;

    if (score === 10 || attempts >= maxAttempts) {
      document.getElementById("submit").disabled = true;
    } else {
      document.getElementById("retry").style.display = "inline-block";
    }
  });

  document.getElementById("retry").addEventListener("click", () => {
    createExercises();
    document.getElementById("score").textContent = "";
    document.getElementById("retry").style.display = "none";
    document.getElementById("submit").disabled = false;
  });

  // Inicializamos
  createExercises();