jQuery("#form-registrar").submit(function (e) {
    e.preventDefault();

    const form = document.getElementById("form-registrar");
    const formData = new FormData(form); // Captura todos los campos, incluyendo el archivo

    let decide = confirm("¿Está seguro de que desea Registrar?");
    if (decide) {
        jQuery.ajax({
            url: '/registro',
            type: 'POST',
            data: formData,
            contentType: false, // importante para FormData
            processData: false, // importante para que jQuery no intente convertirlo
            success: function (rs) {
                if (rs.status) {
                    alert("Datos registrados correctamente!");
                    location.reload();
                } else {
                    alert("Ocurrió un error al registrar los datos!");
                }
            },
            error: function (err) {
                console.error("Error en el servidor:", err);
                alert("Error al conectar con el servidor.");
            }
        });
    }
});
