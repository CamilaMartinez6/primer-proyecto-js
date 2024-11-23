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

fetch("./db/data.json")
.then(response => response.json())
.then(data => {
    const productos = data

    mostrarProductosCategoria(productos)
})

function mostrarProductosCategoria(productos) {

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
totalContainer.innerHTML = `<div class="total-container">
<h5>Total</h5> <h5 id ="total"></h5>
</div> <div class="compra-decision-container">
                    <button class="btn-vaciar-carrito">Vaciar carrito</button>
                    <button class="btn-comprar">Comprar</button>
                </div>`
offCanvas.appendChild(totalContainer)

function mostrarProductoEnCarrito(producto, unidades = 1) {

    try{
    //throw new Error("prueba"); // para probar que funciona el catch
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
    } catch (error){
        Toastify({
            text: "No se pudo agregar el producto al carrito :(",
            className: "toast-error",
            duration: 3000
            }).showToast();
    }
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
            mostrarProductoEnCarrito(producto, producto.unidades)
    })
}

mantenerCarritoLocalStorage()

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

function vaciarCarrito() {
    const btnVaciarCarrito = document.querySelector(".btn-vaciar-carrito")
    btnVaciarCarrito.onclick = () => {
        while (productoCarrito.firstChild) {
            productoCarrito.firstChild.remove()
        }
        total = 0
        document.getElementById("total").textContent = "$" + total

        localStorage.removeItem("carrito")
        const botonesAgregar = document.querySelectorAll(".btn-agregar-carrito")
        botonesAgregar.forEach(boton => boton.disabled = false)
    }
}

vaciarCarrito()

function continuarCompra() {
    const btnComprar = document.querySelector(".btn-comprar")
    btnComprar.onclick = () => {
        Swal.fire({
            title: "Recibimos tu pedido!",
            icon: "success",
            text: "completa las indicaciones de facturacion y entrega para confirmar la compra de tu delicioso pedido!",
            confirmButtonText: "Completar Formulario",
            customClass: {
                popup: 'alerta-sweet',
                icon: 'icon-success',
                title: 'titulo-continuar',
                text: 'text-continuar',
                confirmButton: 'boton-completar'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "./pages/formulario.html"
            }
        })
    }
}

continuarCompra()