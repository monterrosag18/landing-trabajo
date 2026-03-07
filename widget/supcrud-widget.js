/**
 * SupCrud by Crudzaso - Embeddable Widget Script
 * This script injects the support button and ticket form into any host website.
 */
(function () {
    // 1. Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    // Emulate a CDN path (for testing, we use the local relative path from index.html)
    link.href = 'widget/supcrud-widget.css';
    document.head.appendChild(link);

    // 2. Create Widget Container
    const container = document.createElement('div');
    container.id = 'supcrud-widget-container';

    // 3. Create Modal HTML
    const modalHTML = `
        <div id="supcrud-widget-modal">
            <div class="supcrud-header">
                <h4>Crear Ticket (SupCrud)</h4>
                <button class="supcrud-close" id="supcrud-close-btn">&times;</button>
            </div>
            
            <form id="supcrud-ticket-form" class="supcrud-body">
                <div class="supcrud-form-group">
                    <label>Email</label>
                    <input type="email" id="supcrud-email" class="supcrud-input" placeholder="tu@email.com" required>
                </div>
                
                <div class="supcrud-form-group">
                    <label>Asunto</label>
                    <input type="text" id="supcrud-subject" class="supcrud-input" placeholder="Resumen del problema" required>
                </div>
                
                <div class="supcrud-form-group">
                    <label>Tipo de Solicitud</label>
                    <select id="supcrud-type" class="supcrud-select" required>
                        <option value="P">Petición</option>
                        <option value="Q">Queja</option>
                        <option value="R">Reclamo</option>
                        <option value="S">Sugerencia</option>
                    </select>
                </div>
                
                <div class="supcrud-form-group">
                    <label>Descripción</label>
                    <textarea id="supcrud-desc" class="supcrud-textarea" placeholder="Detalles de tu solicitud..." required></textarea>
                </div>
                
                <button type="submit" class="supcrud-submit">Enviar Ticket</button>
            </form>

            <div id="supcrud-success" class="supcrud-success">
                <h4>¡Ticket Creado!</h4>
                <p>Usa este código en nuestro portal de soporte para hacer seguimiento a tu solicitud:</p>
                <div class="supcrud-ref" id="supcrud-ref-code"></div>
            </div>
        </div>
        
        <div id="supcrud-widget-btn">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
        </div>
    `;

    container.innerHTML = modalHTML;
    document.body.appendChild(container);

    // 4. Logic & Interactivity
    const btnOpen = document.getElementById('supcrud-widget-btn');
    const btnClose = document.getElementById('supcrud-close-btn');
    const modal = document.getElementById('supcrud-widget-modal');
    const form = document.getElementById('supcrud-ticket-form');
    const successView = document.getElementById('supcrud-success');
    const refCodeDisplay = document.getElementById('supcrud-ref-code');

    let isOpen = false;

    const toggleModal = () => {
        isOpen = !isOpen;
        modal.style.display = isOpen ? 'flex' : 'none';
        if (isOpen) {
            // Reset views if opening
            form.style.display = 'flex';
            successView.style.display = 'none';
            form.reset();
        }
    };

    btnOpen.addEventListener('click', toggleModal);
    btnClose.addEventListener('click', toggleModal);

    // Simulated Submission (MySQL backend placeholder)
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('supcrud-email').value;
        const subject = document.getElementById('supcrud-subject').value;
        const type = document.getElementById('supcrud-type').value;
        const desc = document.getElementById('supcrud-desc').value;

        // Generate mock reference code: REF-[WORKSPACE]-Random
        // In real life, Workspace ID is injected when embedding the script. For now, hardcode 'CBS'
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const refCode = `REF-CBS-${randomNum}`;

        // Create new ticket object
        const newTicket = {
            id: Date.now().toString(),
            ref: refCode,
            subject: subject,
            email: email,
            type: type,
            status: 'OPEN',
            agent: 'Sin asignar',
            date: new Date().toISOString().split('T')[0]
        };

        // --- BACKEND INTEGRATION POINT ---
        // fetch('https://tu-api.com/api/tickets', { method: 'POST', body: JSON.stringify(newTicket) })
        // .then(...)
        // ---------------------------------

        // Local Storage Simulation for Prototype
        const existingTickets = JSON.parse(localStorage.getItem('supcrud_tickets')) || [];
        existingTickets.unshift(newTicket); // Add to beginning
        localStorage.setItem('supcrud_tickets', JSON.stringify(existingTickets));

        // Show Success View
        form.style.display = 'none';
        successView.style.display = 'block';
        refCodeDisplay.textContent = refCode;
    });

})();
