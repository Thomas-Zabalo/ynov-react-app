import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { AlertCircle, Mail, MapPin, Loader2, Calendar, Shield, User, Star } from 'lucide-react';
import { userService } from "../../services/api.ts";

export default function Profil() {
    const [me, setMe] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await userService.getMe();
                setMe(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center ">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Chargement de votre profil...</p>
        </div>
    );

    if (error || !me) return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 max-w-md">
                <AlertCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oups !</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "Impossible de charger vos données."}</p>
                <Link to="/login" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
                    Se reconnecter
                </Link>
            </div>
        </div>
    );

    const displayName = me.name || me.fullName || "Utilisateur";
    const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase();

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-6xl mx-auto px-6 md:px-8">

                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Mon Profil</h1>
                    <p className="text-gray-600 dark:text-gray-400">Gérez vos informations personnelles</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

                    <div className="lg:col-span-1">
                        <div className="h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm flex flex-col justify-center">
                            <div className="text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-4xl shadow-xl">
                                        {initials}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
                                        <Star className="w-5 h-5 text-white fill-white" />
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{displayName}</h2>

                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
                                    <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400"/>
                                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                        {me.role || "Membre"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-indigo-600" />
                                Informations personnelles
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                        <Mail className="w-4 h-4"/>
                                        <span className="text-xs font-semibold uppercase tracking-wider">Email</span>
                                    </div>
                                    <p className="text-gray-900 dark:text-white font-medium pl-6">{me.email}</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                        <MapPin className="w-4 h-4"/>
                                        <span className="text-xs font-semibold uppercase tracking-wider">Localisation</span>
                                    </div>
                                    <p className="text-gray-900 dark:text-white font-medium pl-6">{me.location || "France"}</p>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                        <Calendar className="w-4 h-4"/>
                                        <span className="text-xs font-semibold uppercase tracking-wider">Membre depuis</span>
                                    </div>
                                    <p className="text-gray-900 dark:text-white font-medium pl-6">
                                        {me.createdAt ? new Date(me.createdAt).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        }) : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}