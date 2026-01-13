import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, CheckCircle, Clock, Mail, MapPin, Calendar} from 'lucide-react';
import { allUsersData } from '../../data/usersMocks';
import { allProjectsData } from '../../data/projectsMock';

export default function UtilisateurDetail() {
    const { id } = useParams();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const foundUser = allUsersData.find(u => u._id === id);
            if (foundUser) {
                const userProjects = allProjectsData.filter(p =>
                    p.author === foundUser._id || (p.members?.includes(foundUser._id))
                );
                setUser({ ...foundUser, projects: userProjects });
            }
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!user) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950">
            <h2 className="text-lg font-medium text-gray-400">Utilisateur introuvable</h2>
            <Link to="/utilisateurs" className="mt-4 text-indigo-600 text-sm font-semibold">Retourner à la liste</Link>
        </div>
    );

    const displayName = user.fullName || user.name || "Utilisateur";
    const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <div className="max-w-5xl mx-auto px-6 py-12">

                <Link to="/utilisateurs" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition mb-16">
                    <ArrowLeft className="w-4 h-4" /> Retour
                </Link>

                <header className="flex flex-col md:flex-row gap-8 items-center md:items-start border-b border-gray-100 dark:border-gray-900 pb-12 mb-12">
                    <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-2xl font-bold text-gray-400 shrink-0">
                        {initials}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl font-bold mb-4">{displayName}</h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {user.email}</div>
                            {user.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {user.location}</div>}
                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Membre depuis {new Date(user.createdAt || Date.now()).getFullYear()}</div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-center px-4">
                            <div className="text-xl font-bold">{user.projects?.length || 0}</div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-400">Projets</div>
                        </div>
                    </div>
                </header>

                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Projets</h2>
                        <div className="h-px flex-1 bg-gray-100 dark:bg-gray-900"></div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {user.projects?.length > 0 ? (
                            user.projects.map((project: any) => (
                                <Link
                                    key={project._id}
                                    to={`/projets/${project._id}`}
                                    className="group p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex items-center justify-between"
                                >
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-lg group-hover:text-indigo-600 transition-colors">{project.name}</h3>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs text-gray-400 font-medium">{project.category}</span>
                                            <span className={`text-xs font-bold flex items-center gap-1.5 ${
                                                project.status === 'Complété' ? 'text-green-500' : 'text-indigo-500'
                                            }`}>
                                                {project.status === 'Complété' ? <CheckCircle className="w-3.5 h-3.5"/> : <Clock className="w-3.5 h-3.5"/>}
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowLeft className="w-5 h-5 rotate-180 text-gray-300 group-hover:text-indigo-600 transition-all" />
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm italic py-8">Aucun projet trouvé.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}