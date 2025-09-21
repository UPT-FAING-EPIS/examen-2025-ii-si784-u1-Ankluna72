class AuthView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isLogin = true;
        this.selectedRole = 'user';
        this._error = null;
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.addEventListener('click', e => {
            if (e.target.matches('#toggle-form')) {
                this.isLogin = !this.isLogin;
                this._error = null; // Clear error on view toggle
                this.render();
            } else if (e.target.matches('button[type="submit"]')) {
                this.handleSubmit(e);
            }
        });

        this.shadowRoot.addEventListener('change', e => {
            if (e.target.matches('input[name="role"]')) {
                this.selectedRole = e.target.value;
                this.render();
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = this.shadowRoot.querySelector('form');
        const email = form.email.value;
        const password = form.password.value;
        const username = form.username ? form.username.value : null;
        
        this.shadowRoot.querySelector('button[type="submit"]').disabled = true;

        const eventType = this.isLogin ? 'login' : 'signup';
        const detail = this.isLogin ? { email, password } : { email, password, username, role: this.selectedRole };

        if (!this.isLogin && !username) {
            this.showError('Username is required for sign up.');
            return;
        }

        this.dispatchEvent(new CustomEvent(eventType, { detail, bubbles: true, composed: true }));
    }

    showError(message) {
        this._error = message;
        this.render();
        // Re-enable button if there was an error
        const button = this.shadowRoot.querySelector('button[type="submit"]');
        if (button) button.disabled = false;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding-top: 5vh;
                }
                .auth-container {
                    width: 100%;
                    max-width: 420px;
                    padding: 2.5rem 2rem;
                    border-radius: var(--border-radius-large);
                    background: var(--color-background-secondary);
                    box-shadow: var(--shadow-deep);
                    border: 1px solid var(--color-border);
                }
                h2 {
                    text-align: center;
                    margin-bottom: 2rem;
                    font-weight: 600;
                    color: var(--color-text-primary);
                }
                .role-selector {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 2rem;
                    border-radius: var(--border-radius-large);
                    background-color: var(--color-background-primary);
                    overflow: hidden;
                    padding: 4px;
                }
                .role-selector label {
                    flex: 1;
                    padding: 0.8rem;
                    cursor: pointer;
                    text-align: center;
                    color: var(--color-text-secondary);
                    border-radius: var(--border-radius-small);
                    transition: all 0.3s ease;
                }
                .role-selector input[type="radio"] { display: none; }
                .role-selector input[type="radio"]:checked + label {
                    background-color: var(--color-primary);
                    color: var(--color-white);
                    font-weight: 600;
                    box-shadow: var(--shadow-soft);
                }
                .form-group { margin-bottom: 1.25rem; }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: var(--color-text-secondary);
                    font-weight: 500;
                    font-size: 0.9rem;
                }
                input[type="email"], input[type="password"], input[type="text"] {
                    width: 100%;
                    padding: 0.9rem;
                    border: 1px solid var(--color-border);
                    border-radius: var(--border-radius-small);
                    background-color: var(--color-background-primary);
                    color: var(--color-text-primary);
                    font-family: var(--font-family-primary);
                    font-size: 1rem;
                    transition: border-color 0.3s, box-shadow 0.3s;
                }
                input:focus {
                    outline: none;
                    border-color: var(--color-primary-light);
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
                }
                .btn {
                    width: 100%;
                    margin-top: 1.5rem;
                    padding: 0.9rem;
                }
                .toggle-link {
                    margin-top: 1.5rem;
                    text-align: center;
                    font-size: 0.9rem;
                }
                .toggle-link a {
                    color: var(--color-primary-light);
                    cursor: pointer;
                    text-decoration: none;
                    font-weight: 500;
                }
                .toggle-link a:hover { text-decoration: underline; }

                .error-message {
                    color: var(--color-danger);
                    background-color: rgba(220, 53, 69, 0.1);
                    border: 1px solid var(--color-danger);
                    padding: 1rem;
                    border-radius: var(--border-radius-small);
                    margin-top: 1rem;
                    text-align: center;
                    display: ${this._error ? 'block' : 'none'};
                    font-size: 0.9rem;
                }
            </style>
            <div class="auth-container">
                <h2>${this.isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>

                <form>
                     <div class="role-selector">
                        <input type="radio" id="role-user" name="role" value="user" ${this.selectedRole === 'user' ? 'checked' : ''}>
                        <label for="role-user">User</label>
                        <input type="radio" id="role-agent" name="role" value="agent" ${this.selectedRole === 'agent' ? 'checked' : ''}>
                        <label for="role-agent">Agent</label>
                    </div>

                    <div class="form-group" style="display: ${this.isLogin ? 'none' : 'block'}">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" required autocomplete="username">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required autocomplete="email">
                    </div>
                    <div class.form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required autocomplete="${this.isLogin ? 'current-password' : 'new-password'}">
                    </div>
                    <button type="submit" class="btn">${this.isLogin ? 'Login' : 'Create Account'}</button>
                </form>

                <div class="error-message">${this._error}</div>

                <p class="toggle-link">
                    <a id="toggle-form">
                        ${this.isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
                    </a>
                </p>
            </div>
        `;
    }
}

customElements.define('auth-view', AuthView);
