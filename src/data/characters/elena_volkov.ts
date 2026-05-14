import type { Character } from '@/types/character'

export const elena_volkov: Character = {
  // ID unique utilisé pour l'URL
  id: 'elena_volkov',

  // Titre de l'onglet du navigateur
  pageTitle: 'Dossier RP – Elena Volkov',

  // --- SECTION COVER (Entête de la fiche) ---
  cover: {
    status: 'alive',
    serverDomain: 'glife.fr',
    discordUrl: 'https://discord.gg/glife',
    eyebrow: '// DOSSIER RP #26EV0003',
    firstName: 'ELENA',
    lastName: 'VOLKOV',
    alias: 'The Ghost',
    subtitle: '28 ans — Vinewood Hills, Los Santos',
    destination: 'Los Santos',

    meta: [
      { key: 'Âge', value: '28' },
      { key: 'Taille', value: '172 cm' },
      { key: 'Poids', value: '58 kg' },
      { key: 'Origines', value: 'Russe' },
      { key: 'Véhicule', value: 'Neon — Blanc Nacré' },
    ],

    ref: 'DOSSIER REF: 26-EV-03<br>STATUT: ACTIF<br>USAGE: ROLEPLAY EXCLUSIF',

    photos: [
      'assets/elena_volkov/elena1.webp',
      'assets/elena_volkov/elena2.webp',
      'assets/elena_volkov/elena3.webp',
    ],
  },

  // --- CHAPITRE I : IDENTITÉ & PROFIL ---
  chapter1: {
    label: 'Présentation du personnage',
    titleLines: ['Profil &', 'Identité'],

    identityPanels: [
      // Panneau de gauche (Données administratives)
      [
        { key: 'Nom', value: 'Volkov' },
        { key: 'Prénom', value: 'Elena' },
        { key: 'Surnom', value: '"The Ghost"', class: 'text-accent' },
        { key: 'Date de naissance', value: '15 / 05 / 1996' },
        { key: 'Lieu de naissance', value: 'Saint-Pétersbourg' },
        { key: 'Ville actuelle', value: 'Los Santos' },
        { key: 'Origine(s)', value: 'Russe' },
        { key: 'Taille', value: '172 cm' },
        { key: 'Poids', value: '58 kg' },
      ],
      // Panneau de droite (Lore & Passé)
      [
        { key: 'Signe particulier', value: 'Tatouage discret nuque' },
        { key: 'Père', value: 'Yuri Volkov (Inconnu)' },
        { key: 'Mère', value: 'Svetlana Volkov (Inconnu)' },
        { key: 'Famille proche', value: 'Aucune' },
        { key: 'Passé', value: 'Ex-Analyste de données' },
        { key: 'Passion(s)', value: 'Échecs & Cyber-sécurité' },
        { key: 'Véhicule', value: 'Neon', class: 'text-accent' },
        { key: 'Spécialité', value: 'Infiltration Numérique', class: 'text-accent' },
      ],
    ],

    profile: {
      qualités: ['Analytique', 'Silencieuse', 'Perfectionniste', 'Réactive'],
      défauts: ['Froide', 'Manipulatrice', 'Insomniaque', 'Méfiance extrême'],
    },

    infoPlus: {
      icon: '👻',
      title: 'Le Spectre de la Toile',
      text: "Elena n'utilise jamais son vrai nom sur le réseau. Elle laisse derrière elle une signature numérique unique : un cavalier d'échecs blanc.",
    },
  },

  // --- CHAPITRE II : HISTOIRE (Origines) ---
  chapter2: {
    label: 'Histoire',
    titleLines: ['Les', 'origines', 'text-accent-alt'],
    photo: {
      url: 'assets/elena_volkov/elena2.webp',
      alt: 'Saint-Pétersbourg',
      caption: '// Saint-Pétersbourg — Hiver 2005',
    },
    story1: [
      "Elena est née dans le froid de Saint-Pétersbourg. Fille d'un ingénieur en informatique et d'une musicienne, elle a très vite montré des capacités cognitives hors normes, notamment pour les mathématiques et la logique pure.",
      "À 16 ans, elle a hacké les serveurs de son université pour le plaisir, attirant l'attention de groupes peu recommandables qui ont vu en elle un atout stratégique pour l'espionnage industriel.",
    ],
    story2: [
      "Après avoir travaillé quelques années pour des intérêts privés en Europe, elle a décidé de disparaître pour échapper à un contrat qui tournait mal. Elle a effacé sa propre existence des registres civils russes avant de s'envoler pour San Andreas.",
    ],
    quote: "\"La meilleure façon de garder un secret, c'est d'oublier qu'il existe.\"",
    callout: '// ARCHIVE N°404 — Identité purgée //',
  },

  // --- CHAPITRE III : HISTOIRE (Vie Adulte) ---
  chapter3: {
    label: 'Histoire',
    titleLines: ['La vie', "d'adulte", 'text-accent'],
    photo: {
      url: 'assets/elena_volkov/elena3.webp',
      alt: 'Los Santos Skyline',
      caption: '// Los Santos — Première nuit',
    },
    story1: [
      "Arrivée à Los Santos avec seulement une clé USB et un faux passeport, Elena a commencé par le bas de l'échelle. Elle s'est installée dans un petit appartement à Mirror Park, travaillant comme consultante en sécurité free-lance pour des petites entreprises locales.",
      'Mais sa nature l\'a vite rattrapée. En quelques mois, elle a infiltré les réseaux les plus sécurisés de la ville, se faisant un nom dans le milieu criminel sous le pseudonyme "The Ghost".',
    ],
    story2: [
      "Elle est aujourd'hui une ressource inestimable pour quiconque a besoin d'informations confidentielles ou d'un accès privilégié à des systèmes restreints. Elle ne prend jamais part à la violence directe, préférant la subtilité d'un code bien écrit.",
    ],
    quote: '"Le monde est une base de données. Il suffit de trouver la clé primaire."',
  },

  // --- CHAPITRE IV : APTITUDES ---
  chapter4: {
    label: 'Aptitudes',
    titleLines: ['Spécialités &', 'compétences', 'text-accent'],
    photo: {
      url: 'assets/elena_volkov/elena1.webp',
      alt: 'Hacker station',
      caption: '// Station de travail cryptée',
    },
    story1: [
      "Elena Volkov est une prédatrice numérique dont l'expertise dépasse largement le simple piratage de serveurs. Elle opère principalement dans les zones d'ombre de l'OSINT (Open Source Intelligence), capable de corréler des milliers de données fragmentaires pour reconstituer la vie entière d'une cible avec une précision chirurgicale. Son approche est celle d'une architecte : elle n'attaque pas les systèmes de front, elle en identifie les failles structurelles et les exploite avec une discrétion absolue, ne laissant derrière elle que des journaux de connexion vides ou des signatures cryptées indéchiffrables.",
      "Sa véritable force réside toutefois dans l'ingénierie sociale. Dotée d'un calme olympien et d'une capacité d'analyse comportementale hors du commun, elle sait manipuler les flux d'information et les individus pour obtenir les accès dont elle a besoin. Qu'il s'agisse de bypasser une sécurité biométrique ou d'infiltrer une infrastructure réseau critique, Elena traite chaque mission comme une partie d'échecs complexe où elle a déjà anticipé les dix prochains coups de son adversaire. Pour elle, le code n'est qu'un langage, et le monde, une base de données qu'elle a appris à réécrire à sa guise.",
    ],

    skillsGroups: [
      {
        title: '// Aptitudes sociales',
        skills: [
          { name: 'Ingénierie Sociale', percent: 92 },
          { name: 'Persuasion & Charisme', percent: 78 },
          { name: 'Observation & Détection', percent: 85 },
          { name: 'Sang-froid (Under Pressure)', percent: 88 },
          { name: 'Discrétion Comportementale', percent: 90 },
        ],
      },
      {
        title: '// Expertise technique',
        skills: [
          { name: 'Piratage de Systèmes', percent: 96 },
          { name: 'OSINT & Renseignement', percent: 94 },
          { name: 'Cryptographie Avancée', percent: 82 },
          { name: 'Maintenance Réseau', percent: 75 },
          { name: 'Électronique de Terrain', percent: 80 },
        ],
      },
    ],
    callout: '// Spécialisation : Ghosting & Extraction de données //',
  },

  // --- CHAPITRE V : ENTOURAGE ---
  chapter5: {
    label: 'Entourage',
    titleLines: ['Relations &', 'proches'],
  },

  family: [
    { id: 'amari_davis', name: 'Amari Davis', relation: 'Associé', status: 'alive' },
    { id: 'larry_pils', name: 'Larry Pils', relation: 'Contact Technique', status: 'alive' },
    { name: '"The Bishop"', relation: 'Mentor (Dark Web)', status: 'unknown' },
  ],

  // --- CHAPITRE VI : LE FUTUR ---
  chapter6: {
    label: 'Le futur',
    titleLines: ['Algorithmes &', 'Destin', 'text-accent'],

    objectives: {
      shortTerm: [
        'Sécuriser sa position à Vinewood',
        'Améliorer son serveur proxy',
        'Recruter un homme de main',
      ],
      mediumTerm: [
        'Infiltrer le FIB local',
        'Lancer sa propre plateforme chiffrée',
        'Acheter une villa sécurisée',
      ],
      longTerm: [
        'Devenir la reine du Dark Web de LS',
        'Prendre le contrôle des données de la ville',
        'Disparaître définitivement',
      ],
    },

    finaleStory: [
      "Elena ne voit pas Los Santos comme une ville, mais comme un flux constant de données. Tant qu'elle sera aux commandes du flux, elle sera en sécurité. La partie d'échecs ne fait que commencer.",
    ],
    finaleQuote: '"Échec et mat. Avant même que vous ayez bougé votre premier pion."',
  },

  footer: 'DOSSIER RP — ELENA VOLKOV · LOS SANTOS · REF: 26-EV-03 · STATUT: ACTIF · v2.1',
}
