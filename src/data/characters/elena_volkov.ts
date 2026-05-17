import type { Character } from '@/types/character'

export const elena_volkov: Character = {
  id: `elena_volkov`,
  pageTitle: `Dossier RP – Elena Volkov`,

  // --- SECTION COVER ---
  cover: {
    status: `alive`,
    serverDomain: `glife.fr`,
    discordUrl: `https://discord.gg/glife`,
    eyebrow: `// DOSSIER RP #2026EV0003`,
    firstName: `ELENA`,
    lastName: `VOLKOV`,
    alias: `The Ghost`,
    subtitle: `28 ans — Saint-Pétersbourg, Russie →`,
    destination: `Los Santos`,
    meta: [
      { key: `Âge`, value: `28` },
      { key: `Taille`, value: `172 cm` },
      { key: `Poids`, value: `58 kg` },
      { key: `Origines`, value: `Russe` },
      { key: `Véhicule`, value: `Neon` },
    ],
    ref: `DOSSIER REF: 2026-EV-03<br>STATUT: ACTIF · EN SERVICE<br>USAGE: ROLEPLAY EXCLUSIF`,
    photos: [
      `assets/elena_volkov/elena1.webp`,
      `assets/elena_volkov/elena2.webp`,
      `assets/elena_volkov/elena3.webp`,
    ],
  },

  // --- CHAPITRE I : PRÉSENTATION DU PERSONNAGE ---
  chapter1: {
    label: `Présentation du personnage`,
    titleLines: [`Profil &`, `Identité`],
    identityPanels: [
      [
        { key: `Nom`, value: `Volkov` },
        { key: `Prénom`, value: `Elena` },
        { key: `Surnom`, value: `"The Ghost"`, class: `text-accent` },
        { key: `Date de naissance`, value: `15 / 05 / 1996` },
        { key: `Lieu de naissance`, value: `Saint-Pétersbourg` },
        { key: `Ville actuelle`, value: `Los Santos`, class: `text-accent-alt` },
        { key: `Origine(s)`, value: `Russe` },
        { key: `Taille`, value: `172 cm` },
        { key: `Poids`, value: `58 kg` },
      ],
      [
        { key: `Signe particulier`, value: `Tatouage discret nuque`, class: `text-accent` },
        { key: `Père`, value: `Yuri Volkov (Inconnu)`, class: `text-muted` },
        { key: `Mère`, value: `Svetlana Volkov (Inconnu)`, class: `text-muted` },
        { key: `Passé`, value: `Ex-Analyste de données` },
        { key: `Passion(s)`, value: `Échecs & Cyber-sécurité` },
        { key: `Véhicule`, value: `Neon`, class: `text-accent` },
        { key: `Spécialité`, value: `Infiltration Numérique`, class: `text-accent` },
      ],
    ],
    profile: {
      qualités: [`Analytique`, `Silencieuse`, `Perfectionniste`, `Réactive`, `Loyale`],
      défauts: [`Froide`, `Manipulatrice`, `Insomniaque`, `Méfiance extrême`],
    },
    infoPlus: {
      icon: `👻`,
      title: `Le Spectre de la Toile — Signature Numérique`,
      text: `Elena n'utilise jamais son vrai nom sur le réseau. Elle laisse derrière elle une signature numérique unique : un cavalier d'échecs blanc. Toutes ses traces sont purgées en temps réel par un script automatisé.`,
    },
  },

  // --- CHAPITRE II : HISTOIRE (Les origines) ---
  chapter2: {
    label: `Histoire`,
    titleLines: [`Les`, `origines`, `text-accent-alt`],
    photo: {
      url: `assets/elena_volkov/elena2.webp`,
      alt: `Saint-Pétersbourg`,
      caption: `// Saint-Pétersbourg — Hiver 2005`,
    },
    story1: [
      `Elena est née dans le froid de Saint-Pétersbourg. Fille d'un ingénieur en informatique et d'une musicienne, elle a très vite montré des capacités cognitives hors normes, notamment pour les mathématiques et la logique pure.`,
      `À 16 ans, elle a hacké les serveurs de son université pour le plaisir, attirant l'attention de groupes peu recommandables qui ont vu en elle un atout stratégique pour l'espionnage industriel.`,
    ],
    story2: [
      `Après avoir travaillé quelques années pour des intérêts privés en Europe, elle a décidé de disparaître pour échapper à un contrat qui tournait mal. Elle a effacé sa propre existence des registres civils russes avant de s'envoler pour San Andreas.`,
    ],
    quote: `"La meilleure façon de garder un secret, c'est d'oublier qu'il existe."`,
    callout: `// ARCHIVE N°404 — Identité purgée. Aucune trace administrative détectée avant son arrivée à Los Santos. Sujet considéré comme hautement volatile. //`,
  },

  // --- CHAPITRE III : HISTOIRE (La vie d'adulte) ---
  chapter3: {
    label: `Histoire`,
    titleLines: [`La vie`, `d'adulte`, `text-accent`],
    photo: {
      url: `assets/elena_volkov/elena3.webp`,
      alt: `Los Santos Skyline`,
      caption: `// Los Santos — Première nuit`,
    },
    story1: [
      `Arrivée à Los Santos avec seulement une clé USB et un faux passeport, Elena a commencé par le bas de l'échelle. Elle s'est installée dans un petit appartement à Mirror Park, travaillant comme consultante en sécurité free-lance pour des petites entreprises locales.`,
      `Mais sa nature l'a vite rattrapée. En quelques mois, elle a infiltré les réseaux les plus sécurisés de la ville, se faisant un nom dans le milieu criminel sous le pseudonyme "The Ghost".`,
    ],
    story2: [
      `Elle est aujourd'hui une ressource inestimable pour quiconque a besoin d'informations confidentielles ou d'un accès privilégié à des systèmes restreints. Elle ne prend jamais part à la violence directe, préférant la subtilité d'un code bien écrit.`,
    ],
    quote: `"Le monde est une base de données. Il suffit de trouver la clé primaire."`,
  },

  // --- CHAPITRE IV : APTITUDES ---
  chapter4: {
    label: `Aptitudes`,
    titleLines: [`Spécialités &`, `compétences`, `text-accent`],
    photo: {
      url: `assets/elena_volkov/elena1.webp`,
      alt: `Hacker station`,
      caption: `// Station de travail cryptée`,
    },
    story1: [
      `Elena Volkov est une prédatrice numérique dont l'expertise dépasse largement le simple piratage de serveurs. Elle opère principalement dans les zones d'ombre de l'OSINT (Open Source Intelligence), capable de corréler des milliers de données fragmentaires pour reconstituer la vie entière d'une cible avec une précision chirurgicale.`,
      `Son approche est celle d'une architecte : elle n'attaque pas les systèmes de front, elle en identifie les failles structurelles et les exploite avec une discrétion absolue. Pour elle, le code n'est qu'un langage, et le monde, une base de données qu'elle a appris à réécrire à sa guise.`,
    ],
    skillsGroups: [
      {
        title: `// Aptitudes sociales`,
        skills: [
          { name: `Ingénierie Sociale`, percent: 92 },
          { name: `Persuasion & Charisme`, percent: 78 },
          { name: `Observation & Détection`, percent: 85 },
          { name: `Sang-froid (Under Pressure)`, percent: 88 },
          { name: `Discrétion Comportementale`, percent: 90 },
        ],
      },
      {
        title: `// Expertise technique`,
        skills: [
          { name: `Piratage de Systèmes`, percent: 96 },
          { name: `OSINT & Renseignement`, percent: 94 },
          { name: `Cryptographie Avancée`, percent: 82 },
          { name: `Maintenance Réseau`, percent: 75 },
          { name: `Électronique de Terrain`, percent: 80 },
        ],
      },
    ],
    callout: `// PROFIL : Experte en infiltration numérique et OSINT. Approche froide et méthodique. Capacité de disparition totale du réseau. //`,
  },

  // --- CHAPITRE VI : LE FUTUR ---
  chapter6: {
    label: `Le futur`,
    titleLines: [`Objectifs &`, `ambitions`, `text-accent`],
    objectives: {
      shortTerm: [
        `Sécuriser sa position à Vinewood Hills.`,
        `Améliorer son infrastructure proxy via des relais satellites.`,
        `Évaluer les conséquences de la disparition d'Isabella Sterling (Static).`,
        `Recruter un homme de main de confiance pour le travail de terrain.`,
      ],
      mediumTerm: [
        `Infiltrer les serveurs centraux du FIB local pour purger ses dossiers russes.`,
        `Lancer sa propre plateforme de communication chiffrée sur le Dark Web.`,
        `Acheter une villa sécurisée avec une salle de serveurs isolée.`,
        `Prendre le contrôle d'un réseau de botnets local.`,
      ],
      longTerm: [
        `Devenir la reine incontestée du renseignement sur la côte Ouest.`,
        `Prendre le contrôle des données sensibles de la mairie de Los Santos.`,
        `Disparaître définitivement en simulant sa propre mort numérique.`,
        `Établir un héritage numérique qui lui survivra.`,
      ],
    },
    finaleStory: [
      `Elena ne voit pas Los Santos comme une ville, mais comme un flux constant de données. Tant qu'elle sera aux commandes du flux, elle sera en sécurité. La partie d'échecs ne fait que commencer, et elle a déjà prévu l'échec et mat de ses adversaires.`,
    ],
    finaleQuote: `"Échec et mat. Avant même que vous ayez bougé votre premier pion."`,
  },

  // --- CHAPITRE V : ENTOURAGE ---
  chapter5: {
    label: `Entourage`,
    titleLines: [`Relations &`, `proches`],
  },

  family: [
    { id: `amari_davis`, name: `Amari Davis`, relation: `Associé`, status: `alive` },
    { id: `larry_pils`, name: `Larry Pils`, relation: `Contact Technique`, status: `alive` },
    {
      id: `isabella_sterling`,
      name: `Isabella Sterling`,
      relation: `Consœur / Rivalité`,
      status: `dead`,
    },
  ],
  footer: `DOSSIER RP — ELENA VOLKOV · LOS SANTOS · ST-PÉTERSBOURG (RU) → LS · 28 ANS · REF: 2026-EV-03<br>Document créé par RPStories — Five M · Personnage fictif · v2.1`,
}
