const totales = { abeja:22, catarina:33, caracol:15, mariposa:18, gusano:32 };
    // mezclar emojis
    const pool = [
      ...Array(totales.abeja).fill('🐝'),
      ...Array(totales.catarina).fill('🐞'),
      ...Array(totales.caracol).fill('🐌'),
      ...Array(totales.mariposa).fill('🦋'),
      ...Array(totales.gusano).fill('🐛'),
    ];
    for (let i = pool.length-1; i>0; i--) {
      const j = Math.floor(Math.random()*(i+1));
      [pool[i],pool[j]] = [pool[j],pool[i]];
    }
    pool.forEach(ico => {
      const span = document.createElement('span');
      span.textContent = ico;
      document.getElementById('insectos').appendChild(span);
    });

    let intentos = 0, maxIntentos = 5;

    function verificar() {
      if (intentos >= maxIntentos) return;
      intentos++;
      let correctos = 0;
      const keys = ['abeja','catarina','caracol','mariposa','gusano'];
      keys.forEach((k,i) => {
        const v = +document.getElementById('c'+(i+1)).value;
        const ok = v===totales[k];
        document.getElementById('check'+(i+1)).textContent = ok ? '✔️' : '❌';
        if (ok) correctos++;
      });
      const maxIn = keys.find(k=>totales[k]===Math.max(...Object.values(totales)));
      const minIn = keys.find(k=>totales[k]===Math.min(...Object.values(totales)));
      const totalAll = Object.values(totales).reduce((a,b)=>a+b,0);
      const sumGusCata = totales.gusano + totales.catarina;
      const sumGusMar = totales.gusano + totales.mariposa;
      const answers = [
        r1.value.toLowerCase()===maxIn,
        r2.value.toLowerCase()===minIn,
        +r3.value===totales.caracol,
        r4.value===(totales.mariposa>totales.abeja?'sí':'no'),
        +r5.value===totalAll,
        +r6.value===sumGusCata,
        r7.value===(totales.mariposa>totales.caracol?'sí':'no'),
        +r8.value===sumGusMar,
        r9.value===(totales.gusano>totales.abeja?'sí':'no')
      ];
      answers.forEach((ok,i) => {
        document.getElementById('check'+(6+i)).textContent = ok ? '✔️' : '❌';
        if(ok) correctos++;
      });
      const nota = (correctos/14)*10;
      document.getElementById('nota').textContent = `Tu calificación: ${nota.toFixed(1)} / 10`;

      document.getElementById('reinBtn').style.display = 'inline-block';
      if (intentos>=maxIntentos) {
        document.getElementById('verifBtn').disabled = true;
      }
    }

    function reiniciar() {
      if (intentos >= maxIntentos) return;
      // limpiar
      for (let i=1; i<=14; i++){
        document.getElementById('check'+i).textContent = '';
      }
      ['c1','c2','c3','c4','c5','r1','r2','r3','r4','r5','r6','r7','r8','r9']
        .forEach(id => document.getElementById(id).value = '');
      document.getElementById('nota').textContent = '';
      document.getElementById('reinBtn').style.display = 'none';
    }