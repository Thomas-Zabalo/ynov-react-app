import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {Briefcase, Mail, Search} from 'lucide-react';
import {allUsersData} from "../../data/usersMocks.ts";
import type { User } from "../../types";

export default function Utilisateurs() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Utilisateurs
                    </h1>
                    <p className="text-lg text-gray-600">
                        Gérez les membres de votre équipe
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex-1 w-full md:max-w-md relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                type="text"
                                placeholder="Rechercher un utilisateur..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Utilisateur</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Projets</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Inscription</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredUsers.map(user => {
                                const displayName = `${user.name} ${user.surname}`;
                                const projectsCount = Array.isArray(user.projects) ? user.projects.length : 0;

                                return (
                                    <tr
                                        key={user._id}
                                        onClick={() => navigate(`/utilisateurs/${user._id}`)}
                                        className="hover:bg-gray-50 transition cursor-pointer"
                                    >
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                                                    {displayName.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                {displayName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Mail className="w-4 h-4"/>
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-gray-400"/>
                                                <span className="text-sm font-medium text-gray-900">
                                                        {projectsCount}
                                                    </span>
                                                <span className="text-sm text-gray-500">
                                                        {projectsCount > 1 ? 'projets' : 'projet'}
                                                    </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user.joinDate}
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}