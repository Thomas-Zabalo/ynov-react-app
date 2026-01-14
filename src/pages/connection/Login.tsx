import {useEffect, useState} from 'react';
import {AlertCircle, Eye, EyeOff, Github, Lock, Mail} from 'lucide-react';
import {Link, useNavigate} from 'react-router';
import Header from "../../components/navigation/Header.tsx";
import {useAuth} from "../../provider/authProvider.tsx";
import {favoriteService, userService} from "../../services/api.ts";
import {useFavorites} from "../../provider/favoriteProvider.tsx";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { refreshFavorites } = useFavorites();
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleGithubLogin = () => {
        window.location.href = 'http://localhost:4000/api/auth/github';
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            login(null, token);

            window.history.replaceState({}, document.title, window.location.pathname);

            refreshFavorites().then(() => {
                navigate('/mon-profil');
            });
        }
    }, [navigate, login, refreshFavorites]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await userService.login({ email, password });

            const localFavs = JSON.parse(localStorage.getItem('favorites') || '[]');

            if (localFavs.length > 0) {
                await favoriteService.sync(localFavs, data.token);
                localStorage.removeItem('favorites');
            }
            login(data.user, data.token);
            await refreshFavorites();
            navigate('/mon-profil');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-white dark:bg-gray-950 z-50 overflow-y-auto pt-20 pb-10">
            <Header/>
            <div className="min-h-full flex items-center justify-center p-6">
                <div
                    className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden relative w-full max-w-md p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Connexion</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Accédez à votre espace documents</p>
                    </div>

                    {error && (
                        <div
                            className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4"/>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <input
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    autoComplete="email"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mot de
                                passe</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mot de passe"
                                    autoComplete="current-password"
                                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg disabled:opacity-50 transition-all mt-4"
                        >
                            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </form>

                    <div className="relative my-6 text-center">
                        <span
                            className="px-2 bg-white dark:bg-gray-900 text-gray-500 text-xs uppercase font-bold tracking-widest relative z-10">Ou</span>
                        <div className="absolute top-1/2 w-full border-t border-gray-200 dark:border-gray-800"></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGithubLogin}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                        <Github className="w-5 h-5"/> GitHub
                    </button>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                        Nouveau sur cette plateforme ? <Link to="/register"
                                                             className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">S'inscrire</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}