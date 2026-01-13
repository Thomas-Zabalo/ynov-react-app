import { createContext, useContext, useState } from "react";
import * as React from "react";

const FavoriteContext = createContext<{
    favorites: string[],
    toggleFavorite: (id: string | number) => void
}>({
    favorites: [],
    toggleFavorite: () => {},
});

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>(() => {
        const saved = localStorage.getItem("favorites");
        if (!saved) return [];

        const parsed = JSON.parse(saved);
        return parsed.map((id: any) => String(id));
    });

    const toggleFavorite = (id: string | number) => {
        const idStr = String(id);

        setFavorites(prev => {
            let newFavs;
            if (prev.includes(idStr)) {
                newFavs = prev.filter(f => f !== idStr);
            } else {
                newFavs = [...prev, idStr];
            }
            localStorage.setItem("favorites", JSON.stringify(newFavs));
            return newFavs;
        });
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