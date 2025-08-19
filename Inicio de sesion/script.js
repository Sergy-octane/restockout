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
  