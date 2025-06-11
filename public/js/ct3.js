document.addEventListener('DOMContentLoaded', () => {
  const id_ejercicio = 33;
  const maxIntentos = 5;
  const today = new Date().toISOString().split("T")[0];
  const fecha = today;

  const contMeses = document.getElementById('contenedor-meses');
  const contSlots = document.getElementById('contenedor-slots');
  const contNums = document.getElementById('contenedor-numeros');
  const btnCalificar = document.getElementById('calificar');
  const btnReiniciar = document.getElementById('reiniciar');
  const divIntentos = document.getElementById('intentos');
  const divResultado = document.getElementById('resultado');

  const frecuencia = ['Siempre','Usualmente','A menudo','Rara vez','Nunca'];
  const datos = [['24','horas'], ['48','horas'], ['72','horas'], ['12','horas']];
  const extras = ['30 minutos','60 minutos','1 hora','100 horas','15 horas','36 horas'];

  let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || '';
  let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

  if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  }

  divIntentos.textContent = `Intentos usados: ${globalAttempts} de ${maxIntentos}`;

  function inicializarJuego() {
    contMeses.innerHTML = '';
    contSlots.innerHTML = '';
    contNums.innerHTML = '';
    document.querySelectorAll('.td').forEach(td => td.innerHTML = '');

    let mix = [...frecuencia].sort(() => Math.random() - 0.5);
    mix.forEach(txt => {
      const el = document.createElement('div');
      el.className = 'mes'; el.textContent = txt;
      el.draggable = true; el.id = 'mes-' + txt;
      contMeses.appendChild(el);
    });

    frecuencia.forEach(() => {
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
    if (e.target.draggable) e.dataTransfer.setData('text/plain', e.target.id);
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
        if (e.target.classList.contains('slot')) contMeses.appendChild(e.target.firstChild);
        else contNums.appendChild(e.target.firstChild);
      }
      e.target.appendChild(d);
    }
  });

  btnCalificar.addEventListener('click', () => {
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
    Array.from(contSlots.children).forEach((s, i) => {
      if (s.firstChild && s.firstChild.textContent === frecuencia[i]) aciertos++;
    });

    const mapping = { '24': '24 horas', '48': '48 horas', '72': '72 horas', '12': '12 horas' };
    document.querySelectorAll('.td').forEach(td => {
      const c = td.firstChild;
      if (c && c.textContent === mapping[td.dataset.concept]) aciertos++;
    });

    let calificacion = Math.round(((aciertos / 9) * 10) * 100) / 100;

    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
    divIntentos.textContent = `Intentos usados: ${globalAttempts} de ${maxIntentos}`;
    divResultado.textContent = `Calificación: ${calificacion} / 10`;

    btnCalificar.disabled = true;
    if (globalAttempts < maxIntentos) {
      btnReiniciar.style.display = 'block';
    } else {
      btnReiniciar.disabled = true;
    }

    // Enviar datos
    fetch('/ejercicios_tercero/ct3/guardar-calificacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intento: globalAttempts,
        calificacion: calificacion,
        id_ejercicio,
        fecha
      })
    })
    .then(res => res.json())
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${calificacion}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        mostrarMensajeMotivacional(calificacion.toFixed(1));
      });
    })
    .catch(err => {
      console.error('Error al guardar:', err);
    });
  });

  btnReiniciar.addEventListener('click', () => {
    if (globalAttempts >= maxIntentos) return;
    inicializarJuego();
    divResultado.textContent = '';
    btnCalificar.disabled = false;
    btnReiniciar.style.display = 'none';
  });
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