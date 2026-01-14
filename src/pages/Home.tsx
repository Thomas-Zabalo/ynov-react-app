import ProjectCard from "../components/ProjectCard.tsx";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Calendar, CheckCircle2, Clock, Search} from "lucide-react";
import Hero from "../components/Hero.tsx";
import {useFetch} from "../hook/useFetch.ts";
import {projectService} from "../services/api.ts";


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
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 9;

    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        searchRef.current?.focus();
    }, []);

    const {data: projectList, loading: projectsLoading, error} = useFetch(() => projectService.getAll(), []);

    const loading = projectsLoading;

    const filteredProjects = useMemo(() => {
        return (projectList || []).filter(project =>
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [projectList, searchQuery]);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;

    const currentProjects = useMemo(() => {
        return filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    }, [filteredProjects, indexOfFirstProject, indexOfLastProject]);

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    const handlePrevPage = useCallback(() => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    }, []);

    const handleNextPage = useCallback(() => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    }, [totalPages]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    }, []);

    return (
        <div className="min-h-screen">

            <Hero
                title="Tous les projets"
                subtitle="Découvrez tous les projets en cours, planifiés ou complétés, et explorez les contributions de chaque membre."
            />

            <div className="mx-auto max-w-7xl px-8 py-12">

                <div className="mb-12">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                        <input
                            ref={searchRef}
                            type="text"
                            placeholder="Rechercher un projet..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full pl-12 pr-4 py-3 rounded-lg
                                   border border-gray-300 dark:border-gray-600
                                   bg-white dark:bg-gray-900 text-black dark:text-white
                                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <span className="ml-4 dark:text-white">Chargement des projets...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-24 text-red-500">{error}</div>
                ) : filteredProjects.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentProjects.map((project) => {
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

                        {totalPages > 1 && (
                            <div
                                className="flex flex-col md:flex-row justify-between items-center p-6">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                                    Affichage de <span
                                    className="font-semibold text-gray-900 dark:text-white">{indexOfFirstProject + 1}</span> à{' '}
                                    <span
                                        className="font-semibold text-gray-900 dark:text-white">{Math.min(indexOfLastProject, filteredProjects.length)}</span> sur{' '}
                                    <span
                                        className="font-semibold text-gray-900 dark:text-white">{filteredProjects.length}</span> projets
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                    >
                                        Précédent
                                    </button>
                                    <div className="flex items-center gap-1">
                                        {(() => {
                                            const maxPagesToShow = 3;
                                            let startPage = Math.max(currentPage - 1, 1);
                                            let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

                                            if (endPage - startPage + 1 < maxPagesToShow) {
                                                startPage = Math.max(endPage - maxPagesToShow + 1, 1);
                                            }

                                            const pagesToDisplay = [];
                                            for (let i = startPage; i <= endPage; i++) {
                                                pagesToDisplay.push(i);
                                            }

                                            return pagesToDisplay.map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`w-10 h-10 rounded-lg text-xs md:text-sm font-medium transition ${
                                                        currentPage === page
                                                            ? 'bg-indigo-500 text-white'
                                                            : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ));
                                        })()}
                                    </div>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                    >
                                        Suivant
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
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