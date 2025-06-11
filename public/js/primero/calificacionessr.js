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
cargarTablaConFetch('#table1', '/calificacionessr/calificaciones_primero/tienda');
cargarTablaConFetch('#table2', '/calificacionessr/calificaciones_primero/picnic');
cargarTablaConFetch('#table3', '/calificacionessr/calificaciones_primero/conteo');
cargarTablaConFetch('#table4', '/calificacionessr/calificaciones_primero/detective');
cargarTablaConFetch('#table5', '/calificacionessr/calificaciones_primero/fiesta');
cargarTablaConFetch('#table6', '/calificacionessr/calificaciones_primero/ladron');
cargarTablaConFetch('#table7', '/calificacionessr/calificaciones_primero/syr');

