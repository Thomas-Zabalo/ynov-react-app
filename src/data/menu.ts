import {BookUser, Home, Star} from "lucide-react";

export const menuItems = [
    { name: "Accueil", to: "/", icon: Home, main: true },
    { name: "Favoris", to: "/favoris", icon: Star, main: true },
    { name: "Utilisateurs", to: "/utilisateurs", icon: BookUser, main: true },
];