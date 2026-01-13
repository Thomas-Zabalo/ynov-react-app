import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {Briefcase, Mail, Search} from 'lucide-react';
import {allUsersData} from "../../data/usersMocks.ts";
import type {User} from "../../types";

export default function Utilisateurs() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setUsers(allUsersData);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const filteredUsers = users.filter(user => {
        const name = `${user.name} ${user.surname}`;
        const email = user.email || "";
        return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                        Utilisateurs
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Gérez les membres de votre équipe
                    </p>
                </div>

                <div
                    className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex-1 w-full md:max-w-md relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"/>
                            <input
                                type="text"
                                placeholder="Rechercher un utilisateur..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Utilisateur</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Projets</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">Inscription</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {currentUsers.map(user => {
                                const displayName = `${user.name} ${user.surname}`;
                                const projectsCount = Array.isArray(user.projects) ? user.projects.length : 0;

                                return (
                                    <tr
                                        key={user._id}
                                        onClick={() => navigate(`/utilisateurs/${user._id}`)}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
                                    >
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                                                    {displayName.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="truncate">{displayName}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 hidden md:table-cell">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4"/>
                                                {user.email}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-gray-400 dark:text-gray-500"/>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{projectsCount}</span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400 hidden md:inline">
                                                    {projectsCount > 1 ? 'projets' : 'projet'}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 hidden md:table-cell">
                                            {user.joinDate}
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex flex-col md:flex-row justify-between items-center p-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
                                Affichage de <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstUser + 1}</span> à{' '}
                                <span className="font-semibold text-gray-900 dark:text-white">{Math.min(indexOfLastUser, filteredUsers.length)}</span> sur{' '}
                                <span className="font-semibold text-gray-900 dark:text-white">{filteredUsers.length}</span> utilisateurs
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
                </div>
            </div>
        </div>
    );
}
