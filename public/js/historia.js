const id_ejercicio = 33;
  const today = new Date().toISOString().split("T")[0];
  let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
  let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

  if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  }

  document.getElementById("attempts").textContent = `Intentos hoy: ${globalAttempts}`;

  // Envolver cada letra
  document.querySelectorAll('.historia p').forEach(p => {
    const texto = p.textContent;
    p.innerHTML = '';
    texto.split('').forEach(ch => {
      if (ch === ' ') {
        p.appendChild(document.createTextNode(' '));
      } else {
        const span = document.createElement('span');
        span.className = 'letra';
        span.textContent = ch;
        p.appendChild(span);
      }
    });
  });

  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const respuestas = ["Enero", "Junio", "Agosto", "Diciembre"];
  const maxIntentos = 5;
  const contenedores = [
    document.getElementById('contenedorMeses1'),
    document.getElementById('contenedorMeses2'),
    document.getElementById('contenedorMeses3'),
    document.getElementById('contenedorMeses4')
  ];
  const resultado = document.getElementById('resultadoGeneral');

  function crearMeses(c) {
    meses.forEach(m => {
      const d = document.createElement('div');
      d.className = 'mes';
      d.textContent = m;
      d.onclick = () => {
        if (d.classList.contains('correcto') || d.classList.contains('incorrecto')) return;
        c.querySelectorAll('.mes').forEach(x => x.classList.remove('selected'));
        d.classList.add('selected');
      };
      c.appendChild(d);
    });
  }

  contenedores.forEach(crearMeses);

  function verificarTodo() {
    if (globalAttempts >= maxIntentos) {
      Swal.fire({
        icon: 'error',
        title: 'Límite de intentos alcanzado',
        text: 'Ya has usado todos tus intentos del día.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
    document.getElementById("attempts").textContent = `Intentos hoy: ${globalAttempts}`;

    let ac = 0;
    contenedores.forEach((c, i) => {
      const sel = c.querySelector('.selected');
      if (!sel) return;
      if (sel.textContent === respuestas[i]) {
        sel.classList.add('correcto');
        ac++;
      } else {
        sel.classList.add('incorrecto');
      }
    });

    const calificacion = (ac / 4) * 10;

    // Mostrar resultado con SweetAlert
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${calificacion}/10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      mostrarMensajeMotivacional(calificacion.toFixed(1));
    });

    // Enviar resultado al servidor
    fetch('/ejercicios_segundo/historia/guardar-calificacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intento: globalAttempts,
        calificacion: calificacion,
        id_ejercicio,
        fecha: today
      })
    }).catch(err => console.error('Error al guardar calificación:', err));
  }

  function reiniciar() {
    contenedores.forEach(c => {
      c.innerHTML = '';
      crearMeses(c);
    });
    resultado.textContent = '';
  }

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