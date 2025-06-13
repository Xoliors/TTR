const id_ejercicio = 27;
  const today = new Date().toISOString().split("T")[0];
  const fecha = today;

  let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
  let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

  // Reset diario
  if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  }

  function checkAnswers() {
    if (globalAttempts >= 5) {
      return Swal.fire({
        icon: 'error',
        title: '¡Has alcanzado el límite de intentos!',
        text: 'Inténtalo de nuevo mañana.',
        confirmButtonText: 'Aceptar'
      });
    }


    let score = 0;
    const answers = {
        input1: ["pentagono", "pentágono"],
        input2: ["hexagono", "hexágono"],
        input3: ["rombo"],
        input4: ["heptagono", "heptágono"],
        input5: ["trapecio"],
        input6: ["octagono", "octágono"],
        input7: ["rectangulo", "rectángulo"],
        input8: ["cuadrado"],
        input9: ["triangulo", "triángulo"]
    };


    const total = Object.keys(answers).length;

    for (let i = 1; i <= total; i++) {
      const input = document.getElementById(`input${i}`);
      let userAnswer = input.value.trim().toLowerCase();
      if (answers[`input${i}`].includes(userAnswer)) score++;
    }

    const grade = (score / total) * 10;
    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

    // Mostrar resultado en pantalla
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
      <p>Calificación: <strong>${grade.toFixed(1)} / 10</strong></p>
      <p>Intentos usados: <strong>${globalAttempts}</strong> de 5</p>
    `;

    // Enviar datos al servidor
    fetch("/ejercicios_segundo/figuras/guardar-calificacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intento: globalAttempts,
        calificacion: grade,
        id_ejercicio,
        fecha
      })
    });

    // Mostrar sweetalert
    Swal.fire({
      icon: 'success',
      title: '¡Calificación registrada!',
      text: `Tu calificación fue de ${grade.toFixed(1)} / 10.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
        mostrarMensajeMotivacional(grade.toFixed(1));
    });
  }

  function retry() {
    // Limpiar inputs
    for (let i = 1; i <= 9; i++) {
      document.getElementById(`input${i}`).value = "";
    }
    // Limpiar resultados
    document.getElementById("result").innerHTML = "";
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