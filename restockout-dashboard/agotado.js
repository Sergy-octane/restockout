        document.getElementById("reportForm").addEventListener("submit", function(e) {
            e.preventDefault();
            document.getElementById("mensaje").style.display = "block";
        });
        window.addEventListener("DOMContentLoaded", () => {
  const producto = JSON.parse(localStorage.getItem("productoAgotado"));

  if (producto) {
    // Autocompleta el input del formulario
    document.getElementById("producto").value = producto.nombre;
  }
});

