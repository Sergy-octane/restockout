// Importamos módulos
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

// Manejo del formulario
document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.getElementById("role").value;
  const terms = document.getElementById("terms").checked;

  if (password !== confirmPassword) {
    alert("❌ Las contraseñas no coinciden.");
    return;
  }

  if (!terms) {
    alert("❌ Debes aceptar los términos y condiciones.");
    return;
  }

  try {
    // Crear usuario
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

    alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error en el registro:", error);
    alert("❌ " + error.message);
  }
});
