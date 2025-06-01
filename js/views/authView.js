class AuthView {
    constructor() {
        this.authSection = document.getElementById('authSection');
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        this.authTabs = document.querySelectorAll('.auth-tab');
    }

    show() {
        this.authSection.classList.remove('hidden');
    }

    hide() {
        this.authSection.classList.add('hidden');
    }

    showLoginForm() {
        this.loginForm.classList.remove('hidden');
        this.registerForm.classList.add('hidden');
        this.authTabs[0].classList.add('active');
        this.authTabs[1].classList.remove('active');
    }

    showRegisterForm() {
        this.loginForm.classList.add('hidden');
        this.registerForm.classList.remove('hidden');
        this.authTabs[0].classList.remove('active');
        this.authTabs[1].classList.add('active');
    }

    showError(message) {
        alert(message);
    }

    clearForms() {
        this.loginForm.reset();
        this.registerForm.reset();
    }
}

const authView = new AuthView(); 