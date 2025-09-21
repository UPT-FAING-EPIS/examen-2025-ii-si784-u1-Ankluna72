import { AgentTicketView } from './AgentTicketView.js';

document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();
    
    // ID CORREGIDO
    const logoutButton = document.getElementById('logout-btn-agent');

    auth.onAuthStateChanged(user => {
        if (user) {
            if (user.email !== 'rosaschambilla@gmail.com') {
                window.location.href = 'dashboard.html';
            } else {
                // Si es el agente, cargar la vista de tickets
                const ticketView = new AgentTicketView();
                document.getElementById('agent-ticket-list').appendChild(ticketView);
            }
        } else {
            window.location.href = 'index.html';
        }
    });

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            auth.signOut().then(() => {
                console.log('Agente cerró sesión');
                window.location.href = 'index.html';
            });
        });
    }
});