const data = [
    { question: "150 + 75", answer: 225, options: [220, 230, 215, 225, 240] },
    { question: "120 - 40", answer: 80, options: [70, 80, 85, 90, 75] },
    { question: "200 + 150", answer: 350, options: [340, 350, 360, 370, 330] },
    { question: "300 - 150", answer: 150, options: [140, 150, 160, 170, 130] },
    { question: "180 + 120", answer: 300, options: [290, 300, 310, 320, 280] },
    { question: "250 - 75", answer: 175, options: [165, 170, 175, 180, 185] },
    { question: "100 + 200", answer: 300, options: [290, 300, 310, 320, 280] },
    { question: "450 - 200", answer: 250, options: [240, 250, 260, 270, 230] },
    { question: "180 + 90", answer: 270, options: [260, 270, 280, 290, 250] },
    { question: "400 - 150", answer: 250, options: [240, 250, 260, 270, 230] }
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
  
        if (attempts < maxAttempts) {
          document.getElementById("retry").style.display = "inline-block";
        }
  
        // Mantén habilitado el botón "Intentar de nuevo" aunque hayas sacado 10
        document.getElementById("submit").disabled = true;
      });
  
      document.getElementById("retry").addEventListener("click", () => {
        createExercises();
        document.getElementById("score").textContent = "";
        document.getElementById("retry").style.display = "none";
        document.getElementById("submit").disabled = false;
      });
  
      // Inicializamos
      createExercises();