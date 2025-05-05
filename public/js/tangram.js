let intentos = 0;

    document.getElementById("quizForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const respuestasCorrectas = ["Círculo", "Triángulo", "Trapecio", "Cuadrado", "Pentágono"];
      const seleccionadas = [...document.querySelectorAll("input[name='figura']:checked")].map(cb => cb.value);
      const lados = parseInt(document.getElementById("lados").value);
      let aciertos = 0;

      respuestasCorrectas.forEach(r => {
        if (seleccionadas.includes(r)) aciertos++;
      });

      if (lados === 28) aciertos++;

      const calificacion = (aciertos / 6) * 10;
      document.getElementById("resultado").textContent = `Calificación: ${calificacion.toFixed(1)} / 10`;

      intentos++;
      if (intentos < 5) {
        document.getElementById("reintentar").style.display = "inline-block";
      } else {
        document.querySelector("button[type='submit']").disabled = true;
      }
    });

    document.getElementById("reintentar").addEventListener("click", function() {
      document.getElementById("quizForm").reset();
      document.getElementById("resultado").textContent = "";
      intentos = 0;
      document.getElementById("reintentar").style.display = "none";
      document.querySelector("button[type='submit']").disabled = false;
    });