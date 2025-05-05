   // Envolver cada letra, pero respetar espacios
   document.querySelectorAll('.historia p').forEach(p => {
    const texto = p.textContent;
    p.innerHTML = '';
    texto.split('').forEach(ch => {
      if (ch === ' ') {
        p.appendChild(document.createTextNode(' '));
      } else {
        const span = document.createElement('span');
        span.className = 'letra';
        span.textContent = ch;
        p.appendChild(span);
      }
    });
  });

  // Crear meses y lógica
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const respuestas = ["Enero","Junio","Agosto","Diciembre"];
  let intentos = 0, maxIntentos = 5;
  const contenedores = [
    document.getElementById('contenedorMeses1'),
    document.getElementById('contenedorMeses2'),
    document.getElementById('contenedorMeses3'),
    document.getElementById('contenedorMeses4')
  ];
  const resultado = document.getElementById('resultado');

  function crearMeses(c) {
    meses.forEach(m => {
      const d = document.createElement('div');
      d.className = 'mes';
      d.textContent = m;
      d.onclick = () => {
        if (d.classList.contains('correcto')||d.classList.contains('incorrecto')) return;
        c.querySelectorAll('.mes').forEach(x=>x.classList.remove('selected'));
        d.classList.add('selected');
      };
      c.appendChild(d);
    });
  }
  contenedores.forEach(crearMeses);

  function verificar() {
    if (intentos>=maxIntentos) return;
    intentos++;
    let ac=0;
    contenedores.forEach((c,i)=>{
      const sel = c.querySelector('.selected');
      if (!sel) return;
      if (sel.textContent===respuestas[i]) {
        sel.classList.add('correcto'); ac++;
      } else sel.classList.add('incorrecto');
    });
    resultado.textContent = `Calificación: ${(ac/4)*10}` + (intentos===maxIntentos?' — Límite alcanzado.':'');
  }
  function reiniciar() {
    intentos=0; resultado.textContent='';
    contenedores.forEach(c=>{
      c.innerHTML=''; crearMeses(c);
    });
  }