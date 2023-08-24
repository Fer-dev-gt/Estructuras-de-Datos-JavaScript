// Forma visual de entender como estan estructuradas las Linked List
1 --> 2 --> 3 --> 4 --> 5 --> null                                        // Colocamos 'null' al final para dejar un espacio disponible para el siguiente valor, si no lo tuviera no podriamos agregar nuevos nodos

// Forma en la que podemos representar una Linked List, nos lo regresaria como un Object con el siguiente formato:
let singlyLinkedList = {
  head: {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null                                         // Al ser el 'Tail' colocamos el 'next' como null para hacer espacio para un posible siguiente valor
        }
      }
    }
  }
}


// Crando una Linked List usando Classes

class Node {                                                // Clase auxiliar para crear nuevos Nodos y no tener que repetir esta lógica en los métodos de la Class principal
  constructor(value) {                                      // Definimos un Constructor que asigna el valor a este Nodo y crea el siguente espacio disponible con un 'null'
    this.value = value;
    this.next = null;
  }
}

class MySinglyLinkedList {                                  // Clase principal donde generamos una nueva Linked List
  constructor(value) {                                      // Definimos nuestro Constructor para que se instancie con un valor inicial para que ocupe el primer lugar/head
    this.head = {                                           // Definimos nuestro 'head' como un Object
      value: value,                                         // Le asignamos el valor inicial que se paso al instanciar este Object 
      next: null,                                           // Apartamos un nuevo lugar al colocar la propiedad 'next' como null
    };
    this.tail = this.head;                                  // Al tratarse del primer elemento al ser el Constructor hacemos que el 'tail' de nuestra LinkedList apunta a la 'head'
    this.length = 1;                                        // Inicializamos el conteo de que tan larga el esta LinkedList
  }

  append(value) {                                           // Agrega un nuevo Nodo/elemento al final Cada Nodo nuevo se convertira en la cola
    const newNode = new Node(value);                        // Creamos una nueva Instancia de un Node usando la Class auxiliar que definimos arriba con el valor que tendra este nuevo Node
    this.tail.next = newNode;                               // Al valor anterior de 'this.tail.next' que era 'null' le decimos que tome como valor el nuevo Node que Instanciamos                          
    this.tail = newNode;                                    // Hacemos que nuestra Linked Lista reconozca al ultimo Node como su 'tail' el cual su '.next' esta ahora como 'null'
    this.length++;                                          // Aumentamos en 1 la longitud de nuestra Linked List
    return this;                                            // Retornamos nuestro Objeto Linked List completo y actualizado
  }

  prepend(value) {                                          // Agrega un nuevo Nodo/elemento al inicio el cual se convertira en la nueva 'head'
    const newNode = new Node(value);                        // Instanciamos un nuevo Node con el valor que queremos que tenga
    newNode.next = this.head;                               // Le asignamos a nuestro '.next' de nuestro nuevo Node que cambie de 'null' a el valor del 'head' antiguo, asi este 'head' se coloca despues del Node que acabamos de crear
    this.head = newNode;                                    // Le decimos a nuestra Linked List que la nueva 'head' (primer elemento) va a ser el Node que acabamos de instanciar
    this.length++;                                          // Aumentamos en 1 la longitud de nuestra Linked List
    return this;                                            // Retornamos nuestro Objeto Linked List completo y actualizado
  }
  
  insert(index, value) {                                    // Agrega un nuevo Node en el Index que se indique en el parametro como en la mitad del Linked List
    if(index >= this.length) {                              // Validamos si el index en donde se quiere colocar el nuevo Node esta al final o se 'sale' del 'lenght' actual de nuestra Linked List
      return this.append(value)                             // Si es cierto retornamos la ejecución del método 'append(value)' para agregar el nuevo Node al final de la Linked List
    }

    const newNode = new Node(value);                        // Instanciamos el nuevo Node a agregar
    const firstPointer = this.getPreviousNode(index - 1);   // Obtenemos el valor del Node anterior a la posición en donde vamos a insertar el nuevo Node, esto ejecutando el método auxiliar '.getPreviousNode(indez - 1)'
    const holdingPointer = firstPointer.next;               // Guardamos el Node '.next' del 'firstPointer' para que no lo borre el Garbage Collector
    firstPointer.next = newNode;                            // Reemplazamos el valor del 'firstPointer.next' (El que guardamso temporalmente para que el Garbage Collector no lo borre) con el valor del nuevo Node a insertar en medio de la Linked List
    newNode.next = holdingPointer;                          // Al valor 'null' del '.next' del nuevo Node que insertamos le lo reemplazamos con el Node del 'holdingPointer' y asi pegamos y reacomodamos los Nodes de nuestra Linked List
    this.length++;                                          // Aumentamos en 1 la longitud de nuestra Linked List
    return this;                                            // Retornamos nuestro Objeto Linked List completo y actualizado
  }

  getPreviousNode(index) {                                  // Método auxiliar que retorna el Node anterior a la posicion de donde insertaremos el nuevo Node
    let counter = 0;                                        // Inicializamos un 'counter' en 0 para que verifique si estamos en el index deseado
    let currentNode = this.head;                            // Inicializamo un 'currentNode' como el 'this.head' (Primer Node de nuestro Linked List)

    while(counter !== index) {                              // Usamos un ciclo While para iterar sobre los Nodes existentes de nuestra Linked List y se ejecutará siempre y cuando el 'counter' no sea igual al Index deseado
      currentNode = currentNode.next;                       // Hacemos que el 'currentNode' sear el siguiente Node con el 'currentNode.next'
      counter++;                                            // Aumentamos el contador en 1
    }

    return currentNode;                                     // Retornamos el Node anterior
  }

  remove(index) {                                                         // Remueve el Node del index que se le indique
    const beforeNode = this.getPreviousNode(index - 1);                   // Obtenemos el Node anterior al que se va a eliminar
    const afterNode = this.getPreviousNode(index + 1);                    // Obtenemos el Node posterior al que se va a eliminar (Si lo hay, no existe se queda como 'undefined')
    afterNode ? beforeNode.next = afterNode : beforeNode.next = null;     // Validamos si existe un Node posterior si es true entonces unimos el nodo Anterior con el nodo Posterior por medio del 'beforeNode.next' si no hay Node posterior le decimos al Node anterior que ponga su valor '.next' como 'null'
    delete this.getPreviousNode(index)                                    // Borramos el valor del node al cual le corresponde el Index ingresado

    this.length--;                                                        // Disminuimos en 1 la longitud de nuestra Linked List
    return this;                                                          // Retornamos nuestro Objeto Linked List completo y actualizado
  }

}

let myLinkedList = new MySinglyLinkedList(1);               // Instanciamos una nueva Linked List con un valor inicial de 1