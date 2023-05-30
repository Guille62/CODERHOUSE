// FORMULARIO DE CONTACTO
// Validar el formulario al enviar
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();
    if (!this.checkValidity()) {
    event.stopPropagation();
    } else {
    enviarFormulario();
    }
    this.classList.add('was-validated');
}, false);

// Limpiar las clases de validación al cambiar el valor de los campos
document.getElementById('nombre').addEventListener('input', function() {
    this.classList.remove('is-invalid');
});
document.getElementById('email').addEventListener('input', function() {
    this.classList.remove('is-invalid');
});
document.getElementById('comentario').addEventListener('input', function() {
    this.classList.remove('is-invalid');
});

function enviarFormulario() {
    var templateParams = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    comentario: document.getElementById('comentario').value
    };

    emailjs.send('default_service', 'template_6wkv71k', templateParams)
    .then(function(response) {
        console.log('El formulario ha sido enviado:', response.status, response.text);
        mostrarMensajeEnviado();
    }, function(error) {
        console.error('Error al enviar el formulario:', error);
    });
}

function mostrarMensajeEnviado() {
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('mensaje-enviado').style.display = 'block';
}

(function(){
    emailjs.init('ExgQ-NUGu0FgaC76E'); 
})();

AOS.init();