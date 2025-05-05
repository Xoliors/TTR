
  let intentosTotales = 0;
  let verificado = false;
  const maxIntentos = 5;

  function verificarRespuestas() {
    if (verificado || intentosTotales >= maxIntentos) return;

    const preguntas = document.querySelectorAll('.pregunta');
    let correctas = 0;

    preguntas.forEach((p, i) => {
      const correcta = p.dataset.respuesta;
      const seleccionada = p.querySelector('input[type="radio"]:checked');
      const opciones = p.querySelectorAll('input[type="radio"]');

      const texto = p.querySelector('p');
      texto.classList.remove('correcto', 'incorrecto');

      if (seleccionada) {
        if (seleccionada.value === correcta) {
          texto.classList.add('correcto');
          texto.textContent += " ✔";
          correctas++;
        } else {
          texto.classList.add('incorrecto');
          texto.textContent += " ✘";
        }
        opciones.forEach(op => op.disabled = true);
      }
    });

    const calificacion = (correctas / preguntas.length) * 10;
    document.getElementById('mensaje').textContent =
      correctas === preguntas.length
        ? "¡Excelente! Todas tus respuestas son correctas 🎉"
        : `Respuestas correctas: ${correctas} de ${preguntas.length}`;
    document.getElementById('calificacion').textContent = `Calificación: ${calificacion.toFixed(1)} / 10`;

    document.getElementById('verificar').disabled = true;
    verificado = true;
    intentosTotales++;

    if (intentosTotales < maxIntentos) {
      document.getElementById('reiniciar').style.display = 'inline';
    } else {
      document.getElementById('mensaje').textContent += " 😓 Ya no puedes volver a intentarlo.";
      document.getElementById('reiniciar').style.display = 'none';
    }
  }

  function reiniciarIntento() {
    const preguntas = document.querySelectorAll('.pregunta');
    preguntas.forEach(p => {
      const radios = p.querySelectorAll('input[type="radio"]');
      radios.forEach(r => {
        r.disabled = false;
        r.checked = false;
      });
      const texto = p.querySelector('p');
      texto.classList.remove('correcto', 'incorrecto');
      texto.textContent = texto.textContent.replace(" ✔", "").replace(" ✘", "");
    });

    document.getElementById('mensaje').textContent = '';
    document.getElementById('calificacion').textContent = '';
    document.getElementById('verificar').disabled = false;
    document.getElementById('reiniciar').style.display = 'none';
    verificado = false;
  }

  document.getElementById('verificar').addEventListener('click', verificarRespuestas);
  document.getElementById('reiniciar').addEventListener('click', reiniciarIntento);