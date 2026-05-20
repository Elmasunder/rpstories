import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gyyfrgbfizmxtgwugdkv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5eWZyZ2JmaXpteHRnd3VnZGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMjYxMTgsImV4cCI6MjA5NDgwMjExOH0.KRCOZVHPfr-l20zwaB6FiphOOvoi1by10BrFO7qBC2E'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function run() {
  console.log('Connexion à Supabase...')

  const email = 'valerie.reyes@rpstories.com'
  const password = 'NightCityPassword2077!'
  const username = 'ValerieReyes'

  let userId: string | null

  // 1. Tenter de se connecter
  console.log(`Tentative de connexion avec ${email}...`)
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (signInError) {
    console.log('Erreur de connexion:', signInError.message)
    console.log('Tentative d\'inscription...')
    
    // 2. Tenter de s\'inscrire si l\'utilisateur n\'existe pas
    const signUpResult = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: username
        }
      }
    })

    console.log('Résultat Inscription:', JSON.stringify(signUpResult, null, 2))

    if (signUpResult.error) {
      console.error('Erreur d\'inscription:', signUpResult.error.message)
      return
    }

    userId = signUpResult.data.user?.id || null
    console.log(`Inscription réussie ! Nouvel utilisateur créé : ${userId}`)
  } else {
    userId = signInData.user?.id || null
    console.log(`Connexion réussie ! Utilisateur connecté : ${userId}`)
  }

  if (!userId) {
    console.error('Impossible d\'obtenir l\'UUID de l\'utilisateur.')
    return
  }

  // Supprimer le personnage s'il existe déjà
  console.log('Nettoyage des anciens dossiers Valerie Reyes...')
  await supabase
    .from('characters')
    .delete()
    .eq('first_name', 'Valerie')
    .eq('last_name', 'Reyes')
    .eq('owner_id', userId)

  // Créer le personnage en liant son owner_id à notre utilisateur fraîchement authentifié
  console.log(`Création du personnage Valerie Reyes...`)
  const newChar = {
    owner_id: userId,
    privacy: 'public',
    first_name: 'Valerie',
    last_name: 'Reyes',
    alias: 'V',
    status: 'alive',
    server_domain: 'eclipse-rp.net',
    discord_url: 'https://discord.gg/eclipserp',
    eyebrow: 'ARCHIVE RÉSEAU // SUJET N°009',
    ref: 'DOSSIER REF: 2026-VR-09',
    photos: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=800&auto=format&fit=crop'
    ],
    age: 28,
    taille: '175 cm',
    poids: '68 kg',
    origines: 'Japonaise / Hispanique',
    vehicule_ref: 'Quadra Type-66',
    chapter1: {
      label: 'Identité',
      titleLines: ['Dossier', 'd\'agent', 'text-accent'],
      identityPanels: [
        [
          { key: 'Nom', value: 'Reyes' },
          { key: 'Prénom', value: 'Valerie' },
          { key: 'Surnom', value: '"V"', class: 'text-accent' },
          { key: 'Date de naissance', value: '12 / 10 / 1998' },
          { key: 'Lieu de naissance', value: 'Night City' },
          { key: 'Ville actuelle', value: 'Los Santos', class: 'text-accent-alt' },
          { key: 'Origine(s)', value: 'Japonaise / Hispanique' },
          { key: 'Taille', value: '175 cm' },
          { key: 'Poids', value: '68 kg' }
        ],
        [
          { key: 'Signe particulier', value: 'Tatouage cybernétique sur le bras droit', class: 'text-accent' },
          { key: 'Père', value: 'Inconnu', class: 'text-muted' },
          { key: 'Mère', value: 'Elena Reyes' },
          { key: 'Passé', value: 'Mercenaire' },
          { key: 'Passion(s)', value: 'Motos de sport, hacking' },
          { key: 'Véhicule', value: 'Yaiba Kusanagi', class: 'text-accent' },
          { key: 'Spécialité', value: 'Solo / Netrunner', class: 'text-accent' }
        ]
      ],
      profile: {
        qualités: ['Déterminée', 'Ingénieuse', 'Loyale'],
        défauts: ['Têtue', 'Cynique', 'Impulsive']
      },
      infoPlus: {
        icon: '📝',
        title: 'Note de Dossier',
        text: 'Sujet considéré comme hautement imprévisible. Sous surveillance de la division réseau.'
      }
    },
    chapter2: {
      label: 'Histoire',
      titleLines: ['Les', 'bas-fonds', 'text-accent-alt'],
      photo: {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
        alt: 'Night City Streets',
        caption: 'Night City, secteur industriel.'
      },
      story1: [
        'Valerie a grandi dans les rues sombres et pluvieuses de Night City. Élevée par sa mère seule dans un appartement exigu de Watson, elle a rapidement appris à ne faire confiance qu\'à elle-même et aux rares personnes qui lui montraient de la loyauté.',
        'Dès son adolescence, elle s\'intéresse à la technologie et au codage, passant des nuits entières à décortiquer du matériel obsolète récupéré dans des décharges électroniques.'
      ],
      story2: [
        'C\'est ainsi qu\'elle s\'est fait un nom en tant que Netrunner indépendante, effectuant des missions risquées pour le compte de divers gangs locaux, avant de devoir fuir suite à un contrat corporatiste qui a mal tourné.'
      ],
      quote: 'Si tu veux survivre ici, garde les yeux ouverts et ton arme chargée.'
    },
    chapter3: {
      label: 'Histoire',
      titleLines: ['Nouveau', 'départ', 'text-accent'],
      story1: [
        'Arrivée à Los Santos il y a deux ans avec presque rien en poche, Valerie a dû repartir de zéro. Elle a troqué ses implants cybernétiques de pointe pour un équipement plus discret, adapté aux technologies locales de la côte ouest.',
        'Elle opère maintenant sous le radar, offrant ses services de hacking et d\'infiltration à des intermédiaires bien établis de Los Santos.'
      ]
    },
    chapter4: {
      label: 'Aptitudes',
      titleLines: ['Compétences &', 'spécialités', 'text-accent'],
      photo: {
        url: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=800&auto=format&fit=crop',
        alt: 'Cyber Deck',
        caption: 'Poste de travail mobile de Valerie.'
      },
      story1: [
        'Son domaine d\'expertise principal réside dans la manipulation des réseaux locaux, la neutralisation de caméras à distance et le contournement des pare-feux industriels.'
      ],
      skillsGroups: [
        {
          title: '// Infiltration & Hack',
          skills: [
            { name: 'Bypass Pare-feu', percent: 90 },
            { name: 'Hack Réseau Domestique', percent: 85 },
            { name: 'Décryptage de Données', percent: 80 }
          ]
        },
        {
          title: '// Combat & Mobilité',
          skills: [
            { name: 'Tir de précision', percent: 75 },
            { name: 'Pilotage Moto', percent: 88 },
            { name: 'Discrétion', percent: 70 }
          ]
        }
      ],
      callout: 'Une experte hors pair en Netrunning dotée d\'une excellente mobilité sur route.'
    },
    chapter6: {
      label: 'Objectifs',
      titleLines: ['Perspectives &', 'futurs objectifs', 'text-accent-alt'],
      objectives: {
        shortTerm: [
          'Établir un réseau de contacts solides auprès des importateurs de Los Santos.',
          'Mettre à niveau sa console de programmation portable.'
        ],
        mediumTerm: [
          'Acquérir une planque sécurisée dans les hauteurs de la ville.',
          'Obtenir une accréditation de sécurité VIP auprès d\'une corporation locale.'
        ],
        longTerm: [
          'Prendre sa retraite définitive loin de l\'agitation des grandes villes.',
          'Créer sa propre agence de sécurité réseau.'
        ]
      },
      finaleStory: [
        'Valerie continue de tracer sa route dans les néons de Los Santos, guidée par une ambition dévorante mais tempérée par un code d\'honneur strict.'
      ],
      finaleQuote: 'La liberté a un prix, et je suis prête à le payer.'
    },
    family: [
      { name: 'Elena Reyes', relation: 'Mère', status: 'alive' },
      { name: 'Jackie Welles', relation: 'Partenaire de crime', status: 'dead' }
    ],
    footer: 'Dossier n°009 - Propriété exclusive de V. Reyes.'
  }

  const { data: insertedData, error: insertError } = await supabase
    .from('characters')
    .insert(newChar)
    .select('id')
    .single()

  if (insertError) {
    console.error('Erreur lors de l\'insertion du personnage:', insertError.message)
    return
  }

  console.log(`\nSuccès ! Personnage "${newChar.first_name} ${newChar.last_name}" créé avec succès !`)
  console.log(`Vous pouvez le voir sur : http://localhost:5173/rpstories/#/fiche/${insertedData.id}`)
}

run()
