// La diferencia de una Doubly Linked Lista es que se puede desplazar a los Nodes anteriores con 'this.prev'

class Node {                                        // Clase auxiliar que nos ayuda a instanciar un nuevo Node
  constructor(value) {                          
    this.value = value;
    this.next = null;
    this.prev = null;                               // Le agregamos la propiedad 'this.prev' para el Node previo
  }
}

class MyDoublyLinkedList {                          // Clase para crear una Double Linked List
  constructor(value) {                          
    this.head = {                                   // Al instanciar una nueva Double Linked List sus propiedades 'next y prev' seran puestas en 'null' al haberse creado solo un Elemento en el Linked List
      value: value,
      next: null,
      prev: null,
    };
    this.tail = this.head;                          // La propiedad 'this.tail' será inicializada como la propiedad 'this.head'
    this.length = 1;
  }

  append(value) {                                   // Coloca un nuevo Node al final de la Double Linked List
    const newNode = new Node(value);                // Instanciamos un nuevo Node con el valor que contendrá
    newNode.prev = this.tail;                       // Le asignamos el valor a la propiedad 'newNode.prev' el valor actual del 'this.tail' del Double Linked List
    this.tail.next = newNode;                       // La propiedad 'tail.next' de la actual Double Linked List sera el nuevo Node creado
    this.tail = newNode;                            // Hacemos que la Double Linked List reconozca como su nueva 'tail' al nuevo Node creado
    this.length++;
    return this;
  }

  prepend(value) {                                  // Agruega un nuevo Node al principio de la Double Linked List
    const newNode = new Node(value);
    this.head.prev = newNode;                       // Le asignamos a la propiedad 'head.prev' de la actual Linked List el nuevo Node Instanciado
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return this;
  }

  insert(index, value) {                            // Inserta un nuevo nodo en medio de la Double Linked List dependiendo del Index que se quiere insertar
    if(index >= this.length) {
      return this.append(value);
    }

    const newNode = new Node(value);
    const previousNode = this.getNode(index - 1)
    const nextNode = previousNode.next

    previousNode.next = newNode;                    // Insertamos el nuevo Node a la propiedad 'next' del Node anterior al index donde se va a inserta el nuevo Node
    nextNode.prev = newNode                         // Al Node siguiente le decimos que su propiedad 'prev' será el Node recien creado 
    newNode.prev = previousNode;                    // Conectamos el nuevo Node con propiedad 'prev' al Node anterior
    newNode.next = nextNode;                        // Conectamos el nuevo Node con su propiedad 'next' con el node que le sigue

    this.length++;
    return this;
  }

  getNode(index) {                                  // Método auxiliar para obtener el Node deseado
    let counter = 0;
    let currentNode = this.head;

    while(counter !== index) {
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }

  remove(index) {
    const previousNode = this.getNode(index - 1);       // Obtenemos el Node previo al Node que queremos eliminar, obtiene 'undefined' si no existe
    const nextNode = this.getNode(index + 1);           // Obtenemos el Node posterio al Node que queremos eliminar, obtiene 'undefined' si no existe

    if(nextNode) {                                      // Validamos si existe un Node siguiente 
      previousNode.next = nextNode;                     // Si existe un Node posterior le decimos al Node anterios que su propiedad 'next' ahora va a ser el siguiete Node
    } else {
      previousNode.next = null;                         // Si no hay Node posterior le decimos al Node anterios que su propieda 'next' ahora va a ser 'null'
      this.tail = previousNode;                         // Le asignamos a nuestra Double Linked List que su 'tail' ahora va a ser el Node anterior
    }

    if(previousNode) {                                  // Validamos que exista un Node anterior
      nextNode.prev = previousNode;                     // Si existe entonce le decimos al Node posterios que su propiedad 'prev' ahora apunta al Node anterior
    } else {
      nextNode.prev = null;                             // Si no existe Node anterior le decimos al Node posterios que su propiedad 'prev' ahora será 'null'
      this.head = nextNode;                             // Le decimos a nuestre Double Linked List que su propiedad 'head' ahora va a ser el siguiente Node
    }

    this.length--;
    return this;
  }
}


let myDoublyLinkedList = new MyDoublyLinkedList(1);