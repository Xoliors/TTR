const id_ejercicio = 32;
  const maxIntentos = 5;
  const today = new Date().toISOString().split("T")[0];
  const fecha = today;

  let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
  let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

  if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  }

  document.getElementById("intentos").textContent = `Intentos usados: ${globalAttempts} de ${maxIntentos}`;

  function calificar() {
    if (globalAttempts >= maxIntentos) {
      Swal.fire({
        icon: 'warning',
        title: '¡Sin intentos!',
        text: 'Por el día de hoy haz terminado tus intentos',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    let score = 0;
    const p1 = document.getElementById("p1").value.trim().toUpperCase();
    const p2 = parseInt(document.getElementById("p2").value);
    const p3 = parseInt(document.getElementById("p3").value);
    const p4 = document.getElementById("p4").value.trim().toUpperCase();
    const p5 = parseInt(document.getElementById("p5").value);

    if (p1 === "D") score += 2;
    if (p2 === 960) score += 2;
    if (p3 === 682) score += 2;
    if (p4 === "C") score += 2;
    if (p5 === 7562) score += 2;

    document.getElementById("resultado").textContent = `Tu calificación es: ${score}/10`;

    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
    document.getElementById("intentos").textContent = `Intentos usados: ${globalAttempts} de ${maxIntentos}`;

    fetch("/ejercicios_tercero/barras3/guardar-calificacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

      if (globalAttempts < maxIntentos) {
        document.getElementById("reiniciar").style.display = "inline-block";
      } else {
        document.getElementById("reiniciar").disabled = true;
      }
    });
  }

  document.getElementById("reiniciar").addEventListener("click", () => {
    if (globalAttempts >= maxIntentos) {
      Swal.fire({
        icon: 'warning',
        title: '¡Sin intentos!',
        text: 'Por el día de hoy haz terminado tus intentos',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    document.getElementById("resultado").textContent = "";
    document.getElementById("p1").value = "";
    document.getElementById("p2").value = "";
    document.getElementById("p3").value = "";
    document.getElementById("p4").value = "";
    document.getElementById("p5").value = "";
    document.getElementById("reiniciar").style.display = "none";
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