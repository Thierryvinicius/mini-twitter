class ProfileController {
    constructor() {
        this.profileView = new ProfileView();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('editProfileBtn').addEventListener('click', () => this.profileView.showEditForm());
        document.getElementById('cancelEditBtn').addEventListener('click', () => this.profileView.hideEditForm());
        document.getElementById('saveProfileBtn').addEventListener('click', this.handleUpdateProfile.bind(this));
    }

    async loadProfile() {
        try {
            const user = await userAPI.getProfile();
            this.profileView.updateProfileInfo(user.username);
            await this.loadUserPosts();
        } catch (error) {
            this.profileView.showError(error.message || 'Erro ao carregar perfil');
        }
    }

    async loadUserPosts() {
        try {
            const posts = await postsAPI.getMyPosts();
            this.profileView.renderUserPosts(posts);
        } catch (error) {
            this.profileView.showError(error.message || 'Erro ao carregar posts');
        }
    }

    async handleUpdateProfile() {
        const username = document.getElementById('editUsername').value;
        const email = document.getElementById('editEmail').value;

        try {
            await userAPI.updateProfile(username, email);
            const user = JSON.parse(localStorage.getItem('user'));
            user.username = username;
            user.email = email;
            localStorage.setItem('user', JSON.stringify(user));
            
            this.profileView.updateProfileInfo(username);
            this.profileView.hideEditForm();
            this.profileView.showSuccess('Perfil atualizado com sucesso!');
        } catch (error) {
            this.profileView.showError(error.message || 'Erro ao atualizar perfil');
        }
    }
}

const profileController = new ProfileController(); 