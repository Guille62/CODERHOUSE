// ************* CALCULADORA DE LITROS PARA ACUARIOS **********************

function calcularLitrosAcuario() {
    //  Solicitamos al usuario  el tipo de acuario a calcular y lo guardamos en un variable
    let tipoAcuario = prompt(`Ingrese el tipo de acuario (Rectangular o Esférico):`);
    // Guardamos la variable resultado
    let resultado;
  
    switch(tipoAcuario) {
        // Si el usuario ingresa "Rectangular" le solicitará el ancho / largo / alto 
      case 'Rectangular':
            largo = parseInt(prompt(`Ingrese el largo en cm:`));
            ancho = parseInt(prompt(`Ingrese el ancho en cm:`));
            alto = parseInt(prompt(`Ingrese el alto en cm:`));
        // Obtenidas las medidas hace la operación para calcular los litros
        resultado = largo * ancho * alto / 1000;
        break;
        // Si el usuario ingresa "Esférico"  le solicitará el radio del acuario pero es más simple
        // solicitar que ingrese la mitad del alto total.
      case 'Esférico':
        let radio = parseInt(prompt(`Ingrese la mitad del alto total en cm:`));
            largo = 67;
            ancho = 16;
        // Obtenidas las medidas hace la operación para calcular los litros
        resultado = largo / ancho * Math.pow(radio, 3) / 1000;
        break;
  
      default:
        // En el caso que no ingrese ninguna de las alternativas mostrará el siguiente mensaje
        alert('El tipo de acuario ingresado es inválido');
        return;
    }
    // Muestra por consola los litros de agua necesarios
    console.log(`Tu acuario ${tipoAcuario} necesita ${resultado.toFixed()} litros de agua.`);
     // Muestra con una Alerta los litros de agua necesarios
    alert(`Tu acuario ${tipoAcuario} necesita ${resultado.toFixed()} litros de agua.`);
  }

  // Dispara la función calculo posterior a que el usuario interactúe 
  calcularLitrosAcuario();
