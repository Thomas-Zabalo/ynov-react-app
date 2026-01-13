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
    category: "Design" | "Backend" | "Developpement" | "Infrastructure" | "QA" | "Documentation";
    status: "Planifié" | "En cours" | "Complété";
    startDate: string;
    endDate: string;
    author: string;
    members: string[];
    detailedContent: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}