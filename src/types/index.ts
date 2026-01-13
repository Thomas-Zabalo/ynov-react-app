export interface User {
    _id: string;
    name: string;
    surname: string;
    email: string;
    projects: Project[];
    createdAt?: string;
    githubId?: string | null;
    favorites?: string[];
}

export interface UserMini {
    _id: string;
    name: string;
    surname: string;
    email?: string;
}

export interface Project {
    _id: string;
    name: string;
    description: string;
    category: "Design" | "Backend" | "Developpement" | "Infrastructure" | "QA" | "Documentation";
    status: "Planifié" | "En cours" | "Complété";
    startDate: string;
    endDate: string;
    author: UserMini;
    members: UserMini[];
    detailedContent?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}