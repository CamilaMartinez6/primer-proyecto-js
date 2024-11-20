function continuarCompra(){
    const btnComprar = document.querySelector(".btn-comprar")
    btnComprar.onclick= () =>{
        Swal.fire({
            title: "Recibimos tu pedido!",
            icon: "success",
            text: "completa las indicaciones de facturacion y entrega para confirmar la compra de tu delicioso pedido!",
            confirmButtonText: "Completar Formulario",
        }).then((result) => {
            if(result.isConfirmed){
                window.location.href= "./pages/formulario.html"
            }
        })
    }
}

continuarCompra()
