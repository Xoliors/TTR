const limits = [50, 75, 61, 96];
  const maxAttempts = 5;
  const id_ejercicio = 18;
  const ruta = "/ejercicios_numeros/botellas/guardar-calificacion";

  let filled = [0, 0, 0, 0];
  let today = new Date().toISOString().split("T")[0];
  let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
  let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

  if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  }

  function createBottle(index) {
    const wrapper = document.createElement("div");
    wrapper.className = "bottle-wrapper";
    wrapper.innerHTML = `
      <div class="question">Llena la botella hasta ${limits[index]} litros.</div>
      <div class="bottle-container" data-index="${index}">
        <div class="water" style="height: 0%" id="water-${index}"></div>
        <div class="measurements">
          <div>100L</div>
          <div>80L</div>
          <div>60L</div>
          <div>40L</div>
          <div>20L</div>
          <div>0L</div>
        </div>
      </div>
      <div class="counter" id="counter-${index}">0 litros</div>
    `;
    return wrapper;
  }

  function renderBottles() {
    const container = document.getElementById("bottles");
    container.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      container.appendChild(createBottle(i));
    }
    setDragDrop();
  }

  function setDragDrop() {
    document.querySelectorAll(".draggable").forEach(el => {
      el.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text", e.target.dataset.value);
      });
    });

    document.querySelectorAll(".bottle-container").forEach(bottle => {
      bottle.addEventListener("dragover", e => e.preventDefault());
      bottle.addEventListener("drop", e => {
        e.preventDefault();
        const value = Number(e.dataTransfer.getData("text"));
        const index = Number(bottle.dataset.index);
        filled[index] += value;
        if (filled[index] > 100) filled[index] = 100;
        document.getElementById(`water-${index}`).style.height = `${filled[index]}%`;
        document.getElementById(`counter-${index}`).textContent = `${filled[index]} litros`;
      });
    });
  }

  document.getElementById("check").addEventListener("click", async () => {
    if (globalAttempts >= maxAttempts) {
      Swal.fire({
        icon: 'error',
        title: '¡Sin intentos!',
        text: 'Ya has usado tus 5 intentos de hoy. Intenta mañana.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    let correct = 0;
    for (let i = 0; i < 4; i++) {
      if (filled[i] === limits[i]) correct++;
    }

    const calificacion = Math.round((correct / 4) * 10);
    const fecha = today;

    document.getElementById("score").textContent = `Tu calificación: ${calificacion}/10`;

    globalAttempts++;
    localStorage.setItem("globalAttempts", globalAttempts);

    // Enviar resultado al servidor
    try {
      const response = await fetch(ruta, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intento: globalAttempts,
          calificacion,
          id_ejercicio,
          fecha
        })
      });

      if (globalAttempts >= maxAttempts || correct === 4) {
        Swal.fire({
          icon: 'success',
          title: '¡Calificación registrada!',
          text: `Tu calificación fue de ${calificacion}/10.`,
          confirmButtonText: 'Aceptar'
        });
        document.getElementById("check").disabled = true;
        document.getElementById("retry").style.display = "none";
      } else if (correct < 4) {
        document.getElementById("retry").style.display = "inline-block";
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar tu calificación.',
        confirmButtonText: 'Aceptar'
      });
    }
  });

  function reiniciarJuego() {
    if (globalAttempts >= maxAttempts) {
      Swal.fire({
        icon: 'error',
        title: '¡Sin intentos!',
        text: 'Ya no puedes intentarlo hoy. Vuelve mañana.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    filled = [0, 0, 0, 0];
    document.getElementById("score").textContent = "";
    document.getElementById("check").disabled = false;
    document.getElementById("retry").style.display = "none";
    renderBottles();
  }

  document.getElementById("retry").addEventListener("click", reiniciarJuego);

  renderBottles();