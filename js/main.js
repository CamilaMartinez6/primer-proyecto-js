//declaramos un array para cada tipo de alimento segun su categoria
const bebidasCalientes = ['espresso', 'americano', 'latte', 'capuccino', 'mocca', 'flat white']
const bebidasFrias = ['cafe frapee', 'cold brew', 'ice latte', 'ice capuccino']
const comidas = ['medialuna', 'donas', 'tostado', 'sandwich']

//declaramos las variables globales ya que se van a usar en todo el programa
let bebidaCalienteSeleccionada = null
let bebidaFriaSeleccionada = null
let comidaSeleccionada = null
let bebidaAgregada = null

//este grupo de funciones reciben dos parametros uno que toma el nombre de un elemento del array y el otro su indice. 
function seleccionBebidaCaliente(bebidasCalientes, posicionBebidaCaliente) {
    return bebidasCalientes[posicionBebidaCaliente] // va a retornar el elemento del array que esta en esa [posicion]
}
function seleccionBebidaFria(bebidasFrias, posicionBebidaFria) {
    return bebidasFrias[posicionBebidaFria]
}
function seleccionComida(comidas, posicionComida) {
    return comidas[posicionComida]
}

function bebidaAgregarPregunta(bebidaAgregar) { // esta funcion luego de que se eligio una bebida principal se ejecuta si el usuario decide agregar una bebida mas a la orden
    if (bebidaAgregar == 1) { // si el usuario decide agregar una bebida extra se ejecuta el siguiente if
        let bebidaAgregarTipo = parseInt(prompt('presione 1 para elegir una bebida caliente, 2 para una bebida fria'))
        if (bebidaAgregarTipo == 1) { // caso en que la bebida sea caliente
            let posicionBebidaCaliente = parseInt(prompt('ingrese 0 para seleccionar cafe espresso, 1 para americano, 2 para latte, 3 para capuccino, 4 para mocca y 5 para flat white'))
            return seleccionBebidaCaliente(bebidasCalientes, posicionBebidaCaliente)
        }
        else if (bebidaAgregarTipo == 2) { // caso en que la bebida sea fria
            let posicionBebidaFria = parseInt(prompt('ingrese 0 para seleccionar cafe frapee, 1 para cold brew, 2 para ice latte o 3 para ice capuccino'))
            return seleccionBebidaFria(bebidasFrias, posicionBebidaFria)
        }
    }
}

function comidaAcompañarPregunta(comidaAcompañar) { //esta funcion recibe un valor ingresado x el usuario como parametro para determinar si se va a qurer acompañar la orden con una comida
    if (comidaAcompañar == 1) {
        let posicionComida = parseInt(prompt('ingrese 0 para seleccionar medialunas, 1 para seleccionar donas, 2 para tostado 0 3 para sandwich'))
        let comidaAcompañarAgregada = seleccionComida(comidas, posicionComida) //en esta variable guardo el elemento del array de comidas que representa ese indice
        return comidaAcompañarAgregada
    }
}

let realizarOrden = parseInt(prompt('Bienvenido, para realizar una orden presione 1. para salir presione 2'))

while (realizarOrden == 1) { //si se desea realizar una orden ejecutamos el bucle
    let ordenPrincipal = parseInt(prompt('presione 1 para elegir una bebida caliente, 2 para una bebida fria, 3 para elegir una comida o 4 para finalizar'))

    switch (ordenPrincipal) {
        case 1:
            let posicionBebidaCaliente = parseInt(prompt('ingrese 0 para seleccionar cafe espresso, 1 para americano, 2 para latte, 3 para capuccino, 4 para mocca y 5 para flat white'))
            bebidaCalienteSeleccionada = seleccionBebidaCaliente(bebidasCalientes, posicionBebidaCaliente)
            console.log('Su pedido es:\n' + '\n' + bebidaCalienteSeleccionada) //como puede ocurrir solamente uno de los 4 casos, una vez ejecutado este terminara el switch por lo tanto se imprimira x consola solo el elemento del caso elegido.
            break
        case 2:
            let posicionBebidaFria = parseInt(prompt('ingrese 0 para seleccionar cafe frapee, 1 para cold brew, 2 para ice latte o 3 para ice capuccino'))
            bebidaFriaSeleccionada = seleccionBebidaFria(bebidasFrias, posicionBebidaFria)
            console.log('Su pedido es:\n' + '\n' + bebidaFriaSeleccionada)
            break
        case 3:
            let posicionComida = parseInt(prompt('ingrese 0 para seleccionar medialunas, 1 para seleccionar donas, 2 para tostado o 3 para sandwich'))
            comidaSeleccionada = seleccionComida(comidas, posicionComida)
            console.log('Su pedido es:\n' + '\n' + comidaSeleccionada)
            break
        case 4:
            break //termina el programa 
    }

    let bebidaAgregar

    if (ordenPrincipal != 3 && ordenPrincipal != 4) {
        bebidaAgregar = parseInt(prompt('¿Desea agregar alguna bebida mas?, ingrese 1 para SI o 0 para continuar con la orden'))
    }

    if (ordenPrincipal != 1 && ordenPrincipal != 2 && ordenPrincipal != 4) { // pongo esta condicion ya que el caso 4 termina el programa 
        bebidaAgregar = parseInt(prompt('¿Desea agregar alguna bebida?, ingrese 1 para SI o 0 para continuar con la orden'))
    }

    while (bebidaAgregar == 1) {
        bebidaAgregada = bebidaAgregarPregunta(bebidaAgregar)
        bebidaAgregar = 0// cambiamos el valor a 0 para que se corte el bucle y se ejecute una unica vez en caso de que se cumpla la condicion
        console.log(bebidaAgregada) //mientras se cumpla el la condicion se imprime x consola el elemento seleccionado
    }

    //repetimos el mismo bucle para el caso en que se desee acompañar la bebida con una comida
    let comidaAcompañar

    if (ordenPrincipal != 3 && ordenPrincipal != 4) {
        comidaAcompañar = parseInt(prompt('¿desea acompañar su bebida con alguna comida? presione 1 para SI o 0 para terminar la orden'))
    }

    while (ordenPrincipal != 3 && comidaAcompañar == 1) {
        comidaSeleccionada = comidaAcompañarPregunta(comidaAcompañar)
        comidaAcompañar = 0
        console.log(comidaSeleccionada)
    }

    realizarOrden = parseInt(prompt('gracias! si desea realizar otra una orden presione 1. para salir presione 2')) //volvemos a preguntar si se quiere realizar una nueva orden
}

alert('vea su/s orden/es en la consola')

