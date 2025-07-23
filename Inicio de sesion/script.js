document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
  
    if (email === "admin@demo.com" && pass === "123456") {
      alert("¡Login exitoso!");
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
  