export type MenuCategory = 'entrees' | 'plats' | 'desserts' | 'vins';

export type BadgeType = 
  | 'chef-selection' 
  | 'seasonal' 
  | 'award' 
  | 'limited' 
  | 'plant-based' 
  | 'sustainable';

export interface ExtendedMenuItem {
  slug: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  heroImage?: string;
  gallery?: string[];
  chefNote?: string;
  chefStory?: string;
  pairing?: string;
  pairingNote?: string;
  ingredients?: string[];
  preparationTime?: string;
  badges?: BadgeType[];
  origin?: string;
  technique?: string;
  season?: string;
}

export interface WineItem {
  slug: string;
  name: string;
  description: string;
  price: string;
  region: string;
  year?: string;
  grapes?: string;
  notes?: string[];
  pairsWith?: string[];
  heroImage?: string;
  gallery?: string[];
  story?: string;
}

export const categoryData: Record<MenuCategory, { 
  title: string; 
  subtitle: string; 
  heroImage: string;
  description: string;
}> = {
  entrees: {
    title: 'Entrées',
    subtitle: "L'Art de Commencer",
    heroImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
    description: 'Des créations raffinées qui éveillent les sens et préparent le palais à un voyage culinaire exceptionnel.'
  },
  plats: {
    title: 'Plats Principaux',
    subtitle: "L'Excellence au Centre",
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop',
    description: 'Des pièces maîtresses élaborées avec passion, où chaque ingrédient raconte une histoire unique.'
  },
  desserts: {
    title: 'Desserts',
    subtitle: 'La Douceur Finale',
    heroImage: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=2025&auto=format&fit=crop',
    description: 'Une symphonie sucrée pour conclure votre expérience gastronomique sur une note mémorable.'
  },
  vins: {
    title: 'Sélection de Vins',
    subtitle: 'Le Nectar des Dieux',
    heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop',
    description: 'Une collection soigneusement sélectionnée des plus grands crus pour sublimer chaque plat.'
  }
};

export const menuItems: Record<Exclude<MenuCategory, 'vins'>, ExtendedMenuItem[]> = {
  entrees: [
    {
      slug: 'saint-jacques-hokkaido',
      name: 'Saint-Jacques de Hokkaido Saisies',
      description: 'Purée de chou-fleur, raisins dorés, beurre noisette, câpres',
      price: '32',
      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=2070&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=2070&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1599458252573-56ae36120de1?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=2070&auto=format&fit=crop'
      ],
      chefNote: 'Les Saint-Jacques sont délicatement saisies pour obtenir une caramélisation parfaite, révélant leur douceur naturelle.',
      chefStory: "Ce plat est né lors d'un voyage au Japon, où j'ai découvert les extraordinaires Saint-Jacques de Hokkaido. Leur chair nacrée et leur douceur incomparable m'ont immédiatement inspiré. J'ai voulu créer un pont entre la délicatesse japonaise et l'élégance française, en associant ces joyaux de la mer à la douceur du chou-fleur et la richesse du beurre noisette. Chaque Saint-Jacques est sélectionnée à la main par notre poissonnier partenaire, garantissant une fraîcheur irréprochable. La saisie est réalisée à haute température pendant exactement 90 secondes de chaque côté, créant cette croûte dorée caractéristique tout en préservant le cœur nacré et fondant.",
      pairing: 'Chablis Premier Cru',
      pairingNote: 'La minéralité du Chablis complète parfaitement la douceur iodée des Saint-Jacques.',
      ingredients: ['Saint-Jacques de Hokkaido', 'Chou-fleur', 'Raisins dorés', 'Beurre noisette', 'Câpres', 'Huile de truffe'],
      badges: ['chef-selection', 'sustainable'],
      origin: 'Hokkaido, Japon',
      technique: 'Saisie à haute température',
      season: 'Automne - Hiver'
    },
    {
      slug: 'burrata-caprese',
      name: 'Burrata Caprese',
      description: "Tomates anciennes, balsamique vieilli, micro basilic, perles d'huile d'olive",
      price: '24',
      image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=2092&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=2092&auto=format&fit=crop',
      chefNote: 'Une interprétation moderne du classique italien, mettant en valeur la fraîcheur des produits de saison.',
      chefStory: "La Caprese est pour moi le symbole de la cuisine italienne dans sa plus pure expression : la qualité des ingrédients avant tout. Notre burrata provient d'une petite ferme des Pouilles, où elle est préparée chaque matin selon des méthodes ancestrales. Les tomates anciennes sont cultivées dans notre jardin partenaire en Provence, récoltées à maturité parfaite. Le balsamique de 25 ans d'âge apporte cette profondeur sucrée qui sublime l'ensemble. C'est un hommage à la simplicité sophistiquée, où chaque élément a sa place et son importance.",
      pairing: 'Sancerre Blanc',
      ingredients: ['Burrata crémeuse', 'Tomates anciennes', 'Vinaigre balsamique 25 ans', 'Basilic frais', "Huile d'olive extra vierge"],
      badges: ['plant-based', 'seasonal'],
      origin: 'Pouilles, Italie',
      technique: 'Assemblage à cru',
      season: 'Été'
    },
    {
      slug: 'tartare-thon',
      name: 'Tartare de Thon',
      description: "Mousse d'avocat, tuile de sésame, émulsion wasabi, tobiko",
      price: '28',
      image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=1936&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=1936&auto=format&fit=crop',
      chefNote: "Le thon bluefin est coupé au couteau pour une texture optimale, accompagné d'accents asiatiques subtils.",
      chefStory: "Ce tartare représente ma vision de la fusion culinaire : respecter l'intégrité de chaque tradition tout en créant quelque chose de nouveau. Le thon bluefin, pêché de manière responsable, est découpé au dernier moment pour préserver sa texture soyeuse. L'émulsion de wasabi frais, importé directement de la région de Shizuoka, apporte cette chaleur caractéristique sans agressivité. Les œufs de poisson volant ajoutent une explosion de saveur marine qui complète harmonieusement l'ensemble.",
      pairing: 'Champagne Blanc de Blancs',
      ingredients: ['Thon Bluefin', 'Avocat', 'Sésame noir & blanc', 'Wasabi frais', 'Tobiko', 'Sauce ponzu'],
      badges: ['sustainable'],
      origin: 'Méditerranée',
      technique: 'Coupe au couteau',
      season: 'Toute l\'année'
    },
    {
      slug: 'terrine-foie-gras',
      name: 'Terrine de Foie Gras',
      description: 'Gelée de Sauternes, brioche toastée, compote de figues',
      price: '36',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1974&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1974&auto=format&fit=crop',
      chefNote: 'Une préparation traditionnelle française, marinée 48 heures dans le Sauternes pour une onctuosité parfaite.',
      chefStory: "Le foie gras est l'essence même de la gastronomie française, et cette recette me vient de mon grand-père, chef étoilé dans le Sud-Ouest. Le foie est mariné pendant 48 heures dans un Sauternes Château d'Yquem, absorbant ces notes de miel et d'abricot qui caractérisent ce grand vin. La cuisson basse température préserve la texture fondante tout en développant ces saveurs complexes. La gelée cristalline et la compote de figues apportent cette touche de fraîcheur et de douceur qui équilibre la richesse du foie.",
      pairing: "Sauternes Château d'Yquem",
      ingredients: ['Foie gras de canard', 'Sauternes', 'Brioche maison', 'Figues', 'Fleur de sel'],
      badges: ['chef-selection', 'award'],
      origin: 'Périgord, France',
      technique: 'Cuisson basse température',
      season: 'Automne - Hiver'
    },
    {
      slug: 'veloute-champignons',
      name: 'Velouté de Champignons',
      description: 'Mousse de cèpes, huile de truffe noire, chips de parmesan',
      price: '22',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071&auto=format&fit=crop',
      chefNote: "Un velouté onctueux aux saveurs automnales, couronné d'une généreuse râpée de truffe noire.",
      chefStory: "Chaque automne, je pars en forêt avec mon cueilleur de confiance pour sélectionner les plus beaux champignons sauvages. Ce velouté est une célébration de la saison, un concentré des parfums boisés et terreux de nos forêts françaises. Les cèpes sont cuits lentement pour extraire toute leur essence, puis mixés jusqu'à obtenir cette texture veloutée incomparable. La truffe noire du Périgord, râpée au moment du service, libère ses arômes envoûtants qui transportent immédiatement dans les sous-bois d'automne.",
      pairing: 'Meursault',
      ingredients: ['Champignons des bois', 'Cèpes', 'Truffe noire du Périgord', 'Parmesan vieilli 36 mois', 'Crème fraîche'],
      badges: ['plant-based', 'seasonal'],
      origin: 'Périgord, France',
      technique: 'Cuisson lente et émulsion',
      season: 'Automne'
    },
    {
      slug: 'huitres-gillardeau',
      name: 'Huîtres Gillardeau N°2',
      description: 'Mignonette au champagne, citron Meyer, algues wakame',
      price: '38',
      image: 'https://images.unsplash.com/photo-1572697256881-4e5a23a0ba21?q=80&w=2070&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1572697256881-4e5a23a0ba21?q=80&w=2070&auto=format&fit=crop',
      chefNote: "Les huîtres Gillardeau, affinées pendant 4 ans, offrent une chair ferme et un goût iodé incomparable.",
      chefStory: "La maison Gillardeau représente l'excellence ostréicole depuis quatre générations. Ces huîtres, affinées pendant 4 ans dans les claires de Marennes-Oléron, développent une chair ferme et un goût marin d'une complexité rare. Je les accompagne d'une mignonette au champagne plutôt que du traditionnel vinaigre à l'échalote, pour une expérience plus raffinée. Les algues wakame et le citron Meyer apportent des notes japonaises subtiles qui complètent harmonieusement l'iode naturel de ces précieux coquillages.",
      pairing: 'Muscadet Sèvre et Maine sur Lie',
      pairingNote: "La fraîcheur vive et les notes salines du Muscadet prolongent l'expérience iodée des huîtres.",
      ingredients: ['Huîtres Gillardeau N°2', 'Champagne', 'Échalotes', 'Citron Meyer', 'Algues wakame'],
      origin: 'Marennes-Oléron, France',
      technique: 'Service cru avec mignonette',
      season: 'Septembre - Avril'
    },
    {
      slug: 'carpaccio-boeuf',
      name: 'Carpaccio de Bœuf',
      description: 'Copeaux de parmesan, roquette, huile de truffe, câpres croustillantes',
      price: '26',
      image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=2070&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=2070&auto=format&fit=crop',
      chefNote: "Le filet de bœuf est tranché ultra-fin et assaisonné minute pour préserver sa fraîcheur.",
      chefStory: "Le carpaccio tire son nom de Vittore Carpaccio, peintre vénitien connu pour ses rouges intenses. Notre version rend hommage à cette tradition avec un filet de bœuf Aubrac, maturé 45 jours pour développer ses saveurs. La viande est saisie brièvement au chalumeau pour intensifier les arômes, puis tranchée au moment du service. L'huile de truffe noire et les copeaux de parmesan vieilli 36 mois créent un équilibre parfait entre la douceur de la viande et l'intensité des condiments.",
      pairing: 'Barbaresco',
      pairingNote: "Les tanins élégants du Barbaresco complètent la texture soyeuse du carpaccio.",
      ingredients: ['Filet de bœuf Aubrac', 'Parmesan 36 mois', 'Roquette sauvage', 'Huile de truffe', 'Câpres croustillantes'],
      origin: 'Aubrac, France',
      technique: 'Tranche ultra-fine au couteau',
      season: 'Toute l\'année'
    },
    {
      slug: 'ceviche-bar',
      name: 'Ceviche de Bar',
      description: 'Agrumes, lait de tigre, oignon rouge, coriandre fraîche',
      price: '28',
      image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?q=80&w=2070&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?q=80&w=2070&auto=format&fit=crop',
      chefNote: "Le bar sauvage marine brièvement dans le citron vert pour une texture mi-cuite parfaite.",
      chefStory: "Inspiré par la cuisine nikkei qui fusionne traditions péruviennes et japonaises, ce ceviche célèbre le bar sauvage de nos côtes bretonnes. Le poisson est découpé en cubes généreux et marine pendant exactement 4 minutes dans un leche de tigre maison, ce jus puissant à base de citron vert, gingembre et piment. La marinade courte préserve la texture nacrée du poisson tout en le parfumant subtilement. Les patates douces rôties apportent une touche sucrée qui équilibre l'acidité vive du plat.",
      pairing: 'Albariño',
      pairingNote: "Les notes salines et citronnées de l'Albariño prolongent la fraîcheur du ceviche.",
      ingredients: ['Bar sauvage', 'Citron vert', 'Lait de coco', 'Piment aji amarillo', 'Oignon rouge', 'Coriandre'],
      badges: ['seasonal', 'sustainable'],
      origin: 'Bretagne, France',
      technique: 'Marinade express aux agrumes',
      season: 'Printemps - Été'
    }
  ],
  plats: [
    {
      slug: 'filet-boeuf-wagyu',
      name: 'Filet de Bœuf Wagyu',
      description: 'Purée truffée, moelle rôtie, réduction au vin rouge',
      price: '85',
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2031&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2031&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2031&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=2070&auto=format&fit=crop'
      ],
      chefNote: "Le Wagyu A5 japonais, avec son persillage exceptionnel, fond littéralement en bouche. Une expérience carnée ultime.",
      chefStory: "Le bœuf Wagyu A5 représente le sommet de l'art de l'élevage bovin. Ces animaux, élevés dans la préfecture de Kagoshima au Japon, bénéficient d'un soin extraordinaire : massages quotidiens, alimentation spéciale, et un environnement sans stress. Le résultat est une viande au persillage exceptionnel, classée 12 sur l'échelle de marbrure. Je la cuis simplement, à basse température puis saisie au charbon japonais binchotan, pour préserver cette texture fondante unique. La moelle rôtie et la réduction au grand cru bordelais complètent cette symphonie de saveurs.",
      pairing: 'Pomerol Château Pétrus',
      pairingNote: 'La puissance et les tanins soyeux du Pétrus subliment le gras fondant du Wagyu.',
      ingredients: ['Bœuf Wagyu A5', 'Truffe noire', 'Os à moelle', 'Vin rouge Grand Cru', 'Pommes de terre Ratte'],
      badges: ['chef-selection', 'limited'],
      preparationTime: '25 min',
      origin: 'Kagoshima, Japon',
      technique: 'Cuisson basse température et saisie au binchotan',
      season: 'Toute l\'année'
    },
    {
      slug: 'sole-douvres',
      name: 'Sole de Douvres Poêlée',
      description: 'Beurre noisette aux câpres, haricots verts, citron confit',
      price: '68',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop',
      chefNote: "La sole est cuite entière sur l'arête pour préserver sa délicatesse, puis découpée devant vous.",
      chefStory: "La sole de Douvres est la reine des poissons plats, et sa préparation est un art que j'ai perfectionné pendant des années. Elle arrive chaque matin de la criée de Boulogne-sur-Mer, pêchée dans la Manche la nuit précédente. La cuisson entière sur l'arête permet de préserver tous les sucs et cette chair délicate qui fait la réputation de ce poisson noble. Le service en salle, où je découpe personnellement chaque sole devant nos convives, est un moment de partage et de théâtralité gastronomique que j'affectionne particulièrement.",
      pairing: 'Puligny-Montrachet',
      ingredients: ['Sole de Douvres entière', 'Beurre', 'Câpres', 'Haricots verts fins', 'Citron confit'],
      preparationTime: '20 min',
      origin: 'Manche, France',
      technique: 'Cuisson meunière sur arête',
      season: 'Toute l\'année'
    },
    {
      slug: 'magret-canard-orange',
      name: "Magret de Canard à l'Orange",
      description: 'Croquette de cuisse confite, orange sanguine, endive',
      price: '56',
      image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=2076&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=2076&auto=format&fit=crop',
      chefNote: 'Une revisite du classique français, associant la tendreté du magret rosé à la richesse du confit.',
      chefStory: "Le canard à l'orange est un classique de la cuisine française que j'ai voulu réinterpréter avec respect et modernité. Le magret provient de canards élevés en liberté dans les Landes, nourris au maïs qui donne cette saveur si particulière. La cuisson rosée préserve le moelleux de la chair tandis que la peau croustillante apporte le contraste de textures. La croquette de cuisse confite est un clin d'œil à mes origines du Sud-Ouest, et l'orange sanguine de Sicile apporte cette acidité vive qui équilibre le gras du canard.",
      pairing: 'Côtes du Rhône Villages',
      ingredients: ['Magret de canard', 'Cuisse de canard confite', 'Orange sanguine', 'Endives caramélisées', 'Miel de lavande'],
      preparationTime: '18 min',
      origin: 'Landes, France',
      technique: 'Cuisson rosée et confit',
      season: 'Automne - Hiver'
    },
    {
      slug: 'risotto-champignons',
      name: 'Risotto aux Champignons Sauvages',
      description: 'Cèpes, girolles, huile de truffe, tuile de parmesan vieilli',
      price: '42',
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop',
      chefNote: 'Le riz Carnaroli est cuit lentement au bouillon de champignons, créant une texture crémeuse parfaite.',
      chefStory: "Le risotto est un exercice de patience et de précision. Le riz Carnaroli, cultivé dans la plaine du Pô, a cette capacité unique d'absorber les saveurs tout en conservant une légère fermeté au cœur. Je le travaille pendant exactement 18 minutes, ajoutant le bouillon de champignons maison louche par louche, en remuant constamment. Les cèpes et girolles sont sautés séparément à haute température pour conserver leur texture, puis incorporés au dernier moment. L'huile de truffe blanche d'Alba, ajoutée hors du feu, parfume le plat de ses notes terreuses incomparables.",
      pairing: 'Barbaresco',
      ingredients: ['Riz Carnaroli', 'Cèpes', 'Girolles', 'Chanterelles', 'Huile de truffe blanche', 'Parmesan 48 mois'],
      badges: ['plant-based', 'seasonal'],
      preparationTime: '22 min',
      origin: 'Piémont, Italie',
      technique: 'Mantecatura traditionnelle',
      season: 'Automne'
    },
    {
      slug: 'homard-bleu-roti',
      name: 'Homard Bleu Rôti',
      description: 'Bisque crémeuse, légumes de saison, beurre de corail',
      price: '95',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop',
      chefNote: 'Le homard bleu breton, rôti dans sa carapace, développe des saveurs intenses sublimées par le beurre de corail.',
      chefStory: "Le homard bleu de Bretagne est un trésor de nos côtes, reconnaissable à sa carapace d'un bleu profond qui vire au rouge intense à la cuisson. Je travaille exclusivement avec des homards de casier, pêchés de manière artisanale au large de Roscoff. La cuisson en carapace permet de conserver tous les sucs et de développer ces arômes marins si caractéristiques. Le beurre de corail, préparé avec les parties crémeuses du homard, est une sauce d'une richesse incomparable qui accompagne chaque bouchée de cette chair ferme et sucrée.",
      pairing: 'Corton-Charlemagne Grand Cru',
      ingredients: ['Homard bleu de Bretagne', 'Bisque maison', 'Légumes de saison', 'Corail', 'Beurre fermier'],
      badges: ['chef-selection', 'seasonal', 'sustainable'],
      preparationTime: '30 min',
      origin: 'Bretagne, France',
      technique: 'Rôti en carapace',
      season: 'Printemps - Été'
    },
    {
      slug: 'carre-agneau-herbes',
      name: "Carré d'Agneau en Croûte d'Herbes",
      description: "Jus d'agneau au thym, légumes racines, ail confit",
      price: '62',
      image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?q=80&w=2070&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?q=80&w=2070&auto=format&fit=crop',
      chefNote: "L'agneau du Limousin, enrobé d'herbes fraîches, est rôti rosé pour une tendreté optimale.",
      chefStory: "L'agneau du Limousin, élevé en plein air sur les pâturages verdoyants du Massif Central, développe une chair d'une finesse remarquable. La croûte d'herbes est composée de thym, romarin, persil et ail, liés par de la chapelure de pain maison et du beurre clarifié. Cette enveloppe protège la viande pendant la cuisson tout en l'parfumant délicatement. Le jus, réduit pendant des heures à partir des parures et des os, concentre toute l'essence de l'agneau. C'est un plat qui célèbre le terroir français dans toute sa splendeur.",
      pairing: 'Saint-Émilion Grand Cru',
      pairingNote: "Les tanins fins et les notes de fruits rouges du Saint-Émilion s'harmonisent avec la délicatesse de l'agneau.",
      ingredients: ['Agneau du Limousin', 'Herbes de Provence', 'Thym frais', 'Légumes racines', 'Ail noir'],
      preparationTime: '25 min',
      origin: 'Limousin, France',
      technique: 'Rôti en croûte',
      season: 'Printemps'
    },
    {
      slug: 'bar-en-croute-sel',
      name: 'Bar en Croûte de Sel',
      description: 'Légumes grillés, beurre aux herbes, citron confit',
      price: '58',
      image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=2070&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=2070&auto=format&fit=crop',
      chefNote: "La croûte de sel préserve l'humidité du poisson et lui confère une texture incomparable.",
      chefStory: "Cette technique ancestrale de cuisson en croûte de sel remonte à l'Antiquité méditerranéenne. Le bar sauvage, pêché dans la Manche, est enveloppé dans un mélange de gros sel de Guérande et de blancs d'œufs, puis cuit au four. Cette coquille protectrice crée un environnement de cuisson parfait : le poisson cuit dans son propre jus, sa chair reste incroyablement moelleuse et les arômes marins sont préservés. La cérémonie de l'ouverture de la croûte en salle est un moment de spectacle que nos convives apprécient particulièrement.",
      pairing: 'Chablis Grand Cru',
      pairingNote: "La minéralité pure du Chablis souligne les notes iodées du bar.",
      ingredients: ['Bar sauvage', 'Gros sel de Guérande', 'Blanc d\'œuf', 'Thym', 'Fenouil', 'Citron confit'],
      preparationTime: '35 min',
      origin: 'Manche, France',
      technique: 'Cuisson en croûte de sel',
      season: 'Toute l\'année'
    },
    {
      slug: 'pigeon-rotonde',
      name: 'Pigeon en Deux Cuissons',
      description: 'Suprême rosé, cuisse confite, jus corsé aux épices',
      price: '52',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop',
      chefNote: "Le pigeon de Bresse révèle toute sa noblesse dans cette double préparation.",
      chefStory: "Le pigeon est l'un des volatiles les plus nobles de la gastronomie française. Nous travaillons exclusivement avec des pigeons de Bresse, élevés en liberté et nourris au grain. La technique des deux cuissons permet d'exprimer toutes les facettes de cet oiseau : le suprême, cuit rosé au beurre clarifié, conserve sa tendreté et sa couleur caractéristique, tandis que la cuisse, confite puis croustillée, offre un contraste de textures saisissant. Le jus, parfumé aux baies de genièvre et au poivre de Timut, lie ces deux expressions en un tout harmonieux.",
      pairing: 'Pommard Premier Cru',
      pairingNote: "La structure et les notes de fruits noirs du Pommard magnifient la puissance du pigeon.",
      ingredients: ['Pigeon de Bresse', 'Baies de genièvre', 'Poivre de Timut', 'Chou rouge', 'Betterave'],
      badges: ['limited', 'seasonal'],
      preparationTime: '28 min',
      origin: 'Bresse, France',
      technique: 'Double cuisson rosé et confit',
      season: 'Automne - Hiver'
    }
  ],
  desserts: [
    {
      slug: 'fondant-chocolat-valrhona',
      name: 'Fondant au Chocolat Valrhona',
      description: "Cœur coulant, glace vanille bourbon, feuille d'or",
      price: '18',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1974&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1974&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=2025&auto=format&fit=crop'
      ],
      chefNote: 'Le chocolat Valrhona Guanaja 70% révèle ses notes intenses de cacao, équilibrées par la douceur de la vanille.',
      chefStory: "Ce fondant est le fruit de nombreuses années de recherche pour atteindre la perfection du cœur coulant. Le chocolat Valrhona Guanaja 70%, avec ses notes de cacao intense et sa légère amertume, est le cœur de ce dessert. La cuisson est minutée à la seconde près : 12 minutes exactement à 180°C pour obtenir cette croûte délicate qui cède sous la cuillère, libérant un flot de chocolat liquide. La glace vanille bourbon de Madagascar, préparée maison avec de vraies gousses, apporte le contraste de température et de douceur. La feuille d'or n'est pas qu'un ornement, elle symbolise l'excellence que nous recherchons dans chaque création.",
      pairing: 'Banyuls Grand Cru',
      pairingNote: 'Les notes de fruits confits du Banyuls créent un accord harmonieux avec le cacao.',
      ingredients: ['Chocolat Valrhona Guanaja 70%', 'Beurre de cacao', 'Vanille bourbon de Madagascar', "Feuille d'or 24 carats"],
      badges: ['chef-selection', 'award'],
      preparationTime: '12 min',
      origin: 'France',
      technique: 'Cuisson précise au degré près',
      season: 'Toute l\'année'
    },
    {
      slug: 'creme-brulee',
      name: 'Crème Brûlée',
      description: 'Vanille de Tahiti, croûte de sucre caramélisé, fruits frais',
      price: '16',
      image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=2070&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=2070&auto=format&fit=crop',
      chefNote: "La vraie gousse de vanille de Tahiti infuse pendant 24 heures pour un arôme envoûtant.",
      chefStory: "La crème brûlée est l'essence même de la pâtisserie française : des ingrédients simples sublimés par la technique. J'utilise exclusivement de la vanille de Tahiti, plus florale et moins boisée que la vanille bourbon, qui infuse dans la crème pendant 24 heures complètes. Cette macération longue permet d'extraire les centaines de composés aromatiques de la gousse. La cuisson au bain-marie assure une texture parfaitement homogène, et le caramel est brûlé au chalumeau juste avant le service pour ce contraste irrésistible entre le craquant brûlant et l'onctuosité froide de la crème.",
      pairing: 'Tokaji Aszú 5 Puttonyos',
      ingredients: ['Crème fraîche', 'Vanille de Tahiti', 'Sucre muscovado', 'Fruits rouges de saison'],
      preparationTime: '8 min',
      origin: 'France',
      technique: 'Cuisson au bain-marie et caramélisation',
      season: 'Toute l\'année'
    },
    {
      slug: 'tarte-tatin',
      name: 'Tarte Tatin',
      description: 'Pommes caramélisées, crème fraîche, calvados',
      price: '17',
      image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=1974&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=1974&auto=format&fit=crop',
      chefNote: 'Les pommes Reinettes du Val de Loire, confites au beurre salé, développent une saveur incomparable.',
      chefStory: "L'histoire raconte que les sœurs Tatin auraient créé ce dessert par accident, en oubliant leur tarte dans le four. Accident heureux qui a donné naissance à l'un des desserts les plus emblématiques de France ! Ma version rend hommage à cette tradition avec des pommes Reinettes du Val de Loire, une variété ancienne au goût acidulé qui résiste parfaitement à la cuisson. Le beurre salé de Bretagne et le sucre caramélisent lentement pendant deux heures, créant ces saveurs profondes et cette couleur ambrée caractéristique. Le Calvados XO, ajouté en fin de cuisson, apporte une touche normande qui complète harmonieusement le profil aromatique.",
      pairing: 'Cidre Fermier Brut',
      ingredients: ['Pommes Reinettes', 'Beurre salé de Bretagne', 'Sucre caramel', 'Pâte feuilletée maison', 'Calvados XO'],
      preparationTime: '15 min',
      origin: 'Val de Loire, France',
      technique: 'Caramélisation inversée',
      season: 'Automne - Hiver'
    },
    {
      slug: 'souffle-grand-marnier',
      name: 'Soufflé au Grand Marnier',
      description: "Sauce chocolat blanc, zeste d'orange confite",
      price: '22',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop',
      chefNote: 'Ce soufflé aérien doit être dégusté immédiatement à sa sortie du four pour apprécier sa légèreté.',
      chefStory: "Le soufflé est le test ultime du pâtissier : il ne pardonne aucune erreur et ne peut attendre une seule seconde. C'est pourquoi nous le préparons uniquement sur commande, avec un timing parfaitement orchestré entre la cuisine et la salle. Les blancs d'œufs sont montés avec une précision militaire, incorporés délicatement à la crème pâtissière parfumée au Grand Marnier Cordon Rouge. La cuisson de 8 minutes exactement produit cette montée spectaculaire et cette croûte dorée qui masque un intérieur encore tremblant. La sauce au chocolat blanc ivoire, servie dans une petite verseuse, vient percer le dôme et créer ce moment de plaisir incomparable.",
      pairing: 'Champagne Demi-Sec',
      ingredients: ['Œufs fermiers', 'Grand Marnier Cordon Rouge', 'Chocolat blanc Ivoire', 'Orange confite'],
      badges: ['limited'],
      preparationTime: '20 min',
      origin: 'France',
      technique: 'Montage des blancs et cuisson précise',
      season: 'Toute l\'année'
    },
    {
      slug: 'mille-feuille-classique',
      name: 'Mille-Feuille Classique',
      description: 'Crème pâtissière vanillée, caramel beurre salé, noisettes',
      price: '19',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1978&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1978&auto=format&fit=crop',
      chefNote: 'Trois couches de pâte feuilletée croustillante, caramélisées à la perfection.',
      chefStory: "Le mille-feuille est un monument de la pâtisserie française, et sa réalisation demande une maîtrise parfaite du feuilletage. Notre pâte, touillée 6 fois avec du beurre de Charentes AOP, développe ces 729 couches qui caractérisent un feuilletage d'exception. Chaque rectangle est cuit entre deux plaques pour garantir une régularité parfaite, puis caramélisé au chalumeau pour ce craquant addictif. La crème pâtissière, préparée avec des jaunes d'œufs fermiers et de la vanille bourbon, est légère et onctueuse. L'assemblage se fait au dernier moment pour préserver le contraste entre le croustillant et le fondant.",
      pairing: 'Vin de Paille du Jura',
      pairingNote: "Les notes de fruits secs et de miel du Vin de Paille créent un accord sublime avec le caramel.",
      ingredients: ['Pâte feuilletée inverse', 'Crème pâtissière', 'Vanille', 'Caramel au beurre salé', 'Noisettes torréfiées'],
      badges: ['chef-selection'],
      preparationTime: '10 min',
      origin: 'France',
      technique: 'Feuilletage inverse 6 tours',
      season: 'Toute l\'année'
    },
    {
      slug: 'paris-brest',
      name: 'Paris-Brest',
      description: 'Pâte à choux, crème pralinée, éclats de noisettes caramélisées',
      price: '18',
      image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=2070&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=2070&auto=format&fit=crop',
      chefNote: "La pâte à choux croustillante renferme une crème pralinée aux noisettes du Piémont.",
      chefStory: "Créé en 1910 par Louis Durand pour célébrer la course cycliste Paris-Brest-Paris, ce dessert iconique évoque la forme d'une roue de vélo. Notre version rend hommage à cette tradition avec une pâte à choux parfaitement alvéolée, dorée et croustillante. La crème mousseline au praliné est réalisée avec des noisettes du Piémont IGP, torréfiées puis broyées finement pour extraire leurs huiles aromatiques. Les éclats de noisettes caramélisées ajoutent ce craquant qui transforme chaque bouchée en une expérience texturale complète.",
      pairing: 'Maury Vintage',
      pairingNote: "Les notes de cacao et de fruits confits du Maury s'accordent parfaitement avec le praliné.",
      ingredients: ['Pâte à choux', 'Praliné noisette', 'Crème pâtissière', 'Noisettes du Piémont', 'Sucre perlé'],
      preparationTime: '15 min',
      origin: 'France',
      technique: 'Choux caramélisé et crème pralinée',
      season: 'Toute l\'année'
    },
    {
      slug: 'tarte-citron-meringuee',
      name: 'Tarte au Citron Meringuée',
      description: 'Crème citron de Menton, meringue italienne flambée',
      price: '17',
      image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=2070&auto=format&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=2070&auto=format&fit=crop',
      chefNote: "Les citrons de Menton apportent une acidité parfaitement équilibrée à cette tarte classique.",
      chefStory: "La tarte au citron est l'une des créations les plus équilibrées de la pâtisserie française. Notre version utilise exclusivement les citrons de Menton IGP, récoltés à parfaite maturité sur la Côte d'Azur. Leur zeste parfumé et leur jus moins acide que les citrons ordinaires créent une crème onctueuse aux arômes floraux subtils. La meringue italienne, préparée avec un sirop de sucre à 121°C, est torchée au chalumeau devant vous, créant ce contraste visuel et gustatif entre le doré de la meringue et l'intensité du citron.",
      pairing: 'Limoncello glacé',
      pairingNote: "Le limoncello artisanal prolonge les arômes citronnés dans une finale digestive.",
      ingredients: ['Citrons de Menton', 'Pâte sucrée', 'Beurre', 'Meringue italienne', 'Zestes confits'],
      badges: ['seasonal'],
      preparationTime: '12 min',
      origin: 'Menton, France',
      technique: 'Crème cuite et meringue italienne',
      season: 'Toute l\'année'
    }
  ]
};

export const wineItems: WineItem[] = [
  {
    slug: 'dom-perignon-2012',
    name: 'Dom Pérignon 2012',
    description: "Un champagne d'exception, alliance parfaite entre puissance et finesse",
    price: '320',
    region: 'Champagne, France',
    year: '2012',
    grapes: 'Chardonnay, Pinot Noir',
    notes: ['Brioche', 'Agrumes confits', 'Amandes grillées', 'Minéralité'],
    pairsWith: ['Huîtres', 'Homard', 'Caviar'],
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2128&auto=format&fit=crop',
    story: "Le millésime 2012 de Dom Pérignon est considéré comme l'un des plus grands de la maison. Après 8 ans de vieillissement sur lies dans les caves crayeuses d'Épernay, ce champagne révèle une complexité aromatique exceptionnelle. L'assemblage parfait entre Chardonnay et Pinot Noir crée cette signature unique : une attaque vive suivie d'une richesse crémeuse, le tout porté par une minéralité de craie qui signe les grands terroirs champenois."
  },
  {
    slug: 'chateau-margaux-2015',
    name: 'Château Margaux 2015',
    description: "Premier Grand Cru Classé, l'élégance bordelaise à son apogée",
    price: '420',
    region: 'Bordeaux, France',
    year: '2015',
    grapes: 'Cabernet Sauvignon, Merlot, Petit Verdot',
    notes: ['Cassis', 'Violette', 'Graphite', 'Tanins soyeux'],
    pairsWith: ['Filet de bœuf', "Carré d'agneau", 'Fromages affinés'],
    heroImage: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop',
    story: "Le 2015 de Château Margaux est unanimement salué comme l'un des plus grands vins jamais produits par ce Premier Grand Cru Classé. Le millésime, béni par une météo parfaite, a permis d'atteindre une maturité phénolique optimale tout en préservant la fraîcheur aromatique. Ce vin incarne l'essence même du Margaux : une finesse tactile incomparable, des tanins d'une souplesse rare, et ce parfum envoûtant de violette qui fait sa signature mondiale."
  },
  {
    slug: 'opus-one-2019',
    name: 'Opus One 2019',
    description: "L'alliance franco-américaine, puissance et complexité californienne",
    price: '380',
    region: 'Napa Valley, États-Unis',
    year: '2019',
    grapes: 'Cabernet Sauvignon, Merlot, Cabernet Franc',
    notes: ['Fruits noirs', 'Épices douces', 'Cèdre', 'Chocolat noir'],
    pairsWith: ['Wagyu', 'Côte de bœuf', 'Gibier'],
    heroImage: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=2091&auto=format&fit=crop',
    story: "Opus One représente la vision commune de deux géants du vin : Robert Mondavi et le Baron Philippe de Rothschild. Ce 2019 capture l'essence de la Napa Valley avec une générosité de fruit caractéristique, tout en conservant cette structure et cette élégance européennes. Le vignoble biodynamique produit des raisins d'une intensité remarquable, fermentés avec des levures indigènes pour exprimer pleinement le terroir unique d'Oakville."
  },
  {
    slug: 'chateau-dyquem-2009',
    name: "Château d'Yquem 2009",
    description: 'Le roi des Sauternes, nectar doré aux arômes envoûtants',
    price: '580',
    region: 'Sauternes, France',
    year: '2009',
    grapes: 'Sémillon, Sauvignon Blanc',
    notes: ['Abricot confit', "Miel d'acacia", 'Safran', 'Orange amère'],
    pairsWith: ['Foie gras', 'Roquefort', 'Tarte Tatin'],
    heroImage: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=1974&auto=format&fit=crop',
    story: "Château d'Yquem 2009 est souvent cité comme le plus grand vin liquoreux jamais produit. Cette année exceptionnelle a vu le botrytis cinerea, le noble champignon qui concentre les sucres, se développer dans des conditions idéales. Chaque grain de raisin a été récolté individuellement lors de passages successifs dans les vignes. Le résultat est un nectar d'une concentration et d'une complexité inouïes, capable de vieillir pendant plus d'un siècle tout en gagnant en profondeur."
  },
  {
    slug: 'cloudy-bay-sauvignon-2022',
    name: 'Cloudy Bay Sauvignon Blanc 2022',
    description: 'La fraîcheur néo-zélandaise, vif et aromatique',
    price: '68',
    region: 'Marlborough, Nouvelle-Zélande',
    year: '2022',
    grapes: 'Sauvignon Blanc',
    notes: ['Agrumes', 'Fruit de la passion', 'Herbe fraîche', 'Minéralité'],
    pairsWith: ['Fruits de mer', 'Salades', 'Chèvre frais'],
    heroImage: 'https://images.unsplash.com/photo-1566995541428-f2246c17cda1?q=80&w=1964&auto=format&fit=crop',
    story: "Cloudy Bay a révolutionné la perception du Sauvignon Blanc dans le monde entier. Situé dans la baie éponyme où les eaux de la mer de Tasman créent un microclimat unique, le vignoble bénéficie de journées ensoleillées et de nuits fraîches qui préservent l'acidité et les arômes. Le 2022 exprime parfaitement ce terroir avec une explosion de fruit de la passion et de pamplemousse, portée par une minéralité saline qui évoque l'océan voisin."
  },
  {
    slug: 'puligny-montrachet-2020',
    name: 'Puligny-Montrachet 1er Cru 2020',
    description: "L'expression parfaite du Chardonnay bourguignon",
    price: '185',
    region: 'Bourgogne, France',
    year: '2020',
    grapes: 'Chardonnay',
    notes: ['Noisette', 'Beurre frais', 'Fleurs blanches', 'Pierre à fusil'],
    pairsWith: ['Sole de Douvres', 'Homard', 'Volaille à la crème'],
    heroImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop',
    story: "Puligny-Montrachet est considéré comme le berceau des plus grands Chardonnays du monde. Ce Premier Cru 2020 provient de vignes de plus de 50 ans, dont les racines plongent profondément dans le sous-sol calcaire qui fait la signature des grands blancs bourguignons. La vinification en fûts de chêne français, avec une proportion de bois neuf soigneusement dosée, apporte cette richesse crémeuse sans masquer la pureté du fruit et cette minéralité pierreuse incomparable."
  },
  {
    slug: 'barolo-monfortino-2016',
    name: 'Barolo Monfortino 2016',
    description: 'Le roi des vins italiens, majestueux et complexe',
    price: '450',
    region: 'Piémont, Italie',
    year: '2016',
    grapes: 'Nebbiolo',
    notes: ['Rose séchée', 'Goudron', 'Truffe', 'Cerises confites'],
    pairsWith: ['Risotto aux truffes', 'Gibier', 'Fromages vieillis'],
    heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop',
    story: "Le Barolo Monfortino de Giacomo Conterno est considéré comme le plus grand vin italien, produit uniquement dans les années exceptionnelles. Le Nebbiolo, cépage roi du Piémont, révèle ici toute sa majesté après un élevage de 7 ans en grandes cuves de chêne de Slavonie. Le 2016 offre ce paradoxe fascinant du Barolo : des tanins d'une puissance impressionnante enrobés dans un velours de soie, avec ces arômes emblématiques de rose fanée et de goudron qui évoluent pendant des décennies."
  },
  {
    slug: 'krug-grande-cuvee',
    name: 'Krug Grande Cuvée',
    description: "L'art de l'assemblage, complexité et générosité",
    price: '290',
    region: 'Champagne, France',
    grapes: 'Chardonnay, Pinot Noir, Pinot Meunier',
    notes: ['Pain grillé', 'Fruits secs', 'Miel', 'Épices'],
    pairsWith: ['Saint-Jacques', 'Turbot', 'Volaille truffée'],
    heroImage: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=1974&auto=format&fit=crop',
    story: "La Grande Cuvée de Krug est un assemblage magistral qui réunit plus de 120 vins de 10 millésimes différents. Chaque édition est unique, fruit d'un travail d'orfèvre où les vins de réserve, certains vieux de plus de 15 ans, apportent cette profondeur et cette complexité incomparables. Le vieillissement minimum de 6 ans en cave permet le développement de ces arômes de brioche grillée et de fruits secs qui font la signature de cette maison d'exception."
  }
];

export function getItemBySlug(category: MenuCategory, slug: string): ExtendedMenuItem | WineItem | undefined {
  if (category === 'vins') {
    return wineItems.find(item => item.slug === slug);
  }
  return menuItems[category]?.find(item => item.slug === slug);
}

export function getAllItems(category: MenuCategory): ExtendedMenuItem[] | WineItem[] {
  if (category === 'vins') {
    return wineItems;
  }
  return menuItems[category] || [];
}