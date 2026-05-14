# RPStories — Changelog & Évolutions 🚀

Ce document répertorie l'ensemble des modifications apportées au projet **RPStories** (Design System v2.1).

---

## [v2.1.0] — Intégration Sociale & Identité Serveur (Dernière MAJ)
### ✨ Nouvelles Fonctionnalités
- **Community Link (Discord)** : Ajout d'un bouton Discord stylisé sur les fiches personnages avec icône officielle et effets de survol premium.
- **Portal Link** : Restauration du logo serveur dynamique (via Favicon Google) redirigeant vers le domaine du serveur.
- **Automatisation** : Les logos ne s'affichent que si les données (`serverDomain`, `discordUrl`) sont renseignées et valides.
- **Template Normalisé** : Mise à jour de `_template.ts.example` avec les nouveaux champs pour faciliter la création de futurs dossiers.

### 🐛 Correctifs & Optimisations
- **SVG Discord** : Correction du tracé corrompu et suppression des rognages sur les bords (Pixel Perfect).
- **TypeScript** : Correction de l'erreur `hubColors.white` dans le Hub en utilisant des classes Tailwind natives.
- **Clean Code** : Suppression des classes CSS et propriétés SVG devenues inutiles après optimisation.

---

## [v2.0.0] — Refonte "Premium" & Immersion
### 🎨 Design System & UI
- **AmbientGlow (Flashlight)** : Mise en place d'une lueur atmosphérique dynamique qui suit le scroll (`z-index: 1`). La lueur apparaît progressivement après la couverture.
- **Micro-Trames Natives (Tailwind v4)** : Intégration de textures haute fidélité (`bg-dots-premium`, `bg-grid-premium`) configurées directement dans le thème CSS via des variables.
- **Layering System** : Refonte totale de la superposition des couches pour permettre à la lumière de briller derrière le contenu sans sacrifier la lisibilité.

### 📄 Fiche Personnage (FicheView)
- **Data Units Layout** : Transition vers un design administratif avec bordures latérales et grille stricte de 17 champs.
- **Codename System** : Ajout d'un badge "Codename" et "Reference ID" standardisé pour un aspect dossier confidentiel.
- **Photo Bandeau** : Correction des arrondis (`rounded-xl`) et des légendes (`figcaption`) pour un alignement parfait.
- **CK Status** : Bannière "DECEASED // CK" automatique avec thème visuel sombre/rouge.

### 🏠 Hub & Navigation (HubView)
- **HubCard Refactor** : Remplacement des flèches textuelles par des SVG vectoriels, amélioration du centrage des icônes.
- **TheNavbar** : Optimisation des flous de fond (`backdrop-blur`) et réduction de l'encombrement visuel.
- **Performance** : Script d'optimisation des images pour réduire les temps de chargement.

---

## [v1.0.0] — Socle Technique
- Mise en place de **Vue 3** (Composition API) et **Vite**.
- Architecture basée sur des données typées (**TypeScript**) pour une maintenance facilitée.
- Système de couleurs réactives basé sur l'identité de chaque personnage.
- Composant **FamilyTree** pour la visualisation des relations sociales.

---
*Dernière mise à jour : 14 Mai 2026* 🏛️✨
