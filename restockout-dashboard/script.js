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
