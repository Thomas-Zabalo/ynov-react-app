import ProjectCard from "../components/ProjectCard.tsx";
import {useEffect, useState} from "react";
import type {Project} from "../types";
import {Calendar, CheckCircle2, Clock, Search} from "lucide-react";
import {allProjectsData} from "../data/projectsMock.ts";

const statusColors = {
    "Complété": {
        bg: "bg-green-50 dark:bg-green-900/30",
        text: "text-green-700 dark:text-green-400",
        icon: CheckCircle2
    },
    "En cours": {
        bg: "bg-blue-50 dark:bg-blue-900/30",
        text: "text-blue-700 dark:text-blue-400",
        icon: Clock
    },
    "Planifié": {
        bg: "bg-gray-100 dark:bg-gray-700",
        text: "text-gray-700 dark:text-gray-300",
        icon: Calendar
    },
};

export default function Home() {
    const [projectList, setProjectList] = useState<Project[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setProjectList(allProjectsData);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const filteredProjects = projectList.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="text-gray-900">
            Je suis la page d'accueil

            <div className="mx-auto max-w-7xl px-8 py-12">

                <div className="mb-8 relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    <input
                        type="text"
                        placeholder="Rechercher un projet..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <span className="ml-4 dark:text-white">Chargement des projets...</span>
                    </div>
                ) : filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => {
                            const statusKey = (project.status in statusColors) ? project.status : "Planifié";
                            const statusInfo = statusColors[statusKey as keyof typeof statusColors];

                            return (
                                <ProjectCard
                                    key={project._id}
                                    project={project}
                                    statusInfo={statusInfo}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Aucun projet ne correspond à votre recherche
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}