document.addEventListener('DOMContentLoaded', () => {
    // --- UI ELEMENT SELECTORS ---
    const loginForm = document.getElementById('login-form');
    const authScreen = document.getElementById('auth-screen');

    // --- MOCK USER DATA ---
    const USERS = {
        'user': '12345',
        'admin': '12345'
    };

    // --- AUTHENTICATION & ROUTING ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userId = document.getElementById('user-id').value;
            const password = document.getElementById('password').value;
            const flashContainer = authScreen.querySelector('.flash-messages');
            flashContainer.innerHTML = ''; // Clear previous messages

            if (USERS[userId] && USERS[userId] === password) {
                // Successful login, redirect to the appropriate dashboard
                if (userId === 'admin') {
                    window.location.href = '/admin_dashboard';
                } else {
                    window.location.href = '/user_dashboard';
                }
            } else {
                // Failed login
                flashContainer.innerHTML = `<div class="flash error">Invalid User ID or Password.</div>`;
            }
        });
    }
});