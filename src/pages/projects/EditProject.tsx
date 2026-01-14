import { useParams, useNavigate } from 'react-router';
import { type ChangeEvent, useEffect, useState } from 'react';
import { X, Save, FileText, Calendar, Users, Tag, BarChart3, Eye, Edit, ArrowLeft } from 'lucide-react';
import { projectService, userService } from "../../services/api.ts";
import type { Project } from "../../types";
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

const categories: ProjectCategory[] = ["Design", "Backend", "Developpement", "Infrastructure", "QA", "Documentation"];
const statuses: ProjectStatus[] = ["Planifié", "En cours", "Complété"];

export default function EditProject() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [previewMode, setPreviewMode] = useState(false);
    const [availableUsers, setAvailableUsers] = useState<any[]>([]);

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

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const [users, project, me] = await Promise.all([
                    userService.getAll(),
                    projectService.getById(id),
                    userService.getMe()
                ]);

                setAvailableUsers(users.filter((u: any) => u._id !== me._id));

                setFormData({
                    name: project.name,
                    description: project.description,
                    category: project.category,
                    status: project.status,
                    startDate: project.startDate.split('T')[0],
                    endDate: project.endDate.split('T')[0],
                    members: project.members
                        .map((m: any) => typeof m === 'string' ? m : m._id)
                        .filter((mId: string) => mId !== me._id),
                    detailedContent: project.detailedContent || ''
                });
            } catch (error) {
                console.error("Erreur de chargement:", error);
                navigate('/mes-projets');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id, navigate]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addMemberById = (userId: string) => {
        if (userId && !formData.members.includes(userId)) {
            setFormData(prev => ({ ...prev, members: [...prev.members, userId] }));
        }
    };

    const removeMember = (memberId: string) => {
        setFormData(prev => ({ ...prev, members: prev.members.filter(m => m !== memberId) }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.description || !formData.startDate || !formData.endDate) {
            alert('Veuillez remplir tous les champs obligatoires (*)');
            return;
        }

        try {
            if (!id) return;
            await projectService.update(id, formData as unknown as Partial<Project>);
            navigate('/mes-projets');
        } catch (error: any) {
            alert(error.message || "Erreur lors de la mise à jour");
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-5xl mx-auto px-6 md:px-8">

                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition font-medium">
                    <ArrowLeft className="w-4 h-4" /> Retour aux projets
                </button>

                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">Modifier le projet</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Mettez à jour les informations de votre projet</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400"/>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Informations générales</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nom du projet *</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description courte *</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition resize-none outline-none" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"><Tag className="w-4 h-4 inline mr-1"/>Catégorie *</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"><BarChart3 className="w-4 h-4 inline mr-1"/>Statut *</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                        {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Planning</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Date de début *</label>
                                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Date de fin *</label>
                                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>
                    </div>


                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                                <Users className="w-5 h-5 text-green-600 dark:text-green-400"/>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Équipe</h2>
                        </div>
                        <div className="space-y-4">
                            <select onChange={(e) => addMemberById(e.target.value)} value="" className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="" disabled>Ajouter un membre...</option>
                                {availableUsers.map(user => <option key={user._id} value={user._id}>{user.fullName || user.name}</option>)}
                            </select>
                            <div className="flex flex-wrap gap-2">
                                {formData.members.map((memberId) => {
                                    const user = availableUsers.find(u => u._id === memberId);
                                    return (
                                        <span key={memberId} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium text-sm border border-indigo-200 dark:border-indigo-800">
                                            {user?.fullName || user?.name || "Membre du projet"}
                                            <button onClick={() => removeMember(memberId)} className="hover:bg-indigo-100 dark:hover:bg-indigo-900 rounded p-0.5"><X className="w-3 h-3"/></button>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>


                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                    <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400"/>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Documentation détaillée</h2>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
                                <button onClick={() => setPreviewMode(false)} className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${!previewMode ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}><Edit className="w-4 h-4"/> Éditer</button>
                                <button onClick={() => setPreviewMode(true)} className={`px-4 py-2 text-sm font-medium transition flex items-center gap-2 ${previewMode ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}><Eye className="w-4 h-4"/> Prévisualiser</button>
                            </div>
                            {!previewMode ? (
                                <textarea name="detailedContent" value={formData.detailedContent} onChange={handleChange} rows={12} className="w-full px-4 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition resize-none font-mono outline-none" />
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
                        <button onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition">Annuler</button>
                        <button onClick={handleSubmit} className="px-6 py-2.5 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 flex items-center gap-2 shadow-lg shadow-indigo-500/30 transition">
                            <Save className="w-4 h-4"/> Enregistrer les modifications
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}