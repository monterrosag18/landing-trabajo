document.addEventListener('DOMContentLoaded', () => {
    // Fetch real data from Backend only
    const fetchWorkspaces = async () => {
        try {
            const data = await window.fetchAPI('/workspaces');
            // Assuming the backend returns an array of workspaces
            return data.map(ws => ({
                id: ws.id,
                name: ws.name,
                key: ws.workspace_key,
                logo: ws.name.substring(0, 2).toUpperCase(),
                active: ws.status === 'ACTIVE',
                openTickets: 'N/A', // Endpoint under development
                activeAddons: 0
            }));
        } catch (error) {
            console.error("Backend not reachable. Error:", error);
            alert("No se pudo conectar a la base de datos.");
            return [];
        }
    };

    const grid = document.getElementById('workspacesGrid');

    const renderWorkspaces = async () => {
        const workspaces = await fetchWorkspaces();
        grid.innerHTML = '';
        workspaces.forEach(ws => {
            const card = document.createElement('div');
            card.className = 'ws-card neumorphic';
            card.innerHTML = `
                <div class="ws-header">
                    <div class="ws-brand">
                        <div class="ws-logo">${ws.logo}</div>
                        <div>
                            <div class="ws-title">${ws.name}</div>
                            <div class="ws-key">workspaceKey: ${ws.key}</div>
                        </div>
                    </div>
                    <span class="badge-active">${ws.active ? 'ACTIVE' : 'SUSPENDED'}</span>
                </div>
                
                <div class="ws-stats">
                    <div class="ws-stat-item">
                        <span class="ws-stat-label">OPEN TICKETS:</span>
                        <span class="ws-stat-value">${ws.openTickets}</span>
                    </div>
                    <div class="ws-stat-item">
                        <span class="ws-stat-label">ACTIVE ADD-ONS:</span>
                        <span class="ws-stat-value">${ws.activeAddons}</span>
                    </div>
                </div>

                <div class="ws-actions">
                    <button class="neumorphic-btn btn-sm">Manage</button>
                    <button class="neumorphic-btn btn-sm text-danger suspend-btn" data-id="${ws.id}">${ws.active ? 'Suspend' : 'Reactivate'}</button>
                </div>
            `;
            grid.appendChild(card);
        });

        // Add event listeners for Suspend
        document.querySelectorAll('.suspend-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const index = workspaces.findIndex(w => w.id == id);
                if (index > -1) {
                    const isActive = workspaces[index].active;
                    try {
                        await window.fetchAPI(`/workspaces/${id}`, {
                            method: 'PUT',
                            body: JSON.stringify({ status: isActive ? 'SUSPENDED' : 'ACTIVE' })
                        });
                        alert(`Workspace ${isActive ? 'suspendido' : 'reactivado'} exitosamente.`);
                        renderWorkspaces(); // Re-render
                    } catch (err) {
                        alert('Error actualizando en BD: ' + err.message);
                    }
                }
            });
        });

        // Add event listeners for Manage
        document.querySelectorAll('.ws-actions .btn-sm:not(.suspend-btn)').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const wsId = e.target.nextElementSibling.getAttribute('data-id');
                const ws = workspaces.find(w => w.id == wsId);
                if (ws) {
                    alert(`Gestionando Workspace: ${ws.name}\nKey: ${ws.key}\n\n(Panel integral de administración en desarrollo)`);
                }
            });
        });

        // Add event listeners for Add-on config buttons
        document.querySelectorAll('.addons-catalog .btn-sm').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const btnRef = e.currentTarget;
                const originalText = btnRef.textContent;
                btnRef.textContent = "Proximamente...";
                btnRef.disabled = true;
                setTimeout(() => {
                    btnRef.textContent = originalText;
                    btnRef.disabled = false;
                }, 2000);
            });
        });
    };

    const updateMetrics = async () => {
        try {
            const metrics = await fetchAPI('/metrics');
            const metricValues = document.querySelectorAll('.metric-value');
            if (metricValues.length >= 3) {
                metricValues[0].textContent = metrics.total_workspaces || 0;
                metricValues[1].textContent = metrics.active_tickets || 0;
                metricValues[2].textContent = metrics.total_agents || 0;
                metricValues[3].textContent = 0; // Add-ons are mocked for now
            }
        } catch (e) {
            console.warn("Could not load metrics", e);
        }
    };

    // Logout Logic
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('supcrud_user_name');
            localStorage.removeItem('supcrud_user_email');
            window.location.href = 'index.html';
        });
    }

    renderWorkspaces();
    updateMetrics();
});
