function guardarFormulario(event) {

    event.preventDefault();

    const form = document.getElementById('formulario-contacto');

    // Verifica si el formulario HTML5 es válido
    if (!form.checkValidity()) {
        // Si hay campos no válidos, deja que el navegador los muestre
        form.reportValidity();
        return;
    }

    // Luego valida los checkboxes
    if (!validarCheckboxes()) {
        alert("Debe seleccionar al menos un grado académico.");
        return;
    }

    const gradoAcademicoSeleccionado = [];
    $('input[name="gradoAcademico"]:checked').each(function () {
        gradoAcademicoSeleccionado.push($(this).val());
    });

    const formulario = {
        nombre: $('input[name="nombreCompleto"]').val(),
        email: $('input[name="email"]').val(),
        fechaNacimiento: $('input[name="fechaNacimiento"]').val(),
        rangoIngreso: $('input[name="rangoIngreso"]').val(),
        genero: $('input[name="genero"]:checked').val(),
        edad: parseInt($('#edad').text()),
        gradoAcademico: gradoAcademicoSeleccionado
    };

    localStorage.setItem('formulario', JSON.stringify(formulario));

    emailjs.send("service_drjkf1n", "template_xn9so1b", formulario)
        .then(function (response) {
            alert("Formulario enviado con éxito. \n El equipo se pondra en contacto contigo lo mas pronto posible");
            console.log("SUCCESS!", response.status, response.text);
            $("#formulario-contacto")[0].reset();
        }, function (error) {
            alert("Error al enviar el formulario. Intenta de nuevo.");
            console.error("FAILED...", error);
        });
}

function mostrarUltimoFormulario() {
    const datos = localStorage.getItem('formulario');
    if (!datos) return;

    const formulario = JSON.parse(datos);

    $('input[name="nombreCompleto"]').val(formulario.nombre);
    $('input[name="email"]').val(formulario.email);
    $('input[name="fechaNacimiento"]').val(formulario.fechaNacimiento);
    $('input[name="rangoIngreso"]').val(formulario.rangoIngreso);
    $('input[name="genero"][value="' + formulario.genero + '"]').prop('checked', true);
    $('#edad').text(formulario.edad);

    // Cargar los checkboxes seleccionados
    if (formulario.gradoAcademico && formulario.gradoAcademico.length > 0) {
        formulario.gradoAcademico.forEach(function (valor) {
            $('input[name="gradoAcademico"][value="' + valor + '"]').prop('checked', true);
        });
    }
}

function calcularEdad() {
    const fecha = new Date($('input[name="fechaNacimiento"]').val());
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
        edad--;
    }
    $('#edad').text(edad);
}

function validarCheckboxes() {
    return $('input[name="gradoAcademico"]:checked').length > 0;
}
