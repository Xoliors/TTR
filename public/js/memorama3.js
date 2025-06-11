const id_ejercicio = 29;
const today = new Date().toISOString().split("T")[0];
let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

// Reinicia si la fecha cambió
if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

const maxIntentos = 5;
const fecha = today;

const emojis = {
  'estrella': '🛞',
  'botella de agua': '🔶',
  'balón de soccer': '🎲',
  'balón de basket': '🚪',
  'bat': '  🟦',
  'celular': '🟢',
  'cuadrado': '🔺',
  'coche': '🔮',
  'árbol': '🔋',
  'sándwich': ' 🛑'
};

let figuras = Object.keys(emojis);
const tarjetasOriginal = [...figuras, ...figuras];
tarjetasOriginal.sort(() => 0.5 - Math.random());

let tarjetas = [...tarjetasOriginal];
let seleccionadas = [];
let encontradas = [];
let aciertos = 0;
let errores = 0;
let tiempoRestante = 180;
let temporizador;

const memorama = document.getElementById('memorama');
const ladoIzq = document.getElementById('ladoIzquierdo');
const ladoDer = document.getElementById('ladoDerecho');
const intentosSpan = document.getElementById('intentos');
const estado = document.getElementById('estado');
const tiempo = document.getElementById('tiempo');
const reiniciarBtn = document.getElementById('reiniciar');
const audioCorrecto = document.getElementById('audioCorrecto');
const audioIncorrecto = document.getElementById('audioIncorrecto');

function iniciarJuego() {
  if (globalAttempts >= maxIntentos) {
    intentosSpan.textContent = 0;
    Swal.fire({
      icon: 'warning',
      title: '¡Sin intentos!',
      text: 'Por el día de hoy haz terminado tus intentos',
      confirmButtonText: 'Aceptar'
    });
    reiniciarBtn.style.display = 'none';
    return;
  }

  tarjetas = [...tarjetasOriginal];
  seleccionadas = [];
  encontradas = [];
  aciertos = 0;
  errores = 0;
  tiempoRestante = 180;

  intentosSpan.textContent = maxIntentos - globalAttempts;
  estado.innerHTML = `Intentos restantes: ${maxIntentos - globalAttempts}`;
  ladoIzq.innerHTML = '<strong>Pares encontrados:</strong><br />';
  ladoDer.innerHTML = '';
  reiniciarBtn.style.display = 'none';
  clearInterval(temporizador);
  temporizador = setInterval(actualizarTiempo, 1000);
  renderizar();
}

function actualizarTiempo() {
  if (tiempoRestante <= 0 || encontradas.length === tarjetas.length) {
    clearInterval(temporizador);
    finalizar();
  } else {
    tiempoRestante--;
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;
    tiempo.textContent = `Tiempo restante: ${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  }
}

function renderizar() {
  memorama.innerHTML = '';
  tarjetas.forEach((figura, i) => {
    const carta = document.createElement('div');
    carta.classList.add('card');
    if (seleccionadas.includes(i) || encontradas.includes(i)) {
      carta.textContent = emojis[figura];
    } else {
      carta.classList.add('hidden');
      carta.textContent = '';
    }
    carta.onclick = () => seleccionar(i);
    memorama.appendChild(carta);
  });
}

function seleccionar(i) {
  if (seleccionadas.length === 2 || seleccionadas.includes(i) || encontradas.includes(i)) return;

  seleccionadas.push(i);
  renderizar();

  if (seleccionadas.length === 2) {
    setTimeout(() => verificarPareja(), 800);
  }
}

function verificarPareja() {
  const [i1, i2] = seleccionadas;
  if (tarjetas[i1] === tarjetas[i2]) {
    encontradas.push(i1, i2);
    mostrarPare(tarjetas[i1]);
    aciertos++;
    audioCorrecto.play();
  } else {
    errores++;
    audioIncorrecto.play();
  }
  seleccionadas = [];
  renderizar();
}

function mostrarPare(nombre) {
  const elem = document.createElement('div');
  elem.textContent = emojis[nombre];
  ladoIzq.appendChild(elem);
  ladoDer.appendChild(elem.cloneNode(true));
}

function finalizar() {
  globalAttempts++;
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);

  const total = aciertos + errores;
  const calificacion = total === 0 ? 0 : (10 * aciertos / total).toFixed(1);

  intentosSpan.textContent = maxIntentos - globalAttempts;
  estado.innerHTML = `Intento ${globalAttempts} terminado 🎉<br>Calificación: ${calificacion}`;
  reiniciarBtn.style.display = globalAttempts < maxIntentos ? 'inline-block' : 'none';

  // Enviar datos al servidor
  fetch('/ejercicios_tercero/memorama3/guardar-calificacion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion,
      id_ejercicio,
      fecha
    })
  })
    .then(response => {
      if (!response.ok) throw new Error('Error en la petición');
      return response.json();
    })
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${calificacion}/10.`,
        confirmButtonText: 'Aceptar'
      }).then(() => {
        mostrarMensajeMotivacional(calificacion);
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Hubo un problema al guardar la calificación.',
        confirmButtonText: 'Aceptar'
      });
      console.error(error);
    });
}

function reiniciarJuego() {
  iniciarJuego();
}

iniciarJuego();

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