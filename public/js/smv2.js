const id_ejercicio = 10;
const maxIntentos = 5;
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Resetear intentos si es nuevo día
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

const animalitos = ["🐻‍❄️", "🦊", "🦝", "🐯", "🦓", "🐨", "🐱", "🦁", "🐯", "🦄", "🦃", "🐩"];
let sumas = [];

function actualizarContadorIntentos() {
  document.getElementById('contadorIntentos').textContent = `Intento ${globalAttempts + 1} de ${maxIntentos}`;
}

function generarSumas() {
  sumas = [];
  const contenedor = document.getElementById('contenedor');
  contenedor.innerHTML = '';
  const opciones = new Set();

  for (let i = 0; i < 12; i++) {
    let a = Math.floor(Math.random() * 251) + 50;
    let b = Math.floor(Math.random() * 251) + 50;
    let r = a + b;
    sumas.push({ id: i, a, b, r, elegido: null });

    opciones.add(r);
    while (opciones.size < 6 * 3) {
      opciones.add(Math.floor(Math.random() * 501) + 50);
    }

    contenedor.innerHTML += `
      <div class="ejercicio" id="ej${i}">
        <div class="suma">
          ${animalitos[i]}<br>
          &nbsp;&nbsp;&nbsp;${a}<br>
        + ${b}<br>
          <hr style="width: 80%; margin: 0 auto;">
        </div>
        <div class="dropzone" id="drop${i}" ondrop="soltar(event, ${i})" ondragover="permitirSoltar(event)">
          Arrastra aquí
        </div>
        <span class="feedback" id="fb${i}"></span>
      </div>
    `;
  }

  const opcionesDiv = document.getElementById('opciones');
  opcionesDiv.innerHTML = '';
  Array.from(opciones).sort(() => 0.5 - Math.random()).forEach(op => {
    opcionesDiv.innerHTML += `<div class="opcion" draggable="true" ondragstart="arrastrar(event)" id="opt${op}" data-valor="${op}">${op}</div>`;
  });

  actualizarContadorIntentos();
}

function arrastrar(ev) {
  ev.dataTransfer.setData("text", ev.target.getAttribute('data-valor'));
}

function permitirSoltar(ev) {
  ev.preventDefault();
}

function soltar(ev, id) {
  ev.preventDefault();
  const valor = parseInt(ev.dataTransfer.getData("text"));
  const drop = document.getElementById('drop' + id);
  drop.textContent = valor;
  sumas[id].elegido = valor;
}

function verificar() {
  if (globalAttempts >= maxIntentos) {
    Swal.fire({
      icon: 'error',
      title: 'Sin intentos',
      text: 'Ya has alcanzado el número máximo de intentos por hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  let aciertos = 0;
  for (let i = 0; i < sumas.length; i++) {
    const fb = document.getElementById('fb' + i);
    if (sumas[i].elegido === sumas[i].r) {
      fb.textContent = "✓";
      fb.style.color = "green";
      aciertos++;
    } else {
      fb.textContent = "✗";
      fb.style.color = "red";
    }
  }

  const nota = Math.round((aciertos / sumas.length) * 10);
  const fecha = today;

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  actualizarContadorIntentos();

  // Enviar calificación al servidor
  fetch('/ejercicios_segundo/smv2/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: nota,
      id_ejercicio,
      fecha
    })
  });

  Swal.fire({
    icon: 'success',
    title: '¡Calificación registrada!',
    text: `Tu calificación fue de ${nota}/10.`,
    confirmButtonText: 'Aceptar'
  }).then(() => {
      mostrarMensajeMotivacional(nota.toFixed(1));
    });

  document.getElementById('btnVerificar').style.display = "none";

  if (globalAttempts < maxIntentos) {
    document.getElementById('btnReintentar').style.display = "inline-block";
  } else {
    bloquearTodo();
    document.getElementById('btnReintentar').style.display = "none";
  }
}

function reiniciar() {
  generarSumas();
  document.getElementById('resultado').textContent = '';
  document.getElementById('btnVerificar').style.display = "inline-block";
  document.getElementById('btnReintentar').style.display = "none";
}

function bloquearTodo() {
  document.querySelectorAll('.dropzone').forEach(el => el.ondrop = null);
  document.querySelectorAll('.opcion').forEach(el => el.setAttribute('draggable', 'false'));
  document.getElementById('btnVerificar').disabled = true;
}

generarSumas();

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
    allowOutsideClick: false,   // ← No cerrar al hacer clic fuera
    allowEscapeKey: false       // ← No cerrar al presionar Esc
  });
}