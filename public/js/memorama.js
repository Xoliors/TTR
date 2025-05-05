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
  let intentosTotales = 0;
  const maxIntentos = 5;

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
    if (intentosTotales >= maxIntentos) {
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

    intentosSpan.textContent = maxIntentos - intentosTotales;
    estado.innerHTML = `Intentos restantes: ${maxIntentos - intentosTotales}`;
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
    intentosTotales++;
    const total = aciertos + errores;
    const calificacion = total === 0 ? 0 : (10 * aciertos / total).toFixed(1);
    estado.innerHTML = `Intento ${intentosTotales} terminado 🎉<br>Calificación: ${calificacion}`;
    reiniciarBtn.style.display = intentosTotales < maxIntentos ? 'inline-block' : 'none';
  }

  function reiniciarJuego() {
    iniciarJuego();
  }

  iniciarJuego();