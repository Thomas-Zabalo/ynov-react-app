import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router';
import Menu from "./components/navigation/Menu.tsx";
import { FavoriteProvider } from "./provider/favoriteProvider.tsx";
import { ThemeProvider } from "./provider/themeProvider.tsx";
import { AuthProvider } from "./provider/authProvider.tsx";
import ProtectedRoute from "./routes/ProtectedRoutes.tsx";
import MockBadge from "./components/MockBadge.tsx";
import { lazy, Suspense } from "react";

// Lazy loading des pages
const Favorites = lazy(() => import("./pages/Favorites.tsx"));
const Error404 = lazy(() => import("./pages/404/Error404.tsx"));
const Home = lazy(() => import("./pages/Home.tsx"));
const Utilisateurs = lazy(() => import("./pages/user/Utilisateurs.tsx"));
const Login = lazy(() => import("./pages/connection/Login.tsx"));
const Register = lazy(() => import("./pages/connection/Register.tsx"));
const UtilisateurDetail = lazy(() => import("./pages/user/UtilisateurDetail.tsx"));
const ProjectDetail = lazy(() => import("./pages/projects/ProjectDetail.tsx"));
const AddProject = lazy(() => import("./pages/projects/AddProject.tsx"));
const EditProject = lazy(() => import("./pages/projects/EditProject.tsx"));
const Profil = lazy(() => import("./pages/user/Profil.tsx"));
const MyProject = lazy(() => import("./pages/projects/MyProject.tsx"));

export default function AppRouter() {
    return (
        <div className="isolate">
            <MockBadge />
            <main className="flex min-h-dvh flex-col bg-white dark:bg-gray-950">
                <div
                    className="relative isolate grid flex-1 grid-rows-[1fr_auto] overflow-clip grid-cols-[var(--sidebar-width)_var(--gutter-width)_auto_var(--gutter-width)] [--sidebar-width:0] 2xl:[--sidebar-width:--spacing(72)] [--gutter-width:--spacing(6)] 2xl:[--gutter-width:--spacing(10)]">
                    <div
                        className="col-start-2 row-span-full row-start-1 max-2xl:hidden border-x border-gray-200 dark:border-gray-800 bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,rgb(243_244_246)_0,rgb(243_244_246)_1px,transparent_0,transparent_50%)] dark:bg-[repeating-linear-gradient(315deg,rgb(31_41_55)_0,rgb(31_41_55)_1px,transparent_0,transparent_50%)]">
                    </div>

                    <div
                        className="col-start-4 row-span-full row-start-1 max-2xl:hidden border-x border-gray-200 dark:border-gray-800 bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,rgb(243_244_246)_0,rgb(243_244_246)_1px,transparent_0,transparent_50%)] dark:bg-[repeating-linear-gradient(315deg,rgb(31_41_55)_0,rgb(31_41_55)_1px,transparent_0,transparent_50%)]">
                    </div>
                    <Menu />
                    <div className="col-start-3 row-start-1 max-2xl:col-span-full max-2xl:col-start-1">
                        <div className="mx-auto mt-24 max-w-7xl 2xl:mt-20">
                            <Suspense fallback={
                                <div className="min-h-[50vh] flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                                </div>
                            }>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="login" element={<Login />} />
                                    <Route path="register" element={<Register />} />
                                    <Route path="utilisateurs" element={<Utilisateurs />} />
                                    <Route path="utilisateurs/:id" element={<UtilisateurDetail />} />
                                    <Route path="projets/:id" element={<ProjectDetail />} />
                                    <Route path="favoris" element={<Favorites />} />

                                    <Route element={<ProtectedRoute />}>
                                        <Route path="projets/nouveau" element={<AddProject />} />
                                        <Route path="projets/modifier/:id" element={<EditProject />} />
                                        <Route path="mon-profil" element={<Profil />} />
                                        <Route path="mes-projets" element={<MyProject />} />
                                    </Route>

                                    <Route path='*' element={<Error404 />} />
                                </Routes>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <AuthProvider>
            <FavoriteProvider>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </FavoriteProvider>
        </AuthProvider>
    </ThemeProvider>
);