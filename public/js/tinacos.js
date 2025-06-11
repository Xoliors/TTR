let litros = [0, 0, 0];
  const metas = [1560, 2340, 3691];
  const capacidadTotal = 5000;
  const id_ejercicio = 30;

  const today = new Date().toISOString().split("T")[0];
  let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
  let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

  if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  }

  document.querySelectorAll(".litro").forEach(item => {
    item.addEventListener("dragstart", e => {
      e.dataTransfer.setData("valor", e.target.dataset.valor);
    });
  });

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drop(ev, tinacoId) {
    ev.preventDefault();
    const valor = parseInt(ev.dataTransfer.getData("valor"));
    litros[tinacoId - 1] += valor;
    document.getElementById(`litros${tinacoId}`).innerText = `${litros[tinacoId - 1]} L`;

    const porcentaje = Math.min((litros[tinacoId - 1] / capacidadTotal) * 100, 100);
    document.getElementById(`llenado${tinacoId}`).style.height = porcentaje + "%";
  }

  function verificar() {
    if (globalAttempts >= 5) {
      Swal.fire({
        icon: 'warning',
        title: '¡Sin intentos!',
        text: 'Por el día de hoy haz terminado tus intentos',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    let puntos = 0;
    for (let i = 0; i < 3; i++) {
      const diferencia = Math.abs(metas[i] - litros[i]);
      if (diferencia === 0) puntos += 10 / 3;
      else if (diferencia <= 10) puntos += 7 / 3;
      else if (diferencia <= 50) puntos += 5 / 3;
    }

    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

    const fecha = today;

    fetch("/ejercicios_tercero/tinacos/guardar-calificacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        intento: globalAttempts,
        calificacion: Math.round(puntos),
        id_ejercicio,
        fecha
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al guardar la calificación.");
      }
      return response.json();
    })
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${Math.round(puntos)}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        mostrarMensajeMotivacional(Math.round(puntos));
      });
      document.getElementById("resultado").innerText = `Calificación: ${Math.round(puntos)}/10`;
      document.getElementById("reiniciar").style.display = "inline-block";
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'No se pudo guardar la calificación.',
        confirmButtonText: 'Aceptar'
      });
    });
  }

  function reiniciar() {
    litros = [0, 0, 0];
    for (let i = 1; i <= 3; i++) {
      document.getElementById(`litros${i}`).innerText = "0 L";
      document.getElementById(`llenado${i}`).style.height = "0%";
    }
    document.getElementById("resultado").innerText = "";
    document.getElementById("reiniciar").style.display = "none";
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