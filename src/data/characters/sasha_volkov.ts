import type { Character } from '@/types/character'

export const sasha_volkov: Character = {

    id: 'sasha_volkov',
    pageTitle: 'FICHE INDIVIDUE.LLE',
    cover: {
      status: 'alive',
      serverDomain: 'nopixel.net',
      eyebrow: '// Classified File — "LS Fixer" //',
      firstName: 'SASHA',
      lastName: 'VOLKOV',
      alias: 'The Ghost',
      subtitle: '45 ans — Ex-SVR Specialist',
      destination: 'Los Santos',
      meta: [
        { key: 'Âge', value: '45' },
        { key: 'Origine', value: 'Russie' },
        { key: 'Signe', value: 'Scorpion' },
        { key: 'Poids', value: '88kg' },
        { key: 'Taille', value: '188cm' }
      ],
      ref: 'DOSSIER REF: VOL-00-LS<br>STATUT: ACTIF · EN SERVICE<br>USAGE: ARCHIVE CONFIDENTIELLE',
      photos: [
        'assets/sasha_volkov/sasha1.webp',
        'assets/sasha_volkov/sasha2.webp',
        'assets/sasha_volkov/sasha3.webp'
      ]
    },

    chapter1: {
      label: 'Chapitre I',
      titleLines: ['Identité &', 'Dossier Noir'],
      identityPanels: [
        [
          { key: 'Nom', value: 'VOLKOV' },
          { key: 'Prénom', value: 'Sasha' },
          { key: 'Code', value: '"The Ghost"', class: 'text-accent' },
          { key: 'Spécialité', value: 'Intelligence & Strategy' },
          { key: 'Localisation', value: 'Cimetière de Hillcrest' }
        ],
        [
          { key: 'Niveau d\'alerte', value: 'TERMINÉ', class: 'text-accent-alt' },
          { key: 'Affiliation', value: 'Indépendant (Ex-SVR)' },
          { key: 'Richesse', value: 'Saisie' },
          { key: 'Influence', value: 'Légende urbaine' }
        ]
      ],
      profile: {
        qualities: ['Cynique', 'Pragmatique', 'Méthodique', 'Impassible', 'Loyauté sélective'],
        flaws: ['Cruel', 'Solitaire', 'Hanté', 'Paranoïaque']
      },
      specialInfo: {
        icon: '👁️',
        title: 'Cicatrice — Le prix du silence',
        text: 'Une profonde cicatrice traverse son œil gauche. Sasha ne l\'a pas reçue au combat, mais lors d\'un interrogatoire qu\'il a lui-même mené en 1998. C\'est le seul souvenir physique qu\'il a gardé de sa vie passée en Russie.'
      }
    },

    chapter2: {
      label: 'Chapitre II',
      titleLines: ['L\'Ombre de', 'Moscou', 'text-accent-alt'],
      photo: {
        url: 'assets/sasha_volkov/sasha4.webp',
        alt: 'Moscou',
        caption: '// Moscou, 1995 — Début de carrière'
      },
      story1: [
        'Sasha Volkov n\'était pas un homme de main, c\'était un cerveau. Formé dans les meilleures écoles de renseignement russes, il a passé dix ans à manipuler des gouvernements avant de disparaître avec une valise pleine de secrets.',
        'Quand il est arrivé à Los Santos, il n\'a pas cherché à rejoindre un gang. Il a créé son propre marché : le service après-vente pour criminels de haut rang. Vous aviez un problème ? Sasha avait la solution.'
      ],
      story2: [
        'Il était surnommé "The Ghost" parce que personne ne voyait ses opérations. Tout était fluide, propre, et sans traces. Jusqu\'à ce qu\'il accepte le contrat de trop.',
        'Sasha savait que la loyauté n\'existait pas dans cette ville, mais il pensait être le seul à ne pas pouvoir être trahi.'
      ],
      quote: '"Le secret d\'une bonne opération, c\'est de savoir quand s\'arrêter. J\'ai oublié mon propre secret."'
    },

    chapter3: {
      label: 'Chapitre III',
      titleLines: ['Le Dernier', 'Contrat', 'text-accent'],
      photo: {
        url: 'assets/sasha_volkov/sasha1.webp',
        alt: 'Union Depository',
        caption: '// Union Depository — Le lieu du drame'
      },
      story1: [
        'Le braquage de l\'Union Depository devait être son chef-d\'œuvre. Sasha avait planifié chaque seconde, chaque sortie, chaque pot-de-vin. Ce qu\'il n\'avait pas prévu, c\'est que ses propres alliés avaient vendu sa tête avant même le premier coup de feu.',
        'Acculé dans un parking souterrain, il a tenu tête à une unité d\'élite pendant vingt minutes. Il est mort comme il a vécu : seul, mais entouré de dossiers compromettants qu\'il a eu le temps de détruire avant de rendre l\'âme.'
      ],
      story2: [
        'Sa mort a laissé un vide immense dans l\'underground de Los Santos. De nombreux secrets sont partis avec lui dans la tombe, et certains disent que Sasha avait prévu sa propre fin, laissant derrière lui une dernière énigme pour ceux qui oseraient la résoudre.'
      ],
      quote: '"Ne me pleurez pas. J\'ai déjà vécu dix vies de plus que vous tous réunis."'
    },

    chapter4: {
      label: 'Chapitre IV',
      titleLines: ['Arsenal &', 'Expertise', 'text-accent'],
      photo: {
        url: 'assets/sasha_volkov/sasha2.webp',
        alt: 'Équipement tactique',
        caption: '// Matériel récupéré sur la scène de crime'
      },
      story1: [
        'Sasha était un maître de la logistique et du piratage informatique. Il ne se fiait jamais à la force brute s\'il pouvait gagner par l\'information. Son arsenal n\'était pas composé de fusils d\'assaut, mais de clés USB, de micros cryptés et d\'une connaissance parfaite de la corruption locale.'
      ],
      skillsGroups: [
        {
          title: 'Intelligence & Infiltration',
          skills: [
            { name: 'Stratégie de Casse', percent: 95 },
            { name: 'Piratage Systèmes', percent: 90 },
            { name: 'Manipulation Sociale', percent: 85 }
          ]
        },
        {
          title: 'Survie & Combat',
          skills: [
            { name: 'Tir de précision', percent: 75 },
            { name: 'Conduite Évasive', percent: 80 },
            { name: 'Résistance Physique', percent: 70 }
          ]
        }
      ],
      callout: 'Sasha Volkov était considéré comme la menace tactique n°1 par le FIB avant sa neutralisation.'
    },

    chapter6: {
      label: 'Chapitre V',
      titleLines: ['Héritage &', 'Silences', 'text-accent-alt'],
      objectives: {
        shortTerm: ['Effacer toute trace numérique', 'Sécuriser le compte off-shore', 'Neutraliser les traîtres'],
        mediumTerm: ['Prendre le contrôle du port', 'Remplacer l\'ancien Oyabun', 'Devenir intouchable'],
        longTerm: ['Disparaître à nouveau', 'Vivre en paix', 'Laisser une légende']
      },
      finaleStory: [
        'Sasha Volkov n\'est plus, mais son nom résonne encore dans les ruelles sombres de Little Seoul et des docks. On dit que certains soirs, on peut encore entendre le cliquetis de son clavier dans des bureaux abandonnés.',
        'Le Fantôme est enfin devenu ce qu\'il a toujours prétendu être.'
      ],
      finaleQuote: '"Le silence est le seul véritable allié. Tout le reste finit par parler."'
    },

    footer: 'DOSSIER RP — SASHA "The Ghost" VOLKOV · Los Santos · REF: VOL-00-LS · STATUT: ALIVE<br>Document archivé par RPStories — Nopixel · v2.1'
  }