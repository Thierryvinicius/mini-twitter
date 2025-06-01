const authSection = document.getElementById('authSection');
const mainSection = document.getElementById('mainSection');
const profileSection = document.getElementById('profileSection');
const navLinks = document.getElementById('navLinks');

function checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
        showMainSection();
    } else {
        showAuthSection();
    }
}

function showAuthSection() {
    authSection.classList.remove('hidden');
    mainSection.classList.add('hidden');
    profileSection.classList.add('hidden');
    navLinks.classList.add('hidden');
}

function showMainSection() {
    authSection.classList.add('hidden');
    mainSection.classList.remove('hidden');
    profileSection.classList.add('hidden');
    navLinks.classList.remove('hidden');
}

function showProfileSection() {
    authSection.classList.add('hidden');
    mainSection.classList.add('hidden');
    profileSection.classList.remove('hidden');
    navLinks.classList.remove('hidden');
    
    profileController.loadProfile();
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    document.getElementById('homeLink').addEventListener('click', (e) => {
        e.preventDefault();
        showMainSection();
    });

    document.getElementById('profileLink').addEventListener('click', (e) => {
        e.preventDefault();
        showProfileSection();
    });

    document.getElementById('logoutLink').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        showAuthSection();
    });

    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (tabName === 'login') {
                document.getElementById('loginForm').classList.remove('hidden');
                document.getElementById('registerForm').classList.add('hidden');
            } else {
                document.getElementById('loginForm').classList.add('hidden');
                document.getElementById('registerForm').classList.remove('hidden');
            }
        });
    });

    const postContent = document.getElementById('postContent');
    const charCount = document.getElementById('charCount');
    if (postContent && charCount) {
        postContent.addEventListener('input', () => {
            const remaining = 280 - postContent.value.length;
            charCount.textContent = remaining;
            charCount.style.color = remaining < 50 ? 'var(--error-color)' : 'var(--secondary-color)';
        });
    }
}); 