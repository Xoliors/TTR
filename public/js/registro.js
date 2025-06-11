jQuery("#form-registrar").submit(function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Aviso de Privacidad',
        icon: 'info',
        html: `
            <p style="text-align: justify;">Los datos personales recabados serán utilizados exclusivamente con fines educativos y académicos, tales como la gestión de actividades escolares, evaluación del desempeño, comunicación institucional y mejora de servicios educativos. Estos datos serán tratados con confidencialidad, de acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, y no serán compartidos con terceros sin su consentimiento, salvo en los casos previstos por la ley. Usted puede ejercer sus derechos de acceso, rectificación, cancelación u oposición (ARCO) enviando una solicitud al correo electrónico correspondiente de la institución.</p>
        `,
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then((result) => {
        if (result.isConfirmed) {
            const form = document.getElementById("form-registrar");
            const formData = new FormData(form);

            jQuery.ajax({
                url: '/registro',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (rs) {
                    if (rs.status) {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Registro exitoso!',
                            text: 'Datos registrados correctamente.',
                            confirmButtonText: 'Aceptar'
                        }).then(() => location.reload());
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un error al registrar los datos.',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                },
                error: function (err) {
                    console.error("Error en el servidor:", err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de servidor',
                        text: 'No se pudo conectar con el servidor.',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        }
    });
});