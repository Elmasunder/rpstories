import type { Character } from '@/types/character'

export const jason_pils: Character = {

    id: 'jason_pils',
    pageTitle: 'Dossier RP – Jason Pils',

    cover: {
      status: 'dead',
      serverDomain: 'atlas-rp.fr/',
      eyebrow: '// Dossier Roleplay — Five M // Los Santos //',
      firstName: 'JASON',
      lastName: 'PILS',
      alias: 'Jay',
      subtitle: '27 ans — Little Seoul',
      destination: 'Los Santos',
      meta: [
        { key: 'Âge', value: '27' },
        { key: 'Taille', value: '179 cm' },
        { key: 'Poids', value: '56 kg' },
        { key: 'Origines', value: 'Caucasien' },
        { key: 'Véhicule de réf', value: 'Futo' }
      ],
      ref: 'DOSSIER REF: JAY-27-LS<br>STATUT: DEAD<br>USAGE: ROLEPLAY EXCLUSIF',
      photos: [
        'assets/jason_pils/jason2.webp',
        'assets/jason_pils/jason3.webp',
        'assets/jason_pils/jason1.webp'
      ]
    },

    chapter1: {
      label: 'Chapitre I',
      titleLines: ['Présentation du', 'Personnage'],
      identityPanels: [
        [
          { key: 'Nom', value: 'Pils' },
          { key: 'Prénom', value: 'Jason' },
          { key: 'Surnom', value: '"Jay"', class: 'text-accent' },
          { key: 'Date de naissance', value: '02 / 02 / 2000' },
          { key: 'Lieu de naissance', value: 'Los Santos' },
          { key: 'Ville actuelle', value: 'Los Santos', class: 'text-accent-alt' },
          { key: 'Origines', value: 'Caucasien' },
          { key: 'Taille / Poids', value: '179 cm / 56 kg' },
          { key: 'Signes particuliers', value: 'Cicatrice arcade gauche & tatouage bras droit', class: 'text-accent' }
        ],
        [
          { key: 'Père', value: 'Inconnu', class: 'text-muted' },
          { key: 'Mère', value: 'Décédée', class: 'text-accent-alt' },
          { key: 'Famille proche', value: 'Larry (Cousin)' },
          { key: 'Passé', value: 'Famille d\'accueil' },
          { key: 'Passion #1', value: '—' },
          { key: 'Monture', value: 'Futo cabossée', class: 'text-accent' },
          { key: 'Spécialité', value: 'Triche / Drogues' },
          { key: 'Info +', value: 'Fume. Bavard. Parle beaucoup.' }
        ]
      ],
      profile: {
        qualities: ['Sympathique', 'Drôle', 'Empathique', 'Débrouillard'],
        flaws: ['Alcoolique', 'Drogué', 'Tricheur', 'Imprudent']
      },
      specialInfo: {
        icon: '💔',
        title: 'Tatouage — "Lover"',
        text: 'Jason a eu "Lover" tatoué sur son bras gauche à 19 ans, après avoir rencontré sa copine, une fille qu\'il considérait comme la femme de sa vie. Malheureusement, elle est décédée tragiquement quelques mois plus tard, des suites d\'un accident de voiture.'
      }
    },

    chapter2: {
      label: 'Chapitre II',
      titleLines: ['Les', 'Origines', 'text-accent-alt'],
      photo: {
        url: 'assets/jason_pils/jason1.webp',
        alt: 'Little Seoul, Los Santos',
        caption: '// Little Seoul, Los Santos — Quartier d\'origine'
      },
      story1: [
        'Jason Pils est né à Los Santos, dans le quartier de Little Seoul. Fils d\'une mère absente et d\'un père fantôme, il a grandi entre les appartements de familles d\'accueil et les couloirs d\'établissements scolaires qu\'il ne prenait pas la peine de fréquenter.',
        'Son cousin Larry était son seul repère — un gars plus vieux, pas forcément meilleur exemple, mais au moins il était là. C\'est lui qui lui a appris à tenir dans la rue, à reconnaître les arnaques et à en pratiquer quelques-unes lui-même.'
      ],
      story2: [
        'À 19 ans, Jason rencontre la seule personne qui lui ait jamais fait penser à quelque chose de stable. Quelques mois plus tard, elle disparaît dans un accident. Il ne s\'en est jamais vraiment remis.',
        'Depuis, il vit dans un brouillard léger — alcool, drogues douces, parties de cartes truquées. Pas une vie glorieuse, mais c\'est la sienne. Il rit facilement. C\'est peut-être ça le plus triste.'
      ],
      quote: '"Je suis pas quelqu\'un de compliqué. Je veux juste m\'amuser avant que ça finisse."',
      callout: '// Dossier classé DEAD. Personnage archivé — ancienne session RP. Conservé à titre de mémoire narrative. //'
    },

    chapter3: {
      label: 'Chapitre III',
      titleLines: ['La Vie à', 'Los Santos', 'text-accent'],
      photo: {
        url: 'assets/jason_pils/jason2.webp',
        alt: 'Los Santos',
        caption: '// Los Santos — Terrain de jeu et tombeau'
      },
      story1: [
        'Jason n\'a jamais quitté Los Santos. Pourquoi le ferait-il ? Il connaît chaque rue, chaque bar douteux, chaque bookmaker qui accepte les mises en liquide. La ville est un labyrinthe dont il a mémorisé les sorties — pas pour en partir, mais pour y survivre.',
        'Son activité principale : la triche dans les jeux d\'argent informels. Pas spectaculaire, mais suffisant pour payer la chambre et les bières. Et quand ça ne suffit pas, il fait quelques livraisons pour des gens qui ne posent pas de questions.'
      ],
      story2: [
        'Sa Futo cabossée est une blague ambulante dans le quartier. Il la refuse à vendre par principe. C\'est son dernier truc à lui, le seul objet qu\'il n\'a pas perdu, vendu ou misé.',
        'Il est mort comme il a vécu — sans trop de bruit, au mauvais endroit, au mauvais moment.'
      ],
      quote: '"La Futo, elle part pas. C\'est ma façon de rester."'
    },

    chapter4: {
      label: 'Chapitre IV',
      titleLines: ['Spécialité &', 'Compétences', 'text-accent'],
      photo: {
        url: 'assets/jason_pils/jason3.webp',
        alt: 'Futo',
        caption: '// Futo — La bagnole qui refuse de mourir'
      },
      story1: [
        "Jason Pils ne possédait peut-être pas de force brute, mais il avait l'instinct des survivants. Sa spécialité ? La lecture immédiate des faiblesses d'autrui. Que ce soit autour d'une table de poker ou lors d'une embrouille de rue, il savait identifier en quelques secondes qui était prêt à flancher. Cette capacité de bluff, combinée à une connaissance parfaite des bas-fonds de Los Santos, lui permettait de s'en sortir là où d'autres auraient fini au tapis.",
        "Sa Futo, bien que cabossée, était le prolongement de sa propre existence : instable, bruyante, mais incroyablement coriace. Au volant, il n'était pas un pilote de course, mais un roi de l'esquive, capable de se faufiler dans des passages impossibles pour semer n'importe qui. Il maîtrisait l'art de vivre avec peu, de transformer une arnaque de quartier en une survie quotidienne."
      ],
      skillsGroups: [
        {
          title: '// SURVIE & RUE',
          skills: [
            { name: "Triche & Manipulation de cartes", percent: 88 },
            { name: "Esquive & Pilotage de survie", percent: 75 },
            { name: "Livraisons 'sensibles' & Go-fast urbain", percent: 82 },
            { name: "Connaissance des bas-fonds de LS", percent: 90 },
            { name: "Dissimulation d'objets & Planques", percent: 65 }
          ]
        },
        {
          title: '// PSYCHOLOGIE DE RUE',
          skills: [
            { name: "Lecture de l'adversaire (Tells)", percent: 94 },
            { name: "Bluff & Persuasion", percent: 85 },
            { name: "Instinct de survie / Flair", percent: 96 },
            { name: "Loyauté indéfectible", percent: 100 },
            { name: "Mise en réseau informelle", percent: 70 }
          ]
        }
      ],
      callout: "// PROFIL : Survivant né. Maître du bluff et de l'arnaque sociale. Capacité d'adaptation hors normes. Bien que classé 'DEAD', son héritage de 'gars qui ne lâche rien' reste gravé dans les rues de Little Seoul. //"
    },

    chapter6: {
      label: 'Épilogue',
      titleLines: ['Ce qu\'il', 'Laisse', 'text-accent-alt'],
      objectives: {
        shortTerm: [
          'Archivé. Objectifs non atteints.',
          'Trouver quelque chose qui ressemble à de la stabilité.',
          'Arrêter de miser plus qu\'il ne gagne.',
          'Appeler son cousin Larry plus souvent.'
        ],
        mediumTerm: [
          'Trouver un boulot à peu près légal.',
          'Réparer vraiment la Futo.',
          'Faire le deuil proprement — sans alcool.',
          'Rencontrer quelqu\'un de nouveau, peut-être.'
        ],
        longTerm: [
          'Aucun. Il vivait jour par jour.',
          'Il aurait voulu que ça dure un peu plus longtemps.',
          'Être souvenu par au moins une personne.',
          'C\'est tout.'
        ]
      },
      finaleStory: [
        'Jason Pils n\'avait pas de grand plan. Pas de trajectoire. Juste une série de jours qui se ressemblaient, avec quelques bons moments planqués dedans si tu regardais bien.',
        'Il était bruyant, imprudent, et dépendant de trop de choses. Mais il était là. Et pour certains, c\'était suffisant.'
      ],
      finaleQuote: '"Jay. De Los Santos. Et j\'suis nulle part maintenant — mais j\'étais là, hein."'
    },

    family: [
      { id: 'larry_pils', name: 'Larry Pils', relation: 'Cousin', status: 'alive' },
      { name: 'Mère de Jason', relation: 'Mère', status: 'dead' }
    ],

    footer: 'DOSSIER RP — JASON "JAY" PILS · LOS SANTOS · REF: JAY-27-LS · STATUT: DEAD<br>Document créé par RPStories — Five M · Personnage fictif · Archivé'
  }