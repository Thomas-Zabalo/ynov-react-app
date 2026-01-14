# Gestionnaire de Projets - Frontend

Une application web moderne et performante pour la gestion et le suivi de projets, développée avec React 18, Vite et TypeScript.

## Stack Technique

* **Framework :** React (Version 18)
* **Build Tool :** Vite
* **Langage :** TypeScript
* **Style :** Tailwind CSS
* **Navigation :** React Router
* **Gestion d'État :** Context API

---

## Architecture du Projet

L'application suit une structure modulaire permettant une séparation claire entre l'interface, la logique métier et la communication API :

```text
src/
├── components/         
├── data/               
├── hook/               
├── pages/               
├── provider/           
├── routes/              
├── services/           
├── types/            
├── utils/             
└── main.tsx           

```

---

## Logique et Gestion d'État

### Les Providers (Context API)

L'application utilise des Providers pour centraliser la logique métier et éviter le passage manuel de propriétés (Prop Drilling). Ils agissent comme une source unique de vérité :

* **AuthProvider** : Gère la session utilisateur, le stockage du token JWT et les états de connexion/déconnexion.
* **FavoriteProvider** : Centralise la liste des favoris, gère l'ajout/suppression et la synchronisation entre le mode invité et le compte utilisateur.
* **ThemeProvider** : Pilote l'apparence de l'application (Mode Sombre / Clair).

### React Hooks

L'application utilise les standards modernes de React pour optimiser la réactivité et les performances :

* **useState & useEffect** : Pour la gestion d'état locale et les appels API.
* **useContext** : Utilisé pour la gestion globale de l'état (Authentification, Thème Sombre/Clair, Gestion des Favoris).
* **useMemo & useCallback** : Pour optimiser les performances en mémorisant des valeurs et des fonctions.
* **useRef** : Pour accéder directement au DOM (ex: focus automatique).
* **useNavigate & useParams** : Pour la navigation et la récupération de paramètres dans l'URL.

---

## Fonctionnalités Clés

* **Authentification Hybride** : Connexion classique et Social Login via GitHub OAuth, fonctionnant entièrement via JWT (stateless).
* **Système de Favoris Intelligent** :
* Mode Invité : Stockage initial dans le localStorage.
* Synchronisation : Fusion automatique des favoris locaux vers le compte utilisateur lors de la connexion.
* Persistance : Sauvegarde sur base de données en mode API.


* **Mode API et Mock** : Possibilité de basculer instantanément entre des données réelles et simulées via les variables d'environnement.
* **UI Responsive** : Interface fluide adaptée à tous les supports (mobile, tablette, desktop).

---

## Installation et Démarrage

### 1. Configuration

Créez un fichier .env à la racine :

```env
VITE_API_URL=http://localhost:4000/api
VITE_USE_MOCK=false
```

### 2. Lancer l'application

```bash
npm install
npm run dev
```

Pour tester sur mobile sur le même réseau local :

```bash
npx vite --host
```