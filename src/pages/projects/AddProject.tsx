import type {Project} from "../../types";
import {type ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {BarChart3, Calendar, Edit, Eye, FileText, Save, Tag, Users, X} from 'lucide-react';
import {projectService, userService} from "../../services/api.ts";
import {useNavigate} from "react-router";
import {useAuth} from "../../provider/authProvider.tsx";
import MarkdownViewer from "../../components/MarkdownViewer.tsx";

type ProjectCategory = Project['category'];
type ProjectStatus = Project['status'];

interface ProjectFormData {
    name: string;
    description: string;
    category: ProjectCategory;
    status: ProjectStatus;
    startDate: string;
    endDate: string;
    members: string[];
    detailedContent: string;
}

const categories = ["Design", "Backend", "Développement", "Infrastructure", "QA", "Documentation"];
const statuses = ["Planifié", "En cours", "Complété"];

export default function AddProject() {
    const navigate = useNavigate();
    const {user} = useAuth();

    const [formData, setFormData] = useState<ProjectFormData>({
        name: '',
        description: '',
        category: 'Design',
        status: 'Planifié',
        startDate: '',
        endDate: '',
        members: [],
        detailedContent: ''
    });

    const [previewMode, setPreviewMode] = useState(false);
    const [availableUsers, setAvailableUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const [users, me] = await Promise.all([
                    userService.getAll(),
                    userService.getMe()
                ]);
                setAvailableUsers(users.filter((u: any) => u._id !== me._id));
            } catch (error) {
                console.error("Erreur chargement utilisateurs", error);
            }
        };
        fetchUsers();
    }, [user]);

    const usersMap = useMemo(() => {
        const map = new Map();
        availableUsers.forEach(u => map.set(u._id, u));
        return map;
    }, [availableUsers]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }, []);

    const addMemberById = useCallback((userId: string) => {
        if (userId && !formData.members.includes(userId)) {
            setFormData(prev => ({
                ...prev,
                members: [...prev.members, userId]
            }));
        }
    }, [formData.members]);

    const removeMember = useCallback((memberToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.filter(m => m !== memberToRemove)
        }));
    }, []);

    const handleSubmit = async () => {
        if (!formData.name || !formData.description || !formData.startDate || !formData.endDate) {
            alert('Veuillez remplir tous les champs obligatoires (*)');
            return;
        }

        try {
            await projectService.create(formData as unknown as Partial<Project>);
            navigate('/');
        } catch (error: any) {
            alert(error.message || "Erreur lors de la création");
        }
    };

    const insertMarkdownTemplate = useCallback(() => {
        const template = `## À propos du projet

Décrivez ici le contexte et les motivations derrière ce projet. Pourquoi avez-vous lancé ce projet ? Quels problèmes cherche-t-il à résoudre ?

## Objectifs

Listez les principaux objectifs que vous souhaitez atteindre avec ce projet.

## Processus de développement

Expliquez comment le projet a été ou sera développé. Quelle méthodologie utilisez-vous ? Quelles sont les différentes phases ?

## Défis techniques

Décrivez les principaux défis techniques rencontrés ou anticipés. Comment comptez-vous les résoudre ?

## Technologies utilisées

Listez les technologies, frameworks, et outils utilisés dans ce projet.

## Résultats attendus

Quels sont les résultats que vous espérez obtenir à la fin du projet ? Comment mesurerez-vous le succès ?`;

        setFormData(prev => ({...prev, detailedContent: template}));
    }, []);

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-5xl mx-auto px-6 md:px-8">

                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                        Nouveau projet
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Ajoutez un nouveau projet à votre portfolio
                    </p>
                </div>

                <div className="space-y-6">

                    <div
                        className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400"/>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Informations générales</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Nom du projet *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ex: Refonte UI Dashboard"
                                    className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Description courte *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Résumé en 1-2 phrases du projet..."
                                    className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"/>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label
                                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        <Tag className="w-4 h-4 inline mr-1"/>
                                        Catégorie *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        <BarChart3 className="w-4 h-4 inline mr-1"/>
                                        Statut *
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Planning</h2>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label
                                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Date de début *
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-700"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Date de fin *
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                                <Users className="w-5 h-5 text-green-600 dark:text-green-400"/>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Équipe</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <select
                                    onChange={(e) => addMemberById(e.target.value)}
                                    value=""
                                    className="flex-1 px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="" disabled>Sélectionner un membre de l'équipe...</option>
                                    {availableUsers.map(user => (
                                        <option key={user._id} value={user._id}>
                                            {user.fullName || user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {formData.members.map((memberId) => {
                                    const user = usersMap.get(memberId);
                                    return (
                                        <span key={memberId}
                                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium text-sm border border-indigo-200 dark:border-indigo-800">
                    {user?.fullName || user?.name || "Chargement..."}
                                            <button onClick={() => removeMember(memberId)}
                                                    className="hover:bg-indigo-100 rounded p-0.5">
                        <X className="w-3 h-3"/>
                    </button>
                </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                    <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400"/>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Documentation
                                    détaillée</h2>
                            </div>
                            <button
                                onClick={insertMarkdownTemplate}
                                className="text-sm px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 font-medium hover:bg-amber-100 dark:hover:bg-amber-900/30 transition"
                            >
                                Insérer template
                            </button>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Décrivez en détail votre projet (objectifs, processus, défis, résultats...). Vous pouvez
                                utiliser le markdown: ## pour les titres.
                            </p>

                            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
                                <button
                                    onClick={() => setPreviewMode(false)}
                                    className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${
                                        !previewMode
                                            ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                                >
                                    <Edit className="w-4 h-4"/>
                                    Éditer
                                </button>
                                <button
                                    onClick={() => setPreviewMode(true)}
                                    className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${
                                        previewMode
                                            ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                                >
                                    <Eye className="w-4 h-4"/>
                                    Prévisualiser
                                </button>
                            </div>

                            {!previewMode ? (
                                <textarea
                                    name="detailedContent"
                                    value={formData.detailedContent}
                                    onChange={handleChange}
                                    rows={15}
                                    placeholder="## À propos du projet&#10;&#10;Décrivez votre projet en détail...&#10;&#10;## Objectifs&#10;&#10;..."
                                    className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none font-mono"
                                />
                            ) : (
                                <div
                                    className="w-full min-h-[400px] px-6 py-6 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto shadow-inner">
                                    {formData.detailedContent ? (
                                        <MarkdownViewer content={formData.detailedContent}/>
                                    ) : (
                                        <p className="text-gray-400 italic text-center mt-10">
                                            Rien à prévisualiser pour le moment...
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-end">
                        <button
                            onClick={() => window.history.back()}
                            className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="rounded-md bg-indigo-600 dark:bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 dark:hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500 flex items-center gap-2 shadow-lg shadow-indigo-500/30"
                        >
                            <Save className="w-4 h-4"/>
                            Enregistrer le projet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}