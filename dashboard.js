import { TicketForm } from './TicketForm.js';
import { TicketList } from './TicketList.js';

document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();
    
    // IDs CORREGIDOS PARA COINCIDIR CON EL NUEVO HTML
    const logoutButton = document.getElementById('logout-btn'); 
    const createTicketBtn = document.getElementById('create-ticket-btn-nav'); 
    const mainContent = document.getElementById('main-content');

    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = 'index.html';
        } else {
            if (document.getElementById('ticket-list')) {
                const ticketList = new TicketList();
                document.getElementById('ticket-list').appendChild(ticketList);
            }
        }
    });

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            auth.signOut().then(() => {
                console.log('Usuario cerró sesión');
                window.location.href = 'index.html';
            });
        });
    }

    if (createTicketBtn) {
        createTicketBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir navegación
            
            // Limpiar contenido y mostrar el formulario
            mainContent.innerHTML = '<ticket-form></ticket-form>';
            const ticketForm = document.querySelector('ticket-form');
            
            // Escuchar el evento personalizado
            ticketForm.addEventListener('ticket-created', () => {
                // Al crear, volver a la lista
                mainContent.innerHTML = '<section class="tickets-section"><div id="ticket-list"></div></section>';
                const ticketList = new TicketList();
                document.getElementById('ticket-list').appendChild(ticketList);
            });
        });
    }
});