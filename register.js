document.getElementById("registerForm").addEventListener("submit", function(e) {
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

  // Guardar datos en localStorage como simulación
  const userData = { name, email, phone, username, password, role };
  localStorage.setItem("userData", JSON.stringify(userData));

  alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
  window.location.href = "index.html";
});
