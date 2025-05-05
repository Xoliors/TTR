const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const datos = [['7', 'Días'], ['30', 'Días'], ['4', 'Semanas'], ['12', 'Meses']];
    const extras = ['24 Horas','360 Días','60 Minutos','52 Semanas','5 Minutos','2 Semanas','10 Horas'];

    const contMeses = document.getElementById('contenedor-meses');
    const contSlots = document.getElementById('contenedor-slots');
    const contNums = document.getElementById('contenedor-numeros');

    function inicializarJuego() {
      contMeses.innerHTML = '';
      contSlots.innerHTML = '';
      contNums.innerHTML = '';
      document.querySelectorAll('.td').forEach(td => td.innerHTML = '');

      let mixMeses = [...meses].sort(() => Math.random() - 0.5);
      mixMeses.forEach(m => {
        const el = document.createElement('div');
        el.className = 'mes'; el.textContent = m;
        el.draggable = true; el.id = 'mes-' + m;
        contMeses.appendChild(el);
      });

      meses.forEach(() => {
        const slot = document.createElement('div');
        slot.className = 'slot';
        contSlots.appendChild(slot);
      });

      let nums = datos.map(d => d[0] + ' ' + d[1]).concat(extras).sort(() => Math.random() - 0.5);
      nums.forEach(txt => {
        const n = document.createElement('div');
        n.className = 'numero'; n.textContent = txt;
        n.draggable = true; n.id = 'num-' + txt;
        contNums.appendChild(n);
      });
    }

    inicializarJuego();

    document.addEventListener('dragstart', e => {
      if (e.target.draggable) {
        e.dataTransfer.setData('text/plain', e.target.id);
      }
    });

    document.addEventListener('dragover', e => {
      if (e.target.classList.contains('slot') || e.target.classList.contains('td')) {
        e.preventDefault(); e.target.classList.add('over');
      }
    });

    document.addEventListener('dragleave', e => {
      if (e.target.classList.contains('slot') || e.target.classList.contains('td')) {
        e.target.classList.remove('over');
      }
    });

    document.addEventListener('drop', e => {
      if (e.target.classList.contains('slot')) {
        e.preventDefault(); e.target.classList.remove('over');
        const id = e.dataTransfer.getData('text/plain');
        const d = document.getElementById(id);
        if (e.target.firstChild) contMeses.appendChild(e.target.firstChild);
        e.target.appendChild(d);
      }
      if (e.target.classList.contains('td')) {
        e.preventDefault(); e.target.classList.remove('over');
        const id = e.dataTransfer.getData('text/plain');
        const d = document.getElementById(id);
        if (e.target.firstChild) contNums.appendChild(e.target.firstChild);
        e.target.appendChild(d);
      }
    });

    let intentos = 0;
    const maxIntentos = 5;

    document.getElementById('calificar').addEventListener('click', () => {
      if (intentos >= maxIntentos) return;
      let aciertos = 0;
      Array.from(contSlots.children).forEach((s, i) => {
        if (s.firstChild && s.firstChild.textContent === meses[i]) aciertos++;
      });
      const mapping = { semana: '7 Días', mes30: '30 Días', mes4: '4 Semanas', ano: '12 Meses' };
      document.querySelectorAll('.td').forEach(td => {
        const c = td.firstChild;
        if (c && c.textContent === mapping[td.dataset.concept]) aciertos++;
      });

      let calificacion = (aciertos / 16) * 10;
      calificacion = Math.round(calificacion * 100) / 100;

      intentos++;
      document.getElementById('resultado').textContent = `Calificación: ${calificacion} / 10`;
      document.getElementById('intentos').textContent = `Intentos usados: ${intentos} de ${maxIntentos}`;
      document.getElementById('calificar').disabled = true;
      if (intentos < maxIntentos) document.getElementById('reiniciar').style.display = 'block';
      if (intentos >= maxIntentos) document.getElementById('reiniciar').disabled = true;
    });

    document.getElementById('reiniciar').addEventListener('click', () => {
      if (intentos >= maxIntentos) return;
      inicializarJuego();
      document.getElementById('resultado').textContent = '';
      document.getElementById('calificar').disabled = false;
      document.getElementById('reiniciar').style.display = 'none';
    });