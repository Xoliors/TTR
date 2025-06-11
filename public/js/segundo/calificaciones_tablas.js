function cargarTablaConFetch(tableId, url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector(`${tableId} tbody`);
      tbody.innerHTML = '';

      data.forEach(item => {
        const row = `
          <tr>
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td>${item.calificacion}</td>
            <td>${item.intento}</td>
            <td>${new Date(item.fecha).toLocaleDateString()}</td>
          </tr>
        `;
        tbody.innerHTML += row;
      });

      if (!$.fn.DataTable.isDataTable(tableId)) {
        $(tableId).DataTable();
      }
    })
    .catch(err => console.error(`Error al cargar datos para ${tableId}:`, err));
}

// Llamadas
cargarTablaConFetch('#table1', '/calificaciones_mul_div/calificaciones_segundo/1');
cargarTablaConFetch('#table2', '/calificaciones_mul_div/calificaciones_segundo/2');
cargarTablaConFetch('#table3', '/calificaciones_mul_div/calificaciones_segundo/3');
cargarTablaConFetch('#table4', '/calificaciones_mul_div/calificaciones_segundo/4');
cargarTablaConFetch('#table5', '/calificaciones_mul_div/calificaciones_segundo/5');
cargarTablaConFetch('#table6', '/calificaciones_mul_div/calificaciones_segundo/6');
cargarTablaConFetch('#table7', '/calificaciones_mul_div/calificaciones_segundo/7');
cargarTablaConFetch('#table8', '/calificaciones_mul_div/calificaciones_segundo/8');
cargarTablaConFetch('#table9', '/calificaciones_mul_div/calificaciones_segundo/9');
cargarTablaConFetch('#table10', '/calificaciones_mul_div/calificaciones_segundo/10');
cargarTablaConFetch('#table11', '/calificaciones_mul_div/calificaciones_segundo/FF');
cargarTablaConFetch('#table12', '/calificaciones_mul_div/calificaciones_segundo/G');
