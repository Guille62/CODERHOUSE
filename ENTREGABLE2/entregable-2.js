const contenedorProductos = document.querySelector('.contenedor-producto');
const bloqueCarrito = document.querySelector('#carrito');
const contenedorPanelCarrito = document.querySelector('#listadoCarrito');
const vaciarCarrito = document.querySelector('#vaciarCarrito');
let articulosCarrito = [];


// iconos visualización de ventana caarito y user
const storeIcon = document.querySelector('#cart-btn');
const userIcon = document.querySelector('#login-btn');
const storeSection = document.querySelector('#store');
const userSection = document.querySelector('#login');

storeIcon.addEventListener('mouseenter', () => {
    userSection.classList.toggle('d-block', false);
    bloqueCarrito.classList.toggle('d-block', true);
});

storeIcon.addEventListener('touchstart', () => {
    userSection.classList.toggle('d-block', false);
    bloqueCarrito.classList.toggle('d-block', true);
});

bloqueCarrito.addEventListener('mouseleave', () => {
    bloqueCarrito.classList.toggle('d-block', false);
});

bloqueCarrito.addEventListener('touchend', () => {
    bloqueCarrito.classList.toggle('d-block', false);
});

userIcon.addEventListener('mouseenter', () => {
    bloqueCarrito.classList.toggle('d-block', false);
    userSection.classList.toggle('d-block', true);
});

userIcon.addEventListener('touchstart', () => {
    bloqueCarrito.classList.toggle('d-block', false);
    userSection.classList.toggle('d-block', true);
});

userSection.addEventListener('mouseleave', () => {
    userSection.classList.toggle('d-block', false);
});

userSection.addEventListener('touchend', () => {
    userSection.classList.toggle('d-block', false);
});



async function tienda(){
    try{
        await fetch('js/productos.json')
        .then(res => {
            return res.json()
        })
        .then( listadoProductos => {
            // Bucle para crear producto
            let contadorProducto = 0;
            while (listadoProductos.length > contadorProducto) {
                let boxProducto = document.createElement('div');
                let cajaProducto = document.createElement('div');
                let contenedorImagenProducto = document.createElement('div');
                let imagenProducto = document.createElement('img');
                let contenedorDatos = document.createElement('div');
                let tituloProducto = document.createElement('h3');
                let contenedorPrecio = document.createElement('div');
                let precio = document.createElement('p'); 
                let botonCompra = document.createElement('button');
                // ASIGNACION DE ATRIBUTOS  Y CLASES
                boxProducto.setAttribute('class', 'col-12 col-sm-6 col-md-4 mb-5 mb-md-3 cover-producto' );
                cajaProducto.setAttribute('class', 'box-producto');
                boxProducto.setAttribute('data-category', listadoProductos[contadorProducto].categoria);
                contenedorImagenProducto.setAttribute('class', 'cover-img_producto');
                imagenProducto.setAttribute('class', 'img-producto img-fluid');
                imagenProducto.setAttribute('src', listadoProductos[contadorProducto].foto);
                contenedorDatos.setAttribute('class', 'content-data');
                tituloProducto.setAttribute('class', 'nombre-producto');
                contenedorPrecio.setAttribute('class', 'd-flex flex-row align-items-center justify-content-between w-100');
                precio.setAttribute('class', 'price');
                botonCompra.setAttribute('id', listadoProductos[contadorProducto].id);
                botonCompra.setAttribute('class', 'boton-compra');
                botonCompra.innerHTML = 'COMPRAR <i class="icofont-shopping-cart"></i>';
    
                tituloProducto.innerHTML = listadoProductos[contadorProducto].name;
                precio.innerHTML = '$ ' + parseFloat(listadoProductos[contadorProducto].price).toFixed(3);
    
    
                // CONSTRUCCIÓN DEL PRODUCTO
                boxProducto.appendChild(cajaProducto);
                //cajaProducto.appendChild(categoriaProducto);
                cajaProducto.appendChild(contenedorImagenProducto);
                contenedorImagenProducto.appendChild(imagenProducto);
                cajaProducto.appendChild(contenedorDatos);
                contenedorDatos.appendChild(tituloProducto);
                contenedorDatos.appendChild(contenedorPrecio);
                contenedorPrecio.appendChild(precio);
                contenedorDatos.appendChild(botonCompra);
    
                contenedorProductos.appendChild(boxProducto);

                contadorProducto++
            }
        })
    
    
    }catch(e){
        console.log(e);
    }
}

// CARGA EN CARRITO
cargarEventListeners();
function cargarEventListeners(){
    // agregando producto a carrito
    contenedorProductos.addEventListener('click', agregarProducto);

    // eliminar cursos carrito
    contenedorPanelCarrito.addEventListener('click', eliminarProducto);

    //Vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
        localStorage.removeItem('carrito');
    });

    // recuperar datos del carrito del localStorage al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado) {
            articulosCarrito = carritoGuardado;
            panelCarrito();
        }
    });
}



// funciones carrito
function agregarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('boton-compra')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

// eliminando producto de carrito
function eliminarProducto(e){
    if(e.target.classList.contains('icofont-close-circled')){
        const prodId = e.target.getAttribute('id');
        // elimina del arreglo
        articulosCarrito = articulosCarrito.filter(productoOk => productoOk.id !== prodId);

        panelCarrito();
    }
}


//leyendo datos del producto y extrayendo info
function leerDatosProducto(productoOk) {
    // creando objeto del producto
    const infoProductoSeleccionado = {
        id: productoOk.querySelector('.boton-compra').getAttribute('id'),
        imagen: productoOk.querySelector('img').src,
        titulo: productoOk.querySelector('h3').textContent,
        monto: productoOk.querySelector('.price').textContent,
        cantidades: 1
    }

    // revisa si el producto ya existe en el carrito
    const existencia = articulosCarrito.some( productoOk => productoOk.id === infoProductoSeleccionado.id);
    if(existencia){
        const  productosReal = articulosCarrito.map (productoOk =>{
            if(productoOk.id === infoProductoSeleccionado.id){
                productoOk.cantidades++;
                return productoOk; // retorna objeto actualizado
            }else{
                return productoOk; // retorna objetos no son duplicados
            }
        });
        articulosCarrito = [...productosReal];
    }else{
        articulosCarrito = [...articulosCarrito, infoProductoSeleccionado];
    }
    // guardar el arreglo en localStorage
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));

    panelCarrito();
}

// MUESTRA PRODUCTOS EN CARRITO
function panelCarrito(){
    // limpiar el html
    limpiarHTML();

    articulosCarrito.forEach( productoOk => {
        const {imagen, titulo, monto, cantidades, id} = productoOk;
        const row = document.createElement('div');
        row.innerHTML=`
        <div class="d-flex flex-row align-items-center row-producto">
            <div class="p-1">
                <img src="${imagen}" alt="producto" class="img-carrito">
            </div>
            <div class="p-1">
                <strong class="titulo-producto">${titulo}</strong>
            </div>
            <div class="p-1">
                <strong class="precio">${monto}</strong>
                <small class="cantidad">${cantidades} Unid.</small>
            </div>
            <div class="p-1">
                <i class="icofont-close-circled" id="${id}"></i>
            </div>
        </div>
        `;

        // agrega html en el carrito
        contenedorPanelCarrito.appendChild(row);
    });

}

// LIMPIAR PANEL CARRITO

function limpiarHTML(){
    while(contenedorPanelCarrito.firstChild){
        contenedorPanelCarrito.removeChild(contenedorPanelCarrito.firstChild);
    }
}

// Obtener elementos de filtro
const filtro = document.querySelector('#filtro-categoria');
const opcionesFiltro = filtro.querySelectorAll('option');

// Función para filtrar productos
function filtrarProductos(categoria) {
    const productos = document.querySelectorAll('.cover-producto');

  // Eliminar productos que no corresponden a la categoría seleccionada
    productos.forEach(producto => {
        const categoriaProducto = producto.getAttribute('data-category');
        if (categoria === 'todos' || categoriaProducto === categoria) {
            producto.classList.remove('d-none');
            producto.classList.add('d-block');
        } else {
            producto.classList.remove('d-block');
            producto.classList.add('d-none');
        }
    });
}

// Agregar evento change al filtro
filtro.addEventListener('change', () => {
    const categoriaSeleccionada = filtro.value;
    filtrarProductos(categoriaSeleccionada);
});

// Cargar todos los productos al inicio
filtrarProductos('todos');

let tituloActual=document.title;window.addEventListener("blur",()=>{tituloActual=document.title,document.title="Vuelve por tu compra!"}),window.addEventListener("focus",()=>{document.title=tituloActual});



tienda();
AOS.init();



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