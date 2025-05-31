const diasContainer = document.getElementById('dias-container');
const calendario = document.getElementById('calendario');
const guardarBtn = document.getElementById('guardar');
const reiniciarBtn = document.getElementById('reiniciar');
const calificacionTexto = document.getElementById('calificacion');

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const id_ejercicio = 23;
const today = new Date().toISOString().split("T")[0];

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Si la fecha ha cambiado, reinicia los intentos
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

// Crear inputs para cada día
diasSemana.forEach((nombre, i) => {
  const diaDiv = document.createElement('div');
  diaDiv.classList.add('dia');
  diaDiv.innerHTML = `<h3>🗓 ${nombre}</h3>`;
  for (let j = 1; j <= 6; j++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Actividad ${j}`;
    input.dataset.dia = i;
    input.classList.add('caja');
    diaDiv.appendChild(input);
  }
  diasContainer.appendChild(diaDiv);
});

function evaluarActividades() {
  // Verifica si aún hay intentos
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'error',
      title: '¡Sin intentos disponibles!',
      text: 'Ya has usado los 5 intentos del día. Intenta nuevamente mañana.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const inputs = document.querySelectorAll('input[type="text"]');
  const actividadesPorDia = Array(diasSemana.length).fill(0);

  inputs.forEach(input => {
    if (input.value.trim() !== '') {
      const dia = parseInt(input.dataset.dia);
      actividadesPorDia[dia]++;
    }
  });

  const diasCompletos = actividadesPorDia.filter(act => act >= 1).length;
  const calificacion = (diasCompletos / diasSemana.length) * 10;
  const fecha = today;

  calificacionTexto.textContent = `📊 Calificación: ${calificacion.toFixed(1)} / 10`;

  // Mostrar resumen
  calendario.innerHTML = '<h2>📘 Actividades Registradas</h2>';
  diasSemana.forEach((nombre, i) => {
    const div = document.createElement('div');
    div.classList.add('resultado-dia');
    div.innerHTML = `<strong>${nombre}:</strong><br>`;
    const actividades = Array.from(inputs)
      .filter(input => parseInt(input.dataset.dia) === i && input.value.trim() !== '');
    if (actividades.length > 0) {
      actividades.forEach(act => {
        div.innerHTML += `✅ ${act.value}<br>`;
      });
    } else {
      div.innerHTML += '❌ Sin actividades registradas.';
    }
    calendario.appendChild(div);
  });

  // Actualiza contador y almacenamiento
  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  // Enviar calificación al backend
  fetch('/ejercicios_numeros/dia/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion.toFixed(1),
      id_ejercicio,
      fecha
    })
  }).then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${calificacion.toFixed(1)}/10.`,
      confirmButtonText: 'Aceptar'
    });

    if (globalAttempts < 5 && diasCompletos < diasSemana.length) {
      reiniciarBtn.style.display = 'inline-block';
    } else {
      reiniciarBtn.style.display = 'none';
      guardarBtn.disabled = true;
    }
  }).catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al guardar la calificación.',
      confirmButtonText: 'Aceptar'
    });
    console.error(error);
  });
}

function reiniciar() {
  document.querySelectorAll('input[type="text"]').forEach(input => {
    input.value = '';
  });
  calificacionTexto.textContent = '';
  calendario.innerHTML = '';
  reiniciarBtn.style.display = 'none';
}

guardarBtn.onclick = evaluarActividades;
reiniciarBtn.onclick = reiniciar;
