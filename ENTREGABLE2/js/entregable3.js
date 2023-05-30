const contenedorProductos = document.querySelector('.contenedor-producto');
const elementoAgregado = document.querySelector('#agregado');
const btnVerDetalle = document.querySelector('.boton-ver');
const bloqueCarrito = document.querySelector('#carrito');
const contenedorPanelCarrito = document.querySelector('#listadoCarrito');
const vaciarCarrito = document.querySelector('#vaciarCarrito');
const visualizadorDetalle = document.querySelector('#VisualizadorDetalleProducto');

let articulosCarrito = [];
let articulosPanel = [];

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
                let verDetalle = document.createElement('button');
                let detallesExtas = document.createElement('div');
                let botonCompra = document.createElement('button');

                let detallesExtras = document.createElement('div'); 
                let resumenProducto = document.createElement('p'); 
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
                verDetalle.setAttribute('class', 'boton-ver');
                verDetalle.setAttribute('data-producto', listadoProductos[contadorProducto].dataproducto);
                verDetalle.innerHTML = 'VER PRODUCTO';
                botonCompra.setAttribute('id', listadoProductos[contadorProducto].id);
                botonCompra.setAttribute('class', 'boton-compra');
                botonCompra.innerHTML = 'COMPRAR <i class="icofont-shopping-cart"></i>';
                detallesExtas.setAttribute('class', 'detalles-extras');
                resumenProducto.setAttribute('class', 'texto-resumen d-none');
                tituloProducto.innerHTML = listadoProductos[contadorProducto].name;
                precio.innerHTML = '$ ' + parseFloat(listadoProductos[contadorProducto].price).toFixed(3);
                
                detallesExtras.setAttribute('class', 'detalles-extras');
                resumenProducto.innerHTML = listadoProductos[contadorProducto].resumen;

                // CONSTRUCCIÓN DEL PRODUCTO
                boxProducto.appendChild(cajaProducto);
                //cajaProducto.appendChild(categoriaProducto);
                cajaProducto.appendChild(contenedorImagenProducto);
                contenedorImagenProducto.appendChild(imagenProducto);
                cajaProducto.appendChild(contenedorDatos);
                contenedorDatos.appendChild(tituloProducto);
                contenedorDatos.appendChild(contenedorPrecio);
                contenedorPrecio.appendChild(precio);
                contenedorDatos.appendChild(verDetalle);
                contenedorDatos.appendChild(botonCompra);

                contenedorDatos.appendChild(resumenProducto);
                
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

    contenedorProductos.addEventListener('click', clickDetalleProducto);

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
        
        // visualizando huincha de prodcuto agregado
        elementoAgregado.classList.add('d-block');
        setTimeout(function() {
            elementoAgregado.classList.remove('d-block');
        }, 4000);

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


function clickDetalleProducto(e){
    e.preventDefault();
    articulosPanel = [];
    limpiarVerHTML()
    if(e.target.classList.contains('boton-ver')){
        const productoDetalle = e.target.parentElement.parentElement;
        verDatosProducto(productoDetalle);
        $('#exampleModal').modal('show');
    }
}



function verDatosProducto(productoOkVer) {
    // creando objeto del producto
    const infoDetalleSeleccionado = {
        dataproducto: productoOkVer.querySelector('.boton-ver').getAttribute('data-producto'),
        id: productoOkVer.querySelector('.boton-compra').getAttribute('id'),
        imagen: productoOkVer.querySelector('img').src,
        titulo: productoOkVer.querySelector('h3').textContent,
        resumen: productoOkVer.querySelector('.texto-resumen').textContent,
        monto: productoOkVer.querySelector('.price').textContent,
        cantidades: 1
    }

    const existenciaVer = articulosPanel.some( productoOkVer => productoOkVer.id === infoDetalleSeleccionado.id);
    if(existenciaVer){
        const  productosRealVer = articulosPanel.map (productoOkVer =>{
            if(productoOkVer.id === infoDetalleSeleccionado.id){
                productoOkVer.cantidades++;
                return productoOkVer; // retorna objeto actualizado
            }else{
                return productoOkVer; // retorna objetos no son duplicados
            }
        });
        articulosPanel = [...productosRealVer];
    }else{
        articulosPanel = [...articulosPanel, infoDetalleSeleccionado];
    }
    panelVerProducto(infoDetalleSeleccionado);
}

function panelVerProducto(){
    // limpiar el html
    articulosPanel.forEach( productoOkVer => {
        const {imagen, titulo, monto, resumen} = productoOkVer;
        const row = document.createElement('div');
        row.innerHTML=`
        <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body detalles-extras">
            <div class="col-12">
                <div class="row">
                    <div class="col-12 col-md-7">
                        <div class="cover-img__producto">
                            <img src="${imagen}" alt="producto" class="img-fluid border">
                        </div>    
                    </div>
                    <div class="col-12 col-md-5">
                        <h3 class="titulo-producto__modal">${titulo}</h3>
                        <p class="texto-resumen">
                        ${resumen}
                        </p>
                        <b>Precio:</b>
                        <h5>${monto}</h5>
                        <button class="boton-compra" data-dismiss="modal" aria-label="Close">Volver</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        // agrega html en el carrito
        visualizadorDetalle.appendChild(row);
    });

}

function limpiarVerHTML() {
    // Remover todos los elementos hijos del visualizadorDetalle
    while (visualizadorDetalle.firstChild) {
        visualizadorDetalle.removeChild(visualizadorDetalle.firstChild);
    }
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

