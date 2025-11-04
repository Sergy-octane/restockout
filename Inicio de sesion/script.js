// Inicializar Firebase Auth
const auth = firebase.auth();

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const mensajeLogin = document.getElementById("mensajeLogin");

  if (!email || !password) {
    mensajeLogin.textContent = "❌ Debes ingresar correo y contraseña.";
    mensajeLogin.className = "mensaje-login error";
    mensajeLogin.style.display = "block";
    return;
  }

  try {
    // 🔐 Iniciar sesión con Firebase
    await auth.signInWithEmailAndPassword(email, password);

    mensajeLogin.textContent = "✅ ¡Login exitoso!";
    mensajeLogin.className = "mensaje-login exito";
    mensajeLogin.style.display = "block";

    // Redirige después de 1.5 segundos
    setTimeout(() => {
      window.location.href = "restockout-dashboard/index.html";
    }, 1500);

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    mensajeLogin.textContent = "❌ Correo o contraseña incorrectos o usuario no registrado.";
    mensajeLogin.className = "mensaje-login error";
    mensajeLogin.style.display = "block";
  }
});

// 📞 Botón de ayuda que abre WhatsApp
document.getElementById("ayuda-btn").addEventListener("click", () => {
  const numero = "573058962619"; // 👉 tu número
  const mensaje = encodeURIComponent("¡Hola! Necesito ayuda con RestockOut.");
  const url = `https://wa.me/${numero}?text=${mensaje}`;
  window.open(url, "_blank"); // abre en una pestaña nueva
});
