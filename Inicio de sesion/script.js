// Importar módulos modernos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCGCDZR6yaMyHR_pYPMSQVjjm-V9nSFG0k",
  authDomain: "restockout.firebaseapp.com",
  projectId: "restockout",
  storageBucket: "restockout.appspot.com",
  messagingSenderId: "440311872963",
  appId: "1:440311872963:web:afea11b412d84aa0d75176"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("✅ Firebase (Auth) conectado correctamente");

// 🧾 Manejador del formulario de inicio de sesión
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensajeLogin = document.getElementById("mensajeLogin");

  if (!email || !password) {
    mensajeLogin.textContent = "❌ Debes ingresar correo y contraseña.";
    mensajeLogin.className = "mensaje-login error";
    mensajeLogin.style.display = "block";
    return;
  }

  try {
    // Iniciar sesión con Firebase Authentication
    await signInWithEmailAndPassword(auth, email, password);

    mensajeLogin.textContent = "✅ ¡Login exitoso!";
    mensajeLogin.className = "mensaje-login exito";
    mensajeLogin.style.display = "block";

    // Redirigir al dashboard después de 1.5 segundos
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

// 📞 Botón de ayuda por WhatsApp
document.getElementById("ayuda-btn").addEventListener("click", () => {
  const numero = "573058962619"; // 👉 tu número
  const mensaje = encodeURIComponent("¡Hola! Necesito ayuda con RestockOut.");
  const url = `https://wa.me/${numero}?text=${mensaje}`;
  window.open(url, "_blank");
});
