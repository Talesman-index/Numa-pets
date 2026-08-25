export const INITIAL_PRODUCTS = [
  // --- CHIEN (10 références) ---
  {
    id: 'prod-dog-1',
    slug: 'harnais-ergonomique-y-confort',
    title: 'Harnais ergonomique Y-Confort',
    subtitle: 'Maintien anatomique sans pression sur la trachée',
    animal: 'dog',
    category: 'walk',
    categoryLabel: 'Promenade',
    need: 'Sortir',
    price: 39.90,
    subscriptionPrice: 35.90,
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockQuantity: 45,
    isBestSeller: true,
    isEssential: true,
    isNew: false,
    isRecurring: false,
    images: [
      '/images/product-harness-khaki.png',
      '/images/product-harness-labrador.jpg',
      '/images/product-harness-pattern.jpg'
    ],
    variants: [
      { id: 'size', name: 'Taille', options: ['S (Poitrail 38-52 cm)', 'M (Poitrail 50-68 cm)', 'L (Poitrail 65-90 cm)'] },
      { id: 'color', name: 'Couleur', options: ['Kaki Sauvage', 'Terracotta', 'Noir Minéral'] }
    ],
    description: 'Conçu avec une coupe en Y étudiée pour libérer totalement les épaules et la trachée de votre chien. Rembourrage en mousse respirante et boucles renforcées pour des promenades sereines au quotidien.',
    highlights: [
      'Coupe ergonomique en Y préservant les articulations',
      'Points d’attache double : dorsal pour la marche et poitrail anti-traction',
      'Matériaux résistants à l’eau et lavables en machine à 30°C',
      'Bandes réfléchissantes discrètes pour la sécurité nocturne'
    ],
    howToUse: 'Enfilez le harnais par la tête, passez les sangles sous le poitrail et clipsez les deux boucles latérales. Ajustez les 4 points de réglage en veillant à pouvoir passer deux doigts sous les sangles.',
    materials: 'Sangles polyester haute densité, mousse néoprène respirante, boucles acétal renforcé, anneaux en alliage de zinc inoxydable.',
    safetyInfo: 'Testé en traction jusqu’à 180 kg. Ne laissez pas votre chien sans surveillance attaché au harnais dans un véhicule sans dispositif homologué.',
    shippingInfo: 'Expédié sous 24h depuis notre entrepôt en France. Livraison offerte dès 49 € d’achat. Retours gratuits sous 30 jours.',
    crossSellIds: ['prod-dog-2', 'prod-dog-3', 'prod-dog-4'],
    reviews: [
      { id: 'rev-1', author: 'Camille L.', rating: 5, date: '14/02/2026', title: 'Parfait pour mon Berger Australien', text: 'Le réglage est très simple et mon chien ne tousse plus du tout en tirant un peu. La couleur Kaki est magnifique.' },
      { id: 'rev-2', author: 'Julien M.', rating: 5, date: '02/02/2026', title: 'Finition très qualitative', text: 'On sent la robustesse des coutures et des attaches. Rien à voir avec les harnais bas de gamme.' }
    ]
  },
  {
    id: 'prod-dog-2',
    slug: 'laisse-multi-positions-sangle-tressee',
    title: 'Laisse multi-positions en sangle tressée',
    subtitle: 'Longueur ajustable de 1m à 2m avec double mousqueton',
    animal: 'dog',
    category: 'walk',
    categoryLabel: 'Promenade',
    need: 'Sortir',
    price: 28.50,
    subscriptionPrice: 25.65,
    rating: 4.8,
    reviewCount: 98,
    inStock: true,
    stockQuantity: 60,
    isBestSeller: true,
    isEssential: true,
    isNew: false,
    isRecurring: false,
    images: [
      '/images/product-leash-multiposition.png'
    ],
    variants: [
      { id: 'color', name: 'Couleur', options: ['Kaki Sauvage', 'Terracotta', 'Noir Minéral'] }
    ],
    description: 'Une laisse polyvalente 3-en-1 fabriquée en sangle souple et ultra-résistante. Permet une tenue en bandoulière (mains libres), en double attache ou en longueur classique de 1,2m à 2m.',
    highlights: [
      '3 réglages de longueur instantanés grâce aux anneaux intermédiaires',
      'Option portage en bandoulière mains libres très pratique',
      'Prise en main douce anti-brûlure en cas de traction',
      'Mousquetons pivotants 360° en métal massif'
    ],
    howToUse: 'Positionnez le mousqueton principal sur l’anneau de votre harnais ou collier. Ajustez l’autre extrémité sur l’un des trois anneaux selon la longueur désirée.',
    materials: 'Sangle tissée polyester toucher coton, bouclerie zamak finition canon de fusil mate.',
    safetyInfo: 'Résistance certifiée à la rupture : 210 kg. Rincez à l’eau douce après utilisation en milieu salin.',
    shippingInfo: 'Expédié sous 24h depuis la France. Livraison Colissimo ou Point Relais disponible.',
    crossSellIds: ['prod-dog-1', 'prod-dog-8'],
    reviews: [
      { id: 'rev-3', author: 'Sophie B.', rating: 5, date: '19/01/2026', title: 'La bandoulière change la vie', text: 'Pouvoir marcher les mains dans les poches ou porter un sac pendant la promenade est un vrai confort.' }
    ]
  },
  {
    id: 'prod-dog-3',
    slug: 'collier-rembourre-anti-frottements',
    title: 'Collier rembourré anti-frottements',
    subtitle: 'Doublure néoprène douce pour protéger le cou',
    animal: 'dog',
    category: 'walk',
    categoryLabel: 'Promenade',
    need: 'Sortir',
    price: 22.00,
    subscriptionPrice: 19.80,
    rating: 4.7,
    reviewCount: 64,
    inStock: true,
    stockQuantity: 32,
    isBestSeller: false,
    isEssential: true,
    isNew: false,
    isRecurring: false,
    images: [
      '/images/product-collar-padded.jpg'
    ],
    variants: [
      { id: 'size', name: 'Taille', options: ['S (28-36 cm)', 'M (35-48 cm)', 'L (45-62 cm)'] },
      { id: 'color', name: 'Couleur', options: ['Kaki Sauvage', 'Terracotta', 'Noir Minéral'] }
    ],
    description: 'Un collier sobre et sécurisant pensé pour un usage continu sans abîmer le poil ni irriter la peau sensible du cou.',
    highlights: [
      'Intérieur doublé en néoprène doux anti-irritations',
      'Anneau dédié pour médaille d’identification séparé de la laisse',
      'Fermeture boucle clic robuste et sécurisée'
    ],
    howToUse: 'Mesurez le tour de cou de votre animal à l’aide d’un mètre ruban et laissez l’espace de 2 doigts pour un confort optimal.',
    materials: 'Sangle polyester, doublure néoprène, boucle polymère technique, anneau inox.',
    safetyInfo: 'Ne convient pas pour attacher le chien à une chaîne ou une longe fixe de longue durée.',
    shippingInfo: 'Expédié sous 24h depuis la France.',
    crossSellIds: ['prod-dog-2', 'prod-dog-1'],
    reviews: [
      { id: 'rev-4', author: 'Thierry D.', rating: 5, date: '11/01/2026', title: 'Très doux', text: 'Mon bouledogue français avait souvent des rougeurs avec son ancien collier, celui-ci est impeccable.' }
    ]
  },
  {
    id: 'prod-dog-4',
    slug: 'baume-protecteur-coussinets',
    title: 'Baume protecteur & nourrissant coussinets',
    subtitle: 'Protège et hydrate les coussinets secs ou fragilisés',
    animal: 'dog',
    category: 'care',
    categoryLabel: 'Soin & Hygiène',
    need: 'Prendre soin',
    price: 14.90,
    subscriptionPrice: 13.40,
    rating: 4.8,
    reviewCount: 126,
    inStock: true,
    stockQuantity: 85,
    isBestSeller: true,
    isEssential: true,
    isNew: false,
    isRecurring: true,
    images: [
      '/images/product-paw-balm-packshot.png',
      '/images/product-paw-balm-setter.jpg',
      '/images/product-paw-balm-bathroom.jpg'
    ],
    variants: [
      { id: 'format', name: 'Format', options: ['Stick pratique 50g', 'Pot aluminium 100g'] }
    ],
    description: 'Formulé pour créer un film protecteur naturel contre le sel de déneigement, le bitume chaud, la terre abrasive et la neige. Pénètre rapidement sans laisser de traces grasses sur vos sols.',
    highlights: [
      'Hydratation intense des coussinets crevassés et de la truffe',
      'Formule 100% saine sans parfum artificiel, sans danger en cas de léchage',
      'Format stick d’application directe sans se salir les doigts',
      'Fabriqué en laboratoire certifié cosmétique animale'
    ],
    howToUse: 'Appliquez 1 à 2 fois par semaine sur les coussinets propres et secs. Avant les promenades en hiver (neige, sel) ou en été (chaleur du sol), appliquez une couche protectrice préventive.',
    materials: 'Beurre de karité brut, cire d’abeille purifiée, huile de coco vierge, macérât de calendula, vitamine E naturelle.',
    safetyInfo: 'Usage externe vétérinaire d’hygiène. Sans conservateur chimique. Ne contient aucun médicament ni corticoïde.',
    shippingInfo: 'Expédié sous 24h depuis la France. Disponible en livraison récurrente programmée.',
    crossSellIds: ['prod-dog-6', 'prod-dog-7'],
    reviews: [
      { id: 'rev-5', author: 'Élodie G.', rating: 5, date: '04/02/2026', title: 'Indispensable après nos randos', text: 'Les pattes de mon Golden étaient toutes rêches avec la neige, en 3 jours d’application elles sont redevenues souples.' },
      { id: 'rev-6', author: 'Marc V.', rating: 4, date: '28/01/2026', title: 'Très bon produit', text: 'Ne colle pas aux carrelages, le stick est très pratique.' }
    ]
  },
  {
    id: 'prod-dog-5',
    slug: 'shampoing-doux-pelage-sensible',
    title: 'Shampoing doux pelage sensible à l’avoine',
    subtitle: 'Nettoie en douceur et respecte le pH physiologique cutané',
    animal: 'dog',
    category: 'care',
    categoryLabel: 'Soin & Hygiène',
    need: 'Prendre soin',
    price: 16.90,
    subscriptionPrice: 15.20,
    rating: 4.9,
    reviewCount: 77,
    inStock: true,
    stockQuantity: 50,
    isBestSeller: false,
    isEssential: true,
    isNew: false,
    isRecurring: true,
    images: [
      '/images/product-shampoo-yellow.png',
      '/images/product-shampoo-teal.png',
      '/images/product-shampoo-orange.png'
    ],
    variants: [
      { id: 'size', name: 'Contenance', options: ['Flacon pompe 250 ml', 'Format économique 500 ml'] }
    ],
    description: 'Une formule douce sans sulfates moussants agressifs, enrichie en extrait d’avoine colloïdale pour apaiser les démangeaisons légères et redonner éclat au pelage.',
    highlights: [
      'pH neutre ajusté spécifiquement à l’épiderme canin (pH 7.0)',
      'Extrait d’avoine calmant et glycérine végétale hydratante',
      'Mousse facile à rincer pour un bain rapide sans stress',
      'Flacon pompe 100% recyclable'
    ],
    howToUse: 'Mouillez abondamment le pelage à l’eau tiède. Appliquez une noisette de shampoing le long du dos et massez doucement. Laissez poser 2 minutes puis rincez soigneusement.',
    materials: 'Aqua, Cocamidopropyl Betaine, Glycerin, Avena Sativa Kernel Extract, Aloe Barbadensis Leaf Juice, Potassium Sorbate, Citric Acid.',
    safetyInfo: 'Évitez le contact direct avec les yeux et l’intérieur des oreilles. En cas de projection oculaire, rincez abondamment.',
    shippingInfo: 'Expédié sous 24h depuis notre entrepôt français.',
    crossSellIds: ['prod-dog-7', 'prod-dog-6'],
    reviews: [
      { id: 'rev-7', author: 'Nathalie R.', rating: 5, date: '18/01/2026', title: 'Poil soyeux et pas d’odeur chimique', text: 'Mon chien sent le propre sans parfum agressif, mousse très agréable.' }
    ]
  },
  {
    id: 'prod-dog-6',
    slug: 'lingettes-biodegradables-apaisantes',
    title: 'Lingettes nettoyantes & apaisantes à la camomille',
    subtitle: 'Nettoyage rapide des pattes, museau et pelage au retour de balade',
    animal: 'dog',
    category: 'hygiene',
    categoryLabel: 'Soin & Hygiène',
    need: 'Prendre soin',
    price: 9.90,
    subscriptionPrice: 8.90,
    rating: 4.7,
    reviewCount: 110,
    inStock: true,
    stockQuantity: 120,
    isBestSeller: true,
    isEssential: true,
    isNew: false,
    isRecurring: true,
    images: [
      '/images/product-wipes-single.png',
      '/images/product-wipes-frenchie.png',
      '/images/product-wipes-bundle.jpg'
    ],
    variants: [
      { id: 'pack', name: 'Conditionnement', options: ['Paquet 60 lingettes', 'Lot de 3 paquets (180 lingettes)'] }
    ],
    description: 'Fibre d’origine végétale ultra-épaisse imbibée d’une lotion nettoyante sans alcool. Idéales pour nettoyer les pattes boueuses avant de rentrer dans la maison ou la voiture.',
    highlights: [
      'Tissu 100% viscose végétale certifiée compostable',
      'Lotion purifiante à l’eau florale de camomille et aloé vera',
      'Capot refermable hermétique anti-dessèchement',
      'Sans alcool, sans parabènes, sans parfum de synthèse'
    ],
    howToUse: 'Ouvrez le clapet, retirez une lingette et nettoyez délicatement les zones ciblées. Bien refermer le clapet après chaque utilisation.',
    materials: 'Fibres de viscose naturelle, solution aqueuse d’aloe vera et extrait de camomille matricaire.',
    safetyInfo: 'Ne pas jeter dans les toilettes. Conserver à température ambiante.',
    shippingInfo: 'Expédié sous 24h. Éligible à la livraison récurrente mensuelle.',
    crossSellIds: ['prod-dog-4', 'prod-dog-8'],
    reviews: [
      { id: 'rev-8', author: 'Antoine P.', rating: 5, date: '15/02/2026', title: 'Top dans le coffre de la voiture', text: 'Essuyage immédiat des pattes après la forêt, très résistant.' }
    ]
  },
  {
    id: 'prod-dog-7',
    slug: 'brosse-demelante-double-face-bois',
    title: 'Brosse démêlante double face en bois de hêtre',
    subtitle: 'Picots inox arrondis d’un côté, soies souples lustrantes de l’autre',
    animal: 'dog',
    category: 'care',
    categoryLabel: 'Soin & Hygiène',
    need: 'Prendre soin',
    price: 19.50,
    subscriptionPrice: 17.55,
    rating: 4.8,
    reviewCount: 53,
    inStock: true,
    stockQuantity: 40,
    isBestSeller: false,
    isEssential: true,
    isNew: false,
    isRecurring: false,
    images: [
      'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      { id: 'size', name: 'Taille', options: ['Format standard (22 cm)'] }
    ],
    description: 'Une brosse 2-en-1 élégante et durable taillée dans du bois de hêtre massif. Débarrasse le pelage des nœuds sans griffer l’épiderme et lustre le poil en douceur.',
    highlights: [
      'Manche ergonomique en hêtre massif huilé pour une bonne prise en main',
      'Face 1 : Picots inox à bouts perlés montés sur coussin d’air amortisseur',
      'Face 2 : Soies synthétiques denses pour lustrer et éliminer la poussière',
      'Convient à tous types de poils mi-longs à longs'
    ],
    howToUse: 'Commencez par la face picots pour démêler délicatement par mèches de la racine vers la pointe. Terminez par la face soies pour lustrer.',
    materials: 'Bois de hêtre certifié, picots inox sur coussin caoutchouc naturel, fibres douces en nylon.',
    safetyInfo: 'Nettoyez régulièrement les poils retenus à l’eau savonneuse tiède. Bien sécher le bois à l’air libre.',
    shippingInfo: 'Expédié sous 24h depuis la France.',
    crossSellIds: ['prod-dog-5', 'prod-dog-4'],
    reviews: [
      { id: 'rev-9', author: 'Claire F.', rating: 5, date: '22/01/2026', title: 'Bel objet et très efficace', text: 'La qualité du bois est superbe et mon chien adore se faire brosser avec.' }
    ]
  },
  {
    id: 'prod-dog-8',
    slug: 'distributeur-sacs-dejections-vegetaux',
    title: 'Distributeur compact + 80 sacs à déjections végétaux',
    subtitle: 'Sacs étanches et opaques issus d’amidon de maïs avec étui aluminium',
    animal: 'dog',
    category: 'hygiene',
    categoryLabel: 'Soin & Hygiène',
    need: 'Sortir',
    price: 11.90,
    subscriptionPrice: 10.70,
    rating: 4.9,
    reviewCount: 168,
    inStock: true,
    stockQuantity: 150,
    isBestSeller: true,
    isEssential: true,
    isNew: false,
    isRecurring: true,
    images: [
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      { id: 'pack', name: 'Pack', options: ['Étui + 4 rouleaux (80 sacs)', 'Recharge 8 rouleaux (160 sacs)'] }
    ],
    description: 'L’accessoire indispensable pour des sorties propres et responsables. Le distributeur en aluminium anodisé s’accroche facilement à toute laisse ou passant de ceinture.',
    highlights: [
      'Étui compact en aluminium avec mousqueton à vis sécurisé',
      'Sacs extra-épais (18 microns) garantis sans déchirure ni fuite',
      'Composition végétale à base d’amidon de maïs sans plastique pétrochimique',
      'Découpe pré-trouée nette et facile à détacher d’une seule main'
    ],
    howToUse: 'Insérez le rouleau dans le boîtier et faites sortir le premier sac par la fente centrale. Attachez le mousqueton à l’anneau de votre laisse MOKI.',
    materials: 'Boîtier aluminium brossé, sacs en polymère d’amidon de maïs (PLA + PBAT).',
    safetyInfo: 'Tenir les sacs hors de portée des enfants pour éviter tout risque de suffocation.',
    shippingInfo: 'Expédié sous 24h. Recharges disponibles en abonnement récurrent.',
    crossSellIds: ['prod-dog-2', 'prod-dog-1'],
    reviews: [
      { id: 'rev-10', author: 'Guillaume T.', rating: 5, date: '08/02/2026', title: 'Les sacs ne se déchirent jamais', text: 'Beaucoup plus solides que ceux vendus en supermarché et le boîtier en métal est top.' }
    ]
  },
  {
    id: 'prod-dog-9',
    slug: 'balle-distributrice-occupation-caoutchouc',
    title: 'Balle distributrice d’occupation en caoutchouc naturel',
    subtitle: 'Stimule mentalement votre chien et prolonge les moments calmes',
    animal: 'dog',
    category: 'play',
    categoryLabel: 'Jeu',
    need: 'Jouer',
    price: 15.00,
    subscriptionPrice: 13.50,
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    stockQuantity: 55,
    isBestSeller: false,
    isEssential: true,
    isNew: true,
    isRecurring: false,
    images: [
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      { id: 'size', name: 'Diamètre', options: ['M - 7 cm (Chiens < 18 kg)', 'L - 9 cm (Chiens > 18 kg)'] },
      { id: 'color', name: 'Couleur', options: ['Terracotta', 'Vert Sauge'] }
    ],
    description: 'Fabriquée en caoutchouc naturel souple mais très résistant aux mâchoires. Son labyrinthe intérieur ralentit la distribution de friandises pour occuper sainement votre chien.',
    highlights: [
      'Caoutchouc 100% naturel non toxique, sans BPA ni phtalates',
      'Rebond imprévisible stimulant le jeu autonome',
      'Rainures externes favorisant le massage des gencives',
      'Facile à rincer sous l’eau tiède ou au lave-vaisselle'
    ],
    howToUse: 'Glissez quelques petites récompenses ou friandises à l’intérieur de la fente. Donnez la balle à votre chien sur un tapis ou une surface plane.',
    materials: 'Caoutchouc d’hévéa naturel vulcanisé.',
    safetyInfo: 'Surveillez votre animal lors des premières sessions de jeu. Remplacez le jouet en cas de détérioration.',
    shippingInfo: 'Expédié sous 24h depuis la France.',
    crossSellIds: ['prod-dog-10', 'prod-dog-4'],
    reviews: [
      { id: 'rev-11', author: 'Anaïs B.', rating: 5, date: '30/01/2026', title: '30 minutes de calme garanties', text: 'Mon chiot adore chercher ses friandises dedans, très robuste.' }
    ]
  },
  {
    id: 'prod-dog-10',
    slug: 'coussin-memoire-de-forme-dehoussable',
    title: 'Coussin mémoire de forme déhoussable',
    subtitle: 'Soutien orthopédique pour un sommeil réparateur et soulagement articulaire',
    animal: 'dog',
    category: 'comfort',
    categoryLabel: 'Confort',
    need: 'Se sentir bien',
    price: 69.00,
    subscriptionPrice: 62.10,
    rating: 4.9,
    reviewCount: 94,
    inStock: true,
    stockQuantity: 28,
    isBestSeller: true,
    isEssential: true,
    isNew: false,
    isRecurring: false,
    images: [
      'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      { id: 'size', name: 'Dimensions', options: ['M (75 x 55 x 10 cm)', 'L (95 x 75 x 12 cm)', 'XL (115 x 85 x 14 cm)'] },
      { id: 'color', name: 'Tissu', options: ['Gris Chiné', 'Beige Sable', 'Vert Forêt'] }
    ],
    description: 'Une mousse bi-couche haute résilience et mémoire de forme qui épouse la morphologie du chien pour soulager les hanches et la colonne vertébrale. Housse déhoussable et lavable.',
    highlights: [
      'Cœur en mousse viscoélastique à mémoire de forme haute densité (45 kg/m³)',
      'Sous-housse intérieure étanche protégeant le matelas des accidents',
      'Housse extérieure texturée déperlante et lavable en machine à 30°C',
      'Dessous antidérapant avec picots silicone'
    ],
    howToUse: 'Placez le coussin dans un endroit calme à l’abri des courants d’air. Dézippez la housse extérieure pour la laver en cycle délicat.',
    materials: 'Mousse orthopédique certifiée Oeko-Tex, tissu extérieur polyester toucher lin épais déperlant.',
    safetyInfo: 'Ne pas repasser la sous-housse étanche. Séchage à l’air libre conseillé.',
    shippingInfo: 'Livraison volumineuse offerte à domicile sous 48h.',
    crossSellIds: ['prod-dog-9', 'prod-dog-4'],
    reviews: [
      { id: 'rev-12', author: 'Pascal D.', rating: 5, date: '25/01/2026', title: 'Adopté la première minute', text: 'Mon vieux labrador de 11 ans s’est couché dessus immédiatement et a l’air beaucoup plus à l’aise au réveil.' }
    ]
  },

  // --- CHAT (8 références) ---
  {
    id: 'prod-cat-1',
    slug: 'shampoing-mousse-sans-rincage-chat',
    title: 'Shampoing mousse sans rinçage apaisant',
    subtitle: 'Nettoie et désodorise le pelage sans eau ni stress',
    animal: 'cat',
    category: 'care',
    categoryLabel: 'Soin & Hygiène',
    need: 'Prendre soin',
    price: 15.90,
    subscriptionPrice: 14.30,
    rating: 4.8,
    reviewCount: 82,
    inStock: true,
    stockQuantity: 48,
    isBestSeller: true,
    isEssential: true,
    isNew: false,
    isRecurring: true,
    images: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      { id: 'size', name: 'Contenance', options: ['Flacon mousseur 150 ml'] }
    ],
    description: 'Spécialement formulée pour les chats réfractaires aux bains. Une mousse légère qui s’applique à sec par massage, capture les impuretés et laisse le poil soyeux sans rinçage.',
    highlights: [
      'Application 100% sans eau : zéro stress pour le félin',
      'Enrichi en protéines de soie et hydrolat de bleuet',
      'Formule inoffensive lors de la toilette quotidienne du chat',
      'Élimine la poussière, le sébum et les pellicules'
    ],
    howToUse: 'Déposez 1 à 2 pressions de mousse dans vos mains, appliquez sur le pelage du chat en massant à rebrousse-poil. Essuyez avec une serviette propre et brossez.',
    materials: 'Aqua, Coco-Glucoside, Centaurea Cyanus Flower Water, Hydrolyzed Silk, Glycerin, Sodium Benzoate.',
    safetyInfo: 'Usage externe félin. Sans parfum ajouté, respecte l’odorat ultra-sensible des chats.',
    shippingInfo: 'Expédié sous 24h depuis la France.',
    crossSellIds: ['prod-cat-2', 'prod-cat-4'],
    reviews: [
      { id: 'rev-13', author: 'Lucie B.', rating: 5, date: '10/02/2026', title: 'Génial pour mon chat d’intérieur', text: 'Mon persan refuse l’eau, cette mousse nettoie super bien et son poil est doux et soyeux.' }
    ]
  },
  {
    id: 'prod-cat-2',
    slug: 'brosse-massage-debourrage-silicone',
    title: 'Brosse de massage & débourrage picots silicone',
    subtitle: 'Retire les poils morts par électrostatique et procure un massage apaisant',
    animal: 'cat',
    category: 'care',
    categoryLabel: 'Soin & Hygiène',
    need: 'Prendre soin',
    price: 13.90,
    subscriptionPrice: 12.50,
    rating: 4.9,
    reviewCount: 135,
    inStock: true,
    stockQuantity: 95,
    isBestSeller: true,
    isEssential: true,
    isNew: false,
    isRecurring: false,
    images: [
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      { id: 'color', name: 'Couleur', options: ['Gris Nuage', 'Rose Poudré', 'Bleu Brume'] }
    ],
    description: 'Une brosse ergonomique tout en silicone souple de qualité alimentaire. Les picots coniques créent une attraction électrostatique qui capture les poils morts dès le premier passage.',
    highlights: [
      'Silicone souple non irritant même sur les zones sensibles (flancs, ventre)',
      'Réduit significativement la formation de boules de poils ingérées',
      'Nettoyage instantané sous un jet d’eau tiède',
      'Prise en main palmaire ergonomique'
    ],
    howToUse: 'Brossez délicatement dans le sens du poil par mouvements circulaires doux. Retirez la nappe de poils d’un seul geste.',
    materials: 'Silicone de qualité alimentaire sans bisphénol A.',
    safetyInfo: 'Lavable au lave-vaisselle jusqu’à 65°C.',
    shippingInfo: 'Expédié sous 24h depuis la France.',
    crossSellIds: ['prod-cat-3', 'prod-cat-1'],
    reviews: [
      { id: 'rev-14', author: 'Aurélie C.', rating: 5, date: '05/02/2026', title: 'Mon chat ronronne dès qu’il la voit', text: 'C’est la première fois qu’il se laisse brosser sans fuir. La quantité de poils ramassée est impressionnante.' }
    ]
  },
  {
    id: 'prod-cat-3',
    slug: 'peigne-finition-anti-noeuds-inox',
    title: 'Peigne de finition anti-nœuds en acier inoxydable',
    subtitle: 'Dents rotatives à double espacement pour défaire les nœuds sans douleur',
    animal: 'cat',
    category: 'care',
    categoryLabel: 'Soin & Hygiène',
    need: 'Prendre soin',
    price: 12.50,
    subscriptionPrice: 11.25,
    rating: 4.7,
    reviewCount: 48,
    inStock: true,
    stockQuantity: 40,
    isBestSeller: false,
    isEssential: true,
    isNew: false,
    isRecurring: false,
    images: [
      'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      { id: 'size', name: 'Format', options: ['Peigne 19 cm double écartement'] }
    ],
    description: 'Indispensable pour les chats à poils mi-longs et longs (Maine Coon, Ragdoll, Sacré de Birmanie). Dents aux extrémités polies pour respecter la peau fragile.',
    highlights: [
      'Double section : dents larges pour défaire les bourres, dents fines pour la finition',
      'Extrémités des dents arrondies au laser pour ne pas griffer l’épiderme',
      'Manche métallique anti-statique durable'
    ],
    howToUse: 'Démêlez d’abord avec la partie à dents espacées en maintenant la base du poil avec les doigts pour éviter toute traction douloureuse sur la peau.',
    materials: 'Acier inoxydable 304 chromé poli.',
    safetyInfo: 'Ne pas forcer sur les nœuds très serrés.',
    shippingInfo: 'Expédié sous 24h.',
    crossSellIds: ['prod-cat-2', 'prod-cat-1'],
    reviews: [
      { id: 'rev-15', author: 'Valérie S.', rating: 5, date: '16/01/2026', title: 'Parfait pour mon Maine Coon', text: 'Passe très bien dans le sous-poil épais sans le blesser.' }
    ]
  },
  {
    id: 'prod-cat-4',
    slug: 'lingettes-yeux-oreilles-douces-chat',
    title: 'Lingettes yeux & oreilles ultra-douces',
    subtitle: 'Nettoie délicatement les sécrétions oculaires et le pavillon auriculaire',
    animal: 'cat',
    category: 'hygiene',
    categoryLabel: 'Soin & Hygiène',
    need: 'Prendre soin',
    price: 8.90,
    subscriptionPrice: 8.00,
    rating: 4.8,
    reviewCount: 71,
    inStock: true,
    stockQuantity: 110,
    isBestSeller: false,
    isEssential: true,
    isNew: false,
    isRecurring: true,
    images: [
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      { id: 'pack', name: 'Conditionnement', options: ['Boîte 50 lingettes pré-imbibées'] }
    ],
    description: 'Une lingette stérile en format doigtier/rondelle imprégnée d’eau florale d’euphraise et de bleuet pour nettoyer sans piquer.',
    highlights: [
      'Formule isotonique physiologique sans picotement oculaire',
      'Extrait naturel de bleuet décongestionnant et apaisant',
      'Sans parfum, sans parabènes, sans alcool'
    ],
    howToUse: 'Passez délicatement la lingette du coin interne vers le coin externe de l’œil. Utilisez une lingette distincte pour chaque œil ou oreille.',
    materials: 'Tissu non-tissé en coton naturel, solution aqueuse d’euphraise et de bleuet.',
    safetyInfo: 'Ne jamais enfoncer la lingette dans le conduit auditif interne.',
    shippingInfo: 'Expédié sous 24h. Disponible en abonnement régulier.',
    crossSellIds: ['prod-cat-1', 'prod-cat-2'],
    reviews: [
      { id: 'rev-16', author: 'Fabien M.', rating: 5, date: '21/01/2026', title: 'Impeccable pour les yeux qui coulent', text: 'Ne pique pas, mon chat se laisse faire sans problème.' }
    ]
  },
  {
    id: 'prod-cat-5',
    slug: 'tapis-bac-litiere-alveole-double-couche',
    title: 'Tapis de bac à litière alvéolé double couche',
    subtitle: 'Capture les grains de litière sous les pattes et garde vos sols impeccables',
    animal: 'cat',
    category: 'hygiene',
    categoryLabel: 'Soin & Hygiène',
    need: 'Prendre soin',
    price: 24.90,
    subscriptionPrice: 22.40,
    rating: 4.9,
    reviewCount: 114,
    inStock: true,
    stockQuantity: 65,
    isBestSeller: true,
    isEssential: true,
    isNew: false,
    isRecurring: false,
    images: [
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      { id: 'size', name: 'Dimensions', options: ['M (60 x 45 cm)', 'L (75 x 55 cm)'] },
      { id: 'color', name: 'Couleur', options: ['Gris Anthracite', 'Beige Sable'] }
    ],
    description: 'La solution définitive contre la litière dispersée dans le salon. La structure en nid d’abeille laisse passer les grains vers la couche inférieure étanche.',
    highlights: [
      'Structure alvéolée brevetée qui piège 95% des grains résiduels',
      'Couche inférieure imperméable et lavable à grande eau',
      'Ouverture latérale permettant de reverser les grains propres dans le bac',
      'Mousse EVA douce pour les coussinets délicats'
    ],
    howToUse: 'Placez le tapis devant la sortie de la maison de toilette ou du bac. Pour vider, pincez les bords et reversez les grains dans le bac.',
    materials: 'Mousse EVA haute densité non toxique, imperméable et sans odeur.',
    safetyInfo: 'Ne pas plier à chaud. Rincer à l’eau savonneuse.',
    shippingInfo: 'Expédié sous 24h depuis notre entrepôt.',
    crossSellIds: ['prod-cat-6', 'prod-cat-7'],
    reviews: [
      { id: 'rev-17', author: 'Mélanie T.', rating: 5, date: '03/02/2026', title: 'Fini la corvée de balai quotidienne', text: 'On reverse simplement les grains dans le bac en 3 secondes. Indispensable !' }
    ]
  },
  {
    id: 'prod-cat-6',
    slug: 'canne-a-peche-telescopique-plumes',
    title: 'Canne à pêche télescopique avec plumes naturelles',
    subtitle: 'Réveille l’instinct de chasse de votre chat pour des séances de jeu complices',
    animal: 'cat',
    category: 'play',
    categoryLabel: 'Jeu',
    need: 'Jouer',
    price: 14.50,
    subscriptionPrice: 13.05,
    rating: 4.8,
    reviewCount: 92,
    inStock: true,
    stockQuantity: 70,
    isBestSeller: true,
    isEssential: true,
    isNew: true,
    isRecurring: false,
    images: [
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      { id: 'pack', name: 'Inclus', options: ['Canne 90 cm + 3 embouts plumes interchangeables'] }
    ],
    description: 'Une tige en fibre de verre ultra-légère et flexible, prolongée d’un fil en nylon invisible et d’embouts en plumes naturelles douces.',
    highlights: [
      'Canne télescopique rétractable de 38 cm à 90 cm',
      'Mousqueton de sécurité pour changer d’embout facilement',
      'Plumes naturelles non traitées avec teintures végétales sans danger',
      'Poignée ergonomique en mousse EVA anti-transpiration'
    ],
    howToUse: 'Faites voleter les plumes près du sol et derrière les meubles pour stimuler la traque et les bonds de votre chat.',
    materials: 'Fibre de verre, poignée EVA, fil nylon haute résistance, plumes naturelles.',
    safetyInfo: 'Rangez la canne après chaque session pour ne pas que le chat mâche le fil sans surveillance.',
    shippingInfo: 'Expédié sous 24h.',
    crossSellIds: ['prod-cat-7', 'prod-cat-2'],
    reviews: [
      { id: 'rev-18', author: 'Lucas E.', rating: 5, date: '29/01/2026', title: 'Le jouet préféré de mon chat', text: 'Il ne s’en lasse jamais, la tige flexible donne un mouvement très réaliste aux plumes.' }
    ]
  },
  {
    id: 'prod-cat-7',
    slug: 'dome-cocon-feutre-de-laine',
    title: 'Dôme cocon en feutre de laine naturelle',
    subtitle: 'Un refuge douillet et thermo-régulant pour des siestes sécurisantes',
    animal: 'cat',
    category: 'comfort',
    categoryLabel: 'Confort',
    need: 'Se sentir bien',
    price: 49.00,
    subscriptionPrice: 44.10,
    rating: 4.9,
    reviewCount: 65,
    inStock: true,
    stockQuantity: 30,
    isBestSeller: false,
    isEssential: true,
    isNew: false,
    isRecurring: false,
    images: [
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      { id: 'color', name: 'Teinte', options: ['Gris Perle', 'Anthracite', 'Terre Cuite'] }
    ],
    description: 'Façonné à la main en pure laine feutrée, ce dôme offre une alcôve chaleureuse et isolante du bruit. Les chats adorent s’y blottir ou s’y percher en écrasant le dôme en coussin.',
    highlights: [
      '100% laine naturelle thermo-régulatrice (fraîche en été, chaude en hiver)',
      'Double usage : dôme fermé ou lit coussin ouvert en un geste',
      'Matière naturellement résistante aux odeurs et à la poussière',
      'Design épuré s’intégrant harmonieusement dans tout intérieur'
    ],
    howToUse: 'Déposez le dôme dans un recoin calme et surélevé ou au sol. Pour le transformer en coussin ouvert, appuyez simplement sur le haut du dôme avec la paume de la main.',
    materials: '100% feutre de laine de mouton naturelle.',
    safetyInfo: 'Nettoyage doux avec un chiffon humide ou aspiration à faible puissance.',
    shippingInfo: 'Expédié sous 24h dans un emballage éco-responsable.',
    crossSellIds: ['prod-cat-8', 'prod-cat-6'],
    reviews: [
      { id: 'rev-19', author: 'Céline V.', rating: 5, date: '17/01/2026', title: 'Magnifique et adopté direct', text: 'Très bel objet déco et ma chatte passe ses journées à dormir dedans.' }
    ]
  },
  {
    id: 'prod-cat-8',
    slug: 'arbre-a-chat-minimaliste-sisal-chene',
    title: 'Arbre à chat minimaliste poteau sisal & chêne',
    subtitle: 'Griffoir vertical stable et élégant sans encombrer votre salon',
    animal: 'cat',
    category: 'comfort',
    categoryLabel: 'Confort',
    need: 'Se sentir bien',
    price: 89.00,
    subscriptionPrice: 80.10,
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    stockQuantity: 18,
    isBestSeller: false,
    isEssential: true,
    isNew: false,
    isRecurring: false,
    images: [
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      { id: 'height', name: 'Hauteur', options: ['85 cm (Base 45x45 cm)', '110 cm (Base 50x50 cm)'] }
    ],
    description: 'Une structure épurée avec socle lourd en bois de chêne massif garantissant une stabilité sans faille pendant les étirements et les griffades énergiques.',
    highlights: [
      'Poteau robuste en corde de sisal naturel épais de 8 mm non teinté',
      'Socle lourd en bois massif avec patins feutre protecteurs pour le sol',
      'Poteau remplaçable indépendamment pour une durabilité maximale',
      'Plateforme supérieure d’observation avec coussin lavable amovible'
    ],
    howToUse: 'Montez le poteau sur le socle à l’aide des deux vis fournies (clé incluse, montage en 3 minutes). Placez-le à proximité de la zone de repos ou de passage de votre chat.',
    materials: 'Bois de chêne massif vernis mat naturel, corde de sisal 100% végétal, visserie acier.',
    safetyInfo: 'Vérifiez le serrage des vis une fois par an.',
    shippingInfo: 'Expédié sous 24h avec emballage renforcé. Livraison à domicile.',
    crossSellIds: ['prod-cat-7', 'prod-cat-6'],
    reviews: [
      { id: 'rev-20', author: 'Benoît D.', rating: 5, date: '12/01/2026', title: 'Enfin un arbre à chat qui ne défigure pas le salon', text: 'Superbe qualité de bois, ne bouge pas d’un millimètre quand mon chat saute dessus.' }
    ]
  }
];
