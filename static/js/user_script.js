document.addEventListener('DOMContentLoaded', () => {
    // --- UI ELEMENT SELECTORS ---
    const feedbackModal = document.getElementById('feedback-modal');
    const modalContent = feedbackModal.querySelector('div');

    // --- LOGOUT FUNCTIONALITY ---
    function handleLogout() {
        // In a real app, you would also clear session/token here
        window.location.href = '/';
    }

    // --- MODAL FUNCTIONS (SHARED) ---
    function showModal(type, title, message) {
        const modalIcon = document.getElementById('modal-icon');
        const modalTitle = document.getElementById('modal-title');
        const modalMessage = document.getElementById('modal-message');
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        const config = { success: { icon: 'check', color: 'green' }, error: { icon: 'x', color: 'red' }, info: { icon: 'info', color: 'blue' } }[type] || { icon: 'info', color: 'blue' };
        modalIcon.innerHTML = `<i data-lucide="${config.icon}" class="w-6 h-6 text-white"></i>`;
        modalIcon.className = `mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-${config.color}-500`;
        lucide.createIcons();
        feedbackModal.classList.remove('hidden');
        feedbackModal.classList.add('flex');
        setTimeout(() => modalContent.classList.remove('scale-95', 'opacity-0'), 50);
    }

    function closeModal() {
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => { feedbackModal.classList.add('hidden'); feedbackModal.classList.remove('flex'); }, 200);
    }
    
    document.getElementById('close-modal-button').addEventListener('click', closeModal);

    // --- RESIDENT APP LOGIC ---
    function initResidentAppLogic() {
        const menuButton = document.getElementById('menu-button');
        const sidebar = document.getElementById('sidebar');
        const navItems = document.querySelectorAll('.nav-item');
        const mainContent = document.getElementById('user-main-content');
        const pageTitle = document.getElementById('page-title');
        const logoutButton = document.getElementById('logout-button');
        
        if (logoutButton) logoutButton.addEventListener('click', (e) => {
             e.preventDefault();
             handleLogout();
        });

        let userState = {
            greenCredits: 1250,
            level: "Green Hero",
            streak: 5,
            bins: {
                organic: { fill: 75, collection: "Mon, 8 AM" },
                recyclables: { fill: 40, collection: "Mon, 8 AM" },
                nonRecyclables: { fill: 60, collection: "Wed, 8 AM" },
                biohazardous: { fill: 25, collection: "Fri, 8 AM" },
                eWaste: { fill: 15, collection: "Fri, 8 AM" },
            },
            leaderboard: [
                { rank: 1, id: 'H012', credits: 2500, avatar: 'https://placehold.co/40x40/d1fae5/10b981?text=A' },
                { rank: 2, id: 'H007', credits: 2150, avatar: 'https://placehold.co/40x40/e0e7ff/6366f1?text=B' },
                { rank: 3, id: 'user', credits: 1250, avatar: 'https://placehold.co/40x40/E2E8F0/4A5568?text=U' },
                { rank: 4, id: 'H021', credits: 980, avatar: 'https://placehold.co/40x40/ffedd5/f97316?text=C' },
                { rank: 5, id: 'H015', credits: 760, avatar: 'https://placehold.co/40x40/ffe4e6/f43f5e?text=D' },
            ]
        };
        
        const formatBinName = (key) => { const result = key.replace(/([A-Z])/g, " $1"); return result.charAt(0).toUpperCase() + result.slice(1); };
        const getSustainabilityContribution = (credits) => { if (credits > 1500) return { emoji: '😄', text: 'Eco Champion!', color: 'blue' }; if (credits > 500) return { emoji: '😊', text: 'Making an Impact!', color: 'green' }; return { emoji: '🤔', text: 'Let\'s Improve!', color: 'orange' }; };
        const getBinColor = (fill) => { if (fill > 90) return 'bg-red-600'; if (fill > 70) return 'bg-orange-500'; if (fill > 40) return 'bg-yellow-500'; return 'bg-green-600'; };

        const pageContent = {
            dashboard: `<div class="flex flex-col gap-6 max-w-4xl mx-auto"><div class="grid grid-cols-1 sm:grid-cols-3 gap-6"><div class="card p-6 flex items-center justify-between"><div><p class="text-sm text-gray-500">Green Credits</p><p class="text-3xl font-bold text-green-600">${userState.greenCredits} GC</p></div><div class="p-3 bg-green-100 rounded-full"><i data-lucide="wallet" class="w-8 h-8 text-green-600"></i></div></div><div class="card p-6 flex items-center justify-between"><div><p class="text-sm text-gray-500">Your Level</p><p class="text-3xl font-bold text-blue-600">${userState.level}</p></div><div class="p-3 bg-blue-100 rounded-full"><i data-lucide="shield-check" class="w-8 h-8 text-blue-600"></i></div></div><div class="card p-6 flex items-center justify-between"><div><p class="text-sm text-gray-500">Daily Streak</p><p class="text-3xl font-bold text-orange-500">${userState.streak} Days</p></div><div class="p-3 bg-orange-100 rounded-full"><i data-lucide="flame" class="w-8 h-8 text-orange-500"></i></div></div></div><div class="card p-6 flex items-center space-x-6 bg-lime-50">${(() => {const contribution = getSustainabilityContribution(userState.greenCredits); return `<p class="text-6xl">${contribution.emoji}</p><div><p class="text-2xl font-bold text-${contribution.color}-600">${contribution.text}</p><p class="text-sm text-gray-600">Your sustainable contribution is making a difference!</p></div>`;})()}</div><div class="card p-6"><h3 class="text-lg font-semibold mb-4">Bin Fill Levels</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${Object.entries(userState.bins).map(([key, value]) => `<div><div class="flex justify-between mb-1"><span class="text-base font-medium text-gray-700">${formatBinName(key)}</span><span class="text-sm font-medium text-gray-500">${value.fill}%</span></div><div class="w-full bg-gray-200 rounded-full h-2.5"><div class="${getBinColor(value.fill)} h-2.5 rounded-full" style="width: ${value.fill}%"></div></div></div>`).join('')}</div></div><div class="card p-6"><h3 class="text-lg font-semibold mb-4">Upcoming Municipal Collections</h3><p class="text-sm text-gray-500 mb-4">This is the official schedule. Please have your bins ready on time.</p><div class="space-y-4"><div class="flex items-center"><i data-lucide="leaf" class="w-6 h-6 text-green-500 mr-3 p-1 bg-green-100 rounded-full"></i><div><strong>Organic & Recyclables:</strong><p class="text-sm text-gray-600">Monday, 8:00 AM</p></div></div><div class="flex items-center"><i data-lucide="trash-2" class="w-6 h-6 text-gray-500 mr-3 p-1 bg-gray-100 rounded-full"></i><div><strong>Non-Recyclables:</strong><p class="text-sm text-gray-600">Wednesday, 8:00 AM</p></div></div><div class="flex items-center"><i data-lucide="biohazard" class="w-6 h-6 text-red-500 mr-3 p-1 bg-red-100 rounded-full"></i><div><strong>Biohazardous & E-Waste:</strong><p class="text-sm text-gray-600">Friday, 8:00 AM</p></div></div></div></div></div>`,
            upload: `<div class="max-w-4xl mx-auto card p-8"><div class="text-center"><i data-lucide="camera" class="mx-auto h-12 w-12 text-gray-400"></i><h2 class="mt-2 text-2xl font-semibold text-gray-900">Classify Waste</h2><p class="mt-1 text-sm text-gray-600">Scan a live image or upload from your device.</p></div><div class="mt-8 flex justify-center"><div class="w-full border-2 border-dashed border-gray-300 rounded-lg p-12 text-center"><div class="flex justify-center items-center space-x-4"><button type="button" id="scan-image-button" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"><i data-lucide="scan-line" class="-ml-1 mr-2 h-5 w-5"></i>Scan Image</button><span class="text-gray-400">or</span><input type="file" id="waste-image-upload" class="hidden" accept="image/*"><button type="button" onclick="document.getElementById('waste-image-upload').click()" class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"><i data-lucide="upload" class="-ml-1 mr-2 h-5 w-5"></i>Upload</button></div><p class="text-xs text-gray-500 mt-4">This will connect to ESP32/RPi for live classification.</p></div></div><div id="classification-result" class="mt-6 text-center hidden"><div id="image-preview-container" class="mb-4 flex justify-center"></div><div id="result-text"></div></div></div>`,
            request: `<div class="max-w-4xl mx-auto flex flex-col gap-6">
                <div class="card p-6"><h2 class="text-2xl font-semibold text-gray-900">Request Disposal & Exchange</h2><p class="mt-1 text-sm text-gray-600">Schedule pickups for special items and exchange scrap for money.</p></div>
                <div class="card p-6"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div><h3 class="text-lg font-semibold text-purple-700">E-Waste & Home Appliances</h3><p class="text-sm text-gray-500 mt-1">Responsibly dispose of old electronics, TVs, refrigerators etc.</p></div><button id="schedule-ewaste-btn" class="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 flex-shrink-0"><i data-lucide="zap" class="-ml-1 mr-2 h-5 w-5"></i>Schedule E-Waste Pickup</button></div></div>
                <div class="card p-6"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div><h3 class="text-lg font-semibold text-amber-700">Scrap Exchange</h3><p class="text-sm text-gray-500 mt-1">Exchange cardboard, metal scraps, newspapers for Green Credits.</p></div><button id="schedule-scrap-btn" class="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 flex-shrink-0"><i data-lucide="box" class="-ml-1 mr-2 h-5 w-5"></i>Request Scrap Exchange</button></div></div>
                </div>`,
            alerts: `<div class="max-w-4xl mx-auto card p-8"><h2 class="text-2xl font-semibold text-gray-900 mb-6">Bin & Collection Management</h2><div class="space-y-6">${Object.entries(userState.bins).map(([key, value]) => `<div class="p-4 border rounded-lg"><h3 class="text-lg font-semibold">${formatBinName(key)} Waste</h3><p class="text-sm text-gray-500 mb-2">Next Collection: ${value.collection}</p><div class="w-full bg-gray-200 rounded-full h-4"><div class="${getBinColor(value.fill)} h-4 rounded-full flex items-center justify-center text-white text-xs" style="width: ${value.fill}%">${value.fill > 10 ? value.fill+'%' : ''}</div></div></div>`).join('')}</div><p class="text-xs text-center mt-6 text-gray-500">Real-time data from IoT sensors will be displayed here.</p></div>`,
            wallet: `<div class="max-w-4xl mx-auto flex flex-col gap-6">
                <div class="card p-8"><div class="flex items-center justify-between mb-2"><h2 class="text-2xl font-semibold text-gray-900">Green Credits Wallet</h2><div class="text-right"><p class="text-sm text-gray-500">Current Balance</p><p class="text-3xl font-bold text-green-600">${userState.greenCredits} GC</p></div></div><p class="text-right text-sm text-gray-500">(Equivalent to ₹${(userState.greenCredits * 0.50).toFixed(2)})</p></div>
                <div class="card p-8"><h3 class="font-semibold mb-4">Redeem Credits</h3><div class="flex items-center space-x-4"><input type="number" id="redeem-amount" placeholder="Enter GC Amount" class="flex-grow block w-full rounded-md border-gray-300 shadow-sm"><button id="redeem-button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"><i data-lucide="send" class="-ml-1 mr-2 h-5 w-5"></i>Net Transfer</button></div><p class="text-xs text-gray-500 mt-2">1 GC = ₹0.50. Transfer to linked account.</p></div>
                <div class="card p-6"><h3 class="text-lg font-semibold mb-4">Transaction History</h3><ul class="divide-y divide-gray-200">
                    <li class="py-3 flex justify-between items-center"><div class="flex items-center"><i data-lucide="plus-circle" class="w-5 h-5 text-green-500 mr-3"></i><div><p class="font-medium">Recycling Bonus</p><p class="text-sm text-gray-500">2025-09-20</p></div></div><span class="font-semibold text-green-600">+15 GC</span></li>
                    <li class="py-3 flex justify-between items-center"><div class="flex items-center"><i data-lucide="plus-circle" class="w-5 h-5 text-green-500 mr-3"></i><div><p class="font-medium">Scrap Exchange</p><p class="text-sm text-gray-500">2025-09-19</p></div></div><span class="font-semibold text-green-600">+85 GC</span></li>
                    <li class="py-3 flex justify-between items-center"><div class="flex items-center"><i data-lucide="minus-circle" class="w-5 h-5 text-red-500 mr-3"></i><div><p class="font-medium">Improper Segregation Penalty</p><p class="text-sm text-gray-500">2025-09-18</p></div></div><span class="font-semibold text-red-600">-5 GC</span></li>
                    <li class="py-3 flex justify-between items-center"><div class="flex items-center"><i data-lucide="arrow-right-circle" class="w-5 h-5 text-blue-500 mr-3"></i><div><p class="font-medium">Credits Redeemed</p><p class="text-sm text-gray-500">2025-09-17</p></div></div><span class="font-semibold text-blue-600">-200 GC</span></li>
                </ul></div>
                </div>`,
            leaderboard: `<div class="max-w-4xl mx-auto card p-8"><h2 class="text-2xl font-semibold text-gray-900 mb-6">Leaderboard</h2><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Green Credits</th></tr></thead><tbody class="bg-white divide-y divide-gray-200">${userState.leaderboard.map(user => `<tr class="${user.id === 'user' ? 'bg-green-50' : ''}"><td class="px-6 py-4 font-medium">${user.rank}</td><td class="px-6 py-4"><div class="flex items-center"><img class="h-10 w-10 rounded-full" src="${user.avatar}" alt=""><div class="ml-4 font-medium">${user.id} ${user.id === 'user' ? '(You)' : ''}</div></div></td><td class="px-6 py-4 text-green-600 font-semibold">${user.credits}</td></tr>`).join('')}</tbody></table></div></div>`,
            gamification: `<div class="max-w-4xl mx-auto card p-8"><h2 class="text-2xl font-semibold text-gray-900 mb-6">Your Progress</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="p-6 border rounded-lg text-center"><i data-lucide="shield-check" class="mx-auto h-12 w-12 text-blue-500"></i><p class="mt-2 text-sm text-gray-500">Current Level</p><p class="text-2xl font-bold">${userState.level}</p></div><div class="p-6 border rounded-lg text-center"><i data-lucide="flame" class="mx-auto h-12 w-12 text-orange-500"></i><p class="mt-2 text-sm text-gray-500">Daily Streak</p><p class="text-2xl font-bold">${userState.streak} Days</p></div></div><h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">Badges Earned</h3><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">${[{icon: 'leaf', title: 'Eco Beginner', color: 'green', earned: true},{icon: 'recycle', title: 'Recycle Rookie', color: 'blue', earned: true},{icon: 'award', title: 'Waste Warrior', color: 'yellow', earned: true},{icon: 'zap', title: 'E-Waste Expert', color: 'purple', earned: true},{icon: 'star', title: 'Streak Starter', color: 'red', earned: false},{icon: 'trophy', title: 'Top Performer', color: 'indigo', earned: false},].map(badge => `<div class="p-4 border rounded-lg text-center ${!badge.earned ? 'opacity-40' : ''}"><i data-lucide="${badge.icon}" class="mx-auto h-10 w-10 text-${badge.color}-500"></i><p class="mt-2 text-sm font-medium">${badge.title}</p></div>`).join('')}</div></div>`,
            settings: `<div class="max-w-4xl mx-auto card p-8"><h2 class="text-2xl font-semibold text-gray-900 mb-6">Profile Settings</h2><div class="space-y-4"><div><label class="block text-sm font-medium">User ID</label><input type="text" value="user" disabled class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100"></div><div><label class="block text-sm font-medium">Email</label><input type="email" value="user@example.com" class="mt-1 block w-full rounded-md border-gray-300"></div><div><label class="block text-sm font-medium">Change Password</label><input type="password" placeholder="New Password" class="mt-1 block w-full rounded-md border-gray-300"></div><button class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Save Changes</button></div></div>`,
        };

        function renderPage(pageId) {
            mainContent.innerHTML = `<div class="page-content">${pageContent[pageId] || '<p>Page content not found.</p>'}</div>`;
            lucide.createIcons(); 
            attachDynamicListeners(pageId);
        }

        function attachDynamicListeners(pageId) {
            if (pageId === 'upload') {
                const uploadInput = document.getElementById('waste-image-upload');
                const scanButton = document.getElementById('scan-image-button');
                if (uploadInput) uploadInput.addEventListener('change', (event) => handleWasteUpload(event.target.files[0]));
                if (scanButton) scanButton.addEventListener('click', () => handleWasteUpload(null));
            }
            if (pageId === 'wallet') {
                const redeemButton = document.getElementById('redeem-button');
                if (redeemButton) redeemButton.addEventListener('click', handleRedeemCredits);
            }
            if (pageId === 'request') {
                const ewasteBtn = document.getElementById('schedule-ewaste-btn');
                const scrapBtn = document.getElementById('schedule-scrap-btn');
                if (ewasteBtn) ewasteBtn.addEventListener('click', () => {
                    showModal('success', 'Pickup Scheduled', 'Your e-waste pickup request has been sent to the municipality.');
                });
                if (scrapBtn) scrapBtn.addEventListener('click', () => {
                    showModal('success', 'Exchange Requested', 'Your scrap exchange request has been scheduled. A vendor will contact you shortly.');
                });
            }
        }

        function setActiveNav(pageId) {
            navItems.forEach(item => item.classList.toggle('active', item.dataset.page === pageId));
            pageTitle.textContent = document.querySelector(`.nav-item[data-page="${pageId}"]`).textContent.trim();
        }

        function handleWasteUpload(file) {
            const resultDiv = document.getElementById('classification-result');
            const previewContainer = document.getElementById('image-preview-container');
            const resultText = document.getElementById('result-text');
            if (!resultDiv) return;

            resultDiv.classList.remove('hidden');
            previewContainer.innerHTML = '';
            
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewContainer.innerHTML = `<img src="${e.target.result}" alt="Image preview" class="max-h-40 rounded-lg shadow-md">`;
                }
                reader.readAsDataURL(file);
            }

            resultText.innerHTML = `<p class="font-semibold">Analyzing...</p><div class="w-full bg-gray-200 rounded-full h-2.5 mt-2"><div class="bg-blue-600 h-2.5 rounded-full animate-pulse" style="width: 45%"></div></div>`;
            
            setTimeout(() => {
                const outcomes = [
                    { type: 'Recyclable', correct: true, credits: 15, color: 'green' },
                    { type: 'Organic', correct: true, credits: 10, color: 'green' },
                    { type: 'Non-Recyclable', correct: false, credits: -5, color: 'red' }
                ];
                const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

                // Update result text on the page
                let onPageMessage = `<p class="font-semibold text-${outcome.color}-700">Result: ${outcome.type}</p>`;
                if (outcome.correct) {
                    onPageMessage += `<p class="text-sm text-gray-600">+${outcome.credits} Green Credits awarded!</p>`;
                } else {
                    onPageMessage += `<p class="text-sm text-gray-600">${outcome.credits} Green Credit penalty.</p>`;
                }
                resultText.innerHTML = onPageMessage;

                // Show detailed modal after a short delay
                setTimeout(() => {
                    if (outcome.correct) {
                        userState.greenCredits += outcome.credits;
                        showModal('success', 'Success!', `Classified as ${outcome.type}. You earned ${outcome.credits} Green Credits!`);
                    } else {
                        showModal('error', 'Oops!', `Incorrect disposal. Classified as ${outcome.type}. A small penalty is applied.`);
                    }
                }, 1000);

            }, 2500);
        }

        function handleRedeemCredits() {
            const amountInput = document.getElementById('redeem-amount');
            const value = parseInt(amountInput.value, 10);
            if (isNaN(value) || value <= 0) { showModal('error', 'Invalid Amount', 'Please enter a valid amount.'); return; }
            if (value > userState.greenCredits) { showModal('error', 'Insufficient Funds', 'You do not have enough Green Credits.'); return; }
            showModal('success', 'Transfer Initiated', `${value} GC (₹${(value * 0.5).toFixed(2)}) is being transferred.`);
            amountInput.value = '';
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
        
        // Initial setup
        renderPage('dashboard');
        setActiveNav('dashboard');
        lucide.createIcons();
    }

    initResidentAppLogic();
});