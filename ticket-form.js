class TicketForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('form').addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();
        const title = this.shadowRoot.querySelector('#title').value;
        const description = this.shadowRoot.querySelector('#description').value;
        if (!title || !description) {
            alert('Title and description are required.');
            return;
        }

        this.dispatchEvent(new CustomEvent('create-ticket', {
            detail: { title, description },
            bubbles: true,
            composed: true
        }));

        e.target.reset();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .form-container {
                    padding: 2.5rem;
                    background-color: var(--color-background-secondary);
                    border-radius: var(--border-radius-large);
                    box-shadow: var(--shadow-deep);
                    margin-bottom: 2rem;
                    border: 1px solid var(--color-border);
                }
                h3 {
                    margin-top: 0;
                    margin-bottom: 2rem;
                    text-align: center;
                    font-weight: 600;
                    color: var(--color-text-primary);
                }
                .form-group {
                    margin-bottom: 1.5rem;
                }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    font-size: 0.9rem;
                    color: var(--color-text-secondary);
                }
                input,
                textarea {
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
                textarea {
                    min-height: 120px;
                    resize: vertical;
                }
                input:focus,
                textarea:focus {
                    outline: none;
                    border-color: var(--color-primary-light);
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
                }
                .btn {
                    width: 100%;
                    margin-top: 1rem;
                }
            </style>
            <div class="form-container">
                <h3>Submit a New Ticket</h3>
                <form>
                    <div class="form-group">
                        <label for="title">Issue Title</label>
                        <input type="text" id="title" name="title" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Detailed Description</label>
                        <textarea id="description" name="description" required></textarea>
                    </div>
                    <button type="submit" class="btn">Create Ticket</button>
                </form>
            </div>
        `;
    }
}

customElements.define('ticket-form', TicketForm);
