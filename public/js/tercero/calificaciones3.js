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
cargarTablaConFetch('#table1', '/calificaciones/calificaciones_tercero/EMA');
cargarTablaConFetch('#table2', '/calificaciones/calificaciones_tercero/ED');
cargarTablaConFetch('#table3', '/calificaciones/calificaciones_tercero/M');
cargarTablaConFetch('#table4', '/calificaciones/calificaciones_tercero/CM');
cargarTablaConFetch('#table5', '/calificaciones/calificaciones_tercero/TN');
cargarTablaConFetch('#table6', '/calificaciones/calificaciones_tercero/EN');
