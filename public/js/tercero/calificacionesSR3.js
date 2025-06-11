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
cargarTablaConFetch('#table1', '/calificacionessr/calificaciones_tercero/T');
cargarTablaConFetch('#table2', '/calificacionessr/calificaciones_tercero/SF');
cargarTablaConFetch('#table3', '/calificacionessr/calificaciones_tercero/C');
cargarTablaConFetch('#table4', '/calificacionessr/calificaciones_tercero/SV');
cargarTablaConFetch('#table5', '/calificacionessr/calificaciones_tercero/RV');
cargarTablaConFetch('#table6', '/calificacionessr/calificaciones_tercero/Ca');
cargarTablaConFetch('#table7', '/calificacionessr/calificaciones_tercero/SR');
