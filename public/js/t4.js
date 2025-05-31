 const id_ejercicio = 17;
  const today = new Date().toISOString().split("T")[0];
  let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
  let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

  if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  }

  const numbers = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
  let shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);

  function createGame() {
    shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5); // remezcla
    const questionsDiv = document.getElementById("questions");
    const answersDiv = document.getElementById("answers");

    if (!questionsDiv || !answersDiv) return;

    questionsDiv.innerHTML = "";
    answersDiv.innerHTML = "";

    numbers.forEach((num, index) => {
      let question = document.createElement("div");
      question.style.display = "flex";
      question.style.alignItems = "center";
      question.style.justifyContent = "space-between";
      question.style.marginBottom = "12px";
      question.innerHTML = `
        <span style="font-size: 22px; font-weight: bold;">4 x ${index + 1} =</span> 
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
    if (globalAttempts >= 5) {
      Swal.fire({
        icon: 'error',
        title: '¡Has alcanzado el número máximo de intentos por hoy!',
        text: 'Vuelve mañana para intentarlo de nuevo.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

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
    document.getElementById("score").innerText = `🎉 Puntaje: ${score.toFixed(1)} / 10 (Intento ${globalAttempts + 1} de 5)`;

    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

    fetch("/ejercicios_segundo/tabla4/guardar-calificacion", {
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
    .then(response => {
      if (!response.ok) throw new Error("Error al guardar calificación");
      return response.json();
    })
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${score.toFixed(1)}/10.`,
        confirmButtonText: 'Aceptar'
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar tu calificación.',
        confirmButtonText: 'Cerrar'
      });
    });
  }

  function retry() {
    createGame();
    document.getElementById("score").innerText = "";
  }

  window.addEventListener("DOMContentLoaded", () => {
    createGame();

    const scoreElement = document.getElementById("score");
    const retryBtn = document.createElement("button");
    retryBtn.id = "retryBtn";
    retryBtn.className = "retry-btn";
    retryBtn.innerText = "🔄 Volver a Intentar";
    retryBtn.onclick = retry;
    scoreElement.after(retryBtn);
  });