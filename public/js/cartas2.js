const id_ejercicio = 12;
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;
const maxReintentos = 5;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

if (globalAttempts >= maxReintentos) {
  Swal.fire({
    icon: 'error',
    title: 'No tienes más intentos disponibles hoy',
    text: `Ya realizaste ${maxReintentos} intentos hoy. Intenta de nuevo mañana.`,
    confirmButtonText: 'Aceptar'
  });
} else {
  const animales = [
    "cebra.png", "loro.png", "jirafa.png", "tigre.png", "cocodrilo.png", 
    "venado.webp", "pulpo.png", "cheetah.png", "delfin.webp", "tiburon.webp", "mono.webp"
  ];

  let collage = document.getElementById("collage");
  let resultado = document.getElementById("resultado");
  let ganadas = document.getElementById("ganadas");
  let reiniciarBtn = document.getElementById("reiniciarBtn");

  let aciertos = 0;
  let intentos = 0;
  let total = animales.length;
  let tiempo = 180;
  let reinicios = 0;

  function generarResta() {
    let a = Math.floor(Math.random() * 50 + 50);
    let b = Math.floor(Math.random() * 50);
    return { a, b, r: a - b };
  }

  function crearTarjeta(nombre) {
    const resta = generarResta();
    const card = document.createElement("div");
    card.className = "card";
    const cardInner = document.createElement("div");
    cardInner.className = "card-inner";

    const front = document.createElement("div");
    front.className = "card-front";
    const img = document.createElement("img");
    img.src = `/images/${nombre}`;
    img.alt = nombre;
    front.appendChild(img);

    const back = document.createElement("div");
    back.className = "card-back";
    const operacion = document.createElement("div");
    operacion.innerText = `${resta.a} - ${resta.b}`;
    const input = document.createElement("input");
    input.type = "number";
    const boton = document.createElement("button");
    boton.innerText = "Comprobar";
    boton.className = "bn";

    boton.onclick = async () => {
      let respuesta = parseInt(input.value);
      if (respuesta === resta.r) {
        aciertos++;
        mostrarTarjetaGanada(nombre);
      }
      intentos++;
      actualizarResultado();
      card.remove();
      if (document.querySelectorAll(".card").length === 0) {
        mostrarReinicio();
      }
    };

    back.appendChild(operacion);
    back.appendChild(input);
    back.appendChild(boton);

    cardInner.appendChild(front);
    cardInner.appendChild(back);
    card.appendChild(cardInner);

    card.addEventListener("click", () => {
      card.classList.add("flipped");
    });

    collage.appendChild(card);
  }

  function mostrarTarjetaGanada(nombre) {
    const contenedor = document.createElement("div");
    contenedor.className = "tarjeta-ganada";
    const imagen = document.createElement("img");
    imagen.src = `/images/${nombre}`;
    imagen.alt = nombre;
    contenedor.appendChild(imagen);
    ganadas.appendChild(contenedor);
  }

  function actualizarResultado() {
    const calificacion = ((aciertos / total) * 10).toFixed(1);
    resultado.textContent = `Calificación: ${calificacion}/10`;
  }

  function iniciarTemporizador() {
    let intervalo = setInterval(async () => {
      let min = Math.floor(tiempo / 60);
      let seg = tiempo % 60;
      document.getElementById("timer").textContent = `Tiempo: ${min}:${seg < 10 ? '0' : ''}${seg}`;
      if (tiempo <= 0 || document.querySelectorAll(".card").length === 0) {
        clearInterval(intervalo);
        await guardarCalificacion();
        mostrarReinicio();
      }
      tiempo--;
    }, 1000);
  }

  function mostrarReinicio() {
    reiniciarBtn.style.display = reinicios < maxReintentos - 1 ? "inline-block" : "none";
  }

  async function guardarCalificacion() {
    const calificacion = ((aciertos / total) * 10).toFixed(1);
    globalAttempts++;
    localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
    localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);

    try {
      const response = await fetch('/ejercicios_segundo/cartas2/guardar-calificacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intento: globalAttempts,
          calificacion,
          id_ejercicio,
          fecha: today
        })
      });

      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      await Swal.fire({
        icon: 'success',
        title: '¡Calificación guardada!',
        text: `Tu calificación fue de ${calificacion}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        mostrarMensajeMotivacional(calificacion);
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: 'No se pudo guardar la calificación. Intenta más tarde.',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  function iniciarEjercicio() {
    animales.forEach(nombre => crearTarjeta(nombre));
    iniciarTemporizador();
  }

  function reiniciarEjercicio() {
    if (reinicios >= maxReintentos) return;
    reinicios++;
    aciertos = 0;
    intentos = 0;
    tiempo = 180;
    collage.innerHTML = "";
    ganadas.innerHTML = "";
    resultado.textContent = "Calificación: 0/10";
    reiniciarBtn.style.display = "none";
    iniciarEjercicio();
  }

  iniciarEjercicio();
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

  const cero = [
  "Todos empezamos desde cero, lo importante es seguir intentando.",
  "No te preocupes, fallar es parte del proceso de aprender.",
  "Hoy no fue tu día, pero puedes hacerlo mucho mejor, sigue practicando.",
  "¡No te rindas! Cada error te acerca más al acierto.",
  "Es solo el comienzo, lo importante es que sigas aprendiendo.",
  "Los grandes logros comienzan con pequeños pasos, ¡inténtalo de nuevo!",
  "Aprender toma tiempo, lo lograrás con práctica.",
  "Un tropiezo no define tu camino. ¡Ánimo!",
  "A veces fallar nos enseña más que acertar. ¡Sigue adelante!",
  "Tener 0 hoy no significa que no puedas tener 10 mañana. ¡Confía en ti!"
];

  if (calificacion === 0) {
    mensaje = cero[Math.floor(Math.random() * cero.length)];
  } else if (calificacion >= 0 && calificacion < 6) {
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