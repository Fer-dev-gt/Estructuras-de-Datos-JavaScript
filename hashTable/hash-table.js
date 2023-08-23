// Vamos a crear una Hash Table usando Classes y le vamos definir sus método que replicaran los comportamientos que tiene que tener un Hash Table

class HashTable {                                               
  
  constructor(size) {                                             // Definimos nuestra funcion 'constructor' que recibe como argumento un 'size' que represantará el tamaño que tendrá nuestro Hash Table
    this.data = new Array(size);                                  // Inicializamos nuestra propieda 'this.data' como un nuevo Object tipo Array con un tamaño de 'size'
  }

  hashMethod(key) {                                               // Método que replica una Hash Function que convierte el Key de un Object en un numero hash SHA-256 que sera la referencia en memoria de dicho Objecto y su value
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;                                                  // Retornamos el hash que es la trasformación de nuestro Key, no es necesario aprender a crear este tipo de funciones, el lenguaje no ahorra tener que implementar esto
  }

  set(key, value) {                                               // Método que nos ayuda a agregar nuevos elementos al Hash Table, recibo como parámetro el Key y su respectivo Value
    const address = this.hashMethod(key);                         // Generamos y guardamos una 'address' al ejecutar la función 'this.hashMethod()' le mandamos como argumento el Key de valor que vamos a guardar
    if(!this.data[address]) {                                     // Validamos si esta direccion no esta ya registrada en nuestro Hash Table
      this.data[address] = [];                                    // Si no esta registrido le asignamos como valor inicial un nuevo Array vacío
    }
    this.data[address].push([key, value]);                        // Agregamos los datos de Key y Value con el método de Arrays '.push()'. Si llegamos a tener una Colisión le indicamos que no reescriba la información, en vez de eso le decimos que agregue como otro Array los nuevos valores de Key y Value para que existan en el mismo espacio
    return this.data;                                             // Retornamos nuestro Objecto completo con toda su información
  }

  get(key) {                                                      // Método retorna el value del Object que guardamos en nuestra Hash Table usando el Key y la Hash Function
    const address = this.hashMethod(key);                         // Volvemo a generar una 'address' en formato Hash, siempre será el mismo Hash si ingresamos la misma palabra osea retornará el mismo hash de un valor guardado si estos coinciden
    const currentBucket = this.data[address];                     // Obtenemos los datos del Object/Array del 'data[address]' para luego buscar en sus elementos
    if(currentBucket) {                                           // Validamos si 'currentBucket' de verdad contiene un Valor dentro, si no lo tiene simplemente no ejecutamos estos pasos y retornamos un 'undefined'
      for(let i = 0; i < currentBucket.length; i++) {             // Usamos un ciclo for para iterar sobre los elementos/Array que existen dentro de nuestro 'currentBucket'. Si existen datos 'Colisionados' existiran mas de un 1 Array en este Bucket
        if(currentBucket[i][0] === key) {                         // Validamos si el Key (Index 0 del Array) de la actual iteración es igual el Key que se envio como argumento
          return currentBucket[i][1];                             // Si estas Key coinciden entonces retornamos el valor de la iteración que hizo Match (Value)
        }
      }
    }
    return undefined;                                             // Si no existe ese Key en formato Hash en nuestra Hash Table retornamos un undefined
  }

  delete(key) {                                                   // Método que elimina el Objecto completo si el Key coincide con un Object ya registrado
    const address = this.hashMethod(key);                         // Usamos nuestra Hash Function para obtener una Address
    const currentBucket = this.data[address];
    if(currentBucket) {                                           // Verificamos que exista la address en nuestra Hash Table
      for(let i = 0; i < currentBucket.length; i++) {             // Iteramos sobre el Array que es nuestra 'currentBucket'
        if(currentBucket[i][0] === key) {                         // Validamos que coincidan las Key
          const deletedValue = this.data[address][i];             // Guardamos el valor del Object que vamos a eliminar
          this.data[address].splice(i, 1);                        // Usando el Array Method '.splice()' y el index i actual eliminamos el Objext de nuestra Hash Table
          return deletedValue                                     // Devolvemos el valor del Object recien borrado
        }
      }
    }
    return undefined;
  }

  getAllKeys() {                                                  // Método que retorna todas las Keys actualmente guardadas en nuestro Hash Table
    return this.data.reduce((accumulator, currentDataArray) => {  // Usamos el Array Method '.reduce()' para que retorne un Array (El cual pusimos como InitialValue), este método va a iterar sobre cada Array interno de 'this.data'
      const keys = currentDataArray.map(([key]) => key);          // Guardamos en una variable auxiliar la Key del actual Array que se esta iternado, usamos la sintaxis [key] para destructurar y extraer el valor Key de cada Array interno de 'this.data'
      return accumulator.concat(keys)                             // Por ultimo retornamos un Array que es el resultado de concatenar la variable Key con los demas Keys que se han encontrado y así devolver un Array con todos los Keys de este Hash Table
    }, []);
  }

  getAllKeysSecondWay() {                                         // Otra manera de devolver todos los Keys de nuestro Hash Table
    const keys = [];                                              // Inicializamos un Array donde se guardarán todos los Keys que encontremos en nuestro Hash Table
    for (let i = 0; i < this.data.length; i++) {                  // Iteramos por la longitud de nuestra Hash Table
      if (this.data[i]) {                                         // Validamos que exista un valor registrado en el index que vamos iterando
        for (let j = 0; j < this.data[i].length; j++) {           // Iteramos entre los posibles Array anidados que existan en nuestra Hash Table
          keys.push(this.data[i][j][0]);                          // Usando el método 'push' agregamos los valores de las Keys que se encontraron a nuestro Array
        }
      }
    }
    return keys;                                                  // Retornamos el Array con todas las Keys que se encontraron
  }

}

const myHashTable = new HashTable(50);                            // Instanciamos nuestro Object de tipo HashTable con 50 espacios/buckets libres para guardar datos, en estos espacios se va a guardar el 'hash' como referencia de memoria



// Solución al reto Playgrounds

import { HashTable } from "./hashTable";

export class Solution extends HashTable {
  constructor(size) {
    super()
    this.data = new Array(size);
  }

  delete(key){
    const address = this.hashMethod(key);
    const currentBucket = this.data[address];
    if(currentBucket) {
      for (let i = 0; i < currentBucket.length; i++) {
        if(currentBucket[i][0] === key) {
          const deletedItem = this.data[address][i]
          this.data[address].splice(i, 1);
          return deletedItem;
        }
      }
    }
    return undefined
  }

  // Otra forma de borrar un elemento de nuestra Hash Table
  deleteOtherWay(key) {
    const address = this.hashMethod(key)
    const bucket = this.data[address]
    if (bucket) {
      const keyIndex = bucket.findIndex(([buckeItemKey]) => buckeItemKey === key)
      if (keyIndex !== -1) {
        return this.data[address].splice(keyIndex, 1)[0]
      }
    }
  }
}


// Solución al segundo reto Playgrounds
import { HashTable } from "./hashTable.js"

export class Solution extends HashTable {
  constructor(size){
    super()
    this.data = new Array(size)
  }


  getAllKeys(){
    return this.data.reduce((accumulator, currentDataArray) => {
      const keys = currentDataArray.map(([key]) => key)
      return accumulator.concat(keys)
    }, [])
  }


  // Otra forma de solucionar el reto
  getAllKeys2(){
    const array = this.data
    let key = []

    array.forEach((e) => {
      e.forEach((k) => {
        key.push(k[0]);
      })
    });
    return key;
  }


  getAllKeys3(){
    // Tu código aquí 👈
    let items = this.data
      .filter(item => item != undefined)
      .flat()
      .map(item => item[0])
    
    return items;
  }
}