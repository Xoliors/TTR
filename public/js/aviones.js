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

const id_ejercicio = 26;
  const today = new Date().toISOString().split("T")[0];
  const fecha = today;
  const lastDateKey = `lastAttemptDate_${id_ejercicio}`;
  const attemptsKey = `globalAttempts_${id_ejercicio}`;

  let lastAttemptDate = localStorage.getItem(lastDateKey) || "";
  let globalAttempts = parseInt(localStorage.getItem(attemptsKey)) || 0;
  const intentosMaximos = 5;

  // Si la fecha guardada no es la de hoy, reiniciar contador
  if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(lastDateKey, today);
    localStorage.setItem(attemptsKey, globalAttempts);
  }

  // Mostrar intentos restantes al cargar
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("intentosRestantes").textContent = intentosMaximos - globalAttempts;
    if (globalAttempts >= intentosMaximos) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin intentos restantes',
        text: 'Has alcanzado el límite de intentos para hoy.',
        confirmButtonText: 'Aceptar'
      });
      bloquearIntento();
    }
  });

  function bloquearIntento() {
    document.getElementById("btnReiniciar").disabled = true;
    document.getElementById("btnCalificar").disabled = true;
  }

  function calificar() {
    if (globalAttempts >= intentosMaximos) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin intentos restantes',
        text: 'Ya no tienes intentos disponibles hoy.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    let score = 0;

    const p1 = parseInt(document.getElementById("p1").value);
    const m1 = parseInt(document.getElementById("m1").value);
    const m2 = parseInt(document.getElementById("m2").value);
    const m3 = parseInt(document.getElementById("m3").value);
    const m4 = parseInt(document.getElementById("m4").value);
    const m5 = parseInt(document.getElementById("m5").value);
    const m6 = parseInt(document.getElementById("m6").value);
    const p3 = parseInt(document.getElementById("p3").value);

    if (p1 === 25) score += 3;
    if (m1 === 15) score += 1;
    if (m2 === 20) score += 1;
    if (m3 === 7)  score += 1;
    if (m4 === 18) score += 1;
    if (m5 === 22) score += 1;
    if (m6 === 13) score += 1;
    if (p3 === 9)  score += 2;

    let finalScore = (score / 10) * 10;
    if (finalScore > 10) finalScore = 10;

    document.getElementById("resultado").textContent = `Tu calificación es: ${finalScore}/10`;

    // Aumentar y guardar intento
    globalAttempts++;
    localStorage.setItem(attemptsKey, globalAttempts);
    document.getElementById("intentosRestantes").textContent = intentosMaximos - globalAttempts;

    // Enviar a servidor
    fetch('/ejercicios_numeros/avion/guardar-calificacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intento: globalAttempts,
        calificacion: finalScore,
        id_ejercicio,
        fecha
      })
    });

    // Mostrar alerta
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${finalScore}/10.`,
      confirmButtonText: 'Aceptar'
    });

    // Bloquear si se acabaron los intentos
    if (globalAttempts >= intentosMaximos) {
      bloquearIntento();
    }

    // Desactivar botón de calificar
    document.getElementById("btnCalificar").disabled = true;
  }

  function reiniciar() {
    document.getElementById("btnCalificar").disabled = false;
    document.getElementById("resultado").textContent = "";
    const inputs = document.querySelectorAll("input[type='number']");
    inputs.forEach(input => input.value = "");
  }

    