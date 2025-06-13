const id_ejercicio = 38;
const ruta = "/ejercicios_tercero/jardin/guardar-calificacion";
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

function verificarTodo() {
  if (globalAttempts >= 5) {
    Swal.fire({
      icon: 'warning',
      title: 'Límite de intentos alcanzado',
      text: 'Ya no tienes más intentos por hoy. Intenta mañana.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  const respuestas = {
    f1a: 49, f1b: 42, f2: 21, f3: 35, f4: 63, f5: 56, f6: 14,
    t1a: 45, t1b: 27, t2: 72, t3: 18, t4: 54, t5: 36, t6: 81,
  };
  let correctas = 0;

  for (let id in respuestas) {
    const input = document.getElementById(id);
    let icono = id.startsWith("f")
      ? document.getElementById("c" + id.slice(1))
      : document.getElementById("ct" + id.slice(1));

    if (parseInt(input.value.trim()) === respuestas[id]) {
      icono.textContent = "✅";
      correctas++;
    } else {
      icono.textContent = "❌";
    }
  }

  const preguntas = [
    { id: "p1", valor: ["4"], icon: "cp1" },
    { id: "p2", valor: ["6"], icon: "cp2" },
    { id: "p3", valor: ["91"], icon: "cp3" },
    { id: "p4", valor: ["21"], icon: "cp4" },
    { id: "p5", valor: ["90"], icon: "cp5" },
    { id: "p6", valor: ["3"], icon: "cp6" }
  ];

  preguntas.forEach(p => {
    const respuesta = document.getElementById(p.id).value.trim().toLowerCase();
    const icono = document.getElementById(p.icon);
    if (p.valor.includes(respuesta)) {
      icono.textContent = "✅";
      correctas++;
    } else {
      icono.textContent = "❌";
    }
  });

  const total = 20;
  const calificacion = Math.round((correctas / total) * 10);
  const fecha = new Date().toISOString().split("T")[0];

  document.getElementById("resultadoFinal").innerHTML =
    `✅ Respuestas correctas: ${correctas} de 20<br>🎓 Calificación: <strong>${calificacion}/10</strong>`;

  mostrarMensajeMotivacional(calificacion);

  // Enviar calificación
  fetch(ruta, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion,
      id_ejercicio,
      fecha
    })
  })
    .then(response => response.json())
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${calificacion}/10.`,
        confirmButtonText: 'Aceptar'
      })
    })

    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: 'Ocurrió un problema al enviar tu calificación.',
        confirmButtonText: 'Aceptar'
      });
      console.error(error);
    });

  // Aumentar intentos
  globalAttempts++;
  localStorage.setItem("globalAttempts", globalAttempts);
}

function mostrarMensajeMotivacional(calificacionRaw) {
  let calificacion = Number(calificacionRaw);
  let mensaje = "";

  const bajo = [
    "Te hace falta más práctica, ¡no te desanimes!",
    "Aún hay áreas que mejorar, sigue esforzándote.",
    "Cada error es una oportunidad de aprender.",
    "Puedes mejorar mucho más.",
    "Sigue practicando, estás aprendiendo.",
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
    "¡Casi lo consigues! Un poco más de esfuerzo.",
    "Buen intento, no estás lejos del objetivo.",
    "Continúa así, tu esfuerzo está dando frutos.",
    "¡Sigue practicando! Estás muy cerca del 10.",
    "Buen desempeño, te falta poco.",
    "¡Excelente progreso! No te detengas."
  ];

  const alto = [
    "¡Fabuloso! Estás haciendo un trabajo increíble.",
    "¡Lo lograste! Sigue así.",
    "¡Excelente resultado! Tu esfuerzo se nota.",
    "¡Perfecto! Se nota tu dedicación.",
    "¡Muy bien hecho! Continúa aprendiendo.",
    "¡Genial! Estás dominando este tema.",
    "¡Brillante! Sigue así.",
    "¡Orgulloso de tu progreso!",
    "¡Gran trabajo! Estás aprendiendo mucho.",
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
    allowOutsideClick: false,
    allowEscapeKey: false
  });
}

// Esta función la llamas desde el botón "Intentar de nuevo"
function reiniciarEjercicios() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach(input => {
    input.value = "";
  });
  const iconos = document.querySelectorAll("span[id^='c'], span[id^='ct'], span[id^='cp']");
  iconos.forEach(i => i.textContent = "");
  document.getElementById("resultadoFinal").innerHTML = "";
  document.getElementById("btnReintentar").style.display = "none";
}