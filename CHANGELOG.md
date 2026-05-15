# RPStories — Changelog & Évolutions 🚀

Ce document répertorie l'ensemble des modifications apportées au projet **RPStories** (Design System v2.1).

---

## [v2.1.0] — Standardisation, Optimisation & Algorithme Chromatique

_14 Mai 2026_

### ✨ Nouvelles Fonctionnalités

- **Standardisation Narrative** : Harmonisation complète des chapitres, titres et structures de données sur tous les dossiers (Amari, Larry, Elena, Marcus).
- **Chromatic Scattering Algorithm** : Nouvel algorithme de génération de couleurs bi-ton avec décalage de 50% (paires de contraste) et dispersion par nombres premiers pour éviter les doublons visuels sur le Hub.
- **Image Optimization Engine v2** : Refonte totale du script `optimize-images.ts` pour supporter les environnements Windows sans blocage de fichiers (EBUSY), incluant le renommage automatique en WebP.
- **Zod Schema (v0.1)** : Introduction du premier contrat de validation de données pour sécuriser la structure des dossiers et préparer le futur tunnel de création.
- **Community Link (Discord)** : Ajout d'un bouton Discord stylisé avec effets de glow premium et tracé SVG optimisé.
- **Portal Link** : Restauration du logo serveur dynamique via Favicon Google.

### 🐛 Correctifs & Optimisations

- **FamilyTree Alignment** : Fixation de la hauteur des en-têtes de relation (`h-8`) pour garantir un alignement horizontal parfait malgré les textes multi-lignes.
- **HubCard Reactivity** : Passage des couleurs en `computed` et synchronisation totale entre le Hub et la vue Fiche via le calcul d'index.
- **Palette Cleanup** : Exclusion stricte du Rouge/Rose pour les personnages vivants, réservés désormais au statut "Décédé / Disparu".
- **Pixel Perfect SVG** : Correction du tracé du logo Discord.
- **TypeScript Strict** : Suppression des types `any` résiduels et renforcement des interfaces `Character`.

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
