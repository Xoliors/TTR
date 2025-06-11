const id_ejercicio = 30;
const today = new Date().toISOString().split("T")[0];
const fecha = today;

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Reiniciar intentos si la fecha es diferente
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

document.getElementById("attempts").innerText = `Intentos hoy: ${globalAttempts}/5`;

function verificar() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'error',
      title: '¡Sin intentos disponibles!',
      text: 'Has alcanzado el número máximo de intentos para hoy. Vuelve mañana.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const respuestasCorrectas = [
    ['C', 9],
    ['B', 8],
    ['A', 6],
    ['C', 7],
    ['B', 4]
  ];

  const form = document.forms['formulario'];
  let aciertos = 0;

  for (let i = 1; i <= 5; i++) {
    let letra = form[`botella${i}`].value.toUpperCase();
    let litros = parseInt(form[`litros${i}`].value);
    if (letra === respuestasCorrectas[i - 1][0] && litros === respuestasCorrectas[i - 1][1]) {
      aciertos++;
    }
  }

  const calificacion = aciertos * 2;
  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  document.getElementById('resultado').innerHTML = `Tu calificación es: ${calificacion} / 10<br>Intentos usados: ${globalAttempts}/5`;

  // Actualizar contador en pantalla
  document.getElementById("attempts").innerText = `Intentos hoy: ${globalAttempts}/5`;

  // Guardar calificación en backend
  fetch("/ejercicios_segundo/botellas/guardar-calificacion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion,
      id_ejercicio,
      fecha
    })
  })
    .then(response => {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Calificación registrada!',
          text: `Tu calificación fue de ${calificacion} / 10.`,
          confirmButtonText: 'Aceptar'
        });
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar tu calificación.',
        confirmButtonText: 'Aceptar'
      });
    });

  // Mostrar botón reintentar si quedan intentos
  if (globalAttempts < 5) {
    document.getElementById('reintentar').style.display = 'inline-block';
  } else {
    document.getElementById('reintentar').style.display = 'none';
    // Opcional: deshabilitar botón verificar para que no puedan seguir intentando
    // document.querySelector("button.bn[onclick='verificar()']").disabled = true;
  }
}

function reiniciar() {
  document.getElementById('formulario').reset();
  document.getElementById('resultado').innerHTML = "";
  document.getElementById('reintentar').style.display = 'none';
}

// Event listener para el botón reintentar fijo
document.getElementById('reintentar').addEventListener('click', reiniciar);
