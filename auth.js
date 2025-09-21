document.addEventListener('DOMContentLoaded', function () {
    const auth = firebase.auth();

    // Views and Forms
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Switch links
    const showRegisterBtn = document.getElementById('show-register-btn');
    const showLoginBtn = document.getElementById('show-login-btn');

    // Messages
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    // --- Event Listeners ---

    // Switch to Register view
    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginView.style.display = 'none';
        registerView.style.display = 'block';
    });

    // Switch to Login view
    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerView.style.display = 'none';
        loginView.style.display = 'block';
    });

    // Login Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                console.log('User signed in:', userCredential.user);
                
                // --- TRAMPITA PARA EL AGENTE ---
                if (userCredential.user.email === 'rosaschambilla@gmail.com') {
                    window.location.href = 'agent-dashboard.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
                // --- FIN DE LA TRAMPITA ---

            })
            .catch((error) => {
                loginMessage.textContent = getFirebaseErrorMessage(error.code);
                console.error('Login Error:', error);
            });
    });

    // Register Form Submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                console.log('User created:', userCredential.user);
                 // Immediately redirect to dashboard after registration
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                registerMessage.textContent = getFirebaseErrorMessage(error.code);
                console.error('Register Error:', error);
            });
    });

    // Function to get user-friendly error messages
    function getFirebaseErrorMessage(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Contraseña incorrecta. Inténtalo de nuevo.';
            case 'auth/user-not-found':
                return 'No se encontró ningún usuario con este email.';
            case 'auth/invalid-email':
                return 'El formato del email es incorrecto.';
            case 'auth/weak-password':
                return 'La contraseña debe tener al menos 6 caracteres.';
            case 'auth/email-already-in-use':
                return 'Este email ya está registrado. Intenta iniciar sesión.';
            default:
                return 'Ocurrió un error. Por favor, inténtalo de nuevo.';
        }
    }
});