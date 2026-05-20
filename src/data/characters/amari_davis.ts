import type { Character } from '@/types/character'

export const amari_davis: Character = {
  id: `amari_davis`,
  pageTitle: `Dossier RP – Amari Davis`,

  // --- SECTION COVER ---
  cover: {
    status: `alive`,
    serverDomain: `glife.fr`,
    discordUrl: `https://discord.gg/glife`,
    eyebrow: `// DOSSIER RP #2026AD0001`,
    firstName: `AMARI`,
    lastName: `DAVIS`,
    alias: `Locker`,
    meta: [
      { key: `Âge`, value: `24` },
      { key: `Taille`, value: `186 cm` },
      { key: `Poids`, value: `78 kg` },
      { key: `Origines`, value: `Afro-Am.` },
      { key: `Véhicule de réf`, value: `Sanchez` },
    ],
    ref: `DOSSIER REF: 2026-AD-01<br>STATUT: ACTIF · EN SERVICE<br>USAGE: ROLEPLAY EXCLUSIF`,
    photos: [
      `assets/amari_davis/amari1.webp`,
      `assets/amari_davis/amari2.webp`,
      `assets/amari_davis/amari3.webp`,
    ],
  },

  // --- CHAPITRE I : PRÉSENTATION DU PERSONNAGE ---
  chapter1: {
    label: `Présentation du personnage`,
    titleLines: [`Profil &`, `Identité`],
    identityPanels: [
      [
        { key: `Nom`, value: `Davis` },
        { key: `Prénom`, value: `Amari` },
        { key: `Surnom`, value: `"Locker"`, class: `text-accent` },
        { key: `Date de naissance`, value: `14 / 03 / 2001` },
        { key: `Lieu de naissance`, value: `Northwood, Liberty City` },
        { key: `Ville actuelle`, value: `Los Santos`, class: `text-accent-alt` },
        { key: `Origine(s)`, value: `Afro-Américain` },
        { key: `Taille`, value: `186 cm` },
        { key: `Poids`, value: `78 kg` },
      ],
      [
        { key: `Signe particulier`, value: `Corps quasi-entièrement tatoué`, class: `text-accent` },
        { key: `Père`, value: `Inconnu`, class: `text-muted` },
        { key: `Mère`, value: `Décédée (OD fentanyl, 2018)`, class: `text-accent-alt` },
        { key: `Passé`, value: `Foyers de l'État (8–17 ans)` },
        { key: `Passion(s)`, value: `Motocross · Rodéo Urbain` },
        { key: `Véhicule`, value: `Sanchez — Dernier Modèle`, class: `text-accent` },
        { key: `Spécialité`, value: `Vol de véhicules / Effraction`, class: `text-accent` },
      ],
    ],
    profile: {
      qualités: [`Loyal`, `Discret`, `Débrouillard`, `Sangfroid`, `Endurant`, `Empathique`],
      défauts: [`Méfiant`, `Impulsif (Moto)`, `Rancunier`, `Solitaire excessif`, `Orgueil caché`],
    },
    infoPlus: {
      icon: `🖤`,
      title: `Corps tatoué — un livre ouvert`,
      text: `Amari a commencé ses premiers tatouages à 17 ans, le jour de la mort de sa mère. Depuis, il ne s'est plus arrêté. Bras, mains, cou, torse, jambes — la quasi-totalité de son corps est couverte. Chaque pièce a une raison, même s'il ne l'explique jamais.`,
    },
  },

  // --- CHAPITRE II : HISTOIRE (Les origines) ---
  chapter2: {
    label: `Histoire`,
    titleLines: [`Les`, `origines`, `text-accent-alt`],
    photo: {
      url: `assets/amari_davis/amari3.webp`,
      alt: `Northwood, Liberty City`,
      caption: `// Northwood, Liberty City — Quartier d'origine`,
    },
    story1: [
      `Amari Davis est né à Northwood, dans le nord de Liberty City — un quartier dense, bruyant, où le froid de l'hiver s'incruste dans les briques et où les gamins apprennent vite que personne ne viendra les tirer de là. Son père est un blanc sur un formulaire administratif. Sa mère, Diane, lutte depuis des années contre le fentanyl.`,
      `À 8 ans, les services sociaux passent la porte. C'est le début d'un circuit qui durera près de dix ans : foyer après foyer, il ne cherche pas à s'intégrer. Il observe. Il retient. Il attend. Et entre deux murs qui ne lui appartiennent jamais, il apprend à ouvrir ce qui est fermé.`,
    ],
    story2: [
      `C'est dans son troisième foyer, à 13 ans, qu'Amari réalise ce qu'il sait vraiment faire. Un éducateur laisse ses clés de voiture sur un bureau. Amari, par curiosité pure, regarde la serrure, la teste avec un trombone, sent le mécanisme. La portière s'ouvre en moins de deux minutes.`,
    ],
    quote: `"J'ai jamais forcé une serrure. Je lui parle, c'est tout."`,
    callout: `// Émancipé à 18 ans. Aucun héritage, aucun réseau familial. Survit grâce à ses mains. Premier salaire réel intégralement investi dans une Sanchez dernier modèle. //`,
  },

  // --- CHAPITRE III : HISTOIRE (La vie d'adulte) ---
  chapter3: {
    label: `Histoire`,
    titleLines: [`La vie`, `d'adulte`, `text-accent`],
    photo: {
      url: `assets/amari_davis/amari1.webp`,
      alt: `Los Santos`,
      caption: `// Los Santos — Destination finale`,
    },
    story1: [
      `Pendant quelques années, Amari tient à Liberty City. Il arrondit ses fins de mois entre petits boulots à la journée et missions plus grises : récupérer une berline pour un gars de Dukes, faire disparaître un 4x4 trop identifiable après une embrouille. Il ne monte jamais haut dans la hiérarchie — il n'en veut pas.`,
      `Mais Liberty City finit par peser. Trop de têtes connues, trop de dettes passées, et un incident sur le port de Algonquin — un véhicule qu'il ne savait pas appartenir à quelqu'un d'important — qui commence à faire parler.`,
    ],
    story2: [
      `Il arrive à Los Santos sans plan précis. Ce qu'il a : deux mains qui savent travailler et une moto custom dans un dépôt de Cypress Flats. Il débarque pour exister, voir ce que cette ville peut lui offrir, et peut-être, pour la première fois, construire quelque chose qui dure.`,
    ],
    quote: `"J'avais rien qui me retenait là-bas. J'ai rien qui me pousse ici non plus. C'est ça la liberté."`,
  },

  // --- CHAPITRE IV : APTITUDES ---
  chapter4: {
    label: `Aptitudes`,
    titleLines: [`Spécialités &`, `compétences`, `text-accent`],
    photo: {
      url: `assets/amari_davis/amari2.webp`,
      alt: `Sanchez`,
      caption: `// Sanchez custom — dernier modèle`,
    },
    story1: [
      `Pour Amari, un véhicule n'est pas un amas de métal, c'est une énigme mécanique. Il ne 'casse' pas une voiture, il la libère. Sa spécialité, l'entrée par effraction non destructive, est devenue sa signature dans les rues de Liberty City. Il possède une oreille absolue pour les cliquetis de barillets.`,
      `Une fois au guidon de sa Sanchez, il fait corps avec la machine. Son pilotage n'est pas fait de vitesse pure, mais d'agilité urbaine : utiliser le mobilier urbain, les escaliers et les ruelles étroites pour disparaître en quelques secondes.`,
    ],
    skillsGroups: [
      {
        title: `// Aptitudes sociales`,
        skills: [
          { name: `Analyse comportementale`, percent: 85 },
          { name: `Discrétion & Infiltration`, percent: 92 },
          { name: `Empathie & Écoute`, percent: 78 },
          { name: `Sang-froid en crise`, percent: 74 },
          { name: `Topographie Urbaine`, percent: 88 },
        ],
      },
      {
        title: `// Expertise technique`,
        skills: [
          { name: `Lockpicking Avancé`, percent: 91 },
          { name: `Bypass de Sécurité`, percent: 84 },
          { name: `Mécanique Tout-terrain`, percent: 86 },
          { name: `Maintenance Précision`, percent: 79 },
          { name: `Logistique de Fuite`, percent: 82 },
        ],
      },
    ],
    callout: `// PROFIL : Expert en infiltration et récupération de véhicules. Approche chirurgicale. Capacité de fuite exceptionnelle en deux-roues. //`,
  },

  // --- CHAPITRE VI : LE FUTUR ---
  chapter6: {
    label: `Le futur`,
    titleLines: [`Objectifs &`, `ambitions`, `text-accent`],
    objectives: {
      shortTerm: [
        `Trouver un squat ou une planque stable à Los Santos.`,
        `Récupérer la Sanchez du dépôt de Cypress Flats.`,
        `Se faire une idée du terrain : qui fait quoi, quels entrepôts sont actifs.`,
        `Trouver un premier contact local pour écouler des véhicules récupérés.`,
      ],
      mediumTerm: [
        `Développer une routine stable entre jobs légaux et activités grises.`,
        `Se rendre indispensable dans le groupe à travers ses compétences.`,
        `Commencer à creuser discrètement des pistes sur son père biologique.`,
        `S'entraîner à contrôler l'impulsivité sur la moto.`,
      ],
      longTerm: [
        `Devenir une référence sur le vol de véhicules à Los Santos.`,
        `Construire quelque chose qui porte son nom pour prouver qu'il existe.`,
        `Éviter les fins classiques : ni la cage, ni l'oubli.`,
        `Établir un réseau de garages discrets à travers San Andreas.`,
      ],
    },
    finaleStory: [
      `Amari Davis n'a pas eu de modèle. Ce qu'il a construit, il l'a construit seul, dans les silences des couloirs institutionnels. Los Santos est une chance. Peut-être la première vraie. Il n'en parle pas, mais ça se voit dans sa façon de regarder la ville depuis le toit d'un parking.`,
    ],
    finaleQuote: `"Amari. J'arrive de Liberty City. Et j'ouvre ce qui est fermé."`,
  },

  // --- CHAPITRE V : ENTOURAGE ---
  chapter5: {
    label: `Entourage`,
    titleLines: [`Relations &`, `proches`],
  },

  family: [
    { name: `Elena Davis`, relation: `Mère`, status: `dead` },
    {
      id: `isabella_sterling`,
      name: `Isabella Sterling`,
      relation: `Mentor / Static`,
      status: `dead`,
    },
    {
      id: `elena_volkov`,
      name: `Elena Volkov`,
      relation: `Associée Renseignement`,
      status: `alive`,
    },
  ],
  footer: `DOSSIER RP — AMARI "LOCKER" DAVIS · LOS SANTOS · NORTHWOOD (LC) → LS · 24 ANS · REF: 2026-AD-01<br>Document créé par RPStories — Five M · Personnage fictif · v2.0`,
}
