document.addEventListener('DOMContentLoaded', () => {
    // Fetch real data from Backend only
    const fetchTickets = async () => {
        try {
            const data = await window.fetchAPI('/ticket-references');
            // Assuming the backend returns an array of ticket_references
            return data.map(t => ({
                id: t.id ? t.id.toString() : '',
                ref: t.reference_code,
                subject: t.subject || 'Sin Asunto',
                email: t.user_email,
                type: t.type || 'P',
                status: t.status || 'OPEN',
                agent: 'Sin asignar',
                date: t.created_at ? t.created_at.split('T')[0] : ''
            }));
        } catch (error) {
            console.error("Backend not reachable. Error:", error);
            alert("No se pudo conectar a la base de datos.");
            return [];
        }
    };

    const tbody = document.getElementById('ticketTableBody');
    const searchInput = document.getElementById('searchInput');
    const selects = document.querySelectorAll('.filter-dropdown');

    let tickets = [];

    const initData = async () => {
        tickets = await fetchTickets();
        applyFilters();
    };

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

    // Dynamic Workspace Selector
    const wsSelect = document.getElementById('workspaceSelect');
    const wsId = localStorage.getItem('supcrud_workspace_id');
    if (wsSelect && storedName && storedEmail !== 'team_one@crudzaso.com') {
        wsSelect.innerHTML = `<option value="${wsId || '1'}">${storedName} Workspace</option>`;
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
                    <button class="btn-icon btn-view" title="Ver Detalle" data-ref="${ticket.ref}" data-id="${ticket.id}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                    <button class="btn-icon btn-edit" title="Editar" data-ref="${ticket.ref}" data-id="${ticket.id}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                    <button class="btn-icon text-danger btn-delete" title="Eliminar" data-ref="${ticket.ref}" data-id="${ticket.id}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Add event listeners to freshly rendered buttons
        document.querySelectorAll('.btn-view').forEach(btn => btn.addEventListener('click', (e) => {
            const ref = e.currentTarget.dataset.ref;
            const t = tickets.find(ticket => ticket.ref === ref);
            if (t) {
                alert(`DETALLE DEL TICKET\n\nReferencia: ${t.ref}\nUsuario: ${t.email}\nAsunto: ${t.subject}\nTipo: ${getFullType(t.type)}\nEstado: ${t.status}\n\n(El backend actual no guarda mensajes de chat, esta es una vista local)`);
            }
        }));
        document.querySelectorAll('.btn-edit').forEach(btn => btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const ref = e.currentTarget.dataset.ref;
            const t = tickets.find(ticket => ticket.id === id);

            if (t) {
                // Open Edit Modal
                currentEditTicketId = id;
                document.getElementById('modalEditEmail').value = t.email;
                const modal = document.getElementById('editTicketModal');
                if (modal) modal.style.display = 'flex';
            }
        }));
        document.querySelectorAll('.btn-delete').forEach(btn => btn.addEventListener('click', async (e) => {
            if (confirm('¿Estás seguro de que deseas eliminar este ticket en la base de datos MySQL? Esta acción no se puede deshacer.')) {
                const id = e.currentTarget.dataset.id;
                try {
                    await window.fetchAPI(`/ticket-references/${id}`, { method: 'DELETE' });
                    alert('Ticket eliminado de MySQL exitosamente.');
                    await initData();
                } catch (err) {
                    alert('Error al eliminar en BD: ' + err.message);
                }
            }
        }));
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

        // Update pagination numbers dynamically
        const paginationSpan = document.querySelector('.pagination span');
        if (paginationSpan) {
            const total = filtered.length;
            paginationSpan.textContent = total > 0 ? `1-${total} of ${total}` : `0 of 0`;
        }
    };

    // Event Listeners for Filters
    searchInput.addEventListener('input', applyFilters);
    selects.forEach(sel => sel.addEventListener('change', applyFilters));

    // Dashboard UI interactions
    const sidebarLinks = document.querySelectorAll('.sidebar-menu li');
    sidebarLinks.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            item.classList.add('active');

            const txt = item.textContent.trim();
            if (txt !== "Ticket Inbox") {
                const header = document.querySelector('.page-header');
                const filters = document.querySelector('.filters-bar');
                const tableContainer = document.querySelector('.table-container');

                if (header) header.style.display = 'none';
                if (filters) filters.style.display = 'none';

                if (tableContainer) {
                    tableContainer.innerHTML = `
                        <div style="padding: 100px; text-align: center; color: var(--text-color);">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px; opacity: 0.3;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            <h2 style="font-size: 2rem; margin-bottom: 10px;">${txt}</h2>
                            <p style="font-size: 1.1rem; opacity: 0.7;">Esta sección se encuentra actualmente en desarrollo y pronto estará disponible.</p>
                        </div>
                    `;
                }
            } else {
                location.reload(); // Reset to normal view
            }
        });
    });

    // --- Modals Logic ---
    let currentEditTicketId = null;

    // Modals references
    const createModal = document.getElementById('createTicketModal');
    const editModal = document.getElementById('editTicketModal');

    // Create Modal Listeners
    document.getElementById('modalBtnCancel')?.addEventListener('click', () => {
        if (createModal) createModal.style.display = 'none';
    });

    document.getElementById('modalBtnConfirm')?.addEventListener('click', async () => {
        const email = document.getElementById('modalTicketEmail').value.trim();
        const subject = document.getElementById('modalTicketSubject').value.trim();

        if (!email || !subject) {
            alert('Por favor completa todos los campos.');
            return;
        }

        const confirmBtn = document.getElementById('modalBtnConfirm');
        confirmBtn.textContent = 'Creando...';
        confirmBtn.disabled = true;

        try {
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            const refCode = 'REF-MANUAL-' + randomNum;
            let wsId = localStorage.getItem('supcrud_workspace_id') || 1;

            await window.fetchAPI('/ticket-references', {
                method: 'POST',
                body: JSON.stringify({
                    reference_code: refCode,
                    workspace_id: parseInt(wsId),
                    user_email: email,
                    subject: subject,
                    type: 'P',
                    status: 'OPEN'
                })
            });

            createModal.style.display = 'none';
            document.getElementById('modalTicketEmail').value = '';
            document.getElementById('modalTicketSubject').value = '';
            await initData(); // Refresh table
        } catch (err) {
            alert('Error al crear el ticket en el servidor: ' + err.message);
        } finally {
            confirmBtn.textContent = 'Crear Ticket';
            confirmBtn.disabled = false;
        }
    });

    // Edit Modal Listeners
    document.getElementById('modalEditCancel')?.addEventListener('click', () => {
        if (editModal) editModal.style.display = 'none';
        currentEditTicketId = null;
    });

    document.getElementById('modalEditConfirm')?.addEventListener('click', async () => {
        const email = document.getElementById('modalEditEmail').value.trim();
        if (!email || !currentEditTicketId) return;

        const confirmBtn = document.getElementById('modalEditConfirm');
        confirmBtn.textContent = 'Guardando...';
        confirmBtn.disabled = true;

        try {
            await window.fetchAPI(`/ticket-references/${currentEditTicketId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    user_email: email
                })
            });
            editModal.style.display = 'none';
            currentEditTicketId = null;
            await initData();
        } catch (err) {
            alert('Error al actualizar: ' + err.message);
        } finally {
            confirmBtn.textContent = 'Guardar Email';
            confirmBtn.disabled = false;
        }
    });

    const createBtn = document.getElementById('btnDashboardCreateTicket');
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            // console.log("Create Ticket button clicked!");
            if (createModal) {
                createModal.style.display = 'flex';
                // Solo para forzar que despierte en navegadores estrictos:
                createModal.style.visibility = 'visible';
                createModal.style.opacity = '1';
                setTimeout(() => {
                    const emailInput = document.getElementById('modalTicketEmail');
                    if (emailInput) {
                        emailInput.focus();
                    }
                }, 100);
            } else {
                alert("Error crítico: El HTML del modal no está. Dale F5 a la página.");
            }
        });
    }

    // Logout Logic
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('supcrud_user_name');
            localStorage.removeItem('supcrud_user_email');
            localStorage.removeItem('supcrud_workspace_id');
            window.location.href = 'index.html';
        });
    }

    // Initial render
    initData();
});
