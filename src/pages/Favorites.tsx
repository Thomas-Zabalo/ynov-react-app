import {useFavorites} from "../provider/favoriteProvider.tsx";
import ProjectCard from "../components/ProjectCard.tsx";
import {Calendar, CheckCircle2, Clock, Heart} from "lucide-react";
import Hero from "../components/Hero.tsx";
import {useEffect, useState} from "react";
import {allProjectsData} from "../data/projectsMock.ts"

const statusColors = {
    "Complété": {
        bg: "bg-green-50 dark:bg-green-900/30",
        text: "text-green-700 dark:text-green-400",
        icon: CheckCircle2
    },
    "En cours": {bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", icon: Clock},
    "Planifié": {bg: "bg-gray-100 dark:bg-gray-700", text: "text-gray-700 dark:text-gray-300", icon: Calendar},
};

export default function Favorites() {
    const {favorites} = useFavorites();
    const [allProjects, setAllProjects] = useState<typeof allProjectsData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setAllProjects(allProjectsData);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const favoriteProjects = allProjects.filter(project =>
        favorites.includes(String(project._id))
    );

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Hero title="Mes favoris"/>

            {favoriteProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-6">
                    <div
                        className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
                        <Heart className="w-10 h-10 text-gray-400"/>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Aucun favori pour le moment
                    </h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                    {favoriteProjects.map((project) => {
                        const statusInfo = statusColors[project.status as keyof typeof statusColors] || statusColors["Planifié"];
                        return (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                statusInfo={statusInfo}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    );
}