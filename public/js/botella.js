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

      if (filled[index] > 100) {
        filled[index] = 100;
        Swal.fire({
          icon: 'warning',
          title: '¡Desborde de agua!',
          text: 'Has excedido la capacidad máxima de la botella (100 litros).',
          confirmButtonText: 'Aceptar'
        });
      }

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
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts); // ← corregido

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
      }).then(() => {
        mostrarMensajeMotivacional(calificacion.toFixed(1));
      });
      document.getElementById("check").disabled = true;
      document.getElementById("retry").style.display = "none";
    } else if (correct < 4) {
      mostrarMensajeMotivacional(calificacion.toFixed(1)); // ← AÑADE ESTO
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

function reiniciar() {
  ['c1','c2','c3','c4','c5','c6','c7','r1','r2','r3','r4','r5','r6','r7','r8','r9']
    .forEach(id => document.getElementById(id).value = '');
  for (let i = 1; i <= 16; i++) {
    const span = document.getElementById('check' + i);
    span.textContent = '';
    span.style.color = '';
  }
  document.getElementById('nota').textContent = '';
  document.getElementById('verifBtn').disabled = false;
  document.getElementById('reinBtn').style.display = 'none';
}

function mostrarMensajeMotivacional(calificacionRaw) {
  let calificacion = Number(calificacionRaw);
  let mensaje = "";

  const bajo = [
    "Te hace falta más práctica, ¡no te desanimes!",
    "Aún hay áreas que mejorar, sigue esforzándote.",
    "Estás comenzando, cada error es una oportunidad de aprender.",
    "No fue tu mejor intento, pero puedes mejorar mucho más.",
    "Sigue practicando, estás en el camino del aprendizaje.",
    "Con dedicación lo lograrás, ¡ánimo!",
    "Todavía no lo dominas, pero vas por buen camino.",
    "Este resultado es una base para seguir creciendo.",
    "Requiere más atención y práctica, no te rindas.",
    "Vuelve a intentarlo, cada paso cuenta."
  ];

  const medio = [
    "¡Estuviste cerca! Solo falta un poco más de práctica.",
    "Buen trabajo, sigue así y lo lograrás.",
    "¡Por poco! No te rindas, vas muy bien.",
    "Vas por buen camino, ¡ánimo!",
    "¡Casi lo consigues! Un poco más de esfuerzo y lo lograrás.",
    "Buen intento, no estás lejos del objetivo.",
    "Continúa así, tu esfuerzo está dando frutos.",
    "¡Sigue practicando! Estás muy cerca del 10.",
    "Buen desempeño, te falta poco para la perfección.",
    "¡Excelente progreso! No te detengas."
  ];

  const alto = [
    "¡Fabuloso! Estás haciendo un trabajo increíble.",
    "¡Lo lograste! Sigue así.",
    "¡Excelente resultado! Tu esfuerzo se nota.",
    "¡Perfecto! Se nota tu dedicación.",
    "¡Muy bien hecho! Continúa aprendiendo con entusiasmo.",
    "¡Genial! Estás dominando este tema.",
    "¡Brillante! Sigue manteniendo ese nivel.",
    "¡Orgulloso de tu progreso!",
    "¡Gran trabajo! Estás aprendiendo de forma excelente.",
    "¡Sigue así! El éxito es tuyo."
  ];

  const cero = [
    "Todos empezamos desde cero, lo importante es seguir intentando.",
    "No te preocupes, fallar es parte del proceso de aprender.",
    "Hoy no fue tu día, pero puedes hacerlo mucho mejor, sigue practicando.",
    "¡No te rindas! Cada error te acerca más al acierto.",
    "Es solo el comienzo, lo importante es que sigas aprendiendo.",
    "Los grandes logros comienzan con pequeños pasos, ¡inténtalo de nuevo!",
    "Aprender toma tiempo, lo lograrás con práctica.",
    "Un tropiezo no define tu camino. ¡Ánimo!",
    "A veces fallar nos enseña más que acertar. ¡Sigue adelante!",
    "Tener 0 hoy no significa que no puedas tener 10 mañana. ¡Confía en ti!"
  ];

  if (calificacion === 0) {
    mensaje = cero[Math.floor(Math.random() * cero.length)];
  } else if (calificacion >= 0 && calificacion < 6) {
    mensaje = bajo[Math.floor(Math.random() * bajo.length)];
  } else if (calificacion >= 6 && calificacion <= 8) {
    mensaje = medio[Math.floor(Math.random() * medio.length)];
  } else if (calificacion >= 9 && calificacion <= 10) {
    mensaje = alto[Math.floor(Math.random() * alto.length)];
  } else {
    mensaje = "Calificación no válida.";
  }

  Swal.fire({
    icon: 'info',
    title: 'Resultado',
    text: mensaje,
    confirmButtonText: 'Aceptar',
    allowOutsideClick: false,
    allowEscapeKey: false
  });
}
