import {Link, useLocation, useParams} from "react-router";
import {ArrowLeft, Calendar, CheckCircle2, Clock, FileText, User, Users} from 'lucide-react';
import {useFetch} from "../../hook/useFetch.ts";
import type {Project} from "../../types";
import {formatDate} from "../../utils/dateFormatter.tsx";
import {projectService} from "../../services/api.ts";

const categoryColors = {
    Design: "bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
    Backend: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    Developpement: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    Infrastructure: "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    QA: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    Documentation: "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
};

const statusColors = {
    "Complété": {
        bg: "bg-green-50 dark:bg-green-900/30",
        text: "text-green-700 dark:text-green-400",
        icon: CheckCircle2
    },
    "En cours": {bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", icon: Clock},
    "Planifié": {bg: "bg-gray-100 dark:bg-gray-700", text: "text-gray-700 dark:text-gray-300", icon: Calendar},
};

export default function ProjectDetail() {
    const {id} = useParams<{ id: string }>();
    const location = useLocation();

    const {data: project, loading, error} = useFetch<Project>(() => projectService.getById(id!), [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );

    if (error || !project) return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Projet introuvable</h2>
            <Link to="/" className="mt-4 text-indigo-600 hover:underline">Retour à l'accueil</Link>
            {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
    );

    const parseMarkdown = (text: string = "") => {
        if (!text) return <p className="text-gray-500 italic">Aucune documentation détaillée disponible.</p>;

        return text.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
                return (
                    <h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 first:mt-0">
                        {line.replace('## ', '')}
                    </h2>
                );
            }
            if (line.trim()) {
                return (
                    <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {line}
                    </p>
                );
            }
            return <div key={i} className="h-2"/>;
        });
    };

    const members = project.members || [];
    const author = project.author;

    const statusInfo = statusColors[project.status as keyof typeof statusColors] || statusColors["Planifié"];
    const StatusIcon = statusInfo.icon;
    const backLink = location.state?.from || "/";

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 md:px-8 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">

                <Link
                    to={backLink}
                    className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-semibold mb-6 sm:mb-8"
                >
                    <ArrowLeft className="w-4 h-4"/>
                    Retour à la liste
                </Link>

                <div className="mb-6 sm:mb-10">
                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
        <span
            className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${categoryColors[project.category as keyof typeof categoryColors] || "bg-gray-100"}`}>
          {project.category}
        </span>
                        <div
                            className={`inline-flex items-center gap-1 sm:gap-2 px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${statusInfo.bg} ${statusInfo.text}`}>
                            <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4"/>
                            {project.status}
                        </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
                        {project.name}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        {project.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="lg:col-span-1 flex flex-col gap-4 sm:gap-6">
                        <div
                            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-3 sm:p-5 shadow-sm">
                            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 sm:mb-4 flex items-center gap-1 sm:gap-2 text-gray-900 dark:text-white">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600"/>
                                Calendrier
                            </h3>
                            <div className="space-y-2 sm:space-y-3">
                                <div className="bg-gray-50 dark:bg-gray-800 p-2 sm:p-3 rounded-lg">
                                    <p className="text-[9px] sm:text-xs text-gray-500 mb-1 font-medium">Début</p>
                                    <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{formatDate(project.startDate)}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 p-2 sm:p-3 rounded-lg">
                                    <p className="text-[9px] sm:text-xs text-gray-500 mb-1 font-medium">Fin</p>
                                    <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{formatDate(project.endDate)}</p>
                                </div>
                            </div>
                        </div>

                        {author && (
                            <div
                                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-3 sm:p-5 shadow-sm">
                                <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 sm:mb-4 flex items-center gap-1 sm:gap-2 text-gray-900 dark:text-white">
                                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600"/> Auteur
                                </h3>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{author.name} {author.surname}</p>
                            </div>
                        )}

                        {members.length > 0 && (
                            <div
                                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-3 sm:p-5 shadow-sm">
                                <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide mb-4 flex items-center justify-between text-gray-900 dark:text-white">
                                    <span className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-indigo-600"/> Équipe
                                    </span>
                                    <span
                                        className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-gray-500">
                                        {members.length}
                                    </span>
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {members.map((member) => {
                                        const initials = `${member.name[0]}${member.surname[0]}`.toUpperCase();
                                        return (
                                            <Link
                                                key={member._id}
                                                to={`/utilisateurs/${member._id}`}
                                                className="group relative"
                                            >
                                                <div
                                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-[10px] sm:text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all duration-200">
                                                    {initials}
                                                </div>

                                                <span
                                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-10">
                                                    {member.name} {member.surname}
                                                 </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-3">
                        <div
                            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 shadow-sm overflow-x-auto">
                            <div
                                className="flex items-center gap-2 mb-4 sm:mb-6 border-b border-gray-100 dark:border-gray-800 pb-2 sm:pb-4">
                                <div className="p-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400"/>
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Documentation
                                    du projet</h2>
                            </div>
                            <div className="prose prose-sm sm:prose base prose-gray dark:prose-invert max-w-none">
                                {parseMarkdown(project.detailedContent)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}