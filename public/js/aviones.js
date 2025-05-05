const bars = document.querySelectorAll('.bar');

    bars.forEach(bar => {
      const count = parseInt(bar.getAttribute('data-count'));
      for (let i = 0; i < count; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('plane');
        emoji.textContent = "✈️";
        bar.insertBefore(emoji, bar.firstChild);
      }
    });

    function calificar() {
      let score = 0;

      const p1 = parseInt(document.getElementById("p1").value);
      const m1 = parseInt(document.getElementById("m1").value);
      const m2 = parseInt(document.getElementById("m2").value);
      const m3 = parseInt(document.getElementById("m3").value);
      const m4 = parseInt(document.getElementById("m4").value);
      const m5 = parseInt(document.getElementById("m5").value);
      const m6 = parseInt(document.getElementById("m6").value);
      const p3 = parseInt(document.getElementById("p3").value);

      // Puntaje para la pregunta 1 (aviones vendidos en marzo y abril juntos)
      if (p1 === 25) score += 3;

      // Puntaje para la pregunta 2 (aviones vendidos en cada mes)
      if (m1 === 15) score += 1;
      if (m2 === 20) score += 1;
      if (m3 === 7)  score += 1;
      if (m4 === 18) score += 1;
      if (m5 === 22) score += 1;
      if (m6 === 13) score += 1;

      // Puntaje para la pregunta 3 (diferencia entre mayo y junio)
      if (p3 === 9) score += 2;

      // Aseguramos que la calificación esté en el rango de 0 a 10
      let finalScore = (score / 10) * 10;
      if (finalScore > 10) finalScore = 10;
      
      document.getElementById("resultado").textContent = `Tu calificación es: ${finalScore}/10`;
    }