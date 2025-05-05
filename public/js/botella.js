 const limits = [50, 75, 61, 96];
    let attempts = 0;
    const maxAttempts = 5;

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

    let filled = [0, 0, 0, 0];

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

    document.getElementById("check").addEventListener("click", () => {
      let correct = 0;
      for (let i = 0; i < 4; i++) {
        if (filled[i] === limits[i]) correct++;
      }
      const score = Math.round((correct / 4) * 10);
      document.getElementById("score").textContent = `Tu calificación: ${score}/10`;

      attempts++;

      if (correct === 4 || attempts >= maxAttempts) {
        document.getElementById("check").disabled = true;
      }

      if (correct < 4 && attempts < maxAttempts) {
        document.getElementById("retry").style.display = "inline-block";
      } else {
        document.getElementById("retry").style.display = "none";
      }
    });

    document.getElementById("retry").addEventListener("click", () => {
      if (attempts >= maxAttempts) return;
      filled = [0, 0, 0, 0];
      document.getElementById("score").textContent = "";
      document.getElementById("check").disabled = false;
      document.getElementById("retry").style.display = "none";
      renderBottles();
    });

    renderBottles();