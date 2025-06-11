const id_ejercicio = 22;
const today = new Date().toISOString().split("T")[0];
const fecha = today;

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

const dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
const contDias = document.getElementById('contenedor-dias');
const contSlots = document.getElementById('contenedor-slots');
let mixDias = [...dias].sort(() => Math.random() - 0.5);
mixDias.forEach(d => {
  const el = document.createElement('div');
  el.className = 'dia'; el.textContent = d;
  el.draggable = true; el.id = 'dia-' + d;
  contDias.appendChild(el);
});
dias.forEach(() => { 
  const slot = document.createElement('div'); 
  slot.className = 'slot'; 
  contSlots.appendChild(slot); 
});

const datos = [['24','Horas'], ['7','Días'], ['4','Semanas']];
const extras = ['12 Meses','365 Días','60 Minutos','52 Semanas','30 Días','5 minutos','2 Semanas ','10 Horas'];
const nums = datos.map(d => d[0] + ' ' + d[1]).concat(extras).sort(() => Math.random() - 0.5);
const contNums = document.getElementById('contenedor-numeros');
nums.forEach(txt => {
  const n = document.createElement('div');
  n.className = 'numero'; n.textContent = txt;
  n.draggable = true; n.id = 'num-' + txt;
  contNums.appendChild(n);
});

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
  if (e.target.classList.contains('slot') || e.target.classList.contains('td')) {
    e.preventDefault(); e.target.classList.remove('over');
    const id = e.dataTransfer.getData('text/plain');
    const d = document.getElementById(id);
    if (e.target.firstChild) {
      const parent = e.target.classList.contains('slot') ? contDias : contNums;
      parent.appendChild(e.target.firstChild);
    }
    e.target.appendChild(d);
  }
});

document.getElementById('calificar').addEventListener('click', () => {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'error',
      title: 'Sin intentos disponibles',
      text: 'Has alcanzado el límite de intentos para hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  let score = 0;
  Array.from(contSlots.children).forEach((s, i) => {
    if (s.firstChild && s.firstChild.textContent === dias[i]) score++;
  });

  const mapping = { semana: '7 Días', dia: '24 Horas', mes: '4 Semanas' };
  document.querySelectorAll('.td').forEach(td => {
    const c = td.firstChild;
    if (c && c.textContent === mapping[td.dataset.concept]) score++;
  });

  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  document.getElementById('resultado').textContent = `Calificación: ${score} / 10`;
  document.getElementById('intentos').textContent = `Intentos usados: ${globalAttempts} de 5`;
  document.getElementById('calificar').disabled = true;
  if (globalAttempts < 5) document.getElementById('reiniciar').style.display = 'block';
  if (globalAttempts >= 5) document.getElementById('reiniciar').disabled = true;

  fetch('/ejercicios_numeros/ctiempo/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: score,
      id_ejercicio,
      fecha
    })
  }).then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${score}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
        mostrarMensajeMotivacional(score.toFixed(1));
    });
  });
});

document.getElementById('reiniciar').addEventListener('click', () => {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'error',
      title: 'Sin intentos disponibles',
      text: 'Ya no puedes intentar más hoy.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  document.querySelectorAll('.slot').forEach(slot => {
    while (slot.firstChild) contDias.appendChild(slot.firstChild);
  });
  document.querySelectorAll('.td').forEach(td => {
    while (td.firstChild) contNums.appendChild(td.firstChild);
  });
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