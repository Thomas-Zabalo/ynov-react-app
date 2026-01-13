export const allProjectsData = [
    {
        _id: "1",
        name: "Refonte UI Dashboard",
        description: "Redesign complet de l'interface utilisateur du dashboard principal avec une nouvelle palette de couleurs et de meilleures animations.",
        category: "Design",
        status: "Complété",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-03-10"),
        author: "1",
        members: ["1", "6", "11", "16", "21", "31", "35", "39", "43", "47", "51"],
        detailedContent: `## À propos du projet\n\nCe projet de refonte UI représente une transformation majeure de notre dashboard principal...`
    },
    {
        _id: "2",
        name: "API REST Utilisateurs",
        description: "Développement d'une nouvelle API REST pour la gestion des utilisateurs avec authentification JWT et validation des données.",
        category: "Backend",
        status: "En cours",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-04-15"),
        author: "1",
        members: ["1", "7", "12", "17", "21", "27", "32", "35", "51", "56"],
        detailedContent: `## Contexte du projet\n\nNotre ancienne API utilisateur commençait à montrer ses limites...`
    },
    {
        _id: "3",
        name: "Migration Base de Données",
        description: "Migration de PostgreSQL vers MongoDB pour améliorer la scalabilité et les performances de l'application.",
        category: "Infrastructure",
        status: "En cours",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-05-15"),
        author: "2",
        members: ["2", "7", "12", "17", "22", "26", "32", "36", "47", "59"],
        detailedContent: `## Pourquoi cette migration ?\n\nNotre base de données PostgreSQL commence à montrer ses limites...`
    },
    {
        _id: "4",
        name: "Système de Notifications",
        description: "Implémentation d'un système de notifications en temps réel avec WebSockets et notifications push.",
        category: "Developpement",
        status: "Planifié",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2024-06-15"),
        author: "3",
        members: ["3", "8", "13", "23", "28", "36", "41", "45", "57"],
        detailedContent: `## Vision du projet\n\nLes utilisateurs nous demandent depuis longtemps un système de notifications plus réactif...`
    },
    {
        _id: "5",
        name: "Tests Automatisés E2E",
        description: "Mise en place de tests end-to-end avec Cypress pour couvrir les principaux workflows de l'application.",
        category: "QA",
        status: "En cours",
        startDate: new Date("2024-02-10"),
        endDate: new Date("2024-04-20"),
        author: "1",
        members: ["1", "3", "10", "14", "19", "23", "37", "42", "45", "58"],
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
        author: "2",
        members: ["2", "10", "15", "34", "38", "46"],
        detailedContent: `## Le problème de la documentation\n\nQuand ce projet a démarré, notre documentation était fragmentée...`
    }
];