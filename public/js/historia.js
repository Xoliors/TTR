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