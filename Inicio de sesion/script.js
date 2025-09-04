document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  const mensajeLogin = document.getElementById("mensajeLogin");

  if (email && pass) {
    mensajeLogin.textContent = "✅ ¡Login exitoso!";
    mensajeLogin.className = "mensaje-login exito";
    mensajeLogin.style.display = "block";

    // Redirige después de 1.5 segundos
    setTimeout(() => {
      window.location.href = "restockout-dashboard/index.html";
    }, 1500);
  } else {
    mensajeLogin.textContent = "❌ Correo o contraseña incorrectos.";
    mensajeLogin.className = "mensaje-login error";
    mensajeLogin.style.display = "block";
  }
});

  // Botón de ayuda que abre WhatsApp
document.getElementById("ayuda-btn").addEventListener("click", () => {
  const numero = "573058962619"; // 👉 reemplaza con tu número
  const mensaje = encodeURIComponent("¡Hola! Necesito ayuda con RestockOut.");
  const url = `https://wa.me/${numero}?text=${mensaje}`;
  window.open(url, "_blank"); // abre en una pestaña nueva
});

  