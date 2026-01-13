import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Trash2, Edit3, AlertTriangle, Briefcase, ArrowRight, Plus, Search } from 'lucide-react';
import { projectService, userService } from "../../services/api.ts";
import type { Project } from "../../types";
import { useNavigate } from 'react-router';

export default function MyProject() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchMyProjects = async () => {
            try {
                setLoading(true);
                const me = await userService.getMe();
                const allProjects = await projectService.getAll();

                const myOwnProjects = allProjects.filter(p => {
                    if (typeof p.author === 'string') {
                        return p.author === me._id;
                    }

                    return p.author?._id === me._id;
                });

                setProjects(myOwnProjects);
            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyProjects();
    }, []);

    const handleDelete = async () => {
        if (!projectToDelete) return;
        try {
            await projectService.delete(projectToDelete._id);
            setProjects(prev => prev.filter(p => p._id !== projectToDelete._id));
            setShowModal(false);
            setProjectToDelete(null);
        } catch (error) {
            console.error("Erreur suppression:", error);
            alert("Erreur lors de la suppression");
        }
    };

    const getStatusStyle = (status: string) => {
        const styles: any = {
            'Complété': 'bg-green-100 text-green-700 border-green-200',
            'En cours': 'bg-blue-100 text-blue-700 border-blue-200',
            'Planifié': 'bg-gray-100 text-gray-700 border-gray-200'
        };
        return styles[status] || styles['Planifié'];
    };

    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-6 md:px-8">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Mes Projets</h1>
                        <p className="text-gray-600 dark:text-gray-400">Gérez et suivez l'avancement de vos travaux</p>
                    </div>
                    <Link to="/projets/nouveau" className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md w-fit font-medium">
                        <Plus className="w-5 h-5" /> Nouveau Projet
                    </Link>
                </div>

                <div className="relative mb-8">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher un projet..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-gray-400 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <Link
                                key={project._id}
                                to={`/documents/${project._id}`}
                                className="flex flex-col bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all group relative"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                        <Briefcase className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(project.status)}`}>
                                        {project.status}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600">
                                    {project.name}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-6 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex gap-1">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/projets/modifier/${project._id}`);
                                            }}
                                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                                        >
                                            <Edit3 className="w-5 h-5" />
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setProjectToDelete(project);
                                                setShowModal(true);
                                            }}
                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-white dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">Aucun projet trouvé.</p>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-4 text-red-600 mb-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold">Supprimer le projet ?</h3>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Êtes-vous sûr de vouloir supprimer <span className="font-semibold text-gray-900 dark:text-white">"{projectToDelete?.name}"</span> ?
                            Cette action est définitive.
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md shadow-red-500/20 transition"
                            >
                                Oui, supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}