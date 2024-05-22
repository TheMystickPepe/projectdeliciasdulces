function guardarPedido() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const producto = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;

    // Verificar si los campos de contacto están completos
    if (!email || !telefono) {
        alert('No se puede realizar el pedido porque los datos de contacto están incompletos, por favor completelos y reintente nuevamente');
        return;
    }

    const pedido = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        producto: producto,
        cantidad: cantidad
    };

    // Obtener los pedidos existentes del LocalStorage
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

    // Agregar el nuevo pedido a la lista de pedidos
    pedidos.push(pedido);

    // Guardar la lista de pedidos actualizada en el LocalStorage
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    // Limpiar el formulario
    document.getElementById('pedidoForm').reset();

    // Mostrar alerta de éxito
    alert('El pedido ha sido realizado con éxito,pronto nos pondremos en contacto con usted');
}

function mostrarPedidosRealizados() {
    const pedidosRealizados = document.getElementById('pedidosRealizados');
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

    // Limpiar el contenedor de pedidos realizados
    pedidosRealizados.innerHTML = '';

    // Crear una tarjeta para cada pedido y agregarla al contenedor
    pedidos.forEach((pedido, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        const nombre = document.createElement('h3');
        nombre.textContent = `Nombre: ${pedido.nombre}`;

        const email = document.createElement('p');
        email.textContent = `Correo Electrónico: ${pedido.email}`;

        const telefono = document.createElement('p');
        telefono.textContent = `Número de Teléfono: ${pedido.telefono}`;

        const producto = document.createElement('p');
        producto.textContent = `Producto: ${pedido.producto}`;

        const cantidad = document.createElement('p');
        cantidad.textContent = `Cantidad: ${pedido.cantidad}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => eliminarPedido(index);

        card.appendChild(nombre);
        card.appendChild(email);
        card.appendChild(telefono);
        card.appendChild(producto);
        card.appendChild(cantidad);
        card.appendChild(deleteButton);

        pedidosRealizados.appendChild(card);
    });
}

function eliminarPedido(index) {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidos.splice(index, 1);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    mostrarPedidosRealizados();
}

function refreshPedidos() {
    localStorage.removeItem('pedidos');
    mostrarPedidosRealizados();
}

// Mostrar los pedidos guardados al cargar la página
document.addEventListener('DOMContentLoaded', mostrarPedidosRealizados);
