const id_ejercicio = 11;
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;
const maxIntentos = 5;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

const animalitos = ["🐻‍❄️", "🦊", "🦝", "🐯", "🦓", "🐨", "🐱", "🦁", "🦄", "🦃", "🐩", "🐸"];
let sumas = [];

function generarSumas() {
  sumas = [];
  const contenedor = document.getElementById('contenedor');
  contenedor.innerHTML = '';
  const opciones = new Set();

  for (let i = 0; i < 12; i++) {
    let numeros, r;
    do {
      numeros = Array.from({length: 4}, () => Math.floor(Math.random() * 4000) + 200);
      numeros.sort((a, b) => b - a);
      r = numeros[0] - numeros[1] - numeros[2] - numeros[3];
    } while (r < 0);

    sumas.push({ id: i, nums: numeros, r, elegido: null });
    opciones.add(r);

    while (opciones.size < 6 * 3) {
      opciones.add(Math.floor(Math.random() * 10000));
    }

    contenedor.innerHTML += `
      <div class="ejercicio" id="ej${i}">
        <div class="suma">
          ${animalitos[i]}<br>
          &nbsp;&nbsp;&nbsp;${numeros[0]}<br>
          &nbsp;&nbsp;&nbsp;${numeros[1]}<br>
          &nbsp;&nbsp;&nbsp;${numeros[2]}<br>
        - ${numeros[3]}<br>
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
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
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

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  actualizarContadorIntentos();

  const nota = Math.round((aciertos / sumas.length) * 10);
  const fecha = today;

  fetch('/ejercicios_tercero/rv3/guardar-calificacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: nota,
      id_ejercicio,
      fecha
    })
  }).then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${nota}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(nota.toFixed(1));
    });
    if (globalAttempts >= 5) {
      document.getElementById('verifBtn').disabled = true;
    }
  })
  .catch(err => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err,
      confirmButtonText: 'Aceptar'
    });
  });

  document.getElementById('btnVerificar').style.display = "none";
  if (globalAttempts < maxIntentos) {
    document.getElementById('btnReintentar').style.display = "inline-block";
  } else {
    document.getElementById('btnReintentar').style.display = "none";
    bloquearTodo();
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

function actualizarContadorIntentos() {
  const restante = maxIntentos - globalAttempts;
  document.getElementById('intentos').textContent = `Intentos restantes hoy: ${restante}`;
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

  if (calificacion >= 1 && calificacion <= 5) {
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