document.addEventListener('DOMContentLoaded', () => {

    // --- LOGOUT FUNCTIONALITY ---
    function handleLogout() {
        // In a real app, you would also clear session/token here
        window.location.href = '/';
    }

    // --- MUNICIPAL APP LOGIC ---
    function initMunicipalAppLogic() {
        const menuButton = document.getElementById('menu-button');
        const sidebar = document.getElementById('sidebar');
        const navItems = document.querySelectorAll('.admin-nav-item');
        const mainContent = document.getElementById('admin-main-content');
        const pageTitle = document.getElementById('page-title');
        const logoutButton = document.getElementById('logout-button');
        
        if (logoutButton) logoutButton.addEventListener('click', (e) => {
             e.preventDefault();
             handleLogout();
        });

        const pageTemplates = {
            dashboard: `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="card p-6 flex items-center justify-between"><div class="space-y-1"><p class="text-sm text-gray-500">Total Bins</p><p class="text-3xl font-bold">450</p></div><div class="p-3 bg-blue-100 rounded-full"><i data-lucide="trash" class="w-8 h-8 text-blue-600"></i></div></div>
                    <div class="card p-6 flex items-center justify-between"><div class="space-y-1"><p class="text-sm text-gray-500">Full Bins (>80%)</p><p class="text-3xl font-bold text-red-600">32</p></div><div class="p-3 bg-red-100 rounded-full"><i data-lucide="alert-triangle" class="w-8 h-8 text-red-600"></i></div></div>
                    <div class="card p-6 flex items-center justify-between"><div class="space-y-1"><p class="text-sm text-gray-500">Avg. Compliance</p><p class="text-3xl font-bold text-green-600">88%</p></div><div class="p-3 bg-green-100 rounded-full"><i data-lucide="check-circle" class="w-8 h-8 text-green-600"></i></div></div>
                    <div class="card p-6 flex items-center justify-between"><div class="space-y-1"><p class="text-sm text-gray-500">Active Trucks</p><p class="text-3xl font-bold text-yellow-600">14 / 15</p></div><div class="p-3 bg-yellow-100 rounded-full"><i data-lucide="truck" class="w-8 h-8 text-yellow-600"></i></div></div>
                </div>
                <div class="mt-6 card p-6">
                    <h3 class="text-lg font-semibold mb-4">Live Bin Status Feed</h3>
                    <div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bin ID</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fill Level</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr><td class="px-6 py-4">B001</td><td class="px-6 py-4">Ward 1</td><td class="px-6 py-4">95%</td><td class="px-6 py-4"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Full</span></td></tr>
                            <tr><td class="px-6 py-4">B002</td><td class="px-6 py-4">Ward 2</td><td class="px-6 py-4">60%</td><td class="px-6 py-4"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Partial</span></td></tr>
                            <tr><td class="px-6 py-4">B003</td><td class="px-6 py-4">Ward 3</td><td class="px-6 py-4">25%</td><td class="px-6 py-4"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Normal</span></td></tr>
                        </tbody>
                    </table></div>
                </div>`,
            binManagement: `
                <div class="card p-6">
                    <h3 class="text-lg font-semibold mb-4">Bin Maintenance Log</h3>
                    <div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bin ID</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th></tr></thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr><td class="px-6 py-4">B204</td><td class="px-6 py-4"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Maintenance Needed</span></td><td class="px-6 py-4">Lid sensor faulty</td><td class="px-6 py-4">2025-09-20</td></tr>
                            <tr><td class="px-6 py-4">B089</td><td class="px-6 py-4"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Maintenance Fixed</span></td><td class="px-6 py-4">Battery replaced</td><td class="px-6 py-4">2025-09-20</td></tr>
                        </tbody>
                    </table></div>
                </div>`,
            ward6Status: `
                <div class="card p-4 h-[80vh] flex flex-col">
                    <h3 class="text-lg font-semibold mb-2 flex-shrink-0">Live Bin Status: Ward 6</h3>
                    <p class="text-sm text-gray-500 mb-4 flex-shrink-0">Displaying real-time bin fill levels for Ward 6 in Coimbatore.</p>
                    <div id="map" class="flex-grow z-0"></div>
                </div>`,
            reports: `<div class="card p-6"><h3 class="text-lg font-semibold mb-4">Compliance Reports</h3><p class="text-sm text-gray-600">Generate and export compliance reports.</p><button class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"><i data-lucide="download" class="mr-2"></i>Export as CSV</button></div>`,
            alerts: `
                <div class="card p-6">
                    <h3 class="text-lg font-semibold mb-4">Live Notifications Feed</h3>
                    <div class="space-y-3">
                        <div class="p-3 bg-gray-50 rounded-md border-l-4 border-blue-500"><p class="text-sm text-gray-800"><span class="font-semibold">12:20 PM:</span> Household H345 (Peelamedu) has requested <strong class="text-blue-700">e-waste disposal</strong> for a television.</p></div>
                        <div class="p-3 bg-gray-50 rounded-md border-l-4 border-red-500"><p class="text-sm text-gray-800"><span class="font-semibold">11:15 AM:</span> Bin B087 in Ward 5 is reporting an <strong class="text-red-700">overflow alert</strong>. Fill level at 102%.</p></div>
                    </div>
                </div>`,
            analytics: `
                <div class="card p-6">
                    <h3 class="text-lg font-semibold mb-4">AI-Powered Analytics & Insights</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-2">Predictive Insights</h4>
                            <ul class="space-y-3">
                                <li class="flex items-start p-3 bg-orange-50 rounded-md"><i data-lucide="alert-triangle" class="w-5 h-5 mr-3 mt-1 text-orange-500 flex-shrink-0"></i><div><p class="font-medium text-orange-800">High Overflow Risk: Ward 4</p><p class="text-sm text-gray-600">Model predicts a 75% chance of overflows in Ward 4 in the next 48 hours.</p></div></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-2">Suggested Actions</h4>
                            <ul class="space-y-3">
                                <li class="flex items-start p-3 bg-green-50 rounded-md"><i data-lucide="lightbulb" class="w-5 h-5 mr-3 mt-1 text-green-500 flex-shrink-0"></i><div><p class="font-medium text-green-800">Pre-emptive Collection Route</p><p class="text-sm text-gray-600">Deploy an additional truck to Ward 4 focusing on high-traffic zones.</p></div></li>
                            </ul>
                        </div>
                    </div>
                </div>`,
            settings: `<div class="card p-6"><h3 class="text-lg font-semibold mb-4">Admin Settings</h3><p class="text-sm text-gray-600">Manage your administrator profile and notification preferences.</p></div>`
        };
        
        function renderPage(pageId) {
            mainContent.innerHTML = `<div class="page-content">${pageTemplates[pageId] || '<p>Page not found</p>'}</div>`;
            lucide.createIcons();

            if (pageId === 'ward6Status') {
                // Use setTimeout to ensure the #map div is in the DOM before initializing Leaflet
                setTimeout(() => { 
                    var map = L.map('map').setView([11.011, 76.948], 15); 
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors'
                    }).addTo(map);

                    const createSvgIcon = (color) => {
                        const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="${color}" stroke="white" stroke-width="1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
                        return L.divIcon({ html: svgIcon, className: '', iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] });
                    };

                    const redIcon = createSvgIcon('#ef4444');
                    const yellowIcon = createSvgIcon('#f59e0b');
                    const greenIcon = createSvgIcon('#22c55e');
                    
                    const ward6Bins = [
                        { lat: 11.012, lng: 76.947, fill: 95 }, { lat: 11.010, lng: 76.950, fill: 82 },
                        { lat: 11.013, lng: 76.949, fill: 65 }, { lat: 11.009, lng: 76.946, fill: 75 },
                        { lat: 11.014, lng: 76.945, fill: 40 }, { lat: 11.008, lng: 76.951, fill: 25 },
                    ];
                    
                    ward6Bins.forEach(bin => {
                        let icon = bin.fill > 80 ? redIcon : (bin.fill > 50 ? yellowIcon : greenIcon);
                        L.marker([bin.lat, bin.lng], {icon: icon}).addTo(map).bindPopup(`<b>Bin Status</b><br>Fill Level: ${bin.fill}%`);
                    });
                }, 0);
            }
        }

        function setActiveNav(pageId) {
            navItems.forEach(item => item.classList.toggle('active', item.dataset.page === pageId));
            pageTitle.textContent = document.querySelector(`[data-page="${pageId}"]`).textContent;
        }

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = item.dataset.page;
                if (pageId) {
                    setActiveNav(pageId);
                    renderPage(pageId);
                    if (window.innerWidth < 1024) sidebar.classList.add('hidden');
                }
            });
        });

        menuButton.addEventListener('click', () => sidebar.classList.toggle('hidden'));

        // Initial page render
        renderPage('dashboard');
        lucide.createIcons();
    }

    initMunicipalAppLogic();
});