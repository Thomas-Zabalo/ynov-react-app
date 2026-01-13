export interface User {
    _id: string;
    name: string;
    surname: string;
    email: string;
    projects: string[];
    joinDate: string;
    githubId?: string | null;
    favorites?: string[];
}

export interface Project {
    _id: string;
    name: string;
    description: string;
    category: 'Developpement' | 'Design' | 'Backend' | 'Frontend';
    status: 'Planifié' | 'En cours' | 'Complété';
    startDate: string;
    endDate: string;
    author: string | User;
    members: string[] | User[];
    detailedContent: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}