const ticketFormTemplate = document.createElement('template');
ticketFormTemplate.innerHTML = `
    <style>
        form { display: flex; flex-direction: column; gap: 1rem; background-color: var(--surface-color); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; }
        input, textarea, button { font-size: 1rem; padding: 0.8rem; border-radius: 4px; border: 1px solid #444; background-color: #333; color: var(--text-color); }
        textarea { min-height: 100px; }
        button { background-color: var(--primary-color); cursor: pointer; border: none; }
        .error-message { color: var(--error-color); }
    </style>
    <form id="new-ticket-form">
        <h3>Crear Nuevo Ticket de Soporte</h3>
        <input type="text" id="ticket-subject" placeholder="Asunto" required>
        <textarea id="ticket-description" placeholder="Describe tu problema..." required></textarea>
        <button type="submit">Enviar Ticket</button>
        <div id="form-message" class="error-message"></div>
    </form>
`;

export class TicketForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(ticketFormTemplate.content.cloneNode(true));
        this.db = firebase.firestore();
        this.auth = firebase.auth();
    }

    connectedCallback() {
        const form = this.shadowRoot.getElementById('new-ticket-form');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const subject = this.shadowRoot.getElementById('ticket-subject').value;
            const description = this.shadowRoot.getElementById('ticket-description').value;
            const formMessage = this.shadowRoot.getElementById('form-message');

            const user = this.auth.currentUser;
            if (!user) {
                formMessage.textContent = "Debes estar autenticado para crear un ticket.";
                return;
            }

            this.db.collection('tickets').add({
                userId: user.uid,
                userEmail: user.email,
                subject: subject,
                description: description,
                status: 'New',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                this.dispatchEvent(new CustomEvent('ticket-created', { bubbles: true, composed: true }));
                form.reset();
            }).catch(error => {
                console.error("Error al crear ticket: ", error);
                formMessage.textContent = "Error al enviar el ticket. Por favor, inténtalo de nuevo.";
            });
        });
    }
}

customElements.define('ticket-form', TicketForm);
