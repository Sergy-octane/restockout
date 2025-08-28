document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
  
    if (email && pass) {
      alert("¡Login exitoso!");
      window.location.href = "../restockout-dashboard/index.html";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
  // Botón de ayuda que abre WhatsApp
document.getElementById("ayuda-btn").addEventListener("click", () => {
  const numero = "573058962619"; // 👉 reemplaza con tu número
  const mensaje = encodeURIComponent("¡Hola! Necesito ayuda con RestockOut.");
  const url = `https://wa.me/${numero}?text=${mensaje}`;
  window.open(url, "_blank"); // abre en una pestaña nueva
});

  