import {createContext, useContext, useEffect, useState} from "react";
import * as React from "react";
import {favoriteService} from "../services/api.ts";

const IS_MOCK_MODE = import.meta.env.VITE_USE_MOCK === 'true';

const FavoriteContext = createContext<{
    favorites: string[],
    toggleFavorite: (id: string) => Promise<void>,
    refreshFavorites: () => Promise<void>
}>({
    favorites: [],
    toggleFavorite: async () => {},
    refreshFavorites: async () => {},
});

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);

    const loadFavorites = async () => {
        const currentToken = localStorage.getItem('token');

        if (IS_MOCK_MODE) {
            const saved = localStorage.getItem("favorites");
            if (saved) setFavorites(JSON.parse(saved));
        }
        else if (currentToken) {
            try {
                const data = await favoriteService.getAll(currentToken);
                const ids = (data || []).map((p: any) => String(p._id || p));
                setFavorites(ids);
            } catch (err) {
                console.error("Erreur chargement favoris API", err);
            }
        } else {
            setFavorites([]);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const refreshFavorites = async () => {
        await loadFavorites();
    };

    const toggleFavorite = async (id: string) => {
        const idStr = String(id);
        const isRemoving = favorites.includes(idStr);
        const currentToken = localStorage.getItem('token'); // Récupéré ici

        try {
            if (!IS_MOCK_MODE && currentToken) {
                await favoriteService.add(idStr, currentToken);
            }

            setFavorites(prev => {
                const newFavs = isRemoving
                    ? prev.filter(f => f !== idStr)
                    : [...prev, idStr];

                if (IS_MOCK_MODE) {
                    localStorage.setItem("favorites", JSON.stringify(newFavs));
                }
                return newFavs;
            });

        } catch (error) {
            console.error("Erreur lors du toggle favori:", error);
        }
    }

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite, refreshFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoriteContext);
}