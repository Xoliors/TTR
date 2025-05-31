const emojis = {
  'estrella': '⭐',
  'botella de agua': '🍼',
  'balón de soccer': '⚽',
  'balón de basket': '🏀',
  'bat': '🏏',
  'celular': '📱',
  'cuadrado': '🔲',
  'coche': '🚗',
  'árbol': '🌳',
  'sándwich': '🥪'
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

const id_ejercicio = 17;
const ruta = "/ejercicios_numeros/memorama/guardar-calificacion";

const memorama = document.getElementById('memorama');
const ladoIzq = document.getElementById('ladoIzquierdo');
const ladoDer = document.getElementById('ladoDerecho');
const intentosSpan = document.getElementById('intentos');
const estado = document.getElementById('estado');
const tiempo = document.getElementById('tiempo');
const reiniciarBtn = document.getElementById('reiniciar');
const audioCorrecto = document.getElementById('audioCorrecto');
const audioIncorrecto = document.getElementById('audioIncorrecto');

const maxIntentos = 5;
const today = new Date().toISOString().split('T')[0];

let lastAttemptDate = localStorage.getItem(`lastAttemptDate_${id_ejercicio}`) || "";
let globalAttempts = parseInt(localStorage.getItem(`globalAttempts_${id_ejercicio}`)) || 0;

if (lastAttemptDate !== today) {
  globalAttempts = 0;
  localStorage.setItem(`lastAttemptDate_${id_ejercicio}`, today);
  localStorage.setItem(`globalAttempts_${id_ejercicio}`, globalAttempts);
}

function iniciarJuego() {
  if (globalAttempts >= maxIntentos) {
    Swal.fire({
      icon: 'info',
      title: 'Límite alcanzado',
      text: 'Has alcanzado el número máximo de intentos para hoy.',
      confirmButtonText: 'Aceptar'
    });
    estado.innerHTML = "Has alcanzado el máximo de intentos.";
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
  localStorage.setItem('globalAttempts', globalAttempts);

  const total = aciertos + errores;
  const calificacion = total === 0 ? 0 : (10 * aciertos / total).toFixed(1);
  estado.innerHTML = `Intento ${globalAttempts} terminado 🎉<br>Calificación: ${calificacion}`;
  reiniciarBtn.style.display = globalAttempts < maxIntentos ? 'inline-block' : 'none';

  const fecha = new Date().toISOString().split('T')[0];

  fetch(ruta, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intento: globalAttempts,
      calificacion: calificacion,
      id_ejercicio,
      fecha
    })
  })
    .then(response => response.json())
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Calificación registrada!',
        text: `Tu calificación fue de ${calificacion}/10.`,
        confirmButtonText: 'Aceptar'
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar tu calificación.',
        confirmButtonText: 'Aceptar'
      });
      console.error('Error al guardar calificación:', error);
    });
}

function reiniciarJuego() {
  iniciarJuego();
}

iniciarJuego();