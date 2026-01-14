import {createContext, useContext, useEffect, useState} from "react";
import * as React from "react";
import {favoriteService} from "../services/api.ts";

const FavoriteContext = createContext<{
    favorites: string[],
    toggleFavorite: (id: string) => void
}>({
    favorites: [],
    toggleFavorite: () => {},
});

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const loadFavorites = async () => {
            if (token) {
                try {
                    const projects = await favoriteService.getAll(token);

                    const stringIds = projects.map((proj: any) =>
                        proj._id?.$oid ? String(proj._id.$oid) : String(proj._id)
                    );

                    setFavorites(stringIds);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        loadFavorites();
    }, [token]);

    const toggleFavorite = async (projectId: string) => {
        if (token) {
            try {
                await favoriteService.add(projectId, token);

                setFavorites(prev =>
                    prev.includes(projectId)
                        ? prev.filter(id => id !== projectId)
                        : [...prev, projectId]
                );
            } catch (err) {
                console.error("Erreur toggle favoris API", err);
            }
        } else {
            const newFavs = favorites.includes(projectId)
                ? favorites.filter(id => id !== projectId)
                : [...favorites, projectId];

            setFavorites(newFavs);
            localStorage.setItem('favorites', JSON.stringify(newFavs));
        }
    };

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoriteContext);
}