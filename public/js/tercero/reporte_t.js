function getRandomColor() {
  const r = () => Math.floor(Math.random() * 256);
  return `rgba(${r()},${r()},${r()},0.7)`;
}

async function cargarDashboard() {
  const barras = await fetch('/reportes3/calificaciones-fecha3').then(res => res.json());
  const intentos = await fetch('/reportes3/intentos3').then(res => res.json());
  const datosEjercicios = await fetch('/reportes3/promedios-ejercicio3').then(res => res.json());

  console.log({ barras, intentos, datosEjercicios });

  new Chart(document.getElementById('graficaEjercicios'), {
    type: 'bar',
    data: {
      labels: datosEjercicios.map(d => d.nombre),
      datasets: [{
        label: 'Promedio por ejercicio',
        data: datosEjercicios.map(d => parseFloat(d.promedio)),
        backgroundColor: datosEjercicios.map(d => {
          const p = parseFloat(d.promedio);
          if (p < 5) return 'red';
          else if (p < 8) return 'orange';
          else return 'green';
        }),
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: false,
      scales: {
        x: {
          beginAtZero: true,
          max: 10
        }
      }
    }
  });

  new Chart(document.getElementById('graficaBarras'), {
    type: 'bar',
    data: {
      labels: barras.map(d => d.fecha),
      datasets: [{
        label: 'Calificaciones',
        data: barras.map(d => d.calificacion),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      }]
    },
    options: {
      responsive: false,
      scales: {
        y: { beginAtZero: true, max: 10 }
      }
    }
  });

  if (intentos.length > 0) {
    new Chart(document.getElementById('graficaIntentos'), {
      type: 'bar',
      data: {
        labels: intentos.map(d => d.ejercicio),
        datasets: [{
          label: 'Intentos por ejercicio',
          data: intentos.map(d => d.intentos),
          backgroundColor: 'rgba(255, 206, 86, 0.7)'
        }]
      },
      options: {
        responsive: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}


cargarDashboard();