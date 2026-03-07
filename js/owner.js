document.addEventListener('DOMContentLoaded', () => {
    // Mock Data for Workspaces
    const mockWorkspaces = [
        { id: '1', name: 'Cafe Bistro Sol', key: 'WKEY-CB-01', logo: 'CB', active: true, openTickets: 12, activeAddons: 3 },
        { id: '2', name: 'Cafe Bistro', key: 'WKEY-CB-02', logo: 'CB', active: true, openTickets: 12, activeAddons: 3 },
        { id: '3', name: 'Cafe Bistro Sol', key: 'WKEY-CB-03', logo: 'CB', active: true, openTickets: 12, activeAddons: 3 },
        { id: '4', name: 'Cafe Bistro', key: 'WKEY-CB-04', logo: 'CB', active: true, openTickets: 12, activeAddons: 3 },
        { id: '5', name: 'Cafe Bistro Sol', key: 'WKEY-CB-05', logo: 'CB', active: true, openTickets: 12, activeAddons: 3 },
        { id: '6', name: 'Cafe Bistro', key: 'WKEY-CB-06', logo: 'CB', active: true, openTickets: 12, activeAddons: 3 },
    ];

    // Store in LocalStorage if not exists
    if (!localStorage.getItem('supcrud_workspaces')) {
        localStorage.setItem('supcrud_workspaces', JSON.stringify(mockWorkspaces));
    }

    const grid = document.getElementById('workspacesGrid');
    const workspaces = JSON.parse(localStorage.getItem('supcrud_workspaces')) || [];

    const renderWorkspaces = () => {
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
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const index = workspaces.findIndex(w => w.id === id);
                if (index > -1) {
                    workspaces[index].active = !workspaces[index].active;
                    localStorage.setItem('supcrud_workspaces', JSON.stringify(workspaces));
                    renderWorkspaces(); // Re-render
                }
            });
        });
    };

    renderWorkspaces();
});
