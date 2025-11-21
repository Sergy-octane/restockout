// Seleccionamos elementos del DOM
const form = document.getElementById("reportForm"); // El formulario de reportes
const mensaje = document.getElementById("mensaje"); // Mensaje de éxito al reportar
const lista = document.getElementById("lista-agotados"); // Contenedor donde se muestran los productos reportados

// Cargar productos previamente reportados desde localStorage
// Si no hay productos guardados, se inicializa como un array vacío
let productos = JSON.parse(localStorage.getItem("productosAgotados")) || [];

// Llamamos a la función para mostrar los productos al cargar la página
renderizarProductos();

// Función que muestra los productos reportados en el contenedor
function renderizarProductos() {
    // Limpiamos el contenedor antes de mostrar los productos
    lista.innerHTML = "";

    // Recorremos cada producto y lo agregamos al HTML
    productos.forEach(p => {
        lista.innerHTML += `
            <div class="producto-agotado">
                <p><strong>${p.nombre}</strong> - ${p.detalle}</p>
            </div>
        `;
    });
}

// Evento que se ejecuta al enviar el formulario
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Obtenemos los valores que escribió el usuario
    const nombre = document.getElementById("producto").value;
    const detalle = document.getElementById("detalle").value;

    // Creamos un objeto con la info del producto
    const producto = { nombre, detalle };

    // Lo agregamos al array de productos
    productos.push(producto);

    // Guardamos el array actualizado en localStorage
    localStorage.setItem("productosAgotados", JSON.stringify(productos));

    // Mostramos el mensaje de éxito temporalmente
    mensaje.style.display = "block";
    setTimeout(() => { mensaje.style.display = "none"; }, 2000);

    // Limpiamos el formulario
    form.reset();

    // Actualizamos la lista mostrada en pantalla
    renderizarProductos();
});
