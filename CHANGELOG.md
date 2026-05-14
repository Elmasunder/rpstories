# RPStories — Changelog & Évolutions 🚀

Ce document répertorie l'ensemble des modifications apportées au projet **RPStories** (Design System v2.1).

---

## [v2.1.0] — Intégration Sociale & Identité Serveur

_14 Mai 2026_

### ✨ Nouvelles Fonctionnalités

- **Community Link (Discord)** : Ajout d'un bouton Discord stylisé sur les fiches personnages. Intègre l'icône officielle via un tracé SVG optimisé et des effets de survol premium (glow flou).
- **Portal Link** : Restauration du logo serveur dynamique (via Favicon Google) redirigeant vers le domaine du serveur.
- **Project Tracking** : Initialisation de ce fichier `CHANGELOG.md` pour un suivi rigoureux des évolutions.
- **Template Normalisé** : Mise à jour de `_template.ts.example` incluant les nouveaux champs `serverDomain` et `discordUrl` pour faciliter la création de futurs dossiers.

### 🐛 Correctifs & Optimisations

- **Pixel Perfect SVG** : Correction du tracé corrompu du logo Discord et suppression des rognages sur les bords.
- **TypeScript & Tailwind** : Résolution d'un conflit de typage sur `hubColors.white` dans le Hub, remplacé par des classes Tailwind natives pour une meilleure cohérence.
- **Affichage Conditionnel** : Les logos de réseaux sociaux et de serveur ne s'affichent désormais que si les données associées sont renseignées et valides.

---

## [v2.0.0] — Refonte "Premium" & Immersion (Migration Majeure)

_13 Mai 2026_

### 🛠️ Architecture Technique

- **Migration Tailwind CSS v4** : Passage à la dernière version de Tailwind pour une gestion native des variables CSS et des performances accrues.
- **TypeScript 6 Integration** : Migration complète vers TS 6 pour un typage strict de l'ensemble des données personnages.
- **SEO Ready** : Implémentation de titres de page dynamiques et de méta-descriptions automatiques basées sur le profil consulté.

### 🎨 Design System & UI

- **AmbientGlow (Flashlight)** : Mise en place d'une lueur atmosphérique dynamique qui suit le scroll. Apparition progressive après la section de couverture pour ne pas gêner la lisibilité initiale.
- **Micro-Trames Natives** : Intégration de textures haute fidélité (`bg-dots-premium`, `bg-grid-premium`) configurées directement dans le thème CSS.
- **Layering System** : Refonte totale de la superposition des couches (`z-index`) pour permettre à la lumière de briller derrière le contenu sans sacrifier le contraste.

### 📄 Fiche Personnage (FicheView)

- **Data Units Layout** : Design administratif inspiré des dossiers confidentiels avec bordures verticales et grille stricte de 17 champs.
- **Codename System** : Ajout d'un badge "Codename" et d'un "Reference ID" généré dynamiquement (Année + Initiales).
- **Immersion Totale** : Fixation de la hauteur de couverture à `100vh` pour un effet "fold" parfait sur tous les écrans.
- **UX Refinement** : Désactivation de la sélection de texte sur les unités de données et curseur par défaut forcé pour renforcer l'aspect "logiciel/dossier".
- **CK Status** : Bannière "DECEASED // CK" automatique avec thème visuel sombre/rouge pour les personnages décédés.

### 🏠 Hub & Navigation

- **HubCard Refactor** : Remplacement des flèches textuelles par des SVG vectoriels et harmonisation des couleurs selon l'identité du personnage.
- **TheNavbar** : Optimisation des flous de fond (`backdrop-blur`) et réduction de la hauteur pour maximiser l'espace de lecture.
- **Smooth Scroll** : Logique de défilement doux personnalisée avec compensation automatique de l'offset de la barre de navigation.

---

## [v1.0.0] — Socle Technique & Modularité

_12 Mai 2026_

- **Core Framework** : Mise en place de **Vue 3** (Composition API) et **Vite**.
- **Data Architecture** : Migration des fichiers `.js` vers une structure modulaire TypeScript pour une maintenance facilitée.
- **FamilyTree** : Premier composant de visualisation des relations sociales (Arbre Généalogique).
- **WebP Optimization** : Système de gestion des images optimisé pour des temps de chargement réduits.

---

_Dernière mise à jour : 14 Mai 2026_ 🏛️✨
