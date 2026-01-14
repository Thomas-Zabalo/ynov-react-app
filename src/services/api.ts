import type {AuthResponse, Project, User} from "../types";
import {allProjectsData} from "../data/projectsMock.ts";
import {allUsersData} from "../data/usersMocks.ts";

const IS_MOCK_MODE = import.meta.env.VITE_USE_MOCK === 'true';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? {'Authorization': `Bearer ${token}`} : {})
    };
};

export const projectService = {
    getAll: async (): Promise<Project[]> => {
        if (IS_MOCK_MODE) return Promise.resolve(allProjectsData as unknown as Project[]);

        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Erreur lors de la récupération des projets');

        return response.json();
    },

    getById: async (id: string): Promise<Project> => {
        if (IS_MOCK_MODE) {
            const project = allProjectsData.find(p => p._id === id);
            return project ? Promise.resolve(project as unknown as Project) : Promise.reject('Projet non trouvé');
        }

        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) throw new Error('Projet introuvable');
        return response.json();
    },

    create: async (projectData: Partial<Project>): Promise<Project> => {
        if (IS_MOCK_MODE) return Promise.reject("Action impossible en mode Mock");

        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(projectData),
        });

        if (!response.ok) throw new Error('Erreur lors de la création du projet');
        return response.json();
    },

    update: async (id: string, data: Partial<Project>): Promise<Project> => {
        const response = await fetch(`/api/projects/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erreur lors de la modification');
        return response.json();
    },

    delete: async (id: string): Promise<{ message: string }> => {
        if (IS_MOCK_MODE) return Promise.reject("Action impossible en mode Mock");

        const response = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de la suppression');
        }

        return response.json();
    }
};

export const userService = {
    login: async (credentials: Pick<User, 'email'> & { password: string }): Promise<AuthResponse> => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Identifiants invalides');
        }
        return response.json();
    },

    register: async (userData: any): Promise<AuthResponse> => {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Erreur lors de l'inscription");
        }
        return response.json();
    },

    getAll: async (): Promise<User[]> => {
        if (IS_MOCK_MODE) return Promise.resolve(allUsersData as unknown as User[]);

        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs');
        return response.json();
    },

    getById: async (id: string): Promise<User> => {
        if (IS_MOCK_MODE) {
            const user = allUsersData.find(u => u._id.toString() === id);
            if (!user) return Promise.reject('Utilisateur non trouvé');

            const projects = allProjectsData.filter(p =>
                p.author._id === user._id || user.projects?.includes(p._id)
            );

            return Promise.resolve({
                ...user,
                projects: projects
            }as unknown as User);
        }

        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) throw new Error('Utilisateur introuvable');
        return response.json();
    },

    getMe: async (): Promise<User> => {
        if (IS_MOCK_MODE) {
            return Promise.resolve(allUsersData[0] as any);
        }

        const response = await fetch('/api/users/my-profil', {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) throw new Error('Session expirée ou invalide');
        return response.json();
    }
};

export const favoriteService = {
    getAll: async (token: string): Promise<Project[]> => {
        const response = await fetch('/api/favorites', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Erreur de récupération');

        const data = await response.json();
        return data.favorites || [];
    },

    clear: async() => {
        localStorage.removeItem('favorites');
    },

    sync: async (projectIds: string[], token: string) => {
        const response = await fetch('/api/favorites/sync', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ projectIds }),
        });
        if (!response.ok) throw new Error('Erreur de synchronisation');
        return response.json();
    },

    add: async (id: string, token: string) => {
        const response = await fetch(`/api/favorites/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de l\'ajout aux favoris');
        }
        return response.json();
    }
};