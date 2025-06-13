const id_ejercicio = 34;
const today = new Date().toISOString().split("T")[0];
const keyDate = `lastAttemptDate_${id_ejercicio}`;
const keyAttempts = `globalAttempts_${id_ejercicio}`;

let lastAttemptDate = localStorage.getItem(keyDate) || "";
let globalAttempts = parseInt(localStorage.getItem(keyAttempts)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(keyDate, today);
  localStorage.setItem(keyAttempts, globalAttempts);
}

const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const datos = [['7', 'Días'], ['30', 'Días'], ['4', 'Semanas'], ['12', 'Meses']];
const extras = ['24 Horas','360 Días','60 Minutos','52 Semanas','5 Minutos','2 Semanas','10 Horas'];

const contMeses = document.getElementById('contenedor-meses');
const contSlots = document.getElementById('contenedor-slots');
const contNums = document.getElementById('contenedor-numeros');

function inicializarJuego() {
  contMeses.innerHTML = '';
  contSlots.innerHTML = '';
  contNums.innerHTML = '';
  document.querySelectorAll('.td').forEach(td => td.innerHTML = '');

  let mixMeses = [...meses].sort(() => Math.random() - 0.5);
  mixMeses.forEach(m => {
    const el = document.createElement('div');
    el.className = 'mes'; el.textContent = m;
    el.draggable = true; el.id = 'mes-' + m;
    contMeses.appendChild(el);
  });

  meses.forEach(() => {
    const slot = document.createElement('div');
    slot.className = 'slot';
    contSlots.appendChild(slot);
  });

  let nums = datos.map(d => d[0] + ' ' + d[1]).concat(extras).sort(() => Math.random() - 0.5);
  nums.forEach(txt => {
    const n = document.createElement('div');
    n.className = 'numero'; n.textContent = txt;
    n.draggable = true; n.id = 'num-' + txt;
    contNums.appendChild(n);
  });
}

inicializarJuego();

document.addEventListener('dragstart', e => {
  if (e.target.draggable) {
    e.dataTransfer.setData('text/plain', e.target.id);
  }
});

document.addEventListener('dragover', e => {
  if (e.target.classList.contains('slot') || e.target.classList.contains('td')) {
    e.preventDefault(); e.target.classList.add('over');
  }
});

document.addEventListener('dragleave', e => {
  if (e.target.classList.contains('slot') || e.target.classList.contains('td')) {
    e.target.classList.remove('over');
  }
});

document.addEventListener('drop', e => {
  if (e.target.classList.contains('slot')) {
    e.preventDefault(); e.target.classList.remove('over');
    const id = e.dataTransfer.getData('text/plain');
    const d = document.getElementById(id);
    if (e.target.firstChild) contMeses.appendChild(e.target.firstChild);
    e.target.appendChild(d);
  }
  if (e.target.classList.contains('td')) {
    e.preventDefault(); e.target.classList.remove('over');
    const id = e.dataTransfer.getData('text/plain');
    const d = document.getElementById(id);
    if (e.target.firstChild) contNums.appendChild(e.target.firstChild);
    e.target.appendChild(d);
  }
});

document.getElementById('calificar').addEventListener('click', () => {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'warning',
      title: 'Límite alcanzado',
      text: 'Ya has usado tus 5 intentos para hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  let aciertos = 0;
  Array.from(contSlots.children).forEach((s, i) => {
    if (s.firstChild && s.firstChild.textContent === meses[i]) aciertos++;
  });

  const mapping = { semana: '7 Días', mes30: '30 Días', mes4: '4 Semanas', ano: '12 Meses' };
  document.querySelectorAll('.td').forEach(td => {
    const c = td.firstChild;
    if (c && c.textContent === mapping[td.dataset.concept]) aciertos++;
  });

  let calificacion = (aciertos / 16) * 10;
  calificacion = Math.round(calificacion * 100) / 100;

  globalAttempts++;
  localStorage.setItem(keyAttempts, globalAttempts);

  const fecha = today;

  fetch('/ejercicios_segundo/ct2/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion,
      id_ejercicio,
      fecha
    })
  })
  .then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${calificacion}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(calificacion.toFixed(1));
    });
  })
  .catch(() => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo registrar la calificación.',
      confirmButtonText: 'Aceptar'
    });
  });

  document.getElementById('resultado').textContent = `Calificación: ${calificacion} / 10`;
  document.getElementById('intentos').textContent = `Intentos usados: ${globalAttempts} de 5`;
  document.getElementById('calificar').disabled = true;

  if (globalAttempts < 5) {
    document.getElementById('reiniciar').style.display = 'block';
  } else {
    document.getElementById('reiniciar').disabled = true;
  }
});

document.getElementById('reiniciar').addEventListener('click', () => {
  if (globalAttempts >= 5) return;
  inicializarJuego();
  document.getElementById('resultado').textContent = '';
  document.getElementById('calificar').disabled = false;
  document.getElementById('reiniciar').style.display = 'none';
});

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

  if (calificacion >= 0 && calificacion < 6) {
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
