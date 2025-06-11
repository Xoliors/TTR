const id_ejercicio = 24;
  const today = new Date().toISOString().split("T")[0];
  let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
  let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

  if (lastAttemptDate !== today) {
    globalAttempts = 0;
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
  }

  document.getElementById("intentos").textContent = `Intentos usados: ${globalAttempts}/5`;

  const frutas = {
    fresa: { emoji: "🍓", cantidad: 72, personas: 8 },
    kiwi: { emoji: "🥝", cantidad: 45, personas: 3 },
    pina: { emoji: "🍍", cantidad: 32, personas: 4 },
    manzana: { emoji: "🍎", cantidad: 60, personas: 6 }
  };

  function crearFrutas(contenedorId, emoji) {
    const contenedor = document.getElementById(contenedorId);
    const fruta = document.createElement("div");
    fruta.className = "fruit";
    fruta.textContent = emoji;
    fruta.draggable = true;
    fruta.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", emoji);
    });
    contenedor.appendChild(fruta);
  }

  function crearPersonas(contenedorId, personas) {
    const contenedor = document.getElementById(contenedorId);
    for (let i = 0; i < personas; i++) {
      const personBox = document.createElement("div");
      personBox.className = "person-box";

      const dropzone = document.createElement("div");
      dropzone.className = "dropzone";
      dropzone.addEventListener("dragover", e => e.preventDefault());
      dropzone.addEventListener("drop", function (e) {
        e.preventDefault();
        const fruta = document.createElement("div");
        fruta.className = "fruit";
        fruta.textContent = e.dataTransfer.getData("text/plain");
        this.appendChild(fruta);
        this.style.height = `${this.children.length * 30}px`;
      });

      const emoji = document.createElement("div");
      emoji.className = "emoji";
      emoji.textContent = "🧍‍♂️";

      personBox.appendChild(dropzone);
      personBox.appendChild(emoji);
      contenedor.appendChild(personBox);
    }
  }

  crearFrutas("fresa-bank", frutas.fresa.emoji);
  crearFrutas("kiwi-bank", frutas.kiwi.emoji);
  crearFrutas("pina-bank", frutas.pina.emoji);
  crearFrutas("manzana-bank", frutas.manzana.emoji);

  crearPersonas("fresa-people", frutas.fresa.personas);
  crearPersonas("kiwi-people", frutas.kiwi.personas);
  crearPersonas("pina-people", frutas.pina.personas);
  crearPersonas("manzana-people", frutas.manzana.personas);

  document.getElementById("check").addEventListener("click", () => {
    if (globalAttempts >= 5) {
      Swal.fire({
        icon: 'warning',
        title: '¡Sin intentos!',
        text: 'Por el día de hoy haz terminado tus intentos',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    let total = 0;
    const secciones = document.querySelectorAll(".section");

    secciones.forEach(section => {
      const zonas = section.querySelectorAll(".dropzone");
      const input = section.querySelector("input");
      const respuesta = parseFloat(input.value);
      const correcta = parseFloat(section.dataset.answer);

      const frutasArrastradas = Array.from(zonas).map(z => z.querySelectorAll(".fruit").length);
      const totalFrutasArrastradas = frutasArrastradas.reduce((acc, cantidad) => acc + cantidad, 0);

      const esCorrectoRespuesta = Math.abs(respuesta - correcta) < 0.1;

      const clave = section.id.split('-')[0];
      const esCorrectoFrutas = frutasArrastradas.every(cantidad =>
        cantidad === frutas[clave].cantidad / frutas[clave].personas
      );

      if (esCorrectoFrutas) total += 2;
      if (esCorrectoRespuesta) total += 0.5;
    });

    const calificacion = Math.min(total, 10);

    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
    document.getElementById("intentos").textContent = `Intentos usados: ${globalAttempts}/5`;

    fetch("/ejercicios_tercero/fim/guardar-calificacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        intento: globalAttempts,
        calificacion: calificacion.toFixed(2),
        id_ejercicio,
        fecha: today
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject("Error en la respuesta"))
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${calificacion.toFixed(2)}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
      mostrarMensajeMotivacional(calificacion.toFixed(2));
    });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar la calificación.',
        confirmButtonText: 'Aceptar'
      });
      console.error(error);
    });
  });

  document.getElementById("reiniciar").addEventListener("click", () => {
    location.reload();
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