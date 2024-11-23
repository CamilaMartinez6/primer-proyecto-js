class Persona {
  constructor(nombre, apellido, ciudad, direccion) {
    this.nombre = nombre || ""
    this.apellido = apellido || ""
    this.ciudad = ciudad || ""
    this.direccion = direccion || ""
  }
}

function crearFormulario() {
  const formulario = document.createElement("div")
  formulario.className = "formulario-compra"

  formulario.innerHTML = `
    <form id="formularioPersona" class="col g-3 needs-validation" novalidate>
    <h1 class="titulo-form">Formulario de envío</h1>
  <div class="input-container col-md-16">
    <label for="validationCustom01" class="form-label">Nombre</label>
    <input type="text" class="form-control" id="nombre" required>
  </div>
  <div class="input-container col-md-16">
    <label for="apellido" class="form-label">Apellido</label>
    <input type="text" class="form-control" id="apellido" required>
  </div>
  <div class="input-container col-md-16">
    <label for="ciudad" class="form-label">Ciudad</label>
    <input type="text" class="form-control" id="ciudad" required>
  </div>
  <div class="input-container col-md-16">
    <label for="direccion" class="form-label">Dirección</label>
    <input type="text" class="form-control" id="direccion" required>
  </div>
  <div class="btn-enviar-container col-12">
    <button class="btn-enviar btn" type="submit">Enviar</button>
  </div>
</form>`

  return formulario
}

function capturarDatosFormulario() {
  const persona = new Persona()

  const contenedorFormulario = document.getElementById("formulario-container")
  const formularioCreado = crearFormulario()
  contenedorFormulario.appendChild(formularioCreado)

  const formularioPersona = document.getElementById("formularioPersona")

  formularioPersona.addEventListener("submit", (e) => {
    e.preventDefault()
    persona.nombre = document.getElementById("nombre").value
    persona.apellido = document.getElementById("apellido").value
    persona.ciudad = document.getElementById("ciudad").value
    persona.direccion = document.getElementById("direccion").value

    emitirFactura(persona)
  })
  return persona
}

capturarDatosFormulario()

const productosGuardados = JSON.parse(localStorage.getItem("carrito")) || []

function crearItemTabla() {
  const itemsContainer = document.querySelector(".items-container")
  const tabla = document.querySelector(".table")
  let total = 0

  productosGuardados.forEach((producto, index) => {
    const itemTabla = document.createElement("tr")
    total += producto.precio * producto.unidades
    itemTabla.innerHTML =
      `<th scope="row">${index + 1}</th>
      <td>${producto.nombre}</td>
      <td>${producto.unidades}</td>
      <td>${producto.precio}</td>`
    itemsContainer.appendChild(itemTabla)
  })
  const totalItem = document.createElement("div")
  totalItem.className = "total-fila"
  totalItem.innerHTML = `
<span>Total $${total}</span>`
  tabla.appendChild(totalItem)
}

function emitirFactura(persona) {
  const enviar = document.querySelector(".btn-enviar")
  enviar.onclick = () => {
    Swal.fire({
      html: `
    <div class="factura">
      <div class="datos-persona">
      <h3>${persona.nombre} ${persona.apellido}</h3>
      <h4>Ciudad: ${persona.ciudad}</h4>
      <h4>Dirección: ${persona.direccion}</h4>
      </div>
      <table class="tabla table">
        <thead>
          <tr>
           <th scope="col">#</th>
           <th scope="col">Producto</th>
           <th scope="col">Unidades</th>
           <th scope="col">Precio por Unidad</th>
          </tr>
        </thead>
        <tbody class="items-container"></tbody>
      </table>
    </div>`,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Listo!
      `,
      confirmButtonAriaLabel: "Listo!",
      customClass: {
        popup: 'alerta-sweet',
        confirmButton: 'boton-completar'
      }
    });
    crearItemTabla()
  }
}