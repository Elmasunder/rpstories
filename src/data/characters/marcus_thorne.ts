import type { Character } from '@/types/character'

export const marcus_thorne: Character = {
    // ID unique utilisé pour l'URL
    id: 'marcus_thorne',
    
    // Titre de l'onglet du navigateur
    pageTitle: 'Dossier RP – Marcus Thorne',

    // --- SECTION COVER (Entête de la fiche) ---
    cover: {
      status: 'alive', 
      serverDomain: 'redline-rp.fr', 
      discordUrl: 'https://discord.gg/redline', 
      eyebrow: '// DOSSIER RP #26MT0004',
      firstName: 'MARCUS',
      lastName: 'THORNE',
      alias: 'The Shield',
      subtitle: '38 ans — Rockford Hills, Los Santos',
      destination: 'Los Santos',
      
      meta: [
        { key: 'Âge', value: '38' },
        { key: 'Taille', value: '192 cm' },
        { key: 'Poids', value: '105 kg' },
        { key: 'Origines', value: 'Britannique' },
        { key: 'Véhicule', value: 'Granger 3600LX' }
      ],
      
      ref: 'DOSSIER REF: 26-MT-04<br>STATUT: ACTIF<br>USAGE: ROLEPLAY EXCLUSIF',
      
      photos: [
        'assets/marcus_thorne/marcus1.webp',
        'assets/marcus_thorne/marcus2.webp',
        'assets/marcus_thorne/marcus3.webp'
      ]
    },

    // --- CHAPITRE I : IDENTITÉ & PROFIL ---
    chapter1: {
      label: 'Présentation du personnage',
      titleLines: ['Profil &', 'Identité'],
      
      identityPanels: [
        // Panneau de gauche (Données administratives)
        [
          { key: 'Nom', value: 'Thorne' },
          { key: 'Prénom', value: 'Marcus' },
          { key: 'Surnom', value: '"The Shield"', class: 'text-accent' },
          { key: 'Date de naissance', value: '22 / 11 / 1986' },
          { key: 'Lieu de naissance', value: 'Londres, UK' },
          { key: 'Ville actuelle', value: 'Los Santos' },
          { key: 'Origine(s)', value: 'Britannique' },
          { key: 'Taille', value: '192 cm' },
          { key: 'Poids', value: '105 kg' }
        ],
        // Panneau de droite (Lore & Passé)
        [
          { key: 'Signe particulier', value: 'Carrure imposante' },
          { key: 'Père', value: 'Arthur Thorne (Décédé)' },
          { key: 'Mère', value: 'Elizabeth Thorne' },
          { key: 'Famille proche', value: 'Aucune' },
          { key: 'Passé', value: 'Ancien Officier de Police (MET)' },
          { key: 'Passion(s)', value: 'Boxe Anglaise & Horlogerie' },
          { key: 'Véhicule', value: 'Granger 3600LX', class: 'text-accent' },
          { key: 'Spécialité', value: 'Protection Rapprochée', class: 'text-accent' }
        ]
      ],
      
      profile: {
        qualités: ['Discipliné', 'Protecteur', 'Imperturbable', 'Honnête'],
        défauts: ['Rigide', 'Bourreau de travail', 'Peu diplomate', 'Sévère']
      },
      
      infoPlus: {
        icon: '🛡️',
        title: 'Le Code d\'Honneur',
        text: 'Marcus ne déroge jamais à sa parole. Une fois engagé, il devient une barrière infranchissable entre son client et la menace.'
      }
    },

    // --- CHAPITRE II : HISTOIRE (Origines) ---
    chapter2: {
      label: 'Histoire',
      titleLines: ['Les', 'origines', 'text-accent-alt'],
      photo: {
        url: 'assets/marcus_thorne/marcus2.webp',
        alt: 'London Streets',
        caption: '// Londres — Quartier de Westminster'
      },
      story1: [
        'Marcus a grandi dans la discipline rigide d\'une famille de militaires et de policiers londoniens. Son destin était tracé dès l\'enfance : servir et protéger. Après une brillante carrière au sein de la Metropolitan Police, un incident tragique lors d\'une intervention l\'a poussé à remettre en question le système.',
        'Il a quitté les forces de l\'ordre avec tous les honneurs, mais avec un vide immense qu\'il a tenté de combler en se lançant dans la sécurité privée de haut niveau pour des dignitaires internationaux.'
      ],
      story2: [
        'C\'est lors d\'une mission de protection à San Andreas qu\'il a découvert Los Santos. Séduit par le chaos organisé de la ville et les opportunités pour un homme de son calibre, il a décidé d\'y poser ses valises définitivement.'
      ],
      quote: '"La peur est un choix. La discipline est une obligation."',
      callout: '// Dossier MET-UK : Retraite anticipée — Mention d\'Excellence //'
    },

    // --- CHAPITRE III : HISTOIRE (Vie Adulte) ---
    chapter3: {
      label: 'Histoire',
      titleLines: ['La vie', "d'adulte", 'text-accent'],
      photo: {
        url: 'assets/marcus_thorne/marcus3.webp',
        alt: 'Los Santos Security',
        caption: '// Rockford Hills — En service'
      },
      story1: [
        'À Los Santos, Marcus n\'est pas un criminel, c\'est un professionnel. Il gère une petite agence de protection rapprochée ultra-discrète. Ses clients sont des PDG, des politiciens véreux ou des figures du milieu qui ont besoin d\'une sécurité sans faille.',
        'Son nom est devenu synonyme de tranquillité. Quand Marcus Thorne est sur le pas de votre porte, vous dormez sur vos deux oreilles.'
      ],
      story2: [
        'Il entretient des relations cordiales avec le LSPD, tout en sachant naviguer dans les zones grises de la ville. Son but n\'est pas de nettoyer les rues, mais de s\'assurer que ceux qui le paient ne finissent jamais dedans.'
      ],
      quote: '"Je ne suis pas payé pour être votre ami. Je suis payé pour que vous restiez en vie."'
    },

    // --- CHAPITRE IV : APTITUDES ---
    chapter4: {
      label: 'Aptitudes',
      titleLines: ['Spécialités &', 'compétences', 'text-accent'],
      photo: {
        url: 'assets/marcus_thorne/marcus1.webp',
        alt: 'Marcus training',
        caption: '// Entraînement au combat au corps à corps'
      },
      story1: [
        'Marcus Thorne n\'est pas simplement une présence physique imposante ; c\'est un analyste de terrain hors pair. Son approche de la protection repose sur une doctrine de "bulle défensive" qu\'il a perfectionnée au fil de ses années à la Metropolitan Police et dans les théâtres d\'opérations privés. Maître en Krav Maga, il privilégie la neutralisation rapide et efficace des menaces, utilisant la force uniquement comme ultime recours mais avec une intensité dévastatrice. Sa maîtrise des armes à feu est chirurgicale, avec une spécialisation dans les engagements à courte distance et le tir de riposte en milieu urbain dense.',
        'Au-delà du combat, Marcus excelle dans la logistique de sécurité : planification d\'itinéraires sécurisés, détection de dispositifs de surveillance et gestion de crises sous haute tension. Son sang-froid est sa plus grande arme ; capable de rester imperturbable même face à des situations de vie ou de mort, il transmet une autorité naturelle qui désamorce souvent les conflits avant même qu\'ils n\'éclatent. Pour lui, la sécurité est une science exacte où chaque variable doit être contrôlée, anticipée et verrouillée.'
      ],
      
      skillsGroups: [
        {
          title: '// Aptitudes sociales',
          skills: [
            { name: 'Négociation & Apaisement', percent: 75 },
            { name: 'Intimidation & Autorité', percent: 95 },
            { name: 'Analyse de Menaces Urbaines', percent: 88 },
            { name: 'Sang-froid (Situations critiques)', percent: 98 },
            { name: 'Protocole & Étiquette', percent: 80 }
          ]
        },
        {
          title: '// Expertise technique',
          skills: [
            { name: 'Combat au Corps à Corps', percent: 92 },
            { name: 'Conduite de Convoi Sécurisé', percent: 90 },
            { name: 'Armement Tactique & Défensif', percent: 86 },
            { name: 'Contre-Surveillance & Appareillage', percent: 78 },
            { name: 'Premiers Secours de Combat', percent: 84 }
          ]
        }
      ],
      callout: '// Spécialisation : Haute Protection & Extraction Sécurisée //'
    },

    // --- CHAPITRE V : ENTOURAGE ---
    chapter5: {
      label: 'Entourage',
      titleLines: ['Relations &', 'proches']
    },

    family: [
      { id: 'larry_pils', name: 'Larry Pils', relation: 'Contact Logistique', status: 'alive' },
      { id: 'elena_volkov', name: 'Elena Volkov', relation: 'Contact Renseignement', status: 'alive' },
      { name: 'Sgt. O\'Neil', relation: 'Ancien Collègue (LSPD)', status: 'alive' }
    ],

    // --- CHAPITRE VI : LE FUTUR ---
    chapter6: {
      label: 'Le futur',
      titleLines: ['Objectifs &', 'ambitions', 'text-accent'],
      
      objectives: {
        shortTerm: ['Moderniser sa flotte de Granger', 'Établir un contrat avec un PDG majeur', 'Sécuriser sa résidence à Rockford'],
        mediumTerm: ['Ouvrir un centre d\'entraînement privé', 'Recruter des anciens du LSPD de confiance', 'Devenir le leader de la sécurité privée de LS'],
        longTerm: ['Influencer les politiques de sécurité de la ville', 'Prendre une retraite paisible en Angleterre', 'Laisser une agence Thorne prospère']
      },
      
      finaleStory: [
        'Marcus Thorne ne reculera jamais. Tant qu\'il y aura des loups à Los Santos, il y aura besoin d\'un bouclier. Et Marcus Thorne est le bouclier le plus solide de la ville.'
      ],
      finaleQuote: '"Le chaos est inévitable. Ma présence est la seule variable qui compte."'
    },

    footer: 'DOSSIER RP — MARCUS THORNE · LOS SANTOS · REF: 26-MT-04 · STATUT: ACTIF · v2.1'
  }
