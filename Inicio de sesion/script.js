// ============================================================
//   IMPORTACIÓN DE MÓDULOS DE FIREBASE (Versión modular 11)
//   Se importan solo los módulos necesarios para Auth.
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";


// ============================================================
//   CONFIGURACIÓN DE FIREBASE (proyecto RestockOut)
//   Estos datos permiten que la página se conecte con Firebase.
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyCGCDZR6yaMyHR_pYPMSQVjjm-V9nSFG0k",
  authDomain: "restockout.firebaseapp.com",
  projectId: "restockout",
  storageBucket: "restockout.appspot.com",
  messagingSenderId: "440311872963",
  appId: "1:440311872963:web:afea11b412d84aa0d75176"
};


// ============================================================
//   INICIALIZACIÓN DE FIREBASE Y DEL MÓDULO DE AUTENTICACIÓN
// ============================================================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("✅ Firebase (Auth) conectado correctamente");


// ============================================================
//   MANEJADOR DEL FORMULARIO DE INICIO DE SESIÓN
//   - Evita recargar la página
//   - Obtiene email y contraseña
//   - Valida que no estén vacíos
//   - Inicia sesión con Firebase Authentication
//   - Muestra mensajes de error/éxito
//   - Redirige al dashboard si todo sale bien
// ============================================================
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que el formulario recargue la página

  // Obtención de valores del formulario
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensajeLogin = document.getElementById("mensajeLogin");

  // Validación de campos vacíos
  if (!email || !password) {
    mensajeLogin.textContent = "❌ Debes ingresar correo y contraseña.";
    mensajeLogin.className = "mensaje-login error";
    mensajeLogin.style.display = "block";
    return;
  }

  try {
    // ============================================================
    //   INTENTO DE INICIO DE SESIÓN CON FIREBASE
    //   signInWithEmailAndPassword() devuelve un usuario si es válido
    // ============================================================
    await signInWithEmailAndPassword(auth, email, password);

    // Mensaje de éxito
    mensajeLogin.textContent = "✅ ¡Login exitoso!";
    mensajeLogin.className = "mensaje-login exito";
    mensajeLogin.style.display = "block";

    // Redirección al dashboard después de 1.5s (para mostrar el mensaje)
    setTimeout(() => {
      window.location.href = "restockout-dashboard/index.html";
    }, 1500);

  } catch (error) {
    // ============================================================
    //   MANEJO DE ERRORES
    //   Se muestran errores comunes: credenciales incorrectas,
    //   usuario inexistente, formato inválido, etc.
    // ============================================================
    console.error("Error al iniciar sesión:", error);

    mensajeLogin.textContent =
      "❌ Correo o contraseña incorrectos o usuario no registrado.";
    mensajeLogin.className = "mensaje-login error";
    mensajeLogin.style.display = "block";
  }
});


// ============================================================
//   BOTÓN DE AYUDA POR WHATSAPP
//   - Abre un chat directo con un mensaje predefinido
//   - Ideal para soporte rápido al usuario
// ============================================================
document.getElementById("ayuda-btn").addEventListener("click", () => {
  const numero = "573058962619"; // Número de soporte
  const mensaje = encodeURIComponent("¡Hola! Necesito ayuda con RestockOut.");
  
  // Formato oficial del API de WhatsApp
  const url = `https://wa.me/${numero}?text=${mensaje}`;
  
  // Abre WhatsApp en una nueva pestaña
  window.open(url, "_blank");
});
