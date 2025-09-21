
import { TicketForm } from './TicketForm.js';

const ticketListTemplate = document.createElement('template');
ticketListTemplate.innerHTML = `
    <style>
        .ticket-list-container { margin-top: 2rem; }
        .ticket { background-color: var(--surface-color); border: 1px solid #333; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; }
        .ticket-info h3 { margin-top: 0; }
        .ticket-status { padding: 0.5rem 1rem; border-radius: 20px; font-weight: bold; text-transform: uppercase; font-size: 0.8em; }
        .status-new { background-color: #3d5afe; color: white; }
        .status-in-progress { background-color: #ffab00; color: black; }
        .status-resolved { background-color: #00c853; color: white; }
    </style>
    <div class="ticket-list-container">
        <h2>Mis Tickets</h2>
        <div id="tickets-container"></div>
    </div>
`;

export class TicketList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(ticketListTemplate.content.cloneNode(true));
        this.db = firebase.firestore();
        this.auth = firebase.auth();
    }

    connectedCallback() {
        this.auth.onAuthStateChanged(user => {
            if (user) {
                this.userId = user.uid;
                this.loadTickets();
            } else {
                console.log("No hay usuario autenticado para cargar tickets.");
            }
        });
    }

    loadTickets() {
        const ticketsContainer = this.shadowRoot.getElementById('tickets-container');
        
        // Query without composite index needed, then sort client-side
        this.db.collection('tickets').where('userId', '==', this.userId)
            .onSnapshot(snapshot => {
                ticketsContainer.innerHTML = ''; 
                if (snapshot.empty) {
                    ticketsContainer.innerHTML = '<p>Aún no has creado ningún ticket.</p>';
                    return;
                }
                
                // Convert snapshot to array and sort
                const tickets = [];
                snapshot.forEach(doc => tickets.push(doc.data()));
                tickets.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds); // Sort descending

                tickets.forEach(ticket => {
                    const ticketElement = document.createElement('div');
                    ticketElement.classList.add('ticket');
                    ticketElement.innerHTML = `
                        <div class="ticket-info">
                            <h3>${ticket.subject}</h3>
                            <p>${ticket.description}</p>
                            <small>Creado: ${new Date(ticket.createdAt.seconds * 1000).toLocaleString()}</small>
                        </div>
                        <div class="ticket-status status-${ticket.status.toLowerCase().replace(' ', '-')}">${ticket.status}</div>
                    `;
                    ticketsContainer.appendChild(ticketElement);
                });

            }, error => {
                console.error("Error al cargar los tickets: ", error);
                ticketsContainer.innerHTML = '<p>Error al cargar los tickets. Inténtalo de nuevo más tarde.</p>';
            });
    }
}

customElements.define('ticket-list', TicketList);
