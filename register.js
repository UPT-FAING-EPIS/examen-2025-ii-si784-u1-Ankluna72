<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Cuenta - Helpdesk Pro</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="login-container">
        <div class="login-box">
            <h1>Crear una Cuenta</h1>
            <p>Regístrate para empezar a crear tickets.</p>
            <form id="register-form">
                <div class="input-group">
                    <label for="username">Nombre de Usuario</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="input-group">
                    <label for="email">Correo Electrónico</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="input-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" minlength="6" required>
                </div>
                <button type="submit" class="login-button">Crear Cuenta</button>
                <div id="register-message" class="login-message"></div>
            </form>
            <p class="subtle-link">¿Ya tienes una cuenta? <a href="index.html">Inicia Sesión</a></p>
        </div>
    </div>

    <footer>
        © 2024 Helpdesk Pro. All rights reserved.
    </footer>

    <!-- SDKs de Firebase -->
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>

    <!-- Tu script de registro -->
    <script src="register.js"></script>
</body>
</html>
