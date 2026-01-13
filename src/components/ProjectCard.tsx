import { Calendar, Users, Heart } from "lucide-react";
import {NavLink} from "react-router";
import {formatDate} from "../utils/dateFormatter.tsx";
import { useFavorites } from "../provider/favoriteProvider.tsx";

const categoryColors = {
    Design: "bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
    Backend: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    Developpement: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    Infrastructure: "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    QA: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    Documentation: "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
};

type ProjectCardProps = {
    project: any;
    statusInfo: {
        bg: string;
        text: string;
        icon: React.ElementType;
    };
};

export default function ProjectCard({ project, statusInfo }: ProjectCardProps) {
    const StatusIcon = statusInfo.icon;
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.includes(String(project._id));

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(project._id);
    };

    return (
        <NavLink
            to={`/documents/${project._id}`}
            className="block group relative bg-white dark:bg-gray-900 rounded-lg
                       border border-gray-200 dark:border-gray-700 p-6
                       hover:shadow-lg transition-all duration-300 text-left"
        >
            <div className="flex items-start justify-between mb-4">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${categoryColors[project.category as keyof typeof categoryColors]}`}
                >
                    {project.category}
                </span>

                <button
                    onClick={handleToggleFavorite}
                    className="p-1 rounded-full bg-white dark:bg-gray-800
                               hover:scale-110 transition"
                    aria-label="Ajouter aux favoris"
                >
                    <Heart
                        className={`w-5 h-5 ${
                            isFavorite
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400 hover:text-red-500"
                        }`}
                    />
                </button>
            </div>

            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white group-hover:text-indigo-600 transition">
                {project.name}
            </h3>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {project.description}
            </p>

            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span> {formatDate(project.startDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{project.members?.length || 0}</span>
                </div>
            </div>

            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                ${statusInfo.bg} ${statusInfo.text} text-xs font-semibold`}>
                <StatusIcon className="w-3.5 h-3.5" />
                {project.status}
            </div>
        </NavLink>
    );
}
