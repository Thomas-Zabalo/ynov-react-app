export const allProjectsData = [
    {
        _id: "1",
        name: "Refonte UI Dashboard",
        description: "Redesign complet de l'interface utilisateur du dashboard principal avec une nouvelle palette de couleurs et de meilleures animations.",
        category: "Design",
        status: "Complété",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-03-10"),
        author: {
            _id: "1",
            name: "Sophie",
            surname: "Martin",
            email: "sophie.martin@example.com"
        },
        members: [
            { _id: "1", name: "Sophie", surname: "Martin" },
            { _id: "6", name: "Lucas", surname: "Petit" },
            { _id: "11", name: "Chloé", surname: "Mercier" },
            { _id: "16", name: "Gabriel", surname: "Richard" },
            { _id: "21", name: "Sarah", surname: "Dupont" },
            { _id: "26", name: "Thomas", surname: "Morel" },
            { _id: "31", name: "Marc", surname: "Dupuis" },
            { _id: "35", name: "Lucas", surname: "Gomez" },
            { _id: "39", name: "Nicolas", surname: "Petit" },
            { _id: "43", name: "Maxime", surname: "Gauthier" },
            { _id: "47", name: "Thomas", surname: "Rousseau" },
            { _id: "51", name: "Lucas", surname: "Giraud" },
            { _id: "55", name: "Hugo", surname: "Pons" },
            { _id: "59", name: "Nicolas", surname: "David" }
        ],
        detailedContent: `## À propos du projet\n\nCe projet de refonte UI représente une transformation majeure...`
    },
    {
        _id: "2",
        name: "API REST Utilisateurs",
        description: "Développement d'une nouvelle API REST pour la gestion des utilisateurs avec authentification JWT.",
        category: "Backend",
        status: "En cours",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-04-15"),
        author: {
            _id: "1",
            name: "Sophie",
            surname: "Martin",
            email: "sophie.martin@example.com"
        },
        members: [
            { _id: "1", name: "Sophie", surname: "Martin" },
            { _id: "7", name: "Emma", surname: "Morel" },
            { _id: "12", name: "Maxime", surname: "Blanc" },
            { _id: "17", name: "Anaïs", surname: "Perrin" },
            { _id: "21", name: "Sarah", surname: "Dupont" },
            { _id: "27", name: "Clément", surname: "Fabre" },
            { _id: "32", name: "Julie", surname: "Noir" },
            { _id: "35", name: "Lucas", surname: "Gomez" },
            { _id: "40", name: "Manon", surname: "Richard" },
            { _id: "43", name: "Maxime", surname: "Gauthier" },
            { _id: "48", name: "Camille", surname: "Marchal" },
            { _id: "51", name: "Lucas", surname: "Giraud" },
            { _id: "56", name: "Sarah", surname: "Guillot" },
            { _id: "60", name: "Laura", surname: "Lecomte" }
        ],
        detailedContent: `## Contexte du projet\n\nNotre ancienne API utilisateur commençait à montrer ses limites...`
    },
    {
        _id: "3",
        name: "Migration Base de Données",
        description: "Migration de PostgreSQL vers MongoDB pour améliorer la scalabilité.",
        category: "Infrastructure",
        status: "En cours",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-05-15"),
        author: {
            _id: "2",
            name: "Thomas",
            surname: "Dubois",
            email: "thomas.dubois@example.com"
        },
        members: [
            { _id: "2", name: "Thomas", surname: "Dubois" },
            { _id: "7", name: "Emma", surname: "Morel" },
            { _id: "12", name: "Maxime", surname: "Blanc" },
            { _id: "17", name: "Anaïs", surname: "Perrin" },
            { _id: "22", name: "Romain", surname: "Colin" },
            { _id: "26", name: "Thomas", surname: "Morel" },
            { _id: "28", name: "Élodie", surname: "Noël" },
            { _id: "32", name: "Julie", surname: "Noir" },
            { _id: "36", name: "Clara", surname: "Marchand" },
            { _id: "40", name: "Manon", surname: "Richard" },
            { _id: "44", name: "Léa", surname: "Fontaine" },
            { _id: "47", name: "Thomas", surname: "Rousseau" },
            { _id: "52", name: "Chloé", surname: "Dupont" },
            { _id: "56", name: "Sarah", surname: "Guillot" },
            { _id: "59", name: "Nicolas", surname: "David" }
        ],
        detailedContent: `## Pourquoi cette migration ?\n\nAméliorer les performances globales...`
    },
    {
        _id: "4",
        name: "Système de Notifications",
        description: "Implémentation d'un système de notifications en temps réel avec WebSockets et notifications push.",
        category: "Developpement",
        status: "Planifié",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2024-06-15"),
        author: { _id: "3", name: "Marie", surname: "Laurent", email: "marie.laurent@example.com" },
        members: [
            { _id: "3", name: "Marie", surname: "Laurent" },
            { _id: "8", name: "Nathan", surname: "Roux" },
            { _id: "13", name: "Léa", surname: "Faure" },
            { _id: "18", name: "Julien", surname: "Lefebvre" },
            { _id: "23", name: "Inès", surname: "Bertrand" },
            { _id: "33", name: "Alex", surname: "Carpentier" },
            { _id: "45", name: "Julien", surname: "Legrand" }
        ],
        detailedContent: `## Vision du projet\n\nLes utilisateurs demandent un système plus réactif...`
    },
    {
        _id: "5",
        name: "Tests Automatisés E2E",
        description: "Mise en place de tests end-to-end avec Cypress pour couvrir les principaux workflows de l'application.",
        category: "QA",
        status: "En cours",
        startDate: new Date("2024-02-10"),
        endDate: new Date("2024-04-20"),
        author: { _id: "3", name: "Marie", surname: "Laurent", email: "marie.laurent@example.com" },
        members: [
            { _id: "3", name: "Marie", surname: "Laurent" },
            { _id: "10", name: "Louis", surname: "Gautier" },
            { _id: "14", name: "Alexandre", surname: "Henry" },
            { _id: "19", name: "Camille", surname: "Giraud" },
            { _id: "42", name: "Inès", surname: "Favier" },
            { _id: "58", name: "Élodie", surname: "Brun" }
        ],
        detailedContent: `## Contexte et motivation\n\nNotre application a grandi rapidement...`
    },
    {
        _id: "6",
        name: "Documentation Technique",
        description: "Rédaction complète de la documentation technique pour tous les modules et APIs de l'application.",
        category: "Documentation",
        status: "Complété",
        startDate: new Date("2023-12-01"),
        endDate: new Date("2024-02-15"),
        author: { _id: "5", name: "Julie", surname: "Bernard", email: "julie.bernard@example.com" },
        members: [
            { _id: "5", name: "Julie", surname: "Bernard" },
            { _id: "10", name: "Louis", surname: "Gautier" },
            { _id: "15", name: "Manon", surname: "Lemoine" },
            { _id: "20", name: "Antoine", surname: "Garcia" },
            { _id: "25", name: "Océane", surname: "Robin" },
            { _id: "30", name: "Laura", surname: "Fernandez" },
            { _id: "54", name: "Océane", surname: "Barbier" }
        ],
        detailedContent: `## Documentation\n\nCentralisation du savoir technique...`
    },
    {
        _id: "7",
        name: "Refonte Mobile App",
        description: "Amélioration de l'application mobile pour Android et iOS avec nouvelles fonctionnalités UX/UI.",
        category: "Design",
        status: "Planifié",
        startDate: new Date("2024-05-01"),
        endDate: new Date("2024-08-01"),
        author: { _id: "1", name: "Sophie", surname: "Martin", email: "sophie.martin@example.com" },
        members: [
            { _id: "1", name: "Sophie", surname: "Martin" },
            { _id: "6", name: "Lucas", surname: "Petit" },
            { _id: "11", name: "Chloé", surname: "Mercier" },
            { _id: "16", name: "Gabriel", surname: "Richard" }
        ],
        detailedContent: `## Objectif\n\nModerniser l'application mobile pour offrir une meilleure expérience utilisateur...`
    },
    {
        _id: "8",
        name: "Optimisation Backend",
        description: "Refactorisation des endpoints backend et optimisation des performances pour les requêtes lourdes.",
        category: "Backend",
        status: "En cours",
        startDate: new Date("2024-03-20"),
        endDate: new Date("2024-05-30"),
        author: { _id: "2", name: "Thomas", surname: "Dubois", email: "thomas.dubois@example.com" },
        members: [
            { _id: "2", name: "Thomas", surname: "Dubois" },
            { _id: "5", name: "Julie", surname: "Bernard" },
            { _id: "18", name: "Julien", surname: "Lefebvre" },
            { _id: "27", name: "Clément", surname: "Fabre" },
            { _id: "33", name: "Alex", surname: "Carpentier" }
        ],
        detailedContent: `## Contexte\n\nLes performances backend nécessitent une amélioration suite à l'augmentation du trafic...`
    },
    {
        _id: "9",
        name: "Infrastructure Cloud",
        description: "Mise à niveau de l'infrastructure cloud pour supporter la scalabilité et la haute disponibilité.",
        category: "Infrastructure",
        status: "Planifié",
        startDate: new Date("2024-06-01"),
        endDate: new Date("2024-09-01"),
        author: { _id: "1", name: "Sophie", surname: "Martin", email: "sophie.martin@example.com" },
        members: [
            { _id: "1", name: "Sophie", surname: "Martin" },
            { _id: "4", name: "Pierre", surname: "Moreau" },
            { _id: "8", name: "Nathan", surname: "Roux" },
            { _id: "12", name: "Maxime", surname: "Blanc" },
            { _id: "24", name: "Hugo", surname: "Moulin" }
        ],
        detailedContent: `## Vision\n\nAméliorer l'infrastructure cloud pour répondre aux besoins de croissance de l'application...`
    },
    {
        _id: "10",
        name: "Automatisation des Tests QA",
        description: "Création de scripts d'automatisation pour réduire les tests manuels et accélérer le cycle QA.",
        category: "QA",
        status: "En cours",
        startDate: new Date("2024-04-05"),
        endDate: new Date("2024-06-10"),
        author: { _id: "2", name: "Thomas", surname: "Dubois", email: "thomas.dubois@example.com" },
        members: [
            { _id: "2", name: "Thomas", surname: "Dubois" },
            { _id: "5", name: "Julie", surname: "Bernard" },
            { _id: "9", name: "Clara", surname: "Fournier" },
            { _id: "15", name: "Manon", surname: "Lemoine" },
            { _id: "21", name: "Sarah", surname: "Dupont" },
            { _id: "30", name: "Laura", surname: "Fernandez" }
        ],
        detailedContent: `## Objectif\n\nMettre en place des tests automatisés pour améliorer la qualité et réduire les bugs...`
    }
];