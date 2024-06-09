const formularioLogin = document.getElementById("formulario-login");

formularioLogin.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const datos = {
    email,
    password,
  };

  fetch("/api/session/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((res) => {
      if (res.ok) {
        // Check for successful response (status code in 200s)
        return res.json(); // Proceed to process successful response data
      } else {
        return res.json().then((errorData) => {
          // Parse error data
          throw new Error(
            `Error de inicio de sesión: ${errorData.msg || "Ocurrió un error"}`,
          ); // Create a new Error object with a more informative message
        });
      }
    })
    .then(() => {
      // Iniciar sesión y redirigir a la página principal (if successful response)
      console.log("Inicio de sesión exitoso");
      window.location.href = "/"; // Reemplazar con la URL de la página principal
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error);
      alert(error.message); // Display the more informative error message from the thrown Error object
    });
});
