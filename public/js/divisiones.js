let intentos = 0;
const maxIntentos = 5;

function verificar() {
  let total = 0;
  let correctos = 0;

  document.querySelectorAll('.ejercicio').forEach(ejercicio => {
    const respuestas = ejercicio.dataset.respuesta.split(',').map(Number);
    const inputs = ejercicio.querySelectorAll('input');
    total += respuestas.length;

    inputs.forEach((input, i) => {
      const valor = parseInt(input.value);
      if (valor === respuestas[i]) {
        input.classList.add('correcto');
        input.classList.remove('incorrecto');
        correctos++;
      } else {
        input.classList.add('incorrecto');
        input.classList.remove('correcto');
      }
    });
  });

  let calificacion = Math.round((correctos / total) * 10);
  document.getElementById('resultado').textContent = `Intento ${intentos + 1}: Tu calificación es ${calificacion} / 10`;

  intentos++;
  document.getElementById('verificarBtn').disabled = true;
  document.getElementById('intentarBtn').style.display = (intentos < maxIntentos) ? "block" : "none";

  if (intentos >= maxIntentos) {
    bloquearCampos();
    document.getElementById('resultado').textContent += " — Has alcanzado el número máximo de intentos.";
  }
}

function intentarDeNuevo() {
  document.querySelectorAll('input').forEach(input => {
    input.value = "";
    input.classList.remove('correcto', 'incorrecto');
  });
  document.getElementById('verificarBtn').disabled = false;
  document.getElementById('intentarBtn').style.display = "none";
  document.getElementById('resultado').textContent = "";
}

function bloquearCampos() {
  document.querySelectorAll('input').forEach(input => {
    input.disabled = true;
  });
  document.getElementById('verificarBtn').disabled = true;
  document.getElementById('intentarBtn').disabled = true;
}