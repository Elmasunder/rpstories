import type { Character } from '@/types/character'

export const isabella_sterling: Character = {
  id: `isabella_sterling`,
  pageTitle: `Dossier RP – Isabella Sterling`,

  // --- SECTION COVER (Entête de la fiche) ---
  cover: {
    status: `dead`,
    serverDomain: `nova-city.fr`,
    discordUrl: `https://discord.gg/novacity`,
    eyebrow: `// DOSSIER RP #2026IS0005`,
    firstName: `ISABELLA`,
    lastName: `STERLING`,
    alias: `Static`,
    meta: [
      { key: `Âge`, value: `29` },
      { key: `Taille`, value: `172 cm` },
      { key: `Poids`, value: `62 kg` },
      { key: `Origines`, value: `Britannique` },
      { key: `Véhicule de réf`, value: `Custom Deck` },
    ],
    ref: `DOSSIER REF: 2026-IS-05<br>STATUT: ACTIF · EN SERVICE<br>USAGE: ROLEPLAY EXCLUSIF`,
    photos: [
      `assets/isabella_sterling/isabella1.webp`,
      `assets/isabella_sterling/isabella2.webp`,
      `assets/isabella_sterling/isabella3.webp`,
    ],
  },

  // --- CHAPITRE I : PRÉSENTATION DU PERSONNAGE ---
  chapter1: {
    label: `Présentation du personnage`,
    titleLines: [`Profil &`, `Identité`],
    identityPanels: [
      [
        { key: `Nom`, value: `Sterling` },
        { key: `Prénom`, value: `Isabella` },
        { key: `Surnom`, value: `"Static"`, class: `text-accent` },
        { key: `Date de naissance`, value: `12 / 05 / 1997` },
        { key: `Lieu de naissance`, value: `Islington, Londres` },
        { key: `Ville actuelle`, value: `Los Santos`, class: `text-accent-alt` },
        { key: `Origine(s)`, value: `Britannique` },
        { key: `Taille`, value: `172 cm` },
        { key: `Poids`, value: `62 kg` },
      ],
      [
        { key: `Signe particulier`, value: `Tatouage binaire (Nuque)`, class: `text-accent` },
        { key: `Père`, value: `Inconnu`, class: `text-muted` },
        { key: `Mère`, value: `Elizabeth Sterling`, class: `text-accent-alt` },
        { key: `Passé`, value: `Ex-Analyste GCHQ` },
        { key: `Passion(s)`, value: `Cyber-sécurité · Cryptage` },
        { key: `Véhicule`, value: `Custom Deck (Handmade)`, class: `text-accent` },
        { key: `Spécialité`, value: `Guerre Électronique`, class: `text-accent` },
      ],
    ],
    profile: {
      qualités: [`Analytique`, `Discrète`, `Ingénieuse`, `Méthodique`, `Loyale`],
      défauts: [`Paranoïaque`, `Cynique`, `Isolée`, `Obsessionnelle`, `Insomniaque`],
    },
    infoPlus: {
      icon: `⚰️`,
      title: `Note de terrain — Mirror Park`,
      text: `Le sujet a été retrouvé sans vie dans une planque secondaire à Mirror Park. Aucune trace de lutte physique. La mort semble avoir été provoquée par une injection létale de neurotoxine de synthèse. Son matériel informatique a été intégralement effacé à distance.`,
    },
  },

  // --- CHAPITRE II : HISTOIRE (Origines) ---
  chapter2: {
    label: `Histoire`,
    titleLines: [`Les`, `origines`, `text-accent-alt`],
    photo: {
      url: `assets/isabella_sterling/isabella2.webp`,
      alt: `Isabella Sterling à Londres`,
      caption: `// Islington, Londres — Quartier d'origine`,
    },
    story1: [
      `Isabella n'a pas grandi dans les parcs de Londres, mais dans le bourdonnement des serveurs de son école à Islington. Fille d'une mère célibataire travaillant comme archiviste, elle a très vite compris que le monde réel était chaotique, mais que les chiffres, eux, ne mentaient jamais. À 15 ans, elle avait déjà reprogrammé le pare-feu de son lycée pour pouvoir accéder à des bases de données universitaires.`,
      `Son talent n'est pas passé inaperçu. Repérée par un recruteur du GCHQ, elle a intégré les services de renseignement britanniques à l'âge de 19 ans. Là-bas, elle est devenue une "ombre" parmi les ombres. Elle a appris à écouter le silence des réseaux et à déceler le moindre signal dans un océan de bruit numérique. Ses collègues l'appelaient "Static".`,
    ],
    story2: [
      `Mais le système qu'elle protégeait s'est révélé être une prison de verre. En 2019, Isabella a mis la main sur le projet "Nightshade" : une opération de surveillance illégale impliquant des hauts fonctionnaires. Confrontée au choix de sa vie, elle a choisi la fuite. Elle a copié les preuves sur un disque dur chiffré, a effacé son existence et a entamé une errance de deux ans à travers l'Europe.`,
    ],
    quote: `"La vérité n'est pas ce que vous croyez. C'est juste ce qu'il reste quand on a supprimé tous les mensonges du système."`,
    callout: `// Signal identifié au GCHQ en 2016. Surnom "Static" attribué par ses pairs. Fuite signalée en 2019 après l'incident Nightshade. Trajectoire de vol : Londres → Los Santos. //`,
  },

  // --- CHAPITRE III : HISTOIRE (Vie actuelle) ---
  chapter3: {
    label: `Histoire`,
    titleLines: [`La vie`, `d'adulte`, `text-accent`],
    photo: {
      url: `assets/isabella_sterling/isabella1.webp`,
      alt: `Los Santos Skyline`,
      caption: `// Los Santos — Destination finale`,
    },
    story1: [
      `Son arrivée à Los Santos s'est faite un soir de brouillard. Elle s'est installée dans le quartier de Little Seoul, utilisant la densité de la population pour masquer ses activités. Son appartement est devenu son sanctuaire, un cockpit technologique où les stores ne s'ouvrent jamais. Isabella pensait avoir trouvé le refuge idéal pour disparaître définitivement.`,
      `Très vite, la rumeur d'une courtière d'informations d'une précision chirurgicale a commencé à circuler. Static ne volait pas pour l'argent, elle traitait pour la valeur. Elle est devenue celle qu'on appelle quand un convoi disparaît des radars. Son premier contrat majeur a scellé sa réputation : rapide, silencieuse et intraçable.`,
    ],
    story2: [
      `Aujourd'hui, cet appartement est vide. L'air y est encore chargé de l'ozone des serveurs qui ont surchauffé lors de la purge finale. Isabella vivait dans un état de vigilance constante, mais elle n'a pas vu venir le signal physique. Elle a été rattrapée par le passé qu'elle tentait de fuir, laissant derrière elle une ville qui ne connaîtra jamais son vrai nom.`,
    ],
    quote: `"Le signal est partout. Si vous ne l'entendez pas, c'est que vous n'écoutez pas assez fort."`,
  },

  // --- CHAPITRE IV : APTITUDES ---
  chapter4: {
    label: `Aptitudes`,
    titleLines: [`Spécialités &`, `compétences`, `text-accent`],
    photo: {
      url: `assets/isabella_sterling/isabella3.webp`,
      alt: `Interface Static`,
      caption: `// Custom Deck — Interface de piratage personnalisée`,
    },
    story1: [
      `Isabella ne voyait pas le monde comme vous le voyez. Pour elle, Los Santos était une architecture de flux, de protocoles et de fréquences. Sa spécialité, la guerre électronique, lui permettait de saturer les communications radio ou de détourner les caméras de surveillance d'un bâtiment en quelques secondes. Elle était l'interférence qui changeait le cours d'une opération.`,
      `Son pilotage de drones était une extension de ses sens. Elle utilisait des modèles modifiés capables de transporter des modules d'injection Wi-Fi. Sa force ne résidait pas dans ses muscles, mais dans sa capacité à neutraliser une menace avant même qu'elle ne soit identifiée physiquement. Même après sa mort, certains de ses scripts continuent de tourner sur le réseau de la ville.`,
    ],
    skillsGroups: [
      {
        title: `// Aptitudes sociales`,
        skills: [
          { name: `Ingénierie Sociale`, percent: 85 },
          { name: `Discrétion & Infiltration`, percent: 92 },
          { name: `Observation & Détection`, percent: 88 },
          { name: `Sang-froid (Under Pressure)`, percent: 91 },
        ],
      },
      {
        title: `// Expertise technique`,
        skills: [
          { name: `Intrusion Systèmes`, percent: 98 },
          { name: `Cryptographie Avancée`, percent: 95 },
          { name: `Guerre Électronique`, percent: 92 },
          { name: `Pilotage de Drones`, percent: 94 },
        ],
      },
    ],
    callout: `// PROFIL : Experte en infiltration numérique et guerre électronique. Approche analytique et chirurgicale. Capacité de disparition totale du réseau. //`,
  },

  // --- CHAPITRE VI : LE FUTUR ---
  chapter6: {
    label: `Le futur`,
    titleLines: [`Objectifs &`, `ambitions`, `text-accent`],
    objectives: {
      shortTerm: [
        `PROJET NIGHTSHADE : Échec de la neutralisation du contact local.`,
        `RÉSEAU SATELLITE : Infrastructure restée orpheline et cryptée.`,
      ],
      mediumTerm: [
        `TRAÇAGE GCHQ : Les agents britanniques ont perdu la trace après Mirror Park.`,
        `DONNÉES FIB : Le dossier Isabella Sterling reste classé "Secret Défense".`,
      ],
      longTerm: [
        `HÉRITAGE : Le code "Nightshade" a été envoyé à un destinataire inconnu.`,
        `LE RESET : Le bouton a été pressé, mais pas de la manière prévue.`,
      ],
    },
    finaleStory: [
      `Le bouton "Reset" a été pressé, mais ce n'est pas Isabella qui a choisi le moment. Elle a été retrouvée un matin pluvieux, le regard figé sur un écran noir qui affichait un seul mot en boucle : "OVERRIDE". Elle n'a pas laissé de lettre, pas de testament. Juste une clé USB vide dans sa main droite.`,
      `Le projet Nightshade ne s'est pas arrêté avec elle. Bien au contraire, sa mort a déclenché une série de protocoles "Dead Man Switch" qui commencent à peine à ébranler les fondations de ses anciens employeurs. Isabella Sterling n'est plus, mais son signal, lui, continue de se propager dans les recoins les plus sombres de la Toile.`,
    ],
    finaleQuote: `"Je ne cherche pas la paix. Je cherche le bouton "Reset" du monde."`,
  },

  // --- CHAPITRE V : ENTOURAGE ---
  chapter5: {
    label: `Entourage`,
    titleLines: [`Relations &`, `proches`],
  },

  family: [
    { id: `amari_davis`, name: `Amari Davis`, relation: `Associé / Mentor`, status: `alive` },
    { id: `elena_volkov`, name: `Elena Volkov`, relation: `Consœur / Rivalité`, status: `alive` },
    { id: `larry_pils`, name: `Larry Pils`, relation: `Fournisseur Hardware`, status: `alive` },
  ],
  footer: `DOSSIER RP — ISABELLA "STATIC" STERLING · LOS SANTOS · ISLINGTON (UK) → LS · 29 ANS · REF: 2026-IS-05<br>Document créé par RPStories — Five M · Personnage fictif · v2.0`,
}
