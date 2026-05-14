import type { Character } from '@/types/character'

export const amari_davis: Character = {
  id: 'amari_davis',
  pageTitle: 'Dossier RP – Amari Davis',

  // --- SECTION COVER (Entête de la fiche) ---
  cover: {
    status: 'alive', // 'alive' ou 'dead' (détermine le thème visuel)
    serverDomain: 'glife.fr', // Utilisé pour générer le favicon automatiquement
    discordUrl: 'https://discord.gg/glife', // Lien Discord G-Life
    eyebrow: '// DOSSIER RP #26AD0001',
    firstName: 'AMARI',
    lastName: 'DAVIS',
    alias: 'Locker',
    subtitle: '24 ans — Northwood, Liberty City →',
    destination: 'Los Santos',
    // Métadonnées rapides affichées en bas de cover
    meta: [
      { key: 'Âge', value: '24' },
      { key: 'Taille', value: '186 cm' },
      { key: 'Poids', value: '78 kg' },
      { key: 'Origines', value: 'Afro-Am.' },
      { key: 'Véhicule de réf', value: 'Sanchez' },
    ],
    ref: 'DOSSIER REF: AMR-24-LS<br>STATUT: ACTIF · EN SERVICE<br>USAGE: ROLEPLAY EXCLUSIF',
    // Bandeau de 3 photos en haut de fiche
    photos: [
      'assets/amari_davis/amari5.webp',
      'assets/amari_davis/amari4.webp',
      'assets/amari_davis/amari1.webp',
    ],
  },

  // --- CHAPITRE I : IDENTITÉ & PROFIL ---
  chapter1: {
    label: 'Présentation du personnage',
    titleLines: ['Profil &', 'Identité'], // Supporte plusieurs lignes de titre
    identityPanels: [
      // Panneau de gauche (Données administratives)
      [
        { key: 'Nom', value: 'Davis' },
        { key: 'Prénom', value: 'Amari' },
        { key: 'Surnom', value: '"Locker"', class: 'text-accent' },
        { key: 'Date de naissance', value: '14 / 03 / 2001' },
        { key: 'Lieu de naissance', value: 'Northwood, Liberty City' },
        { key: 'Ville actuelle', value: 'Los Santos', class: 'text-accent-alt' },
        { key: 'Origine(s)', value: 'Afro-Américain' },
        { key: 'Taille', value: '186 cm' },
        { key: 'Poids', value: '78 kg' },
      ],
      // Panneau de droite (Lore & Passé)
      [
        { key: 'Signe particulier', value: 'Corps quasi-entièrement tatoué', class: 'text-accent' },
        { key: 'Père', value: 'Inconnu', class: 'text-muted' },
        { key: 'Mère', value: 'Décédée (OD fentanyl, 2018)', class: 'text-accent-alt' },
        { key: 'Famille proche', value: 'Aucune' },
        { key: 'Passé', value: "Foyers de l'État (8–17 ans)" },
        { key: 'Passion(s)', value: 'Motocross · Rodéo Urbain' },
        { key: 'Véhicule', value: 'Sanchez — Dernier Modèle', class: 'text-accent' },
        {
          key: 'Spécialité',
          value: 'Vol de véhicules / Entrée par effraction',
          class: 'text-accent',
        },
      ],
    ],
    profile: {
      qualités: ['Loyal', 'Discret', 'Débrouillard', 'Sangfroid', 'Endurant', 'Empathique'],
      défauts: ['Méfiant', 'Impulsif (Moto)', 'Rancunier', 'Solitaire excessif', 'Orgueil caché'],
    },
    infoPlus: {
      icon: '🖤',
      title: 'Corps tatoué — un livre ouvert',
      text: "Amari a commencé ses premiers tatouages à 17 ans, le jour de la mort de sa mère. Depuis, il ne s'est plus arrêté. Bras, mains, cou, torse, jambes — la quasi-totalité de son corps est couverte. Chaque pièce a une raison, même si il ne l'explique jamais. Pour ceux qui savent lire, c'est toute sa vie gravée dans la peau.",
    },
  },

  // --- CHAPITRE II : HISTOIRE ---
  chapter2: {
    label: 'Histoire',
    titleLines: ['Les', 'origines', 'text-accent-alt'],
    photo: {
      url: 'assets/amari_davis/amari3.webp',
      alt: 'Northwood, Liberty City',
      caption: "// Northwood, Liberty City — Quartier d'origine",
    },
    story1: [
      "Amari Davis est né à Northwood, dans le nord de Liberty City — un quartier dense, bruyant, où le froid de l'hiver s'incruste dans les briques et où les gamins apprennent vite que personne ne viendra les tirer de là. Son père est un blanc sur un formulaire administratif. Sa mère, Diane, lutte depuis des années contre le fentanyl — les bons jours, elle lui apprend des tricks sur un vieux vélo dans le parking. Les mauvais jours, Amari apprend à se rendre invisible.",
      "À 8 ans, les services sociaux passent la porte. C'est le début d'un circuit qui durera près de dix ans : foyer après foyer, il ne cherche pas à s'intégrer. Il observe. Il retient. Il attend. Et entre deux murs qui ne lui appartiennent jamais, il apprend à ouvrir ce qui est fermé.",
    ],
    story2: [
      "C'est dans son troisième foyer, à 13 ans, qu'Amari réalise ce qu'il sait vraiment faire. Un éducateur laisse ses clés de voiture sur un bureau. Amari, par curiosité pure, regarde la serrure, la teste avec un trombone, sent le mécanisme. La portière s'ouvre en moins de deux minutes. Il ne vole rien. Il referme. Il comprend juste qu'il a un talent. Quelques semaines plus tard, il commence à se faire payer pour \"récupérer\" des voitures pour des plus grands du quartier.",
      "À 17 ans, Diane Davis meurt d'une overdose dans un appartement de Broker. Amari apprend la nouvelle par téléphone, depuis un foyer de Bohan. Ce soir-là, il sort son scrambler récupéré à moitié cassé, et roule jusqu'à 3h du matin dans les rues de Liberty City. Quelques jours plus tard, il se fait tatouer pour la première fois — un détail discret dans le cou. Il ne pleurera jamais devant quelqu'un.",
    ],
    quote: '"J\'ai jamais forcé une serrure. Je lui parle, c\'est tout."',
    callout:
      '// Émancipé à 18 ans. Aucun héritage, aucun réseau familial, aucun plan. Survit grâce à ses mains et à ses yeux. Premier salaire réel — intégralement investi dans une Sanchez dernier modèle. Premier tatouage à 17 ans. Dernier tatouage : hier. //',
  },

  // --- CHAPITRE III : HISTOIRE ---
  chapter3: {
    label: 'Histoire',
    titleLines: ['La vie', "d'adulte", 'text-accent'],
    photo: {
      url: 'assets/amari_davis/amari1.webp',
      alt: 'Los Santos',
      caption: '// Los Santos — Destination finale',
    },
    story1: [
      "Pendant quelques années, Amari tient à Liberty City. Il arrondit ses fins de mois entre petits boulots à la journée et missions plus grises : récupérer une berline pour un gars de Dukes, faire disparaître un 4x4 trop identifiable après une embrouille, livrer des clés de contact en double à qui paie bien. Il ne monte jamais haut dans la hiérarchie de quoi que ce soit — il n'en veut pas. Il veut juste que personne ne lui manque de respect et avoir de quoi vivre.",
      "Mais Liberty City finit par peser. Trop de têtes connues, trop de dettes passées, et un incident sur le port de Algonquin — un véhicule qu'il ne savait pas appartenir à quelqu'un d'important — qui commence à faire parler. Rien de mortel, mais suffisamment pour qu'il comprenne qu'il est temps de changer d'air.",
    ],
    story2: [
      "C'est une vieille rumeur de quartier qui lui parle de Los Santos la première. Pas un vrai plan, juste une phrase lancée comme ça : <em>\"Le soleil, les bagnoles de luxe, et personne pour te connaître.\"</em> Amari n'a pas besoin d'entendre ça deux fois. Il charge la Sanchez sur un camion fret, glisse un sac dans un casier de gare, et prend un bus Greyhound direction la côte Ouest. Aucun compte à rendre, aucun adieu.",
      "Il arrive à Los Santos sans plan précis, sans contact établi, sans toit garanti. Ce qu'il a : deux mains qui savent travailler et une moto custom dans un dépôt de Cypress Flats. Il ne débarque pas pour prendre de la place — il arrive pour exister, voir ce que cette ville peut lui offrir, et peut-être, pour la première fois, construire quelque chose qui dure plus d'un hiver.",
    ],
    quote:
      "\"J'avais rien qui me retenait là-bas. J'ai rien qui me pousse ici non plus. C'est ça la liberté.\"",
  },

  // --- CHAPITRE IV : APTITUDES ---
  chapter4: {
    label: 'Aptitudes',
    titleLines: ['Spécialités &', 'compétences', 'text-accent'],
    photo: {
      url: 'assets/amari_davis/amari4.webp',
      alt: 'Sanchez',
      caption: '// Sanchez custom — dernier modèle',
    },
    story1: [
      "Pour Amari, un véhicule n'est pas un amas de métal, c'est une énigme mécanique. Il ne 'casse' pas une voiture, il la libère. Sa spécialité, l'entrée par effraction non destructive, est devenue sa signature dans les rues de Liberty City. Il possède une oreille absolue pour les cliquetis de barillets et une sensibilité tactile capable de détecter la moindre faille dans un système de sécurité électronique. Peu importe la marque ou le luxe, si ça se verrouille, Amari peut l'ouvrir.",
      "Mais son talent ne s'arrête pas aux serrures. Une fois au guidon de sa Sanchez, il fait corps avec la machine. Son pilotage n'est pas fait de vitesse pure, mais d'agilité urbaine : utiliser le mobilier urbain, les escaliers et les ruelles étroites pour disparaître en quelques secondes. À Los Santos, ce savoir-faire unique est son meilleur atout pour se faire un nom sans jamais se faire attraper.",
    ],
    skillsGroups: [
      {
        title: '// Aptitudes sociales',
        skills: [
          { name: 'Analyse comportementale & Observation', percent: 85 },
          { name: 'Discrétion & Infiltration', percent: 92 },
          { name: 'Empathie & Écoute', percent: 78 },
          { name: 'Sang-froid en situation de crise', percent: 74 },
          { name: "Sens de l'orientation & Topographie", percent: 88 },
        ],
      },
      {
        title: '// Expertise technique',
        skills: [
          { name: 'Effraction non-destructive (Lockpicking)', percent: 91 },
          { name: 'Bypass de systèmes de sécurité', percent: 84 },
          { name: 'Mécanique (Moto & Tout-terrain)', percent: 86 },
          { name: 'Maintenance & Ajustements de précision', percent: 79 },
          { name: 'Logistique & Gestion de stocks', percent: 82 },
        ],
      },
    ],
    callout:
      '// PROFIL : Expert en infiltration et récupération de véhicules. Approche chirurgicale et silencieuse. Capacité de fuite exceptionnelle en deux-roues. Ne laisse aucune trace de passage. //',
  },

  // --- CHAPITRE VI : LE FUTUR ---
  chapter6: {
    label: 'Le futur',
    titleLines: ['Objectifs &', 'ambitions', 'text-accent'],
    objectives: {
      shortTerm: [
        'Trouver un squat ou une planque stable à Los Santos — enfin un espace à lui.',
        'Récupérer la Sanchez du dépôt de Cypress Flats et la remettre en état de marche.',
        'Se faire une idée du terrain : qui fait quoi, quels véhicules circulent, quels entrepôts sont actifs.',
        'Trouver un premier contact local pour écouler des véhicules récupérés discrètement.',
      ],
      mediumTerm: [
        "Développer une routine stable entre jobs légaux ponctuels et activités grises — équilibrer l'exposition.",
        "Se rendre indispensable dans le groupe à travers ce qu'il sait faire — sans chercher le titre.",
        'Commencer à creuser discrètement des pistes sur son père biologique — une obsession calme.',
        "S'entraîner à contrôler l'impulsivité sur la moto — un accident peut tout faire tomber.",
      ],
      longTerm: [
        "Devenir une référence sur le vol de véhicules à Los Santos — le meilleur, mais dans l'ombre.",
        "Construire quelque chose qui porte son nom — pas pour la gloire, pour prouver qu'il existe.",
        "Ne plus jamais être défini par ce qu'il n'a pas eu. Être défini par ce qu'il a construit.",
        "Éviter les fins classiques. Prison = cage. Mort = oubli. Ni l'un ni l'autre.",
      ],
    },
    finaleStory: [
      "Amari Davis n'a pas eu de modèle. Pas de père sur un document, pas de mère assez longtemps, pas d'adulte stable dans un foyer. Ce qu'il a construit, il l'a construit seul, dans les silences des couloirs institutionnels, sous les capots de voitures qui ne lui appartenaient pas, et sur les routes de nuit de Liberty City. Il n'a pas de grand réseau ni d'armée derrière lui. Il a quelque chose d'autre — un instinct pour trouver l'entrée là où les autres voient une porte fermée.",
      "Los Santos est une chance. Peut-être la première vraie. Il n'en parle pas. Mais ça se voit dans la façon dont il regarde la ville depuis le toit d'un parking, le soir, une clope aux lèvres et la Sanchez garée en bas.",
    ],
    finaleQuote: '"Amari. J\'arrive de Liberty City. Et j\'ouvre ce qui est fermé."',
  },

  // --- CHAPITRE V : ENTOURAGE ---
  chapter5: {
    label: 'Entourage',
    titleLines: ['Relations &', 'proches'],
  },

  family: [
    { name: 'Elena Davis', relation: 'Mère', status: 'dead' },
    { name: '"Zero-Day"', relation: 'Mentor / Hacker', status: 'missing' },
  ],
  footer:
    'DOSSIER RP — AMARI "LOCKER" DAVIS · LOS SANTOS · NORTHWOOD (LC) → LS · 24 ANS · REF: AMR-24-LS<br>Document créé par RPStories — Five M · Personnage fictif · v2.0',
}
