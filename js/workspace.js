document.addEventListener('DOMContentLoaded', () => {
    // Mock Data for Tickets
    const mockTickets = [
        { id: '1', ref: 'REF-CBS-001', subject: 'Pedido no entregado', email: 'juan@gmail.com', type: 'P', status: 'OPEN', agent: 'Maria Silva', date: '2023-10-26' },
        { id: '2', ref: 'REF-CBS-002', subject: 'Producto en mal estado', email: 'ana@hotmail.com', type: 'Q', status: 'IN_PROGRESS', agent: 'Maria Silva', date: '2023-10-27' },
        { id: '3', ref: 'REF-CBS-003', subject: 'Devolución de dinero', email: 'carlos@yahoo.com', type: 'R', status: 'RESOLVED', agent: 'Maria Silva', date: '2023-10-28' },
        { id: '4', ref: 'REF-CBS-004', subject: 'Sugerencia menú', email: 'luis@gmail.com', type: 'S', status: 'CLOSED', agent: 'Maria Silva', date: '2023-10-25' },
        { id: '5', ref: 'REF-CBS-005', subject: 'Mala atención', email: 'marta@gmail.com', type: 'Q', status: 'REOPENED', agent: 'Maria Silva', date: '2023-10-29' }
    ];

    if (!localStorage.getItem('supcrud_tickets')) {
        localStorage.setItem('supcrud_tickets', JSON.stringify(mockTickets));
    }

    const tbody = document.getElementById('ticketTableBody');
    const searchInput = document.getElementById('searchInput');
    const selects = document.querySelectorAll('.filter-dropdown');

    let tickets = JSON.parse(localStorage.getItem('supcrud_tickets')) || [];

    const getStatusClass = (status) => {
        const map = {
            'OPEN': 'status-open',
            'IN_PROGRESS': 'status-progress',
            'RESOLVED': 'status-resolved',
            'CLOSED': 'status-closed',
            'REOPENED': 'status-reopened'
        };
        return map[status] || 'status-open';
    };

    const getTypeClass = (type) => {
        const map = {
            'P': 'type-p', 'Q': 'type-q', 'R': 'type-r', 'S': 'type-s'
        };
        return map[type] || 'type-p';
    };

    const getFullType = (type) => {
        const map = { 'P': 'PETICIÓN', 'Q': 'QUEJA', 'R': 'RECLAMO', 'S': 'SUGERENCIA' };
        return map[type] || type;
    };

    // --- Profile Display Logic ---
    const storedName = localStorage.getItem('supcrud_user_name');
    const storedEmail = localStorage.getItem('supcrud_user_email');

    if (storedName) {
        document.getElementById('dashboardUserName').textContent = storedName;
    }
    if (storedEmail) {
        document.getElementById('dashboardUserEmail').textContent = storedEmail;
    }

    // Update avatar if we have a name
    if (storedName) {
        const fallbackName = storedName.replace(' ', '+');
        document.getElementById('dashboardAvatar').src = `https://ui-avatars.com/api/?name=${fallbackName}&background=random`;
    }
    // -----------------------------

    const renderTable = (data) => {
        tbody.innerHTML = '';
        data.forEach(ticket => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="ref-code">${ticket.ref}</td>
                <td class="subject-text">${ticket.subject}</td>
                <td>${ticket.email}</td>
                <td><span class="badge-type ${getTypeClass(ticket.type)}">${getFullType(ticket.type)}</span></td>
                <td><span class="badge-status ${getStatusClass(ticket.status)}">${ticket.status.replace('_', ' ')}</span></td>
                <td>${ticket.agent}</td>
                <td>${ticket.date}</td>
                <td class="action-btns">
                    <button class="btn-icon" title="View Detail"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                    <button class="btn-icon" title="Edit"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                    <button class="btn-icon text-danger" title="Delete"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    };

    const applyFilters = () => {
        const term = searchInput.value.toLowerCase();
        const status = selects[0].value;
        const type = selects[1].value;

        const filtered = tickets.filter(t => {
            const matchSearch = t.ref.toLowerCase().includes(term) || t.subject.toLowerCase().includes(term);
            const matchStatus = status ? t.status === status : true;
            const matchType = type ? t.type === type : true;

            return matchSearch && matchStatus && matchType;
        });
        renderTable(filtered);
    };

    // Event Listeners for Filters
    searchInput.addEventListener('input', applyFilters);
    selects.forEach(sel => sel.addEventListener('change', applyFilters));

    // Initial render
    renderTable(tickets);
});
