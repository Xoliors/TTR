const id_ejercicio = 38;
const today = new Date().toISOString().split("T")[0];
const keyDate = `lastAttemptDate_${id_ejercicio}`;
const keyAttempts = `globalAttempts_${id_ejercicio}`;
let lastAttemptDate = localStorage.getItem(keyDate) || "";
let globalAttempts = parseInt(localStorage.getItem(keyAttempts)) || 0;
const maxIntentos = 5;

// Reiniciar intentos si es un nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(keyDate, today);
  localStorage.setItem(keyAttempts, globalAttempts);
}

// Si ya se alcanzaron los intentos, bloquear campos
if (globalAttempts >= maxIntentos) {
  Swal.fire({
    icon: 'info',
    title: 'Has alcanzado el máximo de intentos por hoy.',
    text: 'Podrás intentarlo nuevamente mañana.',
    confirmButtonText: 'Aceptar'
  });
  bloquearCampos();
}

function verificar() {
  if (globalAttempts >= maxIntentos) {
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos disponibles!',
      text: 'Has alcanzado el número máximo de intentos para hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

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

  const finalScore = Math.round((correctos / total) * 10);
  const fecha = today;

  Swal.fire({
    icon: 'success',
    title: '¡Calificación registrada!',
    text: `Tu calificación fue de ${finalScore}/10.`,
    confirmButtonText: 'Aceptar'
  });

  // Enviar calificación al servidor
  fetch("/ejercicios_segundo/divisiones/guardar-calificacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      intento: globalAttempts + 1,
      calificacion: finalScore,
      id_ejercicio,
      fecha
    })
  });

  globalAttempts++;
  localStorage.setItem(keyAttempts, globalAttempts);

  document.getElementById('resultado').textContent = `Intento ${globalAttempts}: Tu calificación es ${finalScore} / 10`;

  document.getElementById('verificarBtn').disabled = true;
  document.getElementById('intentarBtn').style.display = (globalAttempts < maxIntentos) ? "block" : "none";

  if (globalAttempts >= maxIntentos) {
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