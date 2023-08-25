// Los Queues se manejan con la lógica FIFO (First In First Out)

class Node {                                  // Creamos nuestra lógica para instanciar nuevos Nodes
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {                                 // Clase que instancia nuevos Queues
  constructor() {                             // Definimos nuestro método constructor que define nuestro Queue como uno vacio al inicio
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  peek() {                                    // Método que retorna el primer Node de nuestro Queue (el que esta a punto de salir)
    return this.first;
  }

  enqueue(value) {                            // Agrega un nuevo Node al final del Queue
    const newNode = new Node(value);

    if(this.length === 0) {                   // Si el Queue esta vacio le decimos que la propiedad 'first' y 'last' sean el Node recien creado
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;               // Si ya existen Nodes en el Quee le decimos al actual ultimo valor del Queue que el valor que le sigue es el Node que acabamos de crear
      this.last = newNode;                    // Le decimos a la propiedad 'last' de nuestro Queue su valor ahora es el Node que acabamos de crear
    }

    this.length++;                            // Aumentamos el tamaño de nuestro Queue
    return this;                              // Retornamos el Queue completo y actualizado
  }

  dequeue() {                                 // Elimina el Node que esta en el 'first' del Queue (Sale de la fila)
    if(this.length === 0) {
      this.first = null;
    } else if (this.length === 1){            // Si el 'length' de nuestro Queue es 1 (Se va a quedar vacio despues de hacer la eliminación) le decimos que sus propiedades 'first' y 'last' seran ahora 'null'
      this.first = null;
      this.bottom = null;
    } else {
      const holdingNode = this.first.next;    // Guardamos el valor del Node que le sigue al que esta actualmente en 'first'
      this.first = holdingNode;               // Le decimos al Queue que su valor de 'first' ahora va a ser el que estaba como Node anterio (Se mueve hacia adelante)
      this.length--;                          // Disminuimos el tamaño del Queue
    }

    return this;                              // Retornamos el Queue completo y actualizado
  }
}

const myQueue = new Queue();                  // Instanciamos un nuevo Queue