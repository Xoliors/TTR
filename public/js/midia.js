const diasContainer = document.getElementById('dias-container');
const calendario = document.getElementById('calendario');
const guardarBtn = document.getElementById('guardar');
const reiniciarBtn = document.getElementById('reiniciar');
const calificacionTexto = document.getElementById('calificacion');
let intentos = 0;

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

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
    input.classList.add('caja'); // Clase agregada para aplicar estilos en CSS
    diaDiv.appendChild(input);
  }
  diasContainer.appendChild(diaDiv);
});

function evaluarActividades() {
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

  if (diasCompletos < diasSemana.length) {
    intentos++;
    if (intentos < 5) {
      reiniciarBtn.style.display = 'inline-block';
    } else {
      guardarBtn.disabled = true;
      reiniciarBtn.style.display = 'none';
      calificacionTexto.textContent += ' 🔒 Ya no puedes intentar más veces.';
    }
  } else {
    reiniciarBtn.style.display = 'none';
  }
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
