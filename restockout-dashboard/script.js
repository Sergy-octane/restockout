// Lista de productos disponibles (para sugerencias en el buscador)
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

// Referencias al input del buscador y a la lista donde se muestran las sugerencias
const searchInput = document.getElementById("search");
const suggestionsList = document.getElementById("suggestions");

// Escuchar cuando el usuario escribe en el buscador
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase(); // convertir a minúsculas para búsqueda insensible
  suggestionsList.innerHTML = ""; // limpiar sugerencias anteriores

  if (query) {
    // Filtrar productos que contengan la palabra escrita
    const resultados = productos.filter(producto =>
      producto.toLowerCase().includes(query)
    );

    // Crear un <li> por cada producto encontrado y agregarlo a la lista
    resultados.forEach(producto => {
      const li = document.createElement("li");
      li.textContent = producto;

      // Al hacer clic en una sugerencia → redirige a la página de productos agotados
      li.addEventListener("click", () => {
        window.location.href = `../restockout-agotados/index.html?q=${encodeURIComponent(producto)}`;
      });

      suggestionsList.appendChild(li);
    });
  }
});

// Detectar cuando el usuario presiona Enter en el buscador
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.toLowerCase();
    if (query.includes("leche")) {
      // Si busca "leche" → ir a la página de productos agotados con query
      window.location.href = `../restockout-agotados/index.html?q=${encodeURIComponent(searchInput.value)}`;
    } else {
      // Para otros productos → mostrar alerta (simulación de búsqueda)
      alert("Resultados encontrados para: " + searchInput.value);
    }
  }
});

// Seleccionar todos los botones "Marcar como agotado"
const botonesAgotado = document.querySelectorAll(".agotado-btn");

// Agregar evento a cada botón
botonesAgotado.forEach((boton) => {
  boton.addEventListener("click", () => {
    // Obtener el contenedor del producto correspondiente
    const producto = boton.closest(".producto");

    // Extraer el nombre y unidades disponibles
    const nombre = producto.querySelector(".nombre-producto").textContent;
    const unidades = producto.querySelector(".unidades").textContent;

    // Guardar la información en localStorage para la página de "Agotados"
    localStorage.setItem(
      "productoAgotado",
      JSON.stringify({ nombre, unidades })
    );

    // Redirigir a la página de productos agotados
    window.location.href = "agotado.html"; // ajustar ruta si es necesario
  });
});

// Botón de ayuda que abre WhatsApp en una nueva pestaña
document.getElementById("ayuda-btn").addEventListener("click", () => {
  const numero = "573058962619"; // Número de contacto
  const mensaje = encodeURIComponent("¡Hola! Necesito ayuda con RestockOut.");
  const url = `https://wa.me/${numero}?text=${mensaje}`;
  window.open(url, "_blank"); // abrir en pestaña nueva
});
