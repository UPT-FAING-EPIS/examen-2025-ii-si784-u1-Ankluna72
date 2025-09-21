const template = document.createElement('template');
template.innerHTML = `
    <style>
        button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            padding: 0.5rem;
            color: var(--text-secondary);
            transition: color 0.3s ease, transform 0.2s ease;
        }
        button:hover {
            color: var(--text-primary);
            transform: scale(1.1);
        }
    </style>
    <button id="theme-toggle-btn" aria-label="Toggle theme">
        <!-- Icon will be set dynamically -->
    </button>
`;

class ThemeToggle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.toggleButton = this.shadowRoot.querySelector('#theme-toggle-btn');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.moonIcon = '\u263D'; // ☾
        this.sunIcon = '\u2600'; // ☀
    }

    connectedCallback() {
        this.updateUI(this.currentTheme);
        this.toggleButton.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateUI(this.currentTheme);
    }
    
    updateUI(theme) {
        this.toggleButton.innerHTML = theme === 'light' ? this.moonIcon : this.sunIcon;
    }
}

customElements.define('theme-toggle', ThemeToggle);
