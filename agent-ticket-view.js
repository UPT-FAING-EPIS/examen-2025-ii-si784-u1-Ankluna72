class AgentTicketView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._tickets = [];
    }

    set tickets(value) {
        this._tickets = value;
        this.render();
        this.attachEventListeners();
    }

    get tickets() {
        return this._tickets;
    }

    connectedCallback() {
        this.render();
    }

    attachEventListeners() {
        this.shadowRoot.querySelectorAll('.status-selector').forEach(selector => {
            selector.addEventListener('change', (e) => {
                const ticketId = e.target.dataset.ticketId;
                const newStatus = e.target.value;
                this.dispatchEvent(new CustomEvent('update-status', {
                    detail: { ticketId, newStatus },
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host { 
                    display: block; 
                }
                .agent-view-container {
                    padding: 2rem;
                    background-color: var(--color-background-secondary);
                    border-radius: var(--border-radius-large);
                    box-shadow: var(--shadow-deep);
                    border: 1px solid var(--color-border);
                }
                h3 {
                    margin-top: 0;
                    margin-bottom: 2rem;
                    font-weight: 600;
                    color: var(--color-text-primary);
                    border-bottom: 2px solid var(--color-primary);
                    padding-bottom: 0.5rem;
                }
                .ticket-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid var(--color-border);
                }
                th {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--color-text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                tr:hover {
                    background-color: rgba(var(--color-primary-rgb), 0.05);
                }
                .status-selector {
                    padding: 0.5rem;
                    border-radius: var(--border-radius-small);
                    border: 1px solid var(--color-border);
                    background-color: var(--color-background-primary);
                    color: var(--color-text-primary);
                    cursor: pointer;
                    font-family: var(--font-family-primary);
                }
                .status-selector:focus {
                    outline: none;
                    border-color: var(--color-primary-light);
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
                }
                 .ticket-email, .ticket-date {
                    font-size: 0.9rem;
                    color: var(--color-text-secondary);
                }
                 .no-tickets-message {
                    text-align: center;
                    padding: 3rem;
                    font-style: italic;
                    color: var(--color-text-secondary);
                }
            </style>
            <div class="agent-view-container">
                <h3>Agent Dashboard - All Tickets</h3>
                ${this._tickets.length === 0
                    ? `<div class="no-tickets-message"><p>No tickets have been submitted yet.</p></div>`
                    : `
                    <table class="ticket-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this._tickets.map(ticket => `
                                <tr>
                                    <td class="ticket-email">${ticket.userEmail}</td>
                                    <td>${ticket.title}</td>
                                    <td>
                                        <select class="status-selector" data-ticket-id="${ticket.id}">
                                            <option value="new" ${ticket.status === 'new' ? 'selected' : ''}>New</option>
                                            <option value="in-progress" ${ticket.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                                            <option value="closed" ${ticket.status === 'closed' ? 'selected' : ''}>Closed</option>
                                        </select>
                                    </td>
                                    <td class="ticket-date">${new Date(ticket.createdAt?.toDate()).toLocaleString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `}
            </div>
        `;
    }
}

customElements.define('agent-ticket-view', AgentTicketView);
