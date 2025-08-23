    const productos = [
    "Leche entera",
    "Leche deslactosada",
    "Leche de almendras",
    "Leche en polvo",
    "Leche descremada",
    "Arroz",
    "Azúcar",
    "Aceite vegetal"
    ];

    const searchInput = document.getElementById("search");
    const suggestionsList = document.getElementById("suggestions");

    searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    suggestionsList.innerHTML = "";

    if (query) {
        const resultados = productos.filter(producto =>
        producto.toLowerCase().includes(query)
        );

        resultados.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = producto;

        // Al hacer clic en una sugerencia → ir a la página de agotados
        li.addEventListener("click", () => {
            window.location.href = `../restockout-agotados/index.html?q=${encodeURIComponent(producto)}`;
        });

        suggestionsList.appendChild(li);
        });
    }
    });

    searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.toLowerCase();
        if (query.includes("leche")) {
            window.location.href = `../restockout-agotados/index.html?q=${ + encodeURIComponent(searchInput.value)}`;
        } else {
            alert("Resultados encontrados para: " + searchInput.value);
        }
    }
});
// Seleccionamos todos los botones de "Marcar como agotado"
const botonesAgotado = document.querySelectorAll(".agotado-btn");

// Recorremos todos los botones
botonesAgotado.forEach((boton) => {
  boton.addEventListener("click", () => {
    // Obtenemos el contenedor del producto al que pertenece el botón
    const producto = boton.closest(".producto");

    // Extraemos la info del producto
    const nombre = producto.querySelector(".nombre-producto").textContent;
    const unidades = producto.querySelector(".unidades").textContent;

    // Guardamos esa info en localStorage para pasarla a la otra página
    localStorage.setItem(
      "productoAgotado",
      JSON.stringify({ nombre, unidades })
    );

    // Redirigimos al index de "Agotados"
    window.location.href = "agotado.html"; // cámbialo por la ruta real
  });
});
// Botón de ayuda que abre WhatsApp
document.getElementById("ayuda-btn").addEventListener("click", () => {
  const numero = "573058962619"; // 👉 reemplaza con tu número
  const mensaje = encodeURIComponent("¡Hola! Necesito ayuda con RestockOut.");
  const url = `https://wa.me/${numero}?text=${mensaje}`;
  window.open(url, "_blank"); // abre en una pestaña nueva
});



