// CAPTURAMOS EL ID DEL BOTÓN QUE HARÀEL CÁLCULO CON LA FUNCIÓN "CALCULAR"
const botonCalcular = document.getElementById("Btn-calcular").addEventListener("click", Calcular);

function Calcular(largo, ancho, alto){
    // CAPTURAMOS Y ASIGNAMOS EN VARIABLES LOS DATOS INGRESADOS POR EL USUARIO
    largo = document.getElementById('largo').value;
    ancho = document.getElementById('ancho').value;
    alto = document.getElementById('alto').value;
    //  IDENTIFICADOR DEL RESULTADO EN EL MENSAJE HTML
    let valorFinal = document.getElementById('Valor-resultado');
    // CÁLCULO DE LITROS NECESARIOS PARA EL ACUARIO EN BASE A LOS DATOS INGRESADOS POR EL USUARIO
    let resultado = largo * ancho * alto / 1000;
    // ASIGNAMOS EL RESULTADO DEL CÁLCULO  AL TEXTO QUE SE MOSTRARÁ AL USUARIO
    valorFinal.innerText = resultado;
    // DISPARAMOS LA FUNCIÓN MOSTRAR --> MOSTRÁNDOLE UN MENSAJE AL USUARIO
    mostrar();
    //alert('Tu acuario necesita: ' + resultado + ' litros');

}

// CAPTURAMOS EL ID DEL BOTÓN QUE HARÀ UN RESET AL FURMULARIO CON LA FUNCIÓN "CLEAR"
const reseteo = document.getElementById("Limpiar").addEventListener("click", clear);

// FUNCIÓN CLEAR  LIMPIA EL FORMULARIO PARA VOLVER A CAPTURAR NUEVOS DATOS
function clear(){
    document.getElementById('Calculadora').reset();
    // OCULTA EL MENSAJE AL USUARIO PARA HACER UN NUEVO CÁLCULO
    document.getElementById('box--mensaje').style.display = 'none';
}
// FUNCIÓN MOSTRAR --> MOSTRARÁ UN MENSAJE AL USUARIO POSTERIOR AL CÁLCULO
function mostrar(){
    document.getElementById('box--mensaje').style.display = 'block';
}
