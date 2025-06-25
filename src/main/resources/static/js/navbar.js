fetch('/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar-container').innerHTML = html;

        // Simulación de nombre de usuario AUN INCOMPLETO
        document.getElementById("nombre-usuario").innerText = localStorage.getItem("usuarioNombre") || "Gadiel Zúñiga";
    });