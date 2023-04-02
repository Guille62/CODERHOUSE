//Actividad 01:
//Crea un algoritmo que le pida al usuario que ingrese un número y luego evalúe si ese
//número es par o impar.


let num = parseInt(prompt('Ingrese número '));

if(num % 2 === 0){
    console.log(`${num} es un número par`);
} else{
    console.log(`${num} no es número par`);
}
