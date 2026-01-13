import {BookUser, FileText, Home, LogIn, PlusCircle, Star, User} from "lucide-react";

export const menuItems = [
    { name: "Accueil", to: "/", icon: Home, main: true },
    { name: "Favoris", to: "/favoris", icon: Star, main: true },
    { name: "Utilisateurs", to: "/utilisateurs", icon: BookUser, main: true },
    { name: "Se connecter", to: "/login", icon: LogIn, main: false, isGuest: true },
    { name: "Mes idées", to: "/mes-projets", icon: FileText, main: true, isPrivate: true },
    { name: "Créer une idée", to: "/projets/nouveau", icon: PlusCircle, main: true, isPrivate: true },
    { name: "Mon profil", to: "/mon-profil", icon: User, main: true, isPrivate: true },
];