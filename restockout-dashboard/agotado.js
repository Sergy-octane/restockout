// Elementos del DOM
const form = document.getElementById("reportForm");
const mensaje = document.getElementById("mensaje");
const lista = document.getElementById("lista-agotados");

// Cargar productos previos desde localStorage
let productos = JSON.parse(localStorage.getItem("productosAgotados")) || [];
renderizarProductos();

// Función para mostrar productos
function renderizarProductos() {
    lista.innerHTML = "";
    productos.forEach(p => {
        lista.innerHTML += `
            <div class="producto-agotado">
                <p><strong>${p.nombre}</strong> - ${p.detalle}</p>
            </div>
        `;
    });
}

// Guardar nuevo producto
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById("producto").value;
    const detalle = document.getElementById("detalle").value;

    const producto = { nombre, detalle };
    productos.push(producto);
    localStorage.setItem("productosAgotados", JSON.stringify(productos));

    mensaje.style.display = "block";
    setTimeout(() => { mensaje.style.display = "none"; }, 2000);

    form.reset();
    renderizarProductos();
});
