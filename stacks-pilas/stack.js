// Los Stack se usan en lugares como el Call Stack del JavaScript Engine

// Class auxiliar que sirve para crear el nuevo Nodo que ira en el 'top' de nuestro Stack
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;                                   // Cuando creamos un nuevo Node, este siempre se encontrara en el 'top' por eso el valor de su 'next' siempre comenzara siendo 'null'
  }
}

// Los Stacks siempre funcionan por la lógica LIFO (Last In First Out)
class Stack {
  constructor() {                                       // Definimos nuestro método Constructor, este no recibe valor y solo define sus 3 propiedades
    this.top = null;                                    // Como al crear un nuevo Stack este se encuentra vacio entonces no tiene 'top' por eso se lo inicializamos como 'null'
    this.bottom = null;                                 // La propiedad 'bottom' de nuestro Stack tambien va a ser 'null' al inicio porque esta vacio
    this.length = 0;                                    // Como esta vacio nuestro Stack su propiedad 'lenght' va a ser 0 al inicio
  }

  peek() {                                              // Selecciona y retorna el Node que se encuentra actualmente en el 'top' de nuestro Stack
    return this.top;
  }

  push(value) {                                         // Agrega un nuevo Node al final del Stack
    const newNode = new Node(value);                    // Instanciamos un nuevo Node con el valor que contendrá

    if(this.length === 0) {                             // Validamos que nuestro Stack esta vacio
      this.top = newNode;                               // Si el Stack esta vacio le decimos que su 'top' sera el nuevo Node que instanciamos
      this.bottom = newNode;                            // Como estaba vació quiere decir que su 'bottom' tambien será el nuevo Node generado
    } else {
      const holdingNode = this.top;                     // Guardamos temporalmente el Node que se encuentra en el 'top' para que no lo borre el Garbage Collector el Node que vamos a colocar el nuevo Node encima
      this.top = newNode;                               // Al 'top' de nuestro Stack le decimos ahora que su nuevo valor ahora sera el Node que acabamos de instanciar
      this.top.next = holdingNode;                      // Le decimos al Node que esta en el 'top' que su Node anterior es el que guardamos en el 'holdingNode'             
    }

    this.length++;                                      // Aumentamos el tamaño de nuestro Stack
    return this;                                        // Retornamos nuestro Stack actualizado y comleto
  }

  pop() {                                               // Elimina el Node que se encuetra en el 'top'

    if(this.length === 0) {                             // Si el Stack esta vacio retornamos su valor que seria null/undefined
      this.bottom = null;                               // Nos aseguramos que el 'bottom' sea 'null' para indicar que esta vacio
      
      return this;
    } else {
      const previousNode = this.top.next;               // Obtenemos el valor del Node anterior al Node que esta actualmente en el 'top' (El cual vamos a eliminar)
      this.top = previousNode;                          // Le decimos al 'top' de nuestro Stack que ahora sera el Node anterior
      this.length--;                                    // Disminuimos el 'lenght' de nuestro Stack
    }
    return this;                                        // Retornamos nuestro Stack actualizado y comleto
  }
}

const myStack = new Stack();                            // Instanciamos un nuevo Stack vacio