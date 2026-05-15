import type { Character } from '@/types/character'

export const larry_pils: Character = {
  id: `larry_pils`,
  pageTitle: `Dossier RP – Larry Pils`,

  // --- SECTION COVER ---
  cover: {
    status: `alive`,
    serverDomain: `nopixel.net`,
    discordUrl: `https://discord.gg/nopixel`,
    eyebrow: `// DOSSIER RP #2026LP0002`,
    firstName: `LARRY`,
    lastName: `PILS`,
    alias: `Old Larry`,
    subtitle: `34 ans — Industrial District, Los Santos →`,
    destination: `Los Santos`,
    meta: [
      { key: `Âge`, value: `34` },
      { key: `Taille`, value: `185 cm` },
      { key: `Poids`, value: `92 kg` },
      { key: `Origines`, value: `Caucasien` },
      { key: `Spécialité`, value: `Logistique` },
    ],
    ref: `DOSSIER REF: 2026-LP-02<br>STATUT: ACTIF · EN SERVICE<br>USAGE: ROLEPLAY EXCLUSIF`,
    photos: [
      `assets/larry_pils/larry1.webp`,
      `assets/larry_pils/larry2.webp`,
      `assets/larry_pils/larry3.webp`,
    ],
  },

  // --- CHAPITRE I : PRÉSENTATION DU PERSONNAGE ---
  chapter1: {
    label: `Présentation du personnage`,
    titleLines: [`Profil &`, `Identité`],
    identityPanels: [
      [
        { key: `Nom`, value: `Pils` },
        { key: `Prénom`, value: `Larry` },
        { key: `Surnom`, value: `"Old Larry"`, class: `text-accent` },
        { key: `Date de naissance`, value: `12 / 08 / 1992` },
        { key: `Lieu de naissance`, value: `Liberty City` },
        { key: `Ville actuelle`, value: `Los Santos`, class: `text-accent-alt` },
        { key: `Origine(s)`, value: `Caucasien` },
        { key: `Taille`, value: `185 cm` },
        { key: `Poids`, value: `92 kg` },
      ],
      [
        { key: `Signe particulier`, value: `Cicatrice arcade gauche`, class: `text-accent` },
        { key: `Père`, value: `Viktor Pils (Inconnu)`, class: `text-muted` },
        { key: `Mère`, value: `Elena Pils (Inconnu)`, class: `text-muted` },
        { key: `Famille proche`, value: `Jason Pils (Cousin, Décédé)`, class: `text-dead` },
        { key: `Passé`, value: `Ancien de l'Armée (Logistique)` },
        { key: `Passion(s)`, value: `Mécanique de précision` },
        { key: `Véhicule`, value: `Bison — Noir Mat`, class: `text-accent` },
        { key: `Spécialité`, value: `Logistique & "Nettoyage"`, class: `text-accent` },
      ],
    ],
    profile: {
      qualités: [`Méthodique`, `Protecteur`, `Froid`, `Technicien hors pair`, `Loyal`, `Pragmatique`],
      défauts: [`Alcoolique mondain`, `Paranoïaque`, `Violent si provoqué`, `Méfiance maladive`, `Solitaire`, `Rancunier`],
    },
    infoPlus: {
      icon: `🔧`,
      title: `Le Poids du Sang — Bague de Jason`,
      text: `Depuis la mort de son cousin Jason, Larry porte sa bague autour du cou. Il ne cherche pas la vengeance aveugle, mais il a juré que plus personne sous sa protection ne finirait dans un caniveau de Little Seoul.`,
    },
  },

  // --- CHAPITRE II : HISTOIRE (Les origines) ---
  chapter2: {
    label: `Histoire`,
    titleLines: [`Les`, `origines`, `text-accent-alt`],
    photo: {
      url: `assets/larry_pils/larry2.webp`,
      alt: `Liberty City Industrial`,
      caption: `// Liberty City — Les vieux docks`,
    },
    story1: [
      `Larry Pils n'a pas grandi dans la rue, mais dans le cambouis. Fils d'un docker de Liberty City, il a appris à démonter un moteur avant de savoir lire. À 18 ans, pour échapper à un futur tout tracé dans la pauvreté, il s'engage dans l'armée. Pas comme combattant de première ligne, mais dans la logistique lourde.`,
      `Six ans plus tard, il revient avec un dossier marqué "Décharge déshonorable" suite à une affaire de détournement de matériel qu'il n'a jamais expliquée. Mais il revient surtout avec un savoir-faire chirurgical pour faire circuler n'importe quoi.`,
    ],
    story2: [
      `À son retour à Liberty City, il découvre que son cousin Jay s'est enfoncé dans la délinquance de bas étage. Larry tente de le redresser, de lui donner un cadre, mais le sang des Pils est indomptable. C'est ce qui poussera Larry à suivre Jay jusqu'à Los Santos, espérant que le soleil de l'Ouest effacerait les ombres de l'Est.`,
    ],
    quote: `"La différence entre un mort et un survivant ? Le survivant a toujours vérifié ses freins avant de démarrer."`,
    callout: `// DOSSIER MILITAIRE : 42nd Support Battalion. Spécialiste en transport et maintenance lourde. Sujet considéré comme expert logistique. //`,
  },

  // --- CHAPITRE III : HISTOIRE (La vie d'adulte) ---
  chapter3: {
    label: `Histoire`,
    titleLines: [`La vie`, `d'adulte`, `text-accent`],
    photo: {
      url: `assets/larry_pils/larry3.webp`,
      alt: `Docks de Los Santos`,
      caption: `// Los Santos — Entrepôt 42, Docks`,
    },
    story1: [
      `À Los Santos, Larry s'est rapidement imposé comme "The Fixer". Si vous avez besoin d'un véhicule propre à 3h du matin, d'une planque sécurisée pour un mois, ou de faire disparaître une livraison compromettante, c'est lui qu'on appelle. Il ne pose pas de questions, il encaisse, et il exécute.`,
      `Il gère un entrepôt discret sur les Docks, officiellement une entreprise de maintenance portuaire. Dans les faits, c'est le hub logistique de plusieurs groupes criminels qui apprécient son silence et sa rigueur militaire.`,
    ],
    story2: [
      `La mort de Jason a été un tournant. Larry ne rigole plus. Il est devenu l'ombre que personne ne voit, mais que tout le monde respecte. Il ne cherche pas à être le roi de la ville, il veut être celui sans qui les rois ne peuvent pas régner.`,
    ],
    quote: `"Je m'en fous de savoir pourquoi vous courez. Je m'occupe juste de vous donner les meilleures chaussures pour le faire."`,
  },

  // --- CHAPITRE IV : APTITUDES ---
  chapter4: {
    label: `Aptitudes`,
    titleLines: [`Spécialités &`, `compétences`, `text-accent`],
    photo: {
      url: `assets/larry_pils/larry1.webp`,
      alt: `Larry en surveillance`,
      caption: `// Surveillance nocturne — Skyline de Los Santos`,
    },
    story1: [
      `Larry Pils n'est pas un simple mécanicien ; c'est un maître d'œuvre de la logistique de l'ombre. Sa compréhension des machines frise le génie instinctif, lui permettant de diagnostiquer une défaillance ou d'optimiser un moteur à l'oreille. Il a perfectionné l'art de la modification tactique, transformant des véhicules civils banals en outils de fuite.`,
      `Son expertise s'étend à la planification opérationnelle complexe. Ancien logisticien militaire, il approche chaque mission avec une rigueur chirurgicale, anticipant les besoins en matériel, les points de ravitaillement et les itinéraires de délestage. Son calme imperturbable et son sens de l'anticipation font de lui un allié indispensable.`,
    ],
    skillsGroups: [
      {
        title: `// Aptitudes sociales`,
        skills: [
          { name: `Intimidation & Présence`, percent: 88 },
          { name: `Négociation & Marché Noir`, percent: 82 },
          { name: `Réseautage Industriel`, percent: 75 },
          { name: `Discipline & Sang-froid`, percent: 94 },
          { name: `Lecture d'intentions`, percent: 80 },
        ],
      },
      {
        title: `// Expertise technique`,
        skills: [
          { name: `Mécanique & Rétro-ingénierie`, percent: 95 },
          { name: `Optimisation & Blindage`, percent: 92 },
          { name: `Logistique de Fuite & Tactique`, percent: 90 },
          { name: `Maintenance de Précision`, percent: 86 },
          { name: `Gestion de Stocks Sensibles`, percent: 82 },
        ],
      },
    ],
    callout: `// PROFIL : Architecte Logistique et Support Tactique. Approche militaire. Capacité de résilience exceptionnelle. Expert en sécurisation de périmètre et transport. //`,
  },

  // --- CHAPITRE VI : LE FUTUR ---
  chapter6: {
    label: `Le futur`,
    titleLines: [`Objectifs &`, `ambitions`, `text-accent`],
    objectives: {
      shortTerm: [
        `Sécuriser les dernières affaires de Jason à Little Seoul.`,
        `Réparer intégralement le Bison pour les prochaines missions.`,
        `Maintenir le profil bas sur les Docks de Cypress Flats.`,
        `Recruter un second de confiance pour la gestion de l'entrepôt.`
      ],
      mediumTerm: [
        `Acquérir l'entrepôt adjacent pour étendre sa capacité de stockage.`,
        `Étendre son réseau logistique jusqu'à Paleto Bay via des relais discrets.`,
        `Identifier les responsables de la trahison de Jason Pils.`,
        `Devenir le pivot logistique indispensable du syndicat local.`
      ],
      longTerm: [
        `Construire un héritage Pils qui dure après lui dans l'ombre.`,
        `Prendre sa retraite loin du chaos de Los Santos.`,
        `Ne jamais finir comme son cousin Jay.`,
        `Laisser une trace indélébile dans les fondations criminelles de la ville.`
      ],
    },
    finaleStory: [
      `Larry Pils regarde la skyline de Los Santos depuis son toit. La ville brille, mais il sait que sous les néons, il n'y a que de la rouille et des erreurs. Il finira son verre, descendra dans son garage, et reprendra le travail. Car tant qu'il y aura des Pils en ville, la mécanique ne s'arrêtera jamais.`,
    ],
    finaleQuote: `"Jason rigolait tout le temps. Moi, je ne rigole plus. Mais je suis toujours debout."`,
  },

  // --- CHAPITRE V : ENTOURAGE ---
  chapter5: {
    label: `Entourage`,
    titleLines: [`Relations &`, `proches`],
  },

  family: [
    { id: `elena_volkov`, name: `Elena Volkov`, relation: `Partenaire Technique`, status: `alive` },
    { id: `isabella_sterling`, name: `Isabella Sterling`, relation: `Fournisseur Hardware`, status: `dead` },
    { id: `amari_davis`, name: `Amari Davis`, relation: `Client / Contact Voie Grise`, status: `alive` },
  ],
  footer:
    `DOSSIER RP — LARRY PILS · LOS SANTOS · LIBERTY CITY (LC) → LS · 34 ANS · REF: 2026-LP-02<br>Document créé par RPStories — Five M · Personnage fictif · v2.1`,
}
