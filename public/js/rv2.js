const animalitos = ["🐻‍❄️", "🦊", "🦝", "🐯", "🦓", "🐨", "🐱", "🦁", "🐯", "🦄", "🦃", "🐩"];
  let restas = [];
  let intentos = 0;
  const maxIntentos = 5;

  function generarRestas() {
    restas = [];
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '';
    const opciones = new Set();

    for (let i = 0; i < 12; i++) {
      let a = Math.floor(Math.random() * 251) + 50;
      let b = Math.floor(Math.random() * (a - 49)) + 50;
      let r = a - b;
      restas.push({ id: i, a, b, r, elegido: null });

      // generar opciones únicas incluyendo la correcta
      opciones.add(r);
      while (opciones.size < 6 * 3) {
        opciones.add(Math.floor(Math.random() * 251) + 50);
      }

      contenedor.innerHTML += `
        <div class="ejercicio" id="ej${i}">
          <div class="resta">
            ${animalitos[i]}<br>
            &nbsp;&nbsp;&nbsp;${a}<br>
          - ${b}<br>
            <hr style="width: 80%; margin: 0 auto;">
          </div>
          <div class="dropzone" id="drop${i}" ondrop="soltar(event, ${i})" ondragover="permitirSoltar(event)">
            Arrastra aquí
          </div>
          <span class="feedback" id="fb${i}"></span>
        </div>
      `;
    }

    // Agregar las opciones aleatorias
    const opcionesDiv = document.getElementById('opciones');
    opcionesDiv.innerHTML = '';
    Array.from(opciones).sort(() => 0.5 - Math.random()).forEach(op => {
      opcionesDiv.innerHTML += `<div class="opcion" draggable="true" ondragstart="arrastrar(event)" id="opt${op}" data-valor="${op}">${op}</div>`;
    });
  }

  function arrastrar(ev) {
    ev.dataTransfer.setData("text", ev.target.getAttribute('data-valor'));
  }

  function permitirSoltar(ev) {
    ev.preventDefault();
  }

  function soltar(ev, id) {
    ev.preventDefault();
    const valor = parseInt(ev.dataTransfer.getData("text"));
    const drop = document.getElementById('drop' + id);
    drop.textContent = valor;
    restas[id].elegido = valor;
  }

  function verificar() {
    let aciertos = 0;
    for (let i = 0; i < restas.length; i++) {
      const fb = document.getElementById('fb' + i);
      if (restas[i].elegido === restas[i].r) {
        fb.textContent = "✓";
        fb.style.color = "green";
        aciertos++;
      } else {
        fb.textContent = "✗";
        fb.style.color = "red";
      }
    }

    intentos++;
    const nota = Math.round((aciertos / restas.length) * 10);
    document.getElementById('resultado').textContent = `Intento ${intentos} de ${maxIntentos} — Calificación: ${nota}/10`;

    document.getElementById('btnVerificar').style.display = "none";
    if (intentos < maxIntentos) {
      document.getElementById('btnReintentar').style.display = "inline-block";
    } else {
      document.getElementById('btnReintentar').style.display = "none";
      bloquearTodo();
      document.getElementById('resultado').textContent += " — Has alcanzado el máximo de intentos.";
    }
  }

  function reiniciar() {
    generarRestas();
    document.getElementById('resultado').textContent = '';
    document.getElementById('btnVerificar').style.display = "inline-block";
    document.getElementById('btnReintentar').style.display = "none";
  }

  function bloquearTodo() {
    document.querySelectorAll('.dropzone').forEach(el => el.ondrop = null);
    document.querySelectorAll('.opcion').forEach(el => el.setAttribute('draggable', 'false'));
    document.getElementById('btnVerificar').disabled = true;
  }

  generarRestas();