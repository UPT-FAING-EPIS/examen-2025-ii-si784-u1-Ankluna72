class TicketList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._tickets = [];
    }

    set tickets(value) {
        this._tickets = value;
        this.render();
    }

    get tickets() {
        return this._tickets;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .ticket-list-container {
                    display: grid;
                    gap: 1.5rem;
                }
                h3 {
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: var(--color-text-primary);
                    border-bottom: 2px solid var(--color-primary);
                    padding-bottom: 0.5rem;
                }
                .ticket-card {
                    padding: 1.5rem;
                    background-color: var(--color-background-secondary);
                    border-radius: var(--border-radius-large);
                    box-shadow: var(--shadow-soft);
                    border-left: 5px solid var(--color-primary);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .ticket-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-deep);
                }
                .ticket-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .ticket-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--color-text-primary);
                }
                .ticket-status {
                    padding: 0.3rem 0.8rem;
                    border-radius: var(--border-radius-large);
                    font-weight: 600;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .status-new {
                    background-color: var(--color-primary);
                    color: var(--color-white);
                }
                .status-in-progress {
                    background-color: var(--color-warning);
                    color: var(--color-gray-900);
                }
                .status-closed {
                    background-color: var(--color-success);
                    color: var(--color-white);
                }
                .ticket-body {
                    color: var(--color-text-secondary);
                    margin-bottom: 1rem;
                }
                .ticket-footer {
                    font-size: 0.8rem;
                    color: var(--color-gray-100);
                    opacity: 0.7;
                }
                .no-tickets-message {
                    text-align: center;
                    padding: 3rem;
                    background-color: var(--color-background-secondary);
                    border-radius: var(--border-radius-large);
                    font-style: italic;
                    color: var(--color-text-secondary);
                }
            </style>
            <div class="ticket-list-container">
                <h3>My Submitted Tickets</h3>
                ${this._tickets.length === 0 
                    ? `<div class="no-tickets-message"><p>You haven't submitted any tickets yet.</p></div>`
                    : this._tickets.map(ticket => `
                        <div class="ticket-card">
                            <div class="ticket-header">
                                <span class="ticket-title">${ticket.title}</span>
                                <span class="ticket-status status-${ticket.status}">${ticket.status.replace('-',' ')}</span>
                            </div>
                            <div class="ticket-body">
                                <p>${ticket.description}</p>
                            </div>
                             <div class="ticket-footer">
                                <p>Created on: ${new Date(ticket.createdAt?.toDate()).toLocaleString()}</p>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        `;
    }
}

customElements.define('ticket-list', TicketList);
