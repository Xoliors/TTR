const animalitos = ["🐻‍❄️", "🦊", "🦝", "🐯", "🦓", "🐨", "🐱", "🦁", "🐯", "🦄", "🦃", "🐩"];
let restas = [];
const maxIntentos = 5;
const id_ejercicio = 11;

let today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Si la fecha almacenada es distinta a hoy, reiniciar intentos
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

function generarRestas() {
  restas = [];
  const contenedor = document.getElementById('contenedor');
  contenedor.innerHTML = '';
  const opciones = new Set();

  for (let i = 0; i < 12; i++) {
    let a = Math.floor(Math.random() * 251) + 50;
    let b = Math.floor(Math.random() * (a - 49)) + 50;
    let r = a - b;
    restas.push({ id: i, a, b, r, elegido: null });

    opciones.add(r);
    while (opciones.size < 6 * 3) {
      opciones.add(Math.floor(Math.random() * 251) + 50);
    }

    contenedor.innerHTML += `
      <div class="ejercicio" id="ej${i}">
        <div class="resta">
          ${animalitos[i]}<br>
          &nbsp;&nbsp;&nbsp;${a}<br>
        - ${b}<br>
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
  restas[id].elegido = valor;
}

async function verificar() {
  // Validar si ya alcanzó el máximo de intentos
  if (globalAttempts >= maxIntentos) {
    return Swal.fire({
      icon: 'error',
      title: 'No tienes más intentos disponibles hoy',
      text: `Ya realizaste ${maxIntentos} intentos hoy. Intenta de nuevo mañana.`,
      confirmButtonText: 'Aceptar'
    });
  }

  let aciertos = 0;
  for (let i = 0; i < restas.length; i++) {
    const fb = document.getElementById('fb' + i);
    if (restas[i].elegido === restas[i].r) {
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
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);

  const nota = Math.round((aciertos / restas.length) * 10);
  document.getElementById('resultado').textContent = `Intento ${globalAttempts} de ${maxIntentos} — Calificación: ${nota}/10`;

  document.getElementById('btnVerificar').style.display = "none";
  if (globalAttempts < maxIntentos) {
    document.getElementById('btnReintentar').style.display = "inline-block";
  } else {
    document.getElementById('btnReintentar').style.display = "none";
    bloquearTodo();
    document.getElementById('resultado').textContent += " — Has alcanzado el máximo de intentos.";
  }

  // Enviar calificación al backend
  const fecha = today;
  try {
    const response = await fetch('/ejercicios_segundo/rv2/guardar-calificacion', {
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
    });

    if (!response.ok) throw new Error('Error al guardar la calificación');

    // Mostrar mensaje éxito solo si se agotaron los intentos
    if (globalAttempts >= maxIntentos) {
      await  Swal.fire({
        icon: 'error',
        title: 'Sin intentos',
        text: 'Ya has alcanzado el número máximo de intentos por hoy.',
        confirmButtonText: 'Aceptar'
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo guardar la calificación. Intenta más tarde.',
      confirmButtonText: 'Aceptar'
    });
  }
}

function reiniciar() {
  generarRestas();
  document.getElementById('resultado').textContent = '';
  document.getElementById('btnVerificar').style.display = "inline-block";
  document.getElementById('btnReintentar').style.display = "none";
}

function bloquearTodo() {
  document.querySelectorAll('.dropzone').forEach(el => el.ondrop = null);
  document.querySelectorAll('.opcion').forEach(el => el.setAttribute('draggable', 'false'));
  document.getElementById('btnVerificar').disabled = true;
}

generarRestas();
