const dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
    const contDias = document.getElementById('contenedor-dias');
    const contSlots = document.getElementById('contenedor-slots');
    let mixDias = [...dias].sort(() => Math.random() - 0.5);
    mixDias.forEach(d => {
      const el = document.createElement('div');
      el.className = 'dia'; el.textContent = d;
      el.draggable = true; el.id = 'dia-' + d;
      contDias.appendChild(el);
    });
    dias.forEach(() => { const slot = document.createElement('div'); slot.className = 'slot'; contSlots.appendChild(slot); });

    const datos = [['24','Horas'], ['7','Días'], ['4','Semanas']];
    const extras = ['12 Meses','365 Días','60 Minutos','52 Semanas','30 Días','5 minutos','2 Semanas ','10 Horas'];
    const nums = datos.map(d => d[0] + ' ' + d[1]).concat(extras).sort(() => Math.random() - 0.5);
    const contNums = document.getElementById('contenedor-numeros');
    nums.forEach(txt => {
      const n = document.createElement('div');
      n.className = 'numero'; n.textContent = txt;
      n.draggable = true; n.id = 'num-' + txt;
      contNums.appendChild(n);
    });

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
        if (e.target.firstChild) contDias.appendChild(e.target.firstChild);
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
      let score = 0;
      Array.from(contSlots.children).forEach((s, i) => {
        if (s.firstChild && s.firstChild.textContent === dias[i]) score++;
      });
      const mapping = { semana: '7 Días', dia: '24 Horas', mes: '4 Semanas' };
      document.querySelectorAll('.td').forEach(td => {
        const c = td.firstChild;
        if (c && c.textContent === mapping[td.dataset.concept]) score++;
      });
      intentos++;
      document.getElementById('resultado').textContent = `Calificación: ${score} / 10`;
      document.getElementById('intentos').textContent = `Intentos usados: ${intentos} de ${maxIntentos}`;
      document.getElementById('calificar').disabled = true;
      if (intentos < maxIntentos) document.getElementById('reiniciar').style.display = 'block';
      if (intentos >= maxIntentos) document.getElementById('reiniciar').disabled = true;
    });

    document.getElementById('reiniciar').addEventListener('click', () => {
      if (intentos >= maxIntentos) return;
      document.querySelectorAll('.slot').forEach(slot => {
        while (slot.firstChild) contDias.appendChild(slot.firstChild);
      });
      document.querySelectorAll('.td').forEach(td => {
        while (td.firstChild) contNums.appendChild(td.firstChild);
      });
      document.getElementById('resultado').textContent = '';
      document.getElementById('calificar').disabled = false;
      document.getElementById('reiniciar').style.display = 'none';
    });