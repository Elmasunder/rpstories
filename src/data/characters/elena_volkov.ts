import type { Character } from '@/types/character'

export const elena_volkov: Character = {
  id: 'elena_volkov',
  pageTitle: 'Dossier RP – Elena Volkov',

  cover: {
    status: 'disparu',
    serverDomain: 'gta.world',
    eyebrow: '// Dossier Classé Confidentiel // Interpol //',
    firstName: 'ELENA',
    lastName: 'VOLKOV',
    alias: 'The Ghost',
    subtitle: "32 ans — Journaliste d'investigation",
    destination: 'Los Santos',

    meta: [
      { key: 'Âge', value: '32' },
      { key: 'Taille', value: '172 cm' },
      { key: 'Poids', value: '62 kg' },
      { key: 'Origines', value: 'Russe' },
      { key: 'Véhicule', value: 'Albany Prima — Noir Mat' },
    ],

    ref: 'DOSSIER REF: EV-332-LS<br>STATUT: DISPARUE<br>USAGE: INVESTIGATION PRIORITAIRE',

    photos: [
      'assets/elena_volkov/elena1.webp',
      'assets/elena_volkov/elena2.webp',
      'assets/elena_volkov/elena3.webp',
    ],
  },

  chapter1: {
    label: 'Présentation du personnage',
    titleLines: ['Profil &', 'Identité'],

    identityPanels: [
      // Panneau de gauche (Données administratives)
      [
        { key: 'Nom', value: 'Volkov' },
        { key: 'Prénom', value: 'Elena' },
        { key: 'Surnom', value: '"The Ghost"', class: 'text-accent' },
        { key: 'Date de naissance', value: '22 / 09 / 1994' },
        { key: 'Lieu de naissance', value: 'Saint-Pétersbourg, Russie' },
        { key: 'Ville actuelle', value: 'Los Santos (Disparue)', class: 'text-accent-alt' },
        { key: 'Origine(s)', value: 'Russe' },
        { key: 'Taille', value: '172 cm' },
        { key: 'Poids', value: '62 kg' },
      ],
      // Panneau de droite (Lore & Passé)
      [
        {
          key: 'Signe particulier',
          value: "Cicatrice fine à l'arcade gauche",
          class: 'text-accent',
        },
        { key: 'Père', value: 'Sergueï Volkov (Décédé, 2012)', class: 'text-dead' },
        { key: 'Mère', value: 'Natalia Volkov', class: 'text-accent-alt' },
        { key: 'Famille proche', value: 'Aucune (Exilée)' },
        { key: 'Passé', value: 'Journaliste de guerre · Infiltration' },
        { key: 'Passion(s)', value: 'Cryptographie & Échecs Blitz' },
        { key: 'Véhicule', value: 'Albany Prima — Noir Mat', class: 'text-accent' },
        { key: 'Spécialité', value: 'Infiltration / Recherche OSINT', class: 'text-accent' },
      ],
    ],

    profile: {
      qualités: ['Persévérante', 'Analytique', 'Polyglotte', 'Discrète', 'Obsessive', 'Intuitive'],
      défauts: [
        'Méfiance paranoïaque',
        'Prise de risque excessive',
        'Froideur',
        'Insomniaque',
        'Perfectionniste',
        'Solitaire',
      ],
    },

    infoPlus: {
      icon: '🕵️‍♀️',
      title: 'Dernier article non publié',
      text: 'Une enquête intitulée "Les Ombres du Port". Elle y mentionne des visages connus de la police de Los Santos et des transactions illégales impliquant des personnalités influentes.',
    },
  },

  chapter2: {
    label: 'Chapitre II',
    titleLines: ['Les', 'Origines'],
    photo: {
      url: 'assets/elena_volkov/elena2.webp',
      alt: 'Elena à Saint-Pétersbourg',
      caption: '// Archives – Saint-Pétersbourg, Russie',
    },
    story1: [
      "Elena est arrivée à Los Santos avec un seul objectif : faire tomber les masques. Connue à Moscou pour avoir dénoncé des oligarques, elle pensait être à l'abri sous le soleil de San Andreas. Elle se trompait.",
      "Ses premiers mois ont été consacrés à l'observation. Elle ne fréquentait aucun club, ne parlait à personne, sauf pour poser des questions dérangeantes sur le trafic d'armes au port.",
    ],
    story2: [
      "Le soir de sa disparition, elle avait rendez-vous avec un informateur anonyme. Les caméras de surveillance montrent sa voiture quittant son garage à 23h12. Elle n'est jamais revenue.",
    ],
    quote: '"La vérité est une arme que peu de gens savent manier sans se blesser."',
    callout: '// Signalée pour la dernière fois près des docks de Los Santos le 12 Avril 2026 //',
  },

  chapter3: {
    label: 'Chapitre III',
    titleLines: ['Traces &', 'Hypothèses'],
    photo: {
      url: 'assets/elena_volkov/elena3.webp',
      alt: "Appartement d'Elena",
      caption: '// Little Seoul – Scène de crime',
    },
    story1: [
      "Plusieurs témoins affirment avoir vu une femme correspondant à son signalement dans le désert de Blaine County, près de Grapeseed. Un gérant de station-service aurait vu une femme blonde avec une cicatrice à l'arcade gauche monter dans un van noir non immatriculé. Le FBI suit la piste d'un enlèvement par une cellule politique étrangère, mais les preuves restent floues.",
      'Pour ses confrères du Daily Globe, elle est "partie trop loin" dans son enquête sur les circuits de blanchiment d\'argent. Mais pour ceux qui la connaissaient vraiment, Elena ne s\'arrêterait jamais de son plein gré. Elle était sur le point de livrer un nom, LE nom qui aurait tout fait basculer à Los Santos.',
    ],
    story2: [
      "Le rapport de police mentionne une odeur de désinfectant industriel dans son appartement, suggérant un nettoyage méticuleux après sa disparition. Aucun signe de lutte, aucune trace de sang. C'est le travail de professionnels. Soit Elena a été extraite de force, soit elle a activé son protocole de disparition d'urgence, un plan qu'elle gardait prêt depuis des années.",
    ],
    quote: '"Si je disparais, ne cherchez pas mon corps. Cherchez mes fichiers."',
  },

  chapter4: {
    label: 'Chapitre IV',
    titleLines: ['Expertise &', 'Compétences'],
    photo: {
      url: 'assets/elena_volkov/elena1.webp',
      alt: 'Elena en intervention',
      caption: '// Photo prise par un collaborateur anonyme',
    },
    story1: [
      "Elena n'est pas qu'une simple journaliste. Formée à Saint-Pétersbourg dans les cercles de l'OSINT (Open Source Intelligence), elle est une experte en recueil d'informations et en protection de données. Elle sait disparaître quand il le faut et réapparaître là où on l'attend le moins.",
      "Sa méthodologie repose sur une infiltration lente et une analyse quasi-chirurgicale des métadonnées. Elle est capable de remonter un réseau financier complexe à partir d'une simple photo floue prise sur un quai de déchargement.",
    ],
    story2: [
      "Sur le terrain, Elena privilégie la discrétion absolue. Elle utilise des outils de cryptographie de niveau militaire pour protéger ses sources. Ses collaborateurs disent d'elle qu'elle possède une \"mémoire photographique\" pour les visages et les numéros de plaque, une compétence qui l'a sauvée plus d'une fois lors de ses enquêtes dans les zones de conflit.",
    ],

    skillsGroups: [
      {
        title: '// INVESTIGATION',
        skills: [
          { name: 'Infiltration', percent: 85 },
          { name: 'Cryptographie', percent: 70 },
          { name: 'Recherche OSINT', percent: 95 },
          { name: 'Analyse de données', percent: 90 },
          { name: "Photographie d'espionnage", percent: 75 },
          { name: 'Social Engineering', percent: 80 },
        ],
      },
      {
        title: '// SURVIE & TERRAIN',
        skills: [
          { name: 'Discrétion', percent: 90 },
          { name: 'Contre-filature', percent: 95 },
          { name: 'Conduite évasive', percent: 60 },
          { name: 'Résistance au stress', percent: 85 },
          { name: 'Self-Défense', percent: 45 },
          { name: 'Premiers soins', percent: 40 },
        ],
      },
    ],
    callout: '// Expertise reconnue par ses pairs – Niveau : Consultant Expert //',
  },

  chapter6: {
    label: 'Épilogue',
    titleLines: ['Objectifs &', 'Futur'],

    objectives: {
      shortTerm: [
        "Identifier l'informateur du port",
        "Sécuriser les copies de sauvegarde de l'enquête",
        'Effacer ses traces numériques récentes',
        'Trouver une planque hors de la ville',
        'Contacter son avocat à Londres',
        "Récupérer son matériel à l'aéroport",
      ],
      mediumTerm: [
        'Exposer le réseau de corruption au grand jour',
        'Obtenir un asile politique définitif',
        "Renouer contact avec ses sources à l'Est",
        "Changer d'identité officiellement",
        'Infiltrer le conseil municipal',
        'Démanteler les opérations des docks',
      ],
      longTerm: [
        'Démanteler les opérations du cartel à Los Santos',
        'Retrouver une vie anonyme et paisible',
        'Écrire un livre sur son passage à Los Santos',
        'Disparaître définitivement des radars',
        'Assurer la protection de sa mère Natalia',
        'Faire tomber le maire de Los Santos',
      ],
    },

    finaleStory: [
      "Si ce dossier est ouvert, c'est que ma couverture a sauté ou que je ne suis plus en mesure de répondre. Ne cherchez pas de coupables, cherchez les preuves que j'ai cachées sous le pont de Cedar Creek.",
      "Tout ce que j'ai fait, je l'ai fait pour que Los Santos ne soit plus ce théâtre d'ombres.",
    ],
    finaleQuote:
      '"La vérité finit toujours par refaire surface, peu importe la profondeur à laquelle on l\'enterre."',
  },

  family: [
    { name: 'Natalia Volkov', relation: 'Mère', status: 'alive' },
    { name: 'Sergueï Volkov', relation: 'Père', status: 'dead' },
    { id: 'larry_pils', name: 'Larry Pils', relation: 'Contact Suspect', status: 'alive' },
  ],

  footer: 'DOSSIER RP — ELENA VOLKOV · LOS SANTOS · REF: EV-332-LS · STATUT: DISPARUE',
}
