# Gestionnaire de Projets - Frontend

Une application web moderne et performante pour la gestion et le suivi de projets, développée avec React 19, Vite 7 et TypeScript 5.

## Stack Technique

* **Framework :** React (Version 19)
* **Build Tool :** Vite (Version 7)
* **Langage :** TypeScript (Version 5.9)
* **Style :** Tailwind CSS (Version 4) avec PostCSS
* **Navigation :** React Router (Version 7)
* **Gestion d'État :** Context API
* **Contenu :** React Markdown avec support GFM et coloration syntaxique

---

## Architecture du Projet

L'application suit une structure modulaire permettant une séparation claire entre l'interface, la logique métier et la communication API :

```text
src/
├── components/         # Composants réutilisables (Cards, Hero, etc.)
├── data/               # Données statiques et configurations des menus
├── hook/               # Hooks personnalisés (useFetch, etc.)
├── pages/              # Composants de page (Profil, Favoris, Projets)
├── provider/           # Contextes globaux (Auth, Theme, Favorites)
├── routes/             # Configuration du routage
├── services/           # Appels API et logique de service
├── types/              # Définitions des interfaces TypeScript
├── utils/              # Fonctions utilitaires (formatage de date)
└── main.tsx           
```

---

## Logique et Gestion d'État

### Les Providers (Context API)

L'application utilise des Providers pour centraliser la logique métier et éviter le passage manuel de propriétés (Prop Drilling) :

* **AuthProvider** : Gère la session utilisateur, le stockage du token JWT (via localStorage) et l'état de connexion global.
* **FavoriteProvider** : Centralise la logique des favoris, gère l'ajout/suppression en temps réel et la synchronisation avec le backend.
* **ThemeProvider** : Pilote l'apparence de l'application avec basculement dynamique entre les modes Sombre et Clair.

### React Hooks & Optimisations

L'application exploite les dernières fonctionnalités de React 19 pour garantir des performances optimales :

* **useState & useEffect** : Gestion des états locaux et synchronisation des données au montage des composants.
* **useContext** : Accès simplifié aux états globaux à travers toute la hiérarchie des composants.
* **useMemo** : Mémorisation des calculs coûteux (filtrage des menus, formatage utilisateur) pour éviter les recalculs lors des rendus.
* **useCallback** : Stabilisation des fonctions de rappel pour optimiser les performances des composants enfants et éviter les re-rendus inutiles.

---

## Configuration Réseau & Proxy

L'application utilise un proxy de développement configuré dans `vite.config.ts` pour rediriger les requêtes vers le backend sans rencontrer de problèmes de CORS :

* **Target** : `http://localhost:4000` (Serveur Backend)
* **Configuration** : Les appels vers `/api` sont interceptés par Vite en mode développement et redirigés vers le serveur cible.
* **Avantage** : Permet d'utiliser des chemins relatifs dans les services frontend sans exposer l'URL complète du backend.

---

## Fonctionnalités Clés

* **Optimistic UI (Interface Réactive)** : Sur la page des favoris, les éléments sont retirés instantanément de l'affichage via un état local synchronisé avant même la confirmation serveur pour une fluidité maximale.
* **Authentification Hybride** : Gestion complète des accès via JWT, incluant des routes protégées et une redirection automatique selon le statut de connexion.
* **Rendu de Contenu Riche** : Intégration de `react-markdown` pour le support du Markdown étendu et coloration syntaxique du code via `react-syntax-highlighter`.
* **Profil Utilisateur Avancé** : Calcul automatique des initiales, formatage des dates au standard français (`fr-FR`) et affichage dynamique des statistiques.
* **UI Responsive & Moderne** : Utilisation de Tailwind CSS 4 pour une interface fluide et adaptative sur tous les supports.

---

## Installation et Démarrage

### 1. Configuration

Créez un fichier `.env` à la racine du projet :

```env
VITE_USE_MOCK=false
```

### 2. Installation des dépendances

```bash
npm install
```

### 3. Lancer l'application en développement

```bash
npm run dev
```

### 4. Build pour la production

```bash
npm run build
```