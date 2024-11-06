class Producto {
    constructor(nombre, descripcion, precio, categoria, imagen) {
        this.nombre = nombre
        this.descripcion = descripcion
        this.precio = precio
        this.categoria = categoria
        this.imagen = imagen
    }
}

const productos = [
    new Producto('Americano', 'Café espresso con agua caliente, suave y aromático.', '600', 'bebidas calientes', './assets/bebida-caliente-americano.png'),
    new Producto('Capuccino', 'Café espresso, leche espumosa y cremosa, con un toque suave.', '800', 'bebidas calientes', './assets/bebida-caliente-capuccino.png'),
    new Producto('Latte', 'Café espresso suave con abundante leche y espuma.', '650', 'bebidas calientes', './assets/bebida-caliente-latte.png'),
    new Producto('Mocca', 'Café espresso, chocolate, leche cremosa y un toque de espuma.', '750', 'bebidas calientes', './assets/bebida-caliente-mocca.png'),
    new Producto('Iced Latte', 'Café espresso frío, leche suave y hielo refrescante.', '1200', 'bebidas frias', './assets/bebida-fria-ice-latte.png'),
    new Producto('Frapee', 'Café espresso batido con hielo, cremoso y refrescante.', '1600', 'bebidas frias', './assets/bebida-fria-cafe-frappe.png'),
    new Producto('Cold Brew', 'Café infusionado en frío, suave y naturalmente dulce.', '1400', 'bebidas frias', './assets/bebida-fria-cold-brew.png'),
    new Producto('Iced Capuccino', 'Café espresso frío, leche espumosa y hielo refrescante.', '1450', 'bebidas frias', './assets/bebida-fria-ice-capuccino.png'),
    new Producto('Croissant', 'suave y hojaldrado, con un toque dulce irresistible.', '400', 'comidas', './assets/comida-croissant.png'),
    new Producto('Tostado', 'pan crujiente con queso derretido y jamón.', '1000', 'comidas', './assets/comida-tostado.png'),
    new Producto('Donas', 'esponjosas y dulces, cubiertas de glaseado de chocolate.', '500', 'comidas', './assets/comida-donas.png'),
    new Producto('Roll de Canela', 'masa suave y hojaldrada rellena de canela y glaseado dulce', '1200', 'comidas', './assets/comida-rollcanela.png')
]

const bebidasCalientesContainer = document.getElementById("bebidas-calientes-container")
const bebidasFriasContainer = document.getElementById("bebidas-frias-container")
const comidasContainer = document.getElementById("comidas-container")
const productoCarrito = document.getElementsByClassName("carrito-body")[0]


function crearCardProducto(producto) {
    const card = document.createElement("div")
    card.className = "card producto-card"

    card.innerHTML =
        `<img src="${producto.imagen}" class="producto-img" alt="${producto.nombre}"></img>
    <div class="producto-card-body">
        <h5 class="producto-nombre">${producto.nombre}</h5>
        <p class="producto-descripcion">${producto.descripcion}</p>
        <div class="precio-container">
            <h5 class="producto-precio">$${producto.precio}</h5>
        </div>
        <button class="btn btn-agregar-carrito">
            <svg class="icono-plus-fondo" xmlns="http://www.w3.org/2000/svg" width="60" height="60"viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="30" fill="#ED9F87" />
            </svg>
            <svg class="icono-plus" xmlns="http://www.w3.org/2000/svg" width="45" height="45"viewBox="0 0 45 45" fill="none">
              <path d="M22.5 9.375V35.625M9.375 22.5H35.625" stroke="#F5F5F5" stroke-width="4"
              stroke-linecap="round" stroke-linejoin="round" />
             </svg>
        </button>
    </div>`
    const btnAgregarCarrito = card.querySelector(".btn-agregar-carrito")
    btnAgregarCarrito.onclick = function () {
        mostrarProductoEnCarrito(producto)
        abrirOffCanvas()
        btnAgregarCarrito.disabled = true
    }

    return card
}

function mostrarProductosCategoria() {
    const productosGuardados = JSON.parse(localStorage.getItem("carrito")) || [];
    const categorias = ['bebidas calientes', 'bebidas frias', 'comidas']

    categorias.forEach(categoria => {
        const filtrarProductos = productos.filter(producto => producto.categoria == categoria) // veo que coincidan las categorias para que dps el switch lo clasifique bien segun el caso

        filtrarProductos.forEach(producto => {
            const cardProducto = crearCardProducto(producto)

            const productoEnCarrito = productosGuardados.find(item => item.nombre === producto.nombre)
            if (productoEnCarrito) {
                const btnAgregarCarrito = cardProducto.querySelector(".btn-agregar-carrito")
                btnAgregarCarrito.disabled = true;
            }

            switch (categoria) {
                case 'bebidas calientes':
                    bebidasCalientesContainer.append(cardProducto)
                    break
                case 'bebidas frias':
                    bebidasFriasContainer.append(cardProducto)
                    break
                case 'comidas':
                    comidasContainer.append(cardProducto)
                    break
            }
        })
    })
}

mostrarProductosCategoria()

const offCanvas = document.getElementById("offcanvasScrolling")

function abrirOffCanvas() { //funcion para que no se me cierre el carrito cuando agrego otro producto
    if (!offCanvas.classList.contains('show')) {
        const offcanvasInstancia = new bootstrap.Offcanvas(offCanvas)
        offcanvasInstancia.show()
    }
}

let total = 0
const totalContainer = document.createElement("div")
totalContainer.className = "carrito-total"
totalContainer.innerHTML = `<h5>Total</h5><h5 id ="total"></h5>`
offCanvas.appendChild(totalContainer)

function mostrarProductoEnCarrito(producto, unidades = 1) {

    const item = document.createElement("div")
    item.className = "carrito-item-container"

    item.innerHTML =
        `<img class="item-img" src="${producto.imagen}">
        <div class="item-carrito-body">
            <h5 class="item-titulo">${producto.nombre}</h5>
            <p class="item-descripcion">${producto.descripcion}</p>
        </div>
        <div class="item-precio">
            <h6>$${producto.precio}</h6>
            <div class="unidades-container">
               <button class="mas-btn">+</button>
               <span class="contador">${unidades}</span>
               <button class="menos-btn">-</button>
            </div>
        </div>
        <button class="btn-eliminar">x</button>`
    productoCarrito.appendChild(item)

    total += parseFloat(producto.precio) * unidades
    document.getElementById("total").textContent = ('$' + total)

    totalCarrito(item, producto, unidades)

    const btnEliminar = item.querySelector(".btn-eliminar")
    btnEliminar.onclick = () => eliminarProductoDelCarrito(item, producto)
    guardarCarritoEnLocalStorage()
}

function totalCarrito(item, producto, unidades = 0) {
    let sumar = item.querySelector(".mas-btn")
    let restar = item.querySelector(".menos-btn")
    let contadorUnidades = item.querySelector(".contador")
    let contador = unidades

    function totalActualizado(precioProducto) {
        total += parseFloat(precioProducto)
        document.getElementById("total").textContent = ('$' + total)
        guardarCarritoEnLocalStorage()
    }

    sumar.onclick = () => {
        contador++
        contadorUnidades.innerHTML = contador
        restar.disabled = false
        totalActualizado(producto.precio)
    }

    restar.onclick = () => {

        if (contador === 0) {
            restar.disabled = true
        }
        else {
            contador--
            contadorUnidades.innerHTML = contador
            totalActualizado(-producto.precio)
        }
    }
}

function guardarCarritoEnLocalStorage() {
    const productosCarrito = Array.from(productoCarrito.children).map(item => {
        const nombre = item.querySelector(".item-titulo").textContent;
        const descripcion = item.querySelector(".item-descripcion").textContent;
        const precio = item.querySelector(".item-precio h6").textContent.replace('$', '')
        const imagen = item.querySelector(".item-img").src;
        const unidades = parseInt(item.querySelector(".contador").textContent)

        return { nombre, descripcion, precio, imagen, unidades }
    })
    localStorage.setItem("carrito", JSON.stringify(productosCarrito))
}

function mantenerCarritoLocalStorage() {
    const productosGuardados = JSON.parse(localStorage.getItem("carrito")) || []
    productosGuardados.forEach(producto => {
        mostrarProductoEnCarrito(
            new Producto(
                producto.nombre,
                producto.descripcion,
                producto.precio,
                '',
                producto.imagen
            ),
            producto.unidades
        )
    })
}

function eliminarProductoDelCarrito(item, producto) {
    const cantidad = parseInt(item.querySelector(".contador").textContent)
    total -= parseFloat(producto.precio) * cantidad
    document.getElementById("total").textContent = ('$' + total)

    item.remove()

    const productosGuardados = JSON.parse(localStorage.getItem("carrito")) || []
    const productosActualizados = productosGuardados.filter(item => item.nombre !== producto.nombre)
    localStorage.setItem("carrito", JSON.stringify(productosActualizados))

    const cardProducto = Array.from(document.querySelectorAll(".producto-card")).find(card =>
        card.querySelector(".producto-nombre").textContent === producto.nombre
    )
    if (cardProducto) {
        const btnAgregarCarrito = cardProducto.querySelector(".btn-agregar-carrito")
        btnAgregarCarrito.disabled = false
    }
}

mantenerCarritoLocalStorage()