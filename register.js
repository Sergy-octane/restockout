// Importamos los módulos necesarios de Firebase desde la CDN.
// firebase-app: permite inicializar la aplicación.
// firebase-auth: permite manejar usuarios (registro e inicio de sesión).
// firebase-firestore: permite guardar datos adicionales en la base de datos.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Configuración del proyecto Firebase (obtenida desde Firebase Console).
const firebaseConfig = {
  apiKey: "AIzaSyCGCDZR6yaMyHR_pYPMSQVjjm-V9nSFG0k",
  authDomain: "restockout.firebaseapp.com",
  projectId: "restockout",
  storageBucket: "restockout.appspot.com",
  messagingSenderId: "440311872963",
  appId: "1:440311872963:web:afea11b412d84aa0d75176"
};

// Inicializamos Firebase con la configuración anterior.
const app = initializeApp(firebaseConfig);

// Obtenemos los servicios necesarios: autenticación y base de datos Firestore.
const auth = getAuth(app);
const db = getFirestore(app);

console.log("✅ Firebase configurado correctamente");

// Seleccionamos el elemento donde se mostrarán los mensajes al usuario.
const mensaje = document.getElementById("mensajeRegistro");

// Función reutilizable para mostrar mensajes en pantalla.
// "texto" → lo que vamos a mostrar.
// "tipo" → define el estilo (error o exito).
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = `mensaje-registro ${tipo} show`; 
  // Aplica clases CSS: “mensaje-registro”, luego “exito” o “error”, y “show” para mostrarlo.
}

// Escuchamos el evento de envío del formulario de registro.
document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // Evita que la página se recargue al enviar.

  // Obtención de los datos ingresados por el usuario.
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.getElementById("role").value;
  const terms = document.getElementById("terms").checked;

  // Validación de contraseñas: deben coincidir.
  if (password !== confirmPassword) {
    mostrarMensaje("❌ Las contraseñas no coinciden.", "error");
    return;
  }

  // Validación del checkbox de términos.
  if (!terms) {
    mostrarMensaje("❌ Debes aceptar los términos y condiciones.", "error");
    return;
  }

  try {
    // ---  Crear el usuario en Firebase Authentication ---
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Obtenemos el usuario creado.

    // --- 🗂 Guardar información extra en Firestore ---
    // Se crea un documento dentro de la colección "usuarios" con el mismo ID del usuario autenticado.
    await setDoc(doc(db, "usuarios", user.uid), {
      name,
      email,
      phone,
      username,
      role,
      createdAt: new Date() // Fecha de creación del usuario.
    });

    // Si todo salió bien, mostramos mensaje de éxito.
    mostrarMensaje("✅ Registro exitoso. Ahora puedes iniciar sesión.", "exito");

    // Limpiar el formulario visualmente.
    document.getElementById("registerForm").reset();

    // Redirigir al login tras 3 segundos.
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);

  } catch (error) {
    console.error("Error en el registro:", error);

    // Analizamos el tipo de error devuelto por Firebase para mostrar un mensaje adecuado.
    let errorMessage = "Ocurrió un error desconocido. Inténtalo de nuevo.";

    if (error.code === 'auth/email-already-in-use') {
        errorMessage = "El correo electrónico ya está en uso. Intenta iniciar sesión.";
    } else if (error.code === 'auth/invalid-email') {
        errorMessage = "El formato del correo electrónico no es válido.";
    } else if (error.code === 'auth/weak-password') {
        errorMessage = "La contraseña debe tener al menos 6 caracteres.";
    }

    // Mostrar error en pantalla.
    mostrarMensaje(`❌ ${errorMessage}`, "error");
  }
});
