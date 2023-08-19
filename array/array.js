// Como crear tu propio Array usando Classes desde 0


// Forma "usual" de crear Array en JavaScript y de agregarle nuevos elementos
const arrayNormal = ["Diego", "Karen", "Oscar"];
arrayNormal.push("Ana");


// Creamos una Class (Molde para instanciar Objects) donde definimos los metódos que podremos ejecutar sobre nuestros Arrays (Tecnicamente estamos trabajando con JSON pero nos sirve para entender como funcionan los Arrays)
class MyClassArray {
  
  constructor() {                                               // Definimos un constructor e inicializamos los valores, como un Array con 'length' 0 y la propiedad 'data' como un Object vacio el cual va a guardar todos los elementos de nuestro Array com 'value' y su index será el 'key'
    this.length = 0;                                            // Cada vez que Instanciemos un nuevo Array este comenzara con 0 elementos, osea un 'length' de 0
    this.data = {};                                             // En el 'data' existirá un Objecto donde guardaremos los datos de nuestro Array con su par de Index como 'key'
  }

  get(index) {                                                  // Definimos un método 'getter' que recibe el index del elemento a retornar, este con el objetivo de traer el elemenot deseado del Array
    return this.data[index];                                    // Retornamos el valor del elemento dentro de nuestro 'Array' usando el Index que es enviado como Argumento
  }

  push(item) {                                                  // Método para agregar un nuevo elemento al Array pasando el valor 'Item' y guardandolo el index correspondiente que sería el ultimo lugar del Array
    this.data[this.length] = item;                              // Guardamos el valor 'item' en el Array usando el 'this.length' como el Index que indica la posición en donde se guardará el valor de 'item'
    this.length++;                                              // Aumentamos en 1 el valor de 'length' para preparar el siguiente Index
    return this.data;                                           // Retornamos el Objeto completo con los valores de nuestro "Array" junto con su 'key' que seria su Index correspondiente
  }

  pop() {                                                       // Método que borra el ultimo elemento de nuestro "Array" y retorna los datos de ese Item borrado, no es necesario que reciba ningun argumento
    this.length--;                                              // Regresamos una unidad al Index de nuestro Array para trabajar en el ultimo elemento guardado en el Array
    const lastItem = this.data[this.length]                     // Guardamos el valor del ultimo elemento registrado para despues retornarlo
    delete this.data[this.length];                              // Usamos el Keyword 'delete' para borra el elemento de nuestro "Object/Array" junto su Key de Index
    return lastItem;                                            // Retornamos los valores del Item que se acaba de borrar
  }

  delete(index) {                                               // Método que borra el elemento de nuestro Array del Index que se ingresa
    const item = this.data[index]                               // Guardamos los datos del item que se va a borrar
    this.shiftIndex(index);
    return item;                                                // Retornamos los datos del Item que acabamos de borrar
  }

  shiftIndex(index) {                                           // Método que se encarga de reacomodar los Index de los elementos ubicados despues del Item que se va a borrar            
    for (let i = index; i < this.length - 1; i++) {             // Definimos un ciclo 'for' para iterar nuestro 'Array' desde el parametro Index del elemento que se quiere eliminar, esto con tal de hacer más rápido el proceso
      this.data[i] = this.data[i + 1];                          // A partir de Index del elemenot que queremos eliminar hacemos una reacomodación de los elementos y los movemos un Index a la izquierda para que ocupen el lugar del elemento que se va a eliminar
    }
    delete this.data[this.length - 1];                          // Usamos el KeyWord 'delete' para eliminar el ultimo valor del Array que se puede borrar de forma segura al ya haberlo duplicado/movido un espacio a la izquierda
    this.length--;                                              // Disminuimos la longitud/tamaño del Array
  }


  // Reto de crear método para agregar y eliminar elementos al inicio del Array


  unshift(item) {                                               // Método que recibe un nuevo Item y lo agrega al inicio del Array
    for (let i = this.length; i > 0; i--) {                     // Creamos un 'for' loop que va recorres desde el ultimo lugar hasta llegar al index 1 del Array
      this.data[i] = this.data[i - 1];                          // Reacomodamos los valores del Array un lugar a la derecha
    }
    this.data[0] = item;                                        // Agregamos el nuevo Item al inicio del Array, el cual reemplaza a un valor duplicado que ya movimos un espacio a la derecha
    this.length++;                                              // Aumentamos el tamaño del Array para dejar listo el siguiente espacio del Array
    return this.data;                                           // Retornamos el valor de nuestro Array/Object completo
  }

  shift() {                                                     // Elimina el primer valor del Array, no recibe argumentos
    const lastItem = this.data[0];                              // Guardamos el valor del item que vamos a eliminar
    this.shiftIndex(0);                                         // Ejecutamos la función '.shiftIndex()' con el Index 0 para que elimine ese valor y reacomode los Items del Array y los corra un espacio a la izquierda
    return lastItem;                                            // Retornamos el valor del Item que acabamos de borrar
  }

}


const myClassArray = new MyClassArray();                        // Creamos una nueva Instancia del Array que definimos en la Clase


// Solucion al Primer reto Playgrounds
export class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }
  
  unshift(item){
    if (!item) return this.length
    for (let i = this.length; i > 0; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[0] = item;
    this.length++;
    return this.length; 
  }
}


// Solución de otros compañeros 1
export class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }
  
  unshift(item){
    if (!item) {
      return this.length
    }
    if (this.length !== 0) {
      for (let i = this.length - 1; i >= 0; i--) {
        this.data[i + 1] = this.data[i];
      }
    }

    this.data[0] = item;
    this.length++;
    return this.length
  }
}


// Solución de otros compañeros 2
export class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }
  
  unshift(item) {
    if (item) {
      this.length = 1;
      Object.values(this.data).forEach(el => {
        this.data[this.length++] = el;
      });
      this.data[0] = item;
    }
    return this.length;
  }
}


// Solución de otros compañeros 3
export class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }
  
  unshift(item) {
    if (item) {
      for (let i = this.length; i > 0; i--) {
        this.data[i] = this.data[i - 1];
      }
      this.data[0] = item;
      this.length++;
    }
    return this.length;  
  }
}



// Solucion al Segundo reto Playgrounds


import { MyArray } from "./MyArray";

export class BetterArray extends MyArray {
  constructor(){
    super()
    this.length = 0
    this.data = {}
  }

  shift(){
    const item = this.data[0]                               
    for (let i = 0; i < this.length - 1; i++) {             
      this.data[i] = this.data[i + 1];                          
    }

    delete this.data[this.length - 1];                          
    this.length--;  
    return item;  
  }
}


// Solucion de otros compañeros 1
import { MyArray } from "./MyArray";

export class BetterArray extends MyArray {
  constructor(){
    super()
    this.length = 0
    this.data = {}
  }

  shift() {
    if (this.length == 0) {
      return undefined;
    }

    //obtengo el primer elemento
    const firstItem = this.data[0];

    // corrijo el numero de indice de cada elemento
    for (let i = 0; i < this.length; i++) {
      this.data[i] = this.data[i + 1];
    }
    // remuevo el ultimo slot que queda con undefined
    delete this.data[this.length - 1];

    // corrijo el largo del array
    this.length--;
    
    return firstItem;
  }
}


// Solucion de otros compañeros 2
import { MyArray } from "./MyArray";

export class BetterArray extends MyArray {
  constructor(){
    super()
    this.length = 0
    this.data = {}
  }

  delete(index) {
    const item = this.data[index]
    if (!item) return
    delete this.data[index]
    const keys = Object.keys(this.data).map(Number).sort()
    const rightKeys = keys.slice(index)
    rightKeys.forEach(index => {
      const itemData = this.data[index]
      delete this.data[index]
      this.data[index - 1] = itemData
    })
    this.length = Object.keys(this.data).length
    return item
  }
  shift() {
    return this.delete(0)
  }
}
