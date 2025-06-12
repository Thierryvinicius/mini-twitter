const API_URL = 'https://mini-twitter-api-vy9q.onrender.com';

async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401 && token) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
            }
            throw new Error(data.message || 'Erro na requisição');
        }

        return data;
    } catch (error) {
        console.error('Erro na API:', error);
        throw error;
    }
}

const authAPI = {
    async register(username, email, password) {
        return fetchAPI('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password })
        });
    },

    async login(email, password) {
        return fetchAPI('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }
};

const postsAPI = {
    async createPost(content) {
        return fetchAPI('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ content })
        });
    },

    async getPosts() {
        return fetchAPI('/api/posts', {
            method: 'GET'
        });
    },

    async getMyPosts() {
        return fetchAPI('/api/posts/my-posts', {
            method: 'GET'
        });
    },

    async deletePost(postId) {
        return fetchAPI(`/api/posts/${postId}`, {
            method: 'DELETE'
        });
    }
};

const userAPI = {
    async getProfile() {
        return fetchAPI('/api/users/profile', {
            method: 'GET'
        });
    },

    async updateProfile(username, email) {
        return fetchAPI('/api/users/profile', {
            method: 'PUT',
            body: JSON.stringify({ username, email })
        });
    }
}; 