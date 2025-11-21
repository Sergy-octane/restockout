// Importamos Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Configuración de Firebase
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
const db = getFirestore(app);
console.log("✅ Firebase configurado correctamente");

// Elemento del mensaje
const mensaje = document.getElementById("mensajeRegistro");

// Función para mostrar mensaje
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = `mensaje-registro ${tipo} show`; // clase base + tipo + show
}

// Manejo del formulario
document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.getElementById("role").value;
  const terms = document.getElementById("terms").checked;

  // Validaciones
  if (password !== confirmPassword) {
    mostrarMensaje("❌ Las contraseñas no coinciden.", "error");
    return;
  }
  if (!terms) {
    mostrarMensaje("❌ Debes aceptar los términos y condiciones.", "error");
    return;
  }

  try {
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar datos en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      name,
      email,
      phone,
      username,
      role,
      createdAt: new Date()
    });

    // ✅ Mostrar mensaje de éxito
    mostrarMensaje("✅ Registro exitoso. Ahora puedes iniciar sesión.", "exito");

    // Limpiar formulario
    document.getElementById("registerForm").reset();

    // Redirigir después de 3 segundos
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);

  } catch (error) {
    console.error("Error en el registro:", error);

    let errorMessage = "Ocurrió un error desconocido. Inténtalo de nuevo.";
    if (error.code === 'auth/email-already-in-use') {
        errorMessage = "El correo electrónico ya está en uso. Intenta iniciar sesión.";
    } else if (error.code === 'auth/invalid-email') {
        errorMessage = "El formato del correo electrónico no es válido.";
    } else if (error.code === 'auth/weak-password') {
        errorMessage = "La contraseña debe tener al menos 6 caracteres.";
    }

    mostrarMensaje(`❌ ${errorMessage}`, "error");
  }
});
