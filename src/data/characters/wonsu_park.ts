import type { Character } from '@/types/character'

export const wonsu_park: Character = {

    id: 'wonsu_park',
    pageTitle: 'Dossier RP – Wonsu Park',

    cover: {
      status: 'alive',
      serverDomain: 'spirit-rp.fr',
      eyebrow: '// Dossier Roleplay — Five M // Los Santos //',
      firstName: 'WON-SUH',
      lastName: 'PARK',
      alias: 'Oyabun',
      subtitle: '32 ans — Little Seoul',
      destination: 'Los Santos',
      meta: [
        { key: 'Âge', value: '33' },
        { key: 'Taille', value: '167 cm' },
        { key: 'Poids', value: '57 kg' },
        { key: 'Origines', value: 'Asiatique' },
        { key: 'Véhicule de réf', value: 'Ocelot Jackal' }
      ],
      ref: 'DOSSIER REF: WONS-02-LS<br>STATUT: ALIVE UNKNOWN LOCATION<br>USAGE: ROLEPLAY EXCLUSIF',
      photos: [
        'assets/wonsu_park/wonsu1.webp',
        'assets/wonsu_park/wonsu2.webp',
        'assets/wonsu_park/wonsu3.webp'
      ]
    },

    chapter1: {
      label: 'Chapitre I',
      titleLines: ['Présentation du', 'Personnage'],
      identityPanels: [
        [
          { key: 'Nom', value: 'PARK' },
          { key: 'Prénom', value: 'WON-SUH' },
          { key: 'Surnom', value: '"Oyabun"', class: 'text-accent' },
          { key: 'Date de naissance', value: '24 / 11 / 1993' },
          { key: 'Lieu de naissance', value: 'Seoul, Corée du Sud' },
          { key: 'Ville actuelle', value: 'Los Santos', class: 'text-accent-alt' },
          { key: 'Origines', value: 'Asiatique' },
          { key: 'Taille / Poids', value: '167 cm / 57 kg' },
          { key: 'Signes particuliers', value: 'lunette jaune fumée, cicatrice tempe gauche', class: 'text-accent' }
        ],
        [
          { key: 'Père', value: 'Ji-Sung Park (Mort)', class: 'text-muted' },
          { key: 'Mère', value: 'Mi-Ran Park', class: 'text-accent-alt' },
          { key: 'Famille proche', value: 'Communauté Sud-Coréenne de Little Seoul' },
          { key: 'Passé', value: 'Études économiques, Devenu Khangpae' },
          { key: 'Passion #1', value: '—' },
          { key: 'Monture', value: 'Ocelot Jackal', class: 'text-accent' },
          { key: 'Spécialité', value: 'Comptabilité, Poker' },
          { key: 'Info +', value: 'Travailleur, manipulateur, calculateur' }
        ]
      ],
      profile: {
        qualities: ['Drôle', 'Calme', 'Déterminé'],
        flaws: ['Fourbe', 'Manipulateur', 'Tricheur', 'Sexiste', 'Misogyne']
      },
      specialInfo: {
        icon: '🐉',
        title: 'Tatouage — Asian Dragon',
        text: 'Wonsu s\'est fait tatouer un dragon asiatique sur le ventre à 25 ans, lors de son entrée chez les Khangpae, en l\'honneur de son fils décédé.'
      }
    },

    chapter2: {
      label: 'Chapitre II',
      titleLines: ['Les', 'Origines', 'text-accent-alt'],
      photo: {
        url: 'assets/wonsu_park/wonsu1.webp',
        alt: 'Seoul, Corée du Sud',
        caption: '// Seoul, Corée du Sud — Quartier d\'origine'
      },
      story1: [
        'WON-SUH PARK est né à Séoul, Corée du Sud, dans une famille aisée. Fils d\'une mère absente et d\'un père fantôme, il a grandi entre les mains du personnel de maison et les couloirs d\'établissements scolaires.',
        'Son père était un homme d\'affaires influent, mais il était rarement présent. Sa mère était une femme styliste, mais elle était rarement présente. C\'est sa grand mère et sa gouvernante qui lui a appris à tenir dans la rue, à reconnaître les arnaques et à en pratiquer quelques-unes lui-même.'
      ],
      story2: [
        'À la majorité, il decide de quitter la Corée du Sud pour s\'installer à Los Santos, en Californie. Son père, furieux de cette décision, lui coupe les vivres, obligeant Wonsu à se débrouiller seul et à s\'installer dans un quartier défavorisé de la ville : Little Seoul.',
        'Il y rencontre des jeunes de son âge qui deviennent rapidement sa famille de cœur. Ils le poussent à monter ses propres affaires jusqu\'à ce qu\'il devienne influent dans la rue. Voici la naissance de l\'"Oyabun" de Little Seoul.'
      ],
      quote: '"On a tous besoin de famille, tu vois ? Même si c\'est pas celle qui t\'a donné la vie."',
      callout: '// Dossier classé ALIVE. Personnage actif — session RP en cours. //'
    },

    chapter3: {
      label: 'Chapitre III',
      titleLines: ['La Vie à', 'Los Santos', 'text-accent'],
      photo: {
        url: 'assets/wonsu_park/wonsu2.webp',
        alt: 'Los Santos',
        caption: '// Los Santos — La Jungle'
      },
      story1: [
        'WON-SUH n\'est pas un homme compliqué. Il veut juste du cash, du respect, et assez de pouvoir pour que personne ne vienne lui chercher des noises.',
        'Il a monté son business pièce par pièce : quelques bars clandestins, des tables de poker cachées, des systèmes de prêts rapides pour ceux qui n\'ont pas accès aux banques. La loi ? Il la contourne. Les problèmes ? Il les règle.'
      ],
      story2: [
        'Les flics le savent, les gangs le savent, les politiciens aussi. Tout le monde sait qui est WON-SUH PARK à Little Seoul. Et la plupart préfèrent le laisser tranquille.',
        'Sa méthode : il ne cherche jamais la guerre ouverte. Il préfère acheter, négocier ou intimider. C\'est plus propre, et ça rapporte plus.'
      ],
      quote: '"Je fais juste des affaires. Si les gens veulent jouer avec moi, ils savent à quoi s\'attendre."'
    },

    chapter4: {
      label: 'Chapitre IV',
      titleLines: ['Spécialité &', 'Compétences', 'text-accent'],
      photo: {
        url: 'assets/wonsu_park/wonsu3.webp',
        alt: 'Los Santos',
        caption: '// Los Santos — La Jungle'
      },
      story1: [
        "WON-SUH PARK n'est pas un soldat, c'est un architecte de l'ombre. Là où d'autres utilisent la force pour s'imposer, lui utilise les chiffres, les contrats et une compréhension chirurgicale de la psychologie humaine. Son passage par les études économiques à Séoul n'a pas été vain : il traite la rue comme un marché boursier, identifiant les failles et capitalisant sur les opportunités avant même que la concurrence ne s'en aperçoive.",
        "Son véritable talent réside dans sa capacité à fédérer. Dans le tumulte de Little Seoul, il est devenu le pivot central, celui que l'on vient voir pour résoudre un conflit sans verser de sang, ou pour monter une affaire que personne n'oserait financer. Il ne dirige pas par la peur, mais par la nécessité : il se rend indispensable à l'écosystème local."
      ],
      skillsGroups: [
        {
          title: '// STRATÉGIE & TERRAIN',
          skills: [
            { name: 'Ingénierie financière & Blanchiment', percent: 94 },
            { name: 'Gestion de réseaux clandestins', percent: 88 },
            { name: 'Négociation diplomatique (inter-gangs)', percent: 85 },
            { name: 'Planification d\'opérations complexes', percent: 78 },
            { name: 'Surveillance & Contre-espionnage', percent: 62 }
          ]
        },
        {
          title: '// INFLUENCE SOCIALE',
          skills: [
            { name: 'Lecture comportementale / Profilage', percent: 92 },
            { name: 'Rhétorique & Persuasion', percent: 89 },
            { name: 'Manipulation psychologique', percent: 85 },
            { name: 'Charisme & Leadership naturel', percent: 90 },
            { name: 'Maîtrise du bluff (Poker High-Stakes)', percent: 96 }
          ]
        }
      ],
      callout: '// PROFIL : Stratège de haut vol. Capacité d\'analyse macro-économique appliquée au milieu criminel. Évite la violence directe au profit de l\'asphyxie financière de ses adversaires. Respecté pour sa parole autant que craint pour son silence. //'
    },

    chapter6: {
      label: 'Épilogue',
      titleLines: ['Ce qu\'il', 'Laisse', 'text-accent-alt'],
      objectives: {
        shortTerm: [
          'Remettre de l\'ordre dans ses affaires après les récentes secousses.',
          'Trouver la stabilité émotionnelle.',
          'S\'entourer de personnes loyales et respectueuses.'
        ],
        mediumTerm: [
          'Étendre son influence financière et asseoir son pouvoir.',
          'Aspirer à une vie plus paisible sans pour autant lâcher les rênes.',
          'Fonder une famille et assurer sa lignée.'
        ],
        longTerm: [
          'Vivre assez vieux pour voir le fruit de son travail.',
          'Voir ses enfants grandir et réussir.',
          'Laisser une trace indélébile dans l\'histoire de Little Seoul.'
        ]
      },
      finaleStory: [
        'WON-SUH ne se voyait pas forcément à la tête du clan de Little Seoul au départ.',
        'Mais par sa rigueur et son intelligence, il a su s\'imposer et devenir un leader respecté par toute la population locale.'
      ],
      finaleQuote: '"Oyabun. C\'est comme ça qu\'on m\'appelle maintenant. Et j\'en suis fier."'
    },

    footer: 'DOSSIER RP — WON-SUH "Oyabun" PARK · Los Santos · REF: WONS-02-LS · STATUT: ALIVE<br>Document créé par RPStories — Five M · Personnage fictif · v2.0'
  }