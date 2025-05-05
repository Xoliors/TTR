let intentos = 0;
    const respuestasCorrectas = [8, 19, 17, 11, 22];

    function permitirDrop(ev) { ev.preventDefault(); }

    function iniciarArrastre(ev) {
      ev.dataTransfer.setData("src", ev.target.src);
    }

    function soltar(ev, zonaId) {
      if (intentos >= 5) return;
      ev.preventDefault();
      const src = ev.dataTransfer.getData("src");
      const img = document.createElement("img");
      img.src = src;
      img.className = "item-img";
      document.getElementById(zonaId).appendChild(img);
    }

    function eliminarUltimo(zonaId) {
      const zona = document.getElementById(zonaId);
      if (zona.lastChild) zona.removeChild(zona.lastChild);
    }

    function verificarTodo() {
      intentos++;
      let correctos = 0;

      for (let i = 1; i <= 5; i++) {
        const zona = document.getElementById("zona" + i);
        const respuesta = parseInt(document.getElementById("respuesta" + i).value);
        const cantidadEsperada = respuestasCorrectas[i - 1];
        let aciertos = 0;

        if (zona.childElementCount === cantidadEsperada) aciertos++;
        if (respuesta === cantidadEsperada) aciertos++;

        correctos += aciertos;
        document.getElementById("feedback" + i).textContent = (aciertos === 2) ? "✅" : "❌";
      }

      document.getElementById("resultado").textContent = `Intento #${intentos}: Calificación = ${correctos}/10.`;

      if (intentos >= 5) {
        bloquearTodo();
      }
    }

    function reiniciarEjercicios() {
      if (intentos >= 5) return;

      for (let i = 1; i <= 5; i++) {
        const zona = document.getElementById("zona" + i);
        while (zona.firstChild) {
          zona.removeChild(zona.firstChild);
        }
        document.getElementById("respuesta" + i).value = "";
        document.getElementById("feedback" + i).textContent = "";
      }

      document.getElementById("resultado").textContent = "";
    }

    function bloquearTodo() {
      document.querySelectorAll(".item-img").forEach(el => el.setAttribute("draggable", false));
      document.querySelectorAll("button").forEach(btn => btn.disabled = true);
      document.querySelectorAll("input.resultado").forEach(input => input.disabled = true);

      document.getElementById("resultado").textContent += " Has alcanzado el máximo de intentos. Ejercicio finalizado.";
    }