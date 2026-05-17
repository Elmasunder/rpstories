import type { Character } from '@/types/character'

export const marcus_thorne: Character = {
  id: `marcus_thorne`,
  pageTitle: `Dossier RP – Marcus Thorne`,

  // --- SECTION COVER ---
  cover: {
    status: `alive`,
    serverDomain: `flashland.fr`,
    discordUrl: `https://discord.gg/flashland`,
    eyebrow: `// DOSSIER RP #2026MT0004`,
    firstName: `MARCUS`,
    lastName: `THORNE`,
    alias: `The Shield`,
    subtitle: `38 ans — Rockford Hills, Los Santos →`,
    destination: `Los Santos`,
    meta: [
      { key: `Âge`, value: `38` },
      { key: `Taille`, value: `192 cm` },
      { key: `Poids`, value: `105 kg` },
      { key: `Origines`, value: `Britannique` },
      { key: `Véhicule`, value: `Granger 3600LX` },
    ],
    ref: `DOSSIER REF: 2026-MT-04<br>STATUT: ACTIF · EN SERVICE<br>USAGE: ROLEPLAY EXCLUSIF`,
    photos: [
      `assets/marcus_thorne/marcus1.webp`,
      `assets/marcus_thorne/marcus2.webp`,
      `assets/marcus_thorne/marcus3.webp`,
    ],
  },

  // --- CHAPITRE I : PRÉSENTATION DU PERSONNAGE ---
  chapter1: {
    label: `Présentation du personnage`,
    titleLines: [`Profil &`, `Identité`],
    identityPanels: [
      [
        { key: `Nom`, value: `Thorne` },
        { key: `Prénom`, value: `Marcus` },
        { key: `Surnom`, value: `"The Shield"`, class: `text-accent` },
        { key: `Date de naissance`, value: `22 / 11 / 1986` },
        { key: `Lieu de naissance`, value: `Londres, UK` },
        { key: `Ville actuelle`, value: `Los Santos`, class: `text-accent-alt` },
        { key: `Origine(s)`, value: `Britannique` },
        { key: `Taille`, value: `192 cm` },
        { key: `Poids`, value: `105 kg` },
      ],
      [
        { key: `Signe particulier`, value: `Carrure imposante`, class: `text-accent` },
        { key: `Père`, value: `Arthur Thorne (Décédé)`, class: `text-muted` },
        { key: `Mère`, value: `Elizabeth Thorne`, class: `text-muted` },
        { key: `Passé`, value: `Ancien Officier de Police (MET)` },
        { key: `Passion(s)`, value: `Boxe Anglaise & Horlogerie` },
        { key: `Véhicule`, value: `Granger 3600LX`, class: `text-accent` },
        { key: `Spécialité`, value: `Protection Rapprochée`, class: `text-accent` },
      ],
    ],
    profile: {
      qualités: [`Discipliné`, `Protecteur`, `Imperturbable`, `Honnête`, `Méthodique`],
      défauts: [`Rigide`, `Bourreau de travail`, `Peu diplomate`, `Sévère`, `Méfiance`],
    },
    infoPlus: {
      icon: `🛡️`,
      title: `Le Code d'Honneur — Serment du Bouclier`,
      text: `Marcus ne déroge jamais à sa parole. Une fois engagé, il devient une barrière infranchissable entre son client et la menace. Il opère selon un protocole strict issu de ses années au sein de la police métropolitaine de Londres.`,
    },
  },

  // --- CHAPITRE II : HISTOIRE (Les origines) ---
  chapter2: {
    label: `Histoire`,
    titleLines: [`Les`, `origines`, `text-accent-alt`],
    photo: {
      url: `assets/marcus_thorne/marcus2.webp`,
      alt: `London Streets`,
      caption: `// Londres — Quartier de Westminster`,
    },
    story1: [
      `Marcus a grandi dans la discipline rigide d'une famille de militaires et de policiers londoniens. Son destiny était tracé dès l'enfance : servir et protéger. Après une brillante carrière au sein de la Metropolitan Police, un incident tragique lors d'une intervention l'a poussé à remettre en question le système.`,
      `Il a quitté les forces de l'ordre avec tous les honneurs, mais avec un vide immense qu'il a tenté de combler en se lançant dans la sécurité privée de haut niveau pour des dignitaires internationaux.`,
    ],
    story2: [
      `C'est lors d'une mission de protection à San Andreas qu'il a découvert Los Santos. Séduit par le chaos organisé de la ville et les opportunités pour un homme de son calibre, il a décidé d'y poser ses valises définitivement. Il y a trouvé un terrain où sa rigueur est une denrée rare et précieuse.`,
    ],
    quote: `"La peur est un choix. La discipline est une obligation."`,
    callout: `// DOSSIER MET-UK : Retraite anticipée — Mention d'Excellence. Expertise en gestion de foule et protection de VIP. Sujet considéré comme une barrière infranchissable. //`,
  },

  // --- CHAPITRE III : HISTOIRE (La vie d'adulte) ---
  chapter3: {
    label: `Histoire`,
    titleLines: [`La vie`, `d'adulte`, `text-accent`],
    photo: {
      url: `assets/marcus_thorne/marcus3.webp`,
      alt: `Los Santos Security`,
      caption: `// Rockford Hills — En service`,
    },
    story1: [
      `À Los Santos, Marcus n'est pas un criminel, c'est un professionnel. Il gère une petite agence de protection rapprochée ultra-discrète. Ses clients sont des PDG, des politiciens véreux ou des figures du milieu qui ont besoin d'une sécurité sans faille.`,
      `Son nom est devenu synonyme de tranquillité. Quand Marcus Thorne est sur le pas de votre porte, vous dormez sur vos deux oreilles. Il sait naviguer entre la légalité et les besoins spécifiques de ses clients sans jamais compromettre son éthique personnelle.`,
    ],
    story2: [
      `Il entretient des relations cordiales avec le LSPD, tout en sachant naviguer dans les zones grises de la ville. Son but n'est pas de nettoyer les rues, mais de s'assurer que ceux qui le paient ne finissent jamais dedans. Pour Marcus, chaque contrat est une mission sacrée.`,
    ],
    quote: `"Je ne suis pas payé pour être votre ami. Je suis payé pour que vous restiez en vie."`,
  },

  // --- CHAPITRE IV : APTITUDES ---
  chapter4: {
    label: `Aptitudes`,
    titleLines: [`Spécialités &`, `compétences`, `text-accent`],
    photo: {
      url: `assets/marcus_thorne/marcus1.webp`,
      alt: `Marcus training`,
      caption: `// Entraînement au combat au corps à corps`,
    },
    story1: [
      `Marcus Thorne n'est pas simplement une présence physique imposante ; c'est un analyste de terrain hors pair. Son approche de la protection repose sur une doctrine de "bulle défensive" qu'il a perfectionnée au fil de ses années à la Metropolitan Police. Maître en Krav Maga, il privilégie la neutralisation rapide et efficace des menaces.`,
      `Sa maîtrise des armes à feu est chirurgicale, avec une spécialisation dans les engagements à courte distance. Au-delà du combat, Marcus excelle dans la logistique de sécurité : planification d'itinéraires sécurisés et gestion de crises sous haute tension. Son sang-froid est sa plus grande arme.`,
    ],
    skillsGroups: [
      {
        title: `// Aptitudes sociales`,
        skills: [
          { name: `Négociation & Apaisement`, percent: 75 },
          { name: `Intimidation & Autorité`, percent: 95 },
          { name: `Analyse de Menaces`, percent: 88 },
          { name: `Sang-froid (Situations critiques)`, percent: 98 },
          { name: `Protocole & Étiquette`, percent: 80 },
        ],
      },
      {
        title: `// Expertise technique`,
        skills: [
          { name: `Combat au Corps à Corps`, percent: 92 },
          { name: `Conduite de Convoi`, percent: 90 },
          { name: `Armement Tactique`, percent: 86 },
          { name: `Contre-Surveillance`, percent: 78 },
          { name: `Premiers Secours`, percent: 84 },
        ],
      },
    ],
    callout: `// PROFIL : Spécialiste en Haute Protection et Extraction Sécurisée. Carrure athlétique. Capacité de réaction immédiate. Expert en gestion de périmètre critique. //`,
  },

  // --- CHAPITRE VI : LE FUTUR ---
  chapter6: {
    label: `Le futur`,
    titleLines: [`Objectifs &`, `ambitions`, `text-accent`],
    objectives: {
      shortTerm: [
        `Moderniser sa flotte de Granger 3600LX avec des blindages de grade 5.`,
        `Établir un contrat de protection exclusif avec un PDG majeur de Rockford Hills.`,
        `Sécuriser sa résidence principale contre les intrusions électroniques.`,
        `Mettre en place un protocole d'urgence avec Elena Volkov.`,
      ],
      mediumTerm: [
        `Ouvrir un centre d'entraînement privé pour agents de sécurité de haut niveau.`,
        `Recruter des anciens du LSPD de confiance pour étendre son agence.`,
        `Devenir le leader incontesté de la sécurité privée sur l'ensemble de Los Santos.`,
        `Établir une base de données sur les groupes d'extraction rivaux.`,
      ],
      longTerm: [
        `Influencer discrètement les politiques de sécurité de la ville via ses contacts.`,
        `Prendre une retraite paisible et méritée dans la campagne anglaise.`,
        `Laisser derrière lui une agence Thorne prospère et respectée.`,
        `Établir une fondation pour les familles de policiers tombés en service.`,
      ],
    },
    finaleStory: [
      `Marcus Thorne ne reculera jamais. Tant qu'il y aura des loups à Los Santos, il y aura besoin d'un bouclier. Et Marcus Thorne est le bouclier le plus solide de la ville. Il sait que son temps est compté dans ce métier, mais il compte bien l'utiliser pour marquer l'histoire de la sécurité de San Andreas.`,
    ],
    finaleQuote: `"Le chaos est inévitable. Ma présence est la seule variable qui compte."`,
  },

  // --- CHAPITRE V : ENTOURAGE ---
  chapter5: {
    label: `Entourage`,
    titleLines: [`Relations &`, `proches`],
  },

  family: [
    { id: `larry_pils`, name: `Larry Pils`, relation: `Contact Logistique`, status: `alive` },
    {
      id: `elena_volkov`,
      name: `Elena Volkov`,
      relation: `Contact Renseignement`,
      status: `alive`,
    },
    { id: `amari_davis`, name: `Amari Davis`, relation: `Expert en Infiltration`, status: `alive` },
    {
      id: `isabella_sterling`,
      name: `Isabella Sterling`,
      relation: `Contact Cyber`,
      status: `dead`,
    },
    { name: `Sgt. O'Neil`, relation: `Ancien Collègue (LSPD)`, status: `alive` },
  ],
  footer: `DOSSIER RP — MARCUS THORNE · LOS SANTOS · LONDRES (UK) → LS · 38 ANS · REF: 2026-MT-04<br>Document créé par RPStories — Five M · Personnage fictif · v2.1`,
}
