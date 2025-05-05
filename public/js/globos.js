const totalBalloons = 18;
const totalTables = 6;
const perTable = totalBalloons / totalTables; // 3

function createBalloons() {
  const container = document.getElementById("balloons");
  container.innerHTML = "";
  for (let i = 0; i < totalBalloons; i++) {
    const b = document.createElement("div");
    b.textContent = "🎈";
    b.className = "balloon";
    b.draggable = true;
    b.id = `balloon-${i}`;
    b.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", e.target.id);
    });
    container.appendChild(b);
  }
}

function createTables() {
  const container = document.getElementById("tables");
  container.innerHTML = "";
  for (let i = 0; i < totalTables; i++) {
    const t = document.createElement("div");
    t.className = "table";
    t.ondragover = e => e.preventDefault();
    t.ondrop = e => {
      e.preventDefault();
      const data = e.dataTransfer.getData("text");
      const balloon = document.getElementById(data);
      if (!t.contains(balloon)) t.appendChild(balloon);
    };
    container.appendChild(t);
  }
}

document.getElementById("check").addEventListener("click", () => {
  const tables = document.querySelectorAll(".table");
  let correctTables = 0;
  tables.forEach(t => {
    if (t.children.length === perTable) correctTables++;
  });

  // Calificación de 0 a 10:
  const grade = (correctTables / totalTables) * 10;

  // Mensaje con aciertos y nota
  const msg = document.getElementById("message");
  msg.textContent = 
    `Mesas correctas: ${correctTables} de ${totalTables}\n` +
    `Tu calificación: ${grade.toFixed(1)} / 10`;
});

createBalloons();
createTables();