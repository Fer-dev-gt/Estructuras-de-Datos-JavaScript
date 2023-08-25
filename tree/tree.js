/*    Ejemplo gráfico de como quedaria nuestro Binary Tree
      10
  4       20
2   8  17   170
*/


class Node {                              // Class auxiliar para crear nuevos Nodes y definir sus propiedades 'left' y 'right' como 'null'
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {                          // Clase para instanciar un nuevo Binary Tree
  constructor() {                                 // Definimos el método constructor de nuestro Binary Tree
    this.root = null;                             // Cuando se instancia un nuevo Binary Tree su propiedad 'root' se inicia en 'null' porque se encuentra vacio
  }

  insert(value) {                                 // Inserta un nuevo Node dependiendo del lugar que le corresponde en el Binary Tree
    const newNode = new Node(value);

    if(this.root === null) {                      // Validamos que el 'root' del Tree esta como 'null' (El Tree esta vacio)
      this.root = newNode;                        // Le asignamos al 'root' de nuestro Tree el Nodo que acabamos de crear
    } else {
      let currentNode = this.root;                // Si ya existe un 'root' lo guardamos en la variable 'currentNode'
      while(true) {                               // Implementamos un ciclo 'while' "infinito" para validar si el Node que queremos ingresar es mayor o menor al 'root' actual
        if(value < currentNode.value) {           // Validamos si nuestro Node es menor al valor del 'root' actual
          if(!currentNode.left) {                 // Validamos si existe un Node menor ('left') del 'currentNode'
            currentNode.left = newNode;           // Si no existe 'currentNode.left' significa que hay un espacio disponible para insertar el nuevo Node
            return this;                          // Una vez insertado el nuevo Node en el lugar que le corresponde, retornamos el Tree completo actualizado y salimos del ciclo while
          }
          currentNode = currentNode.left;         // Si existe un 'currentNode.left' significa que tenemos que hacer otra evualacion (Volver a ejecutar el ciclo While), con la diferencia de asignar el 'currentNode.left' a mi 'currentNode' para evaluar ese Node con menor valor
        } else {                                  // Esto se ejecuta si el Node tiene un valor mayor al de 'root'
          if(!currentNode.right) {                // Validamos si exista un 'currentNode.rigth' (numero mayor)
            currentNode.right = newNode;          // Si no existe entonces le asignamos el espacio disponible al Node para que se coloque a su 'right'
            return this;                          // Retornamos el Tree completo y actualizado, tambien salimos del ciclo while
          }
          currentNode = currentNode.right;        // Si existe un 'currentNode.rigth' volvemos a iterar en el ciclo While pero ahora el valor de 'currentNode' va a ser el Node que esta a la derecha
        }
      }
    }
  }

  search(value) {                                           // Busca un valor y verifica si ese Node existe en el Tree y devuelve ese Node
    if(this.root === null)  return this;                    // Validamos que el 'root' del Tree tenga un valor (este vacio) si lo esta no hay nada que buscar y regresamos el Tree
    let currentNode = this.root;                            // Ya que existe un valor en'root' declaramos e inicializamos el 'currentNode' para que tome el valor del 'root' principal del Tree

    while(currentNode && currentNode.value != value) {      // Empezamos a iterar dentro de un ciclo While siempre que el valor del 'currentNode.value' no sea igual al value que buscamos
      if(value < currentNode.value) {                       // Validamos si el 'value' es menor al value del 'currentNode' 
        currentNode = currentNode.left                      // Si lo es significa que hay que seguir buscando y le asignamos a 'currentNode' que tome el valor del 'currentNode.left' (valor menor)
      } else {                                              // Esto sigifica que el 'value' es mayor que el 'currentNode.right'
        currentNode = currentNode.right                     // Entonces le pasamos a 'currentNode' el valor de 'currentNode.right' (numero mayor)
      }
    }
    return currentNode;                                     // Cuando finalmente salimos del ciclo retornamos el Node del valor que encontramos
  }

  
  // Otra forma de hacer una busqueda usando recursividad
  searchRecursividad(value, tree = this.root) {
    if (tree == null) {
      return "El elemento no se encuentra.";
    }
    else if(value > tree.value) {
      return this.search(value, tree.right);
    }
    else if(value < tree.value) {
      return this.search(value, tree.left);
    }
    else {
      return "¡El elemento ha sido encontrado!";
    }
  }
}

const tree = new BinarySearchTree();