# RPStories — Changelog & Évolutions 🚀

Ce document répertorie l'ensemble des modifications apportées au projet **RPStories** (Design System v2.2).

---

## [v3.0.0] — Supabase Database Integration, Authentication & Bidirectional Social Graph

_20 Mai 2026_

### 🗄️ Database & Storage Migration (Supabase)
- **Persistent Storage** : Migration des données statiques locales vers une base de données relationnelle Supabase (`characters`).
- **Data Mapping & Validation** : Adaptation des schémas de validation Zod (`character.schema.ts`) et mise en place d'un traducteur/mappeur (`mappers.ts`) pour transformer les lignes relationnelles SQL en objets typés TypeScript utilisables par le frontend.
- **Upload direct** : Possibilité de téléverser des images en Base64 ou d'ajouter des liens directs lors de la création d'un dossier.
- **Nettoyage Général** : Retrait complet des répertoires d'assets d'images locaux statiques (`amari_davis`, `marcus_thorne`, etc.) et des scripts obsolètes (`optimize-images.ts`, `create-test-char.ts`) au profit du stockage cloud et des flux DB. Retrait de l'étape de compression locale des commandes de build dans `package.json`.

### 🔐 Authentification & Confidentialité (RLS)
- **Gestion de Session** : Intégration de l'authentification Supabase (`authState`) pour connecter les utilisateurs et gérer les sessions de manière sécurisée.
- **Droits d'Édition** : Les dossiers ne peuvent être modifiés que par leur propriétaire créateur (`isOwner`), sécurisé par des politiques d'accès de sécurité au niveau des lignes (RLS) en base de données.
- **Options de Confidentialité** : Ajout d'un sélecteur de confidentialité à 3 niveaux dans le tunnel de création/édition d'un dossier :
  - **Public** : Visible de tous dans les archives publiques.
  - **Abonnés** : Visible uniquement par les abonnés.
  - **Privé** : Visible exclusivement par son propriétaire dans l'onglet dédié de son Hub.
- **Badge Administrateur** : Affichage d'un badge de confidentialité dynamique (Public/Abonnés/Privé) sur les cartes du Hub uniquement visibles par le propriétaire de la fiche.

### 🕸️ Réseau Social & Relations Bidirectionnelles
- **Résolution Croisée Bidirectionnelle** : Algorithme dynamique dans `FicheView.vue` permettant de lister l'entourage complet :
  - **Sens direct** : Résolution et mise à jour automatique des fiches de l'entourage existant (vrai ID, statut actuel, photo de profil).
  - **Sens inverse** : Liaison automatique par nom/alias (insensible à la casse) ; si le personnage A cite le personnage B, le personnage A apparaît automatiquement dans l'entourage de B.
- **Visuels Réels** : Remplacement du placeholder générique par la vraie photo de galerie des membres de l'entourage liés.
- **Bouton Friend List** : Activation de l'accès à la liste d'amis directement depuis le Hub principal par l'importation de `FriendListBtn.vue` dans le template global.

### ⚡ Optimisations UX/UI
- **Sauvegarde Rapide "Terminer"** : Ajout d'un bouton raccourci `Terminer ⚡` à chaque étape du tunnel de modification pour enregistrer instantanément les changements sans devoir parcourir tout le tunnel (avec vérification intelligente de la validité de tous les champs).
- **Pré-indication Couleur Loader** : Transfert dynamique du statut de vie d'un personnage via les query params d'URL. Le spinner de transition s'affiche immédiatement dans la couleur thématique associée (ex: rouge vif pour un personnage décédé) dès la première milliseconde, sans attendre le retour de la requête Supabase.
- **Ajustement de Cartes** : Repositionnement ergonomique des pictos de modification et de confidentialité dans les coins supérieurs de la carte, et du logo de serveur de jeu en bas à droite de l'image de couverture pour une meilleure harmonie visuelle.

---

## [v2.2.1] — Ghost Protocol Polish & UI/UX Enhancements

_15 Mai 2026_

### 🕸️ Networking & Friend List
- **Modale Interactive** : Évolution du `FriendListBtn.vue` d'un simple placeholder vers un mockup complet et fonctionnel de la Friend List.
- **UI/UX Cyberpunk** : Panneau flottant avec effet blur, bruit photographique (noise) et adaptation dynamique de la couleur du titre selon le contexte (Hub ou Profil).
- **Logique de Navigation** : Affichage épuré des contacts (Nom + Codename) avec un bouton "View Hub" au survol.
- **Fermeture Naturelle** : Mise en place d'un événement `@mouseleave` avec un "pont invisible" pour refermer la modale de façon fluide sans overlay plein écran bloquant.

### 💀 Design System "Ghost Protocol"
- **Tampon FBI (HubCard)** : Remplacement de la simple pastille de statut par un impressionnant tampon rouge "DECEASED" incliné et texturé, directement apposé sur les photos des profils décédés.
- **Photographic Noise (FicheView)** : Application d'un effet de grain photographique (noise) global sur le header, dont l'intensité est dramatiquement augmentée (`opacity-20`) pour les personnages décédés afin de renforcer l'aspect dossier usé.
- **Restructuration du Header** : Le statut critique (DECEASED // CK) s'affiche désormais harmonieusement sur la même ligne (inline) que les métadonnées principales du personnage.

### ✨ Engagement & Conversion
- **Scroll Hint (FicheView)** : Ajout d'un indicateur interactif engageant ("SCROLL DOWN") en haut à droite du header, guidant l'utilisateur et s'adaptant à la couleur accent de la fiche.
- **Tunnel Marketing (Family Tree)** : Intégration astucieuse d'un bloc "Invite un Allié" double-largeur (`col-span-2`) au sein de l'arbre généalogique pour encourager la création de compte et l'interconnexion des joueurs.

---

## [v2.2.0] — Admin ID Standardization, Mobile-First UI & Networking Placeholder

_15 Mai 2026_

### 🆔 Standardisation Administrative

- **Format d'ID AAAA-II-XX** : Adoption d'un standard rigoureux pour tous les identifiants de dossiers.
  - Amari Davis → `2026-AD-01` · Larry Pils → `2026-LP-02` · Elena Volkov → `2026-EV-03`
  - Marcus Thorne → `2026-MT-04` · Isabella Sterling → `2026-IS-05`
- **Cohérence totale** : `eyebrow`, `cover.ref` et `footer` synchronisés sur chaque dossier.
- **Domaines serveurs mis à jour** : Marcus → `flashland.fr` · Isabella → `nova-city.fr`
- **Normalisation des photos** : Renommage `izzy1/2/3` → `isabella1/2/3.webp`

### 💀 Lore & Continuité Narrative

- **CK d'Isabella Sterling propagé** : Statut `dead` répercuté dans les réseaux d'entourage de tous les personnages liés (Amari, Elena, Larry, Marcus).
- **Label Hub** : Passage de `INACTIF / CK` → `DEAD / CK` pour un impact visuel renforcé.

### 📱 Responsive Design (Mobile-First)

- **HubView** : Paddings adaptatifs (`px-4 md:px-8`), grille fluide (`gap-4 md:gap-8`), typographie responsive (`text-4xl sm:text-6xl md:text-8xl lg:text-9xl`).
- **HubCard & CreateCard** : Hauteur d'image (`h-48 sm:h-64`) et padding (`p-4 sm:p-6`) adaptatifs.
- **FicheView** : Header (`px-4 sm:px-12`), main (`px-4 sm:px-12`), grille identité (`pl-0 md:pl-8`).
- **TheNavbar** : Padding responsive, boutons Login/SignUp masqués sur mobile, remplacement par une icône hamburger (`sm:hidden`).

### ⚡ Mobile FAB — Ghost Protocol Edition

- **Floating Action Button** : Bouton "New Archive" exclusif mobile (`sm:hidden`) en style Ghost Protocol.
- **Intersection Observer** : Masquage automatique du FAB quand la `CreateCard` entre dans le viewport.
- **Vue Transition** : Animation `fab-fade` (slide + fade) à l'apparition/disparition.
- **Scan Effect** : Balayage lumineux au toucher (`group-active:animate-scan`).

### 🌐 FriendListBtn — Networking Placeholder

- **Nouveau composant** `FriendListBtn.vue` : Placeholder visuel pour le futur système de friend list (liaison joueurs via Family Tree).
- **Interaction** : Cercle discret (`size-12`) → pilule expansive (`w-44`) au hover.
- **Design** : Icône portrait SVG · label "FRIEND LIST" · badge "// soon" flottant.
- **Visibilité** : Desktop uniquement (`hidden sm:block`) · Mobile via menu hamburger (à venir).
- **Discrétion** : `opacity-20` au repos, `opacity-100` au hover — ne perturbe pas la lecture des fiches.
- **Intégré** dans `HubView.vue` et `FicheView.vue`.

### 🔧 Tailwind v4 & Build

- **`@theme` compliance** : `--animate-scan` enregistré dans le bloc `@theme`, `@keyframes scan` déplacé dans `@theme` (convention v4 native).
- **Vue Transition CSS** : `.fab-fade-enter-active / leave-to` ajoutés dans `@layer utilities`.
- **`zod` installé** : Dépendance manquante résolue (`npm install zod`).

### 🐛 Correctifs TypeScript

- `character.schema.ts` : Typage explicite `(s: string)` sur les `.transform()` Zod → résolution de `TS7006`.
- `FriendListBtn.vue` : Suppression de `friendCount` déclaré mais non utilisé → `@todo` conservé en commentaire.

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

_Dernière mise à jour : 20 Mai 2026_ 🏛️✨
