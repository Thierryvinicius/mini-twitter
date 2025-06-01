class ProfileView {
    constructor() {
        this.profileSection = document.getElementById('profileSection');
        this.profileUsername = document.getElementById('profileUsername');
        this.editProfileBtn = document.getElementById('editProfileBtn');
        this.editProfileForm = document.getElementById('editProfileForm');
        this.userPostsContainer = document.getElementById('userPostsContainer');
    }

    show() {
        this.profileSection.classList.remove('hidden');
    }

    hide() {
        this.profileSection.classList.add('hidden');
    }

    showEditForm() {
        this.editProfileForm.classList.remove('hidden');
        this.editProfileBtn.classList.add('hidden');
    }

    hideEditForm() {
        this.editProfileForm.classList.add('hidden');
        this.editProfileBtn.classList.remove('hidden');
    }

    updateProfileInfo(username) {
        this.profileUsername.innerHTML = `
            <img src="./assets/images/person.png" alt="User Icon" class="user-icon">
            <span>${username}</span>
        `;
    }

    renderUserPosts(posts) {
        this.userPostsContainer.innerHTML = `
            <h3 class="section-title">Seus Posts</h3>
        `;
        posts.forEach(post => {
            const postElement = this.createPostElement(post);
            this.userPostsContainer.appendChild(postElement);
        });
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <div class="post-header">
                <div class="post-author">
                    <img src="assets/images/person.png" alt="User Icon" class="user-icon">
                    <span>${post.author.username}</span>
                </div>
                <span class="post-date">${this.formatDate(post.createdAt)}</span>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                <button class="btn btn-secondary delete-post" data-id="${post._id}">
                    Excluir
                </button>
            </div>
        `;

        return postDiv;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    showError(message) {
        alert(message);
    }

    showSuccess(message) {
        alert(message);
    }
}

const profileView = new ProfileView(); 