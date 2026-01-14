import {NavLink, useNavigate} from "react-router";
import {menuItems} from "../../data/menu.ts";
import {useCallback, useMemo, useState} from "react";
import {LogOut, Menu as MenuIcon, Moon, Sun, X} from "lucide-react";
import {useTheme} from "../../provider/themeProvider.tsx";
import {useAuth} from "../../provider/authProvider.tsx";
import {favoriteService} from "../../services/api.ts";

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const {theme, setTheme} = useTheme();
    const {token, logout} = useAuth();
    const navigate = useNavigate();

    const isAuthenticated = !!token;

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(theme === "dark" ? "light" : "dark");
    }, [theme, setTheme]);

    const handleLogout = useCallback(() => {
        favoriteService.clear();
        logout();
        closeMenu();
        navigate('/');
        window.location.reload();
    }, [logout, navigate]);

    const { mainItems, bottomItems } = useMemo(() => {
        const filtered = menuItems.filter(item => {
            if (item.isPrivate && !isAuthenticated) return false;
            if (item.isGuest && isAuthenticated) return false;
            return true;
        });

        return {
            mainItems: filtered.filter(item => item.main),
            bottomItems: filtered.filter(item => !item.main)
        };
    }, [isAuthenticated]);

    return (
        <>
            {!isOpen && (
                <button
                    onClick={toggleMenu}
                    className="fixed top-4 left-4 z-50 p-2 rounded-md bg-black/5 hover:bg-black/10 text-gray-900 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white max-2xl:block hidden"
                >
                    <MenuIcon className="w-6 h-6"/>
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 max-2xl:block hidden" onClick={closeMenu}/>
            )}

            <div
                className={`col-start-1 row-span-2 row-start-1 transition-all duration-300 max-2xl:fixed max-2xl:left-0 max-2xl:top-0 max-2xl:h-dvh max-2xl:z-40 max-2xl:w-64 ${
                    isOpen ? "max-2xl:translate-x-0" : "max-2xl:-translate-x-full"
                }`}>
                <div
                    className="sticky top-0 z-50 flex h-full max-h-dvh flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">

                    <div
                        className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                        <NavLink to="/" onClick={closeMenu}
                                 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Ynov react app
                        </NavLink>
                        <button onClick={closeMenu} className="max-2xl:block hidden text-gray-900 dark:text-white">
                            <X className="w-5 h-5"/>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <ul className="flex flex-col gap-y-2 list-none">
                            {mainItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.to}>
                                        <NavLink
                                            to={item.to}
                                            onClick={closeMenu}
                                            className={({isActive}) =>
                                                `flex items-center gap-x-3 p-2 rounded-md text-sm font-semibold transition-colors ${
                                                    isActive
                                                        ? "bg-black/5 dark:bg-white/5 text-gray-900 dark:text-white"
                                                        : "text-gray-600 dark:text-gray-500 hover:bg-black/5 dark:hover:bg-white/5"
                                                }`
                                            }
                                        >
                                            <Icon className="w-6 h-6" strokeWidth={1.5}/>
                                            {item.name}
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="mt-auto">
                        <div className="p-4">
                            <button onClick={toggleTheme}
                                    className="w-full flex items-center gap-x-3 p-2 rounded-md text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 transition">
                                {theme === "dark" ? <><Sun className="w-6 h-6"/> Mode clair</> : <><Moon
                                    className="w-6 h-6"/> Mode sombre</>}
                            </button>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                            <ul className="flex flex-col gap-y-1 list-none">
                                {bottomItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <li key={item.to}>
                                            <NavLink to={item.to} onClick={closeMenu}
                                                     className="flex items-center gap-x-3 p-2 rounded-md text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 transition">
                                                <Icon className="w-6 h-6" strokeWidth={1.5}/>
                                                {item.name}
                                            </NavLink>
                                        </li>
                                    );
                                })}

                                {isAuthenticated && (
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-x-3 p-2 rounded-md text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition"
                                        >
                                            <LogOut className="w-6 h-6" strokeWidth={1.5}/>
                                            Déconnexion
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}