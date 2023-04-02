//Actividad 02:
//Crea un algoritmo que le pida al usuario un número y luego utiliza while para evaluar
//cuántos números son pares y cuantos impares, hasta que el usuario ingrese "salir".//

let num = prompt('Ingrese un número: ');

while (num != "Esc"){
    console.log(`el usuario ingresó ${num}`);
    num = prompt('Ingrese otro número');
}