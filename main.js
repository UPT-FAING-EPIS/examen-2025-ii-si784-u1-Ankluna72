import { firebaseConfig } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();
    
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    const showRegisterBtn = document.getElementById('show-register-btn');
    const showLoginBtn = document.getElementById('show-login-btn');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    // Toggle between login and register views
    showRegisterBtn.addEventListener('click', () => {
        loginView.classList.remove('active');
        registerView.classList.add('active');
    });

    showLoginBtn.addEventListener('click', () => {
        registerView.classList.remove('active');
        loginView.classList.add('active');
    });

    // Redirect on auth state change
    auth.onAuthStateChanged(user => {
        if (user) {
            // Hardcoded agent check
            if (user.email === 'rosaschambilla@gmail.com') {
                window.location.href = 'agent-dashboard.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        }
    });

    // Handle Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginMessage.textContent = '';
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                console.error("Login Error:", error);
                loginMessage.textContent = 'Error: Email o contraseña incorrectos.';
            });
        // onAuthStateChanged will handle the redirect
    });

    // Handle Registration
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        registerMessage.textContent = '';
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        if (password.length < 6) {
            registerMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log('¡Usuario registrado con éxito!', userCredential.user);
                // The onAuthStateChanged will handle the redirect to dashboard.html
            })
            .catch(error => {
                console.error("Registration Error:", error);
                registerMessage.textContent = 'Error: ' + error.message;
            });
    });

});
