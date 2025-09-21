const agentTicketViewTemplate = document.createElement('template');
agentTicketViewTemplate.innerHTML = `
    <style>
        .ticket-list { margin-top: 1rem; }
        .ticket {
            background-color: var(--surface-color);
            border: 1px solid #444;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            display: flex;
            flex-direction: column;
        }
        .ticket-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        .ticket-header h3 { margin: 0; }
        .ticket-status {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 0.8em;
        }
        .status-new { background-color: #3d5afe; color: white; }
        .status-in-progress { background-color: #ffab00; color: black; }
        .status-resolved { background-color: #00c853; color: white; }
        .ticket-meta { font-size: 0.8em; color: var(--text-secondary-color); }
    </style>
    <div class="ticket-list"></div>
`;

class AgentTicketView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(agentTicketViewTemplate.content.cloneNode(true));
        this.db = firebase.firestore();
    }

    connectedCallback() {
        this.loadAllTickets();
    }

    loadAllTickets() {
        const ticketList = this.shadowRoot.querySelector('.ticket-list');
        
        this.db.collection('tickets').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            ticketList.innerHTML = '';
            if (snapshot.empty) {
                ticketList.innerHTML = '<p>No hay tickets para mostrar.</p>';
                return;
            }
            snapshot.forEach(doc => {
                const ticket = doc.data();
                const ticketElement = document.createElement('div');
                ticketElement.classList.add('ticket');
                ticketElement.innerHTML = `
                    <div class="ticket-header">
                        <h3>${ticket.subject}</h3>
                        <div class="ticket-status status-${ticket.status.toLowerCase().replace(' ', '-')}">${ticket.status}</div>
                    </div>
                    <p>${ticket.description}</p>
                    <div class="ticket-meta">
                        <span>Usuario: ${ticket.userEmail}</span> | 
                        <span>Creado: ${new Date(ticket.createdAt.seconds * 1000).toLocaleString()}</span>
                    </div>
                `;
                ticketList.appendChild(ticketElement); 
            });
        }, error => {
            console.error("Error al cargar tickets para el agente: ", error);
            ticketList.innerHTML = `<p style="color:red;"><b>Error de permisos:</b> ${error.message}</p><p>Las reglas de Firestore están bloqueando el acceso. Necesitas permisos de agente para ver esta página.</p>`;
        });
    }
}

customElements.define('agent-ticket-view', AgentTicketView);

export { AgentTicketView };
