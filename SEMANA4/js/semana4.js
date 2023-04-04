let lista = [];

while (true) {
  let elemento = prompt("Introduce un elemento:");

  if (elemento === null) { // Si el usuario presiona ESC, salimos del bucle
    break;
  }

  if (lista.includes(elemento)) { // Si el elemento ya está en la lista, mostramos un mensaje de error
    alert(`"${elemento}" ya está en la lista. No se puede duplicar.`);
  } else { // Si el elemento no está en la lista, lo añadimos
    lista.push(elemento);
    alert(`"${elemento}" ha sido añadido a la lista.`);
  }
}

console.log("La lista final es:");
console.log(lista);
