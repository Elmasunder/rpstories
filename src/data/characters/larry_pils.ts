import type { Character } from '@/types/character'

export const larry_pils: Character = {
  id: 'larry_pils',
  pageTitle: 'Dossier RP – Larry Pils',

  cover: {
    status: 'alive',
    serverDomain: 'nopixel.net',
    eyebrow: '// Classified Dossier — "The Fixer" //',
    firstName: 'LARRY',
    lastName: 'PILS',
    alias: 'Old Larry',
    subtitle: '34 ans — Industrial District',
    destination: 'Los Santos',
    meta: [
      { key: 'Âge', value: '34' },
      { key: 'Origine', value: 'Caucasien' },
      { key: 'Spécialité', value: 'Mécanique & Logistique' },
      { key: 'Lieu de vie', value: 'Entrepôt 42, Docks' },
      { key: 'Véhicule', value: 'Bison Noir Mat' },
    ],
    ref: 'DOSSIER REF: LAR-34-LS<br>STATUT: ACTIF<br>USAGE: ARCHIVE CONFIDENTIELLE',
    photos: [
      'assets/larry_pils/larry1.webp',
      'assets/larry_pils/larry2.webp',
      'assets/larry_pils/larry3.webp',
    ],
  },

  chapter1: {
    label: 'Chapitre I',
    titleLines: ['Profil &', 'Identité'],
    identityPanels: [
      [
        { key: 'Nom', value: 'Pils' },
        { key: 'Prénom', value: 'Larry' },
        { key: 'Code', value: '"The Mechanic"', class: 'text-accent' },
        { key: 'Né en', value: '1992' },
        { key: 'Signe', value: 'Taureau' },
        { key: 'Taille', value: '185 cm' },
        { key: 'Poids', value: '92 kg' },
      ],
      [
        { key: 'Famille', value: 'Jason Pils (Cousin - Défunt)', class: 'text-accent-alt' },
        { key: 'Passé', value: "Ancien de l'Armée (Logistique)" },
        { key: 'Affiliation', value: 'Indépendant' },
        { key: 'Recherché pour', value: 'Recels divers & Modifs illégales' },
        { key: 'Loyauté', value: 'Sang & Famille uniquement', class: 'text-accent' },
      ],
    ],
    profile: {
      qualities: ['Méthodique', 'Froid', 'Technicien hors pair', 'Protecteur'],
      flaws: ['Alcoolique mondain', 'Paranoïaque', 'Violent si provoqué'],
    },
    specialInfo: {
      icon: '🔧',
      title: 'Le Poids du Sang',
      text: "Depuis la mort de son cousin Jason, Larry s'est refermé sur lui-même. Il porte désormais la bague de Jason autour du cou. Il ne cherche pas la vengeance, il cherche à ne plus jamais perdre de membres de son clan.",
    },
  },

  chapter2: {
    label: 'Chapitre II',
    titleLines: ["L'Ombre du", 'Passé', 'text-accent-alt'],
    photo: {
      url: 'assets/larry_pils/larry2.webp',
      alt: 'Garage de Larry',
      caption: '// Docks de Los Santos — Entrepôt 42',
    },
    story1: [
      'Larry n\'a jamais été un gamin des rues comme Jason. Il est parti tôt, a servi dans la logistique militaire pendant six ans, avant de revenir avec un dossier "décharge déshonorable" et un savoir-faire inquiétant pour démonter et remonter n\'importe quoi.',
      'À son retour, il a trouvé son cousin Jay en pleine dérive. Larry a essayé de le cadrer, de lui apprendre le métier, mais Jason était trop libre, trop "Jay".',
    ],
    story2: [
      "Aujourd'hui, Larry gère un entrepôt discret sur les Docks. Il ne vend pas de drogue, il vend de la logistique : des véhicules propres, des planques sécurisées et des outils que vous ne trouverez nulle part ailleurs.",
      "La mort de Jason a été le signal d'alarme qu'il redoutait. Larry est devenu l'ombre que personne ne voit, mais que tout le monde appelle quand le plan foire.",
    ],
    quote:
      '"La différence entre un mort et un survivant ? Le survivant a toujours vérifié ses freins avant de partir."',
  },

  chapter3: {
    label: 'Chapitre III',
    titleLines: ['Opérations &', 'Réseau', 'text-accent'],
    photo: {
      url: 'assets/larry_pils/larry3.webp',
      alt: 'Larry au travail',
      caption: '// Nuit noire — Zone industrielle',
    },
    story1: [
      "Travailler avec Larry Pils, c'est accepter de ne pas poser de questions. Vous lui déposez une voiture criblée de balles à 2h du matin, elle ressort neuve à 6h. Pas de bavardage, pas de réduction.",
      'Il entretient un réseau de contacts froid mais efficace. Il connaît les flics corrompus, les dockers silencieux et les informateurs qui savent fermer les yeux.',
    ],
    story2: [
      "Malgré son apparence brute, Larry est un érudit de la rue. Il collectionne les vieux plans de la ville et connaît les tunnels de Los Santos comme sa propre poche. C'est son sanctuaire, son labyrinthe.",
    ],
    quote: '"Je m\'en fous de qui tu es. Donne-moi les clés et sors de mon garage."',
  },

  chapter4: {
    label: 'Chapitre IV',
    titleLines: ['Expertise', 'Tactique', 'text-accent'],
    photo: {
      url: 'assets/larry_pils/larry1.webp',
      alt: 'Larry',
      caption: '// Surveillance — Los Santos Skyline',
    },
    story1: [
      "Larry ne mise pas sur la chance. Chaque opération qu'il soutient est planifiée avec une précision chirurgicale. Sa force réside dans sa capacité à anticiper les imprévus techniques et à fournir le matériel exact nécessaire à la survie de ses clients.",
    ],
    skillsGroups: [
      {
        title: 'LOGISTIQUE & TECHNIQUE',
        skills: [
          { name: 'Mécanique Lourde', percent: 95 },
          { name: 'Logistique de Fuite', percent: 90 },
          { name: 'Piratage de Sécurité (Hardware)', percent: 75 },
        ],
      },
      {
        title: 'SURVIE & COMBAT',
        skills: [
          { name: 'Tir tactique', percent: 70 },
          { name: 'Préparation de Planques', percent: 85 },
          { name: 'Sang-froid / Résistance', percent: 92 },
        ],
      },
    ],
    callout:
      "Larry Pils est le type d'homme que vous voulez avoir dans votre dos quand la ville entière vous cherche.",
  },

  chapter6: {
    label: 'Épilogue',
    titleLines: ['Futur &', 'Fondations', 'text-accent-alt'],
    objectives: {
      shortTerm: [
        'Sécuriser les dernières affaires de Jason',
        'Réparer le Bison',
        'Faire profil bas',
      ],
      mediumTerm: [
        "Acheter l'entrepôt voisin",
        'Étendre le réseau vers Paleto',
        'Trouver qui a trahi Jason',
      ],
      longTerm: [
        'Construire un héritage Pils qui dure',
        'Prendre sa retraite loin de la ville',
        'Ne pas finir comme Jay',
      ],
    },
    finaleStory: [
      "Larry Pils regarde la skyline de Los Santos depuis son toit. La ville brille, mais il sait que sous les néons, il n'y a que de la rouille.",
      "Il finira son verre, descendra dans son garage, et reprendra le travail. Car tant qu'il y aura des Pils en ville, la mécanique ne s'arrêtera jamais.",
    ],
    finaleQuote:
      '"Jason rigolait tout le temps. Moi, je ne rigole plus. Mais je suis toujours debout."',
  },

  family: [
    { id: 'jason_pils', name: 'Jason Pils', relation: 'Cousin', status: 'dead' },
    { id: 'wonsu_park', name: 'Won-suh Park', relation: 'Beau-père', status: 'alive' },
    { name: 'Mary Stroks', relation: 'Femme', status: 'alive' },
    { name: 'Viktor Pils', relation: 'Frère Jumeau', status: 'dead' },
    { name: '"Old Joe"', relation: 'Mentor / Propriétaire Bar', status: 'alive' },
  ],

  footer:
    'DOSSIER RP — LARRY PILS · LOS SANTOS · REF: LAR-34-LS · STATUT: ACTIF<br>Document classé par RPStories — Nopixel · v2.5',
}
