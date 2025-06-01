class PostView {
    constructor() {
        this.mainSection = document.getElementById('mainSection');
        this.postForm = document.getElementById('postContent');
        this.postButton = document.getElementById('postButton');
        this.postsContainer = document.getElementById('postsContainer');
        this.charCount = document.getElementById('charCount');
    }

    show() {
        this.mainSection.classList.remove('hidden');
    }

    hide() {
        this.mainSection.classList.add('hidden');
    }

    updateCharCount(remaining) {
        this.charCount.textContent = remaining;
        this.charCount.style.color = remaining < 50 ? 'var(--error-color)' : 'var(--secondary-color)';
    }

    clearPostForm() {
        this.postForm.value = '';
        this.updateCharCount(280);
    }

    renderPosts(posts) {
        this.postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = this.createPostElement(post);
            this.postsContainer.appendChild(postElement);
        });
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <div class="post-header">
                <div class="post-author">
                    <img src="/assets/images/person.png" alt="User Icon" class="user-icon">
                    <span>${post.author.username}</span>
                </div>
                <span class="post-date">${this.formatDate(post.createdAt)}</span>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                ${this.isCurrentUserPost(post) ? `
                    <button class="btn btn-secondary delete-post" data-id="${post._id}">
                        Excluir
                    </button>
                ` : ''}
            </div>
        `;

        return postDiv;
    }

    isCurrentUserPost(post) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        return currentUser && post.author._id === currentUser.id;
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
}

const postView = new PostView(); 