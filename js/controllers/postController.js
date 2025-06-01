class PostController {
    constructor() {
        this.postForm = document.getElementById('postContent');
        this.postButton = document.getElementById('postButton');
        this.postsContainer = document.getElementById('postsContainer');
        this.setupEventListeners();
        this.loadPosts();
    }

    setupEventListeners() {
        this.postButton.addEventListener('click', this.handleCreatePost.bind(this));
    }

    async handleCreatePost() {
        const content = this.postForm.value.trim();
        if (!content) {
            alert('Por favor, escreva algo para postar');
            return;
        }

        try {
            await postsAPI.createPost(content);
            this.postForm.value = '';
            document.getElementById('charCount').textContent = '280';
            await this.loadPosts();
        } catch (error) {
            alert(error.message || 'Erro ao criar post');
        }
    }

    async loadPosts() {
        try {
            const posts = await postsAPI.getPosts();
            this.renderPosts(posts);
        } catch (error) {
            console.error('Erro ao carregar posts:', error);
        }
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
                <span class="post-author">${post.author.username}</span>
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

        const deleteButton = postDiv.querySelector('.delete-post');
        if (deleteButton) {
            deleteButton.addEventListener('click', () => this.handleDeletePost(post._id));
        }

        return postDiv;
    }

    isCurrentUserPost(post) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        return currentUser && post.author._id === currentUser.id;
    }

    async handleDeletePost(postId) {
        if (!confirm('Tem certeza que deseja excluir esta postagem?')) {
            return;
        }

        try {
            await postsAPI.deletePost(postId);
            const postElement = document.querySelector(`[data-id="${postId}"]`).closest('.post');
            if (postElement) {
                postElement.remove();
            }
            await this.loadPosts();
        } catch (error) {
            alert(error.message || 'Erro ao excluir post');
        }
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
}

// Inicializar o controlador
new PostController(); 