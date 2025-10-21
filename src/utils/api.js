import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api"
});

// Add request interceptor to automatically add token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// ============= Authentication APIs =============
export async function loginUser(credentials) {
    try {
        const response = await api.post("/auth/login", credentials);
        return response.data; // Returns { token, user }
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export async function registerUser(userData) {
    try {
        const response = await api.post("/auth/register", userData);
        return response.data; // Returns { token, user }
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
}

// ============= User Profile APIs =============
export async function getUserProfile() {
    try {
        const response = await api.get("/users/profile");
        return response.data;
    } catch (error) {
        console.error("Failed to get user profile:", error);
        throw error;
    }
}

export async function updateUserProfile(profileData) {
    try {
        const response = await api.put("/users/profile", profileData);
        return response.data;
    } catch (error) {
        console.error("Failed to update profile:", error);
        throw error;
    }
}

// ============= Admin User Management APIs =============
export async function getAllUsers() {
    try {
        const response = await api.get("/users/admin/users");
        return response.data;
    } catch (error) {
        console.error("Failed to get users:", error);
        throw error;
    }
}

export async function getUserById(userId) {
    try {
        const response = await api.get(`/users/admin/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to get user:", error);
        throw error;
    }
}

export async function createUser(userData) {
    try {
        const response = await api.post("/users/admin/users", userData);
        return response.data;
    } catch (error) {
        console.error("Failed to create user:", error);
        throw error;
    }
}

export async function updateUser(userId, userData) {
    try {
        const response = await api.put(`/users/admin/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error("Failed to update user:", error);
        throw error;
    }
}

export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/admin/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete user:", error);
        throw error;
    }
}

// ============= Vocabulary APIs =============
export async function addVocabulary(vocabularyData) {
    try {
        const response = await api.post("/vocabularies", vocabularyData);
        return response.data;
    } catch (error) {
        console.error("Failed to add vocabulary:", error);
        throw error;
    }
}

// In services/api.js - REPLACE the existing function
export async function getAllVocabularies() {
    try {
        const response = await api.get("/vocabularies");
        console.log("API Response:", response.data); // DEBUG
        return response.data; // This should be an ARRAY
    } catch (error) {
        console.error("Failed to get vocabularies:", error);
        throw error;
    }
}

export async function getVocabulariesByLetter(letter) {
    try {
        const response = await api.get(`/vocabularies/${letter}`);
        return response.data;
    } catch (error) {
        console.error("Failed to get vocabularies by letter:", error);
        throw error;
    }
}

export async function updateVocabulary(vocabularyId, vocabularyData) {
    try {
        const response = await api.put(`/vocabularies/${vocabularyId}`, vocabularyData);
        return response.data;
    } catch (error) {
        console.error("Failed to update vocabulary:", error);
        throw error;
    }
}

export async function deleteVocabulary(vocabularyId) {
    try {
        const response = await api.delete(`/vocabularies/${vocabularyId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete vocabulary:", error);
        throw error;
    }
}

// ============= Error Handler =============
// Dictionary API
export async function validateEnglishWord(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
        if (!response.ok) {
            throw new Error('Word not found');
        }
        const data = await response.json();
        return data[0]; // Return the first entry which contains all the word information
    } catch (error) {
        console.error('Error validating word:', error);
        throw error;
    }
}

export function handleApiError(error) {
    if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        switch (status) {
            case 400:
                return { type: 'VALIDATION_ERROR', message: data.message || 'Invalid input' };
            case 401:
                localStorage.removeItem('token');
                return { type: 'AUTH_ERROR', message: 'Please login again' };
            case 403:
                return { type: 'PERMISSION_ERROR', message: 'Access denied' };
            case 404:
                return { type: 'NOT_FOUND', message: data.message || 'Resource not found' };
            default:
                return { type: 'SERVER_ERROR', message: data.message || 'Something went wrong' };
        }
    }
    if (error.request) {
        return { type: 'NETWORK_ERROR', message: 'Network error, please try again' };
    }
    return { type: 'UNKNOWN_ERROR', message: error.message };
}