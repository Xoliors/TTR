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
  const maxReintentos = 5;

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
    boton.className = "bn"

    boton.onclick = () => {
      let respuesta = parseInt(input.value);
      if (respuesta === resta.r) {
        aciertos++;
        mostrarTarjetaGanada(nombre);
      }
      intentos++;
      actualizarResultado();
      card.remove();
      if (document.querySelectorAll(".card").length === 0) mostrarReinicio();
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
    imagen.alt = nombre;  // Asegúrate de que el alt sea el nombre para accesibilidad
    contenedor.appendChild(imagen);  // Solo agregamos la imagen, no el texto
    ganadas.appendChild(contenedor);
  }

  function actualizarResultado() {
    const calificacion = ((aciertos / total) * 10).toFixed(1);
    resultado.textContent = `Calificación: ${calificacion}/10`;
  }

  function iniciarTemporizador() {
    let intervalo = setInterval(() => {
      let min = Math.floor(tiempo / 60);
      let seg = tiempo % 60;
      document.getElementById("timer").textContent = `Tiempo: ${min}:${seg < 10 ? '0' : ''}${seg}`;
      if (tiempo <= 0 || document.querySelectorAll(".card").length === 0) {
        clearInterval(intervalo);
        mostrarReinicio();
      }
      tiempo--;
    }, 1000);
  }

  function mostrarReinicio() {
    reiniciarBtn.style.display = reinicios < maxReintentos - 1 ? "inline-block" : "none";
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