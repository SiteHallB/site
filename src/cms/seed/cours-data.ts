/**
 * Contenu initial des pages de cours — transcription fidèle des anciennes
 * pages codées en dur. Textes en mini-markdown (**gras**, *italique*, [lien](url)).
 */

export type CoursSeed = {
    titre: string;
    slug: string;
    /** Nom du fichier image dans public/images (sans extension). */
    image: string;
    ordre: number;
    pageActive?: boolean;
    carte: { resume: string; icone: string; intensite: string; duree: string; themeBleu?: boolean };
    eyebrow?: string;
    h1Top?: string;
    h1Bottom?: string;
    heroLead?: string;
    stats?: { value: string; label: string }[];
    boutonSecondaire?: { texte: string; url: string; style?: "primary" | "accent" };
    quoi?: { titre: string; p1: string; p2: string };
    benefices?: { titre: string; liste: { icone: string; titre: string; texte: string }[] };
    deroulement?: { titre: string; texte: string }[];
    publicCible?: { intro: string; points: string[] };
    equipement?: { titre: string; p1: string; p2: string };
    zone?: { titre?: string; texte: string };
    faq?: { question: string; reponse: string }[];
    seo?: { titre: string; description: string };
    schemaExercice?: { nom: string; description: string; typeExercice: string };
};

export const COURS: CoursSeed[] = [
    {
        titre: "Musculation",
        slug: "musculation",
        image: "vue_plateau_1",
        ordre: 1,
        carte: {
            resume: "Plateau 2 400 m² équipé Panatta & Technogym. Accès libre 7j/7 de 6h à 23h.",
            icone: "Dumbbell",
            intensite: "Élevée",
            duree: "Libre",
        },
        eyebrow: "Plateau 2 400 m²",
        h1Top: "Salle de musculation",
        h1Bottom: "à Saint Dionisy",
        heroLead:
            "La plus grande salle de musculation du Gard. Équipement **Panatta & Technogym**, poids calibrés compétition, accès libre 7j/7 de 6h à 23h. À 15 minutes de Nîmes.",
        stats: [
            { value: "2 400 m²", label: "Surface totale" },
            { value: "7j/7", label: "Accès libre 6h-23h" },
            { value: "Panatta", label: "Machines Made in Italy" },
            { value: "Tous niveaux", label: "Débutant à compétiteur" },
        ],
        boutonSecondaire: { texte: "Je m'inscris", url: "/tarifs" },
        quoi: {
            titre: "La salle de muscu HALL B",
            p1: "Notre plateau de musculation s'étend sur **2 400 m²** et regroupe l'ensemble des outils nécessaires pour un entraînement complet : charges libres, machines guidées, espace cross-training, zone cardio, racks à squat et bench press, sacs de frappe.",
            p2: "L'équipement est signé Panatta (Italie) pour les machines de musculation et Technogym pour le cardio connecté. Les poids sont *calibrés et certifiés pour la compétition*. Bref, l'élite de l'équipement, accessible à tous — du néophyte au compétiteur.",
        },
        benefices: {
            titre: "6 bonnes raisons de venir s'entraîner ici",
            liste: [
                { icone: "Dumbbell", titre: "Matériel premium", texte: "Machines Panatta et cardio Technogym — le top de l'équipement pro." },
                { icone: "Timer", titre: "7j/7 de 6h à 23h", texte: "Accès libre tous les jours, matin tôt comme tard le soir. À votre rythme." },
                { icone: "Users", titre: "Coachs présents", texte: "Diplômés et disponibles pour conseiller, corriger les placements, construire un programme." },
                { icone: "Sparkles", titre: "Lumière naturelle", texte: "Grandes baies vitrées, hauteur sous plafond importante — on respire en s'entraînant." },
                { icone: "Flame", titre: "Zone cross-training", texte: "Espace dédié avec barres olympiques, kettlebells, plateformes pour le travail fonctionnel." },
                { icone: "Heart", titre: "Hygiène irréprochable", texte: "Salle nettoyée plusieurs fois par jour. Lingettes désinfectantes à disposition partout." },
            ],
        },
        deroulement: [
            { titre: "Visite & séance d'essai", texte: "Vous découvrez la salle gratuitement avec un coach. Visite, conseils, premier essai sur les machines." },
            { titre: "Inscription en 5 min", texte: "Choisissez votre formule (Classic ou Boost), inscription rapide en ligne ou sur place." },
            { titre: "Programme personnalisé", texte: "Sur demande, nos coachs établissent un programme adapté à vos objectifs." },
            { titre: "Entraînement en autonomie", texte: "Accès libre 7j/7, à votre rythme. Les coachs restent disponibles pour conseils ponctuels." },
            { titre: "Suivi & progression", texte: "Bilans réguliers possibles avec le coach pour ajuster le programme et progresser durablement." },
        ],
        publicCible: {
            intro: "Notre salle de musculation s'adresse à tous les profils. Particulièrement adaptée si vous souhaitez :",
            points: [
                "vous remettre au sport dans un cadre encadré et bienveillant,",
                "construire une masse musculaire (prise de masse, hypertrophie),",
                "perdre du poids en combinant cardio et renforcement,",
                "préparer une compétition (force, powerlifting, bodybuilding),",
                "améliorer votre condition physique générale au quotidien,",
                "compléter une pratique sportive externe (running, vélo, sports collectifs).",
            ],
        },
        equipement: {
            titre: "L'équipement à votre disposition",
            p1: "Plateau musculation avec une vaste gamme de machines guidées Panatta (développé couché, squat, presse à cuisses, leg extension, biceps, triceps...) et un large espace charges libres avec barres olympiques, racks, bancs.",
            p2: "Zone cardio Technogym (tapis de course, vélos elliptiques, rameurs, vélos cardio), espace cross-training avec sacs de frappe et kettlebells. L'ensemble en lumière naturelle, avec une hauteur sous plafond généreuse — *une vraie salle d'entraînement, pas un placard*.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, en Vaunage. 15 minutes depuis Nîmes, et moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac. Parking gratuit directement devant la salle. Pour une vraie salle de musculation dans le bassin nîmois.",
        },
        faq: [
            { question: "Quels sont les horaires d'accès à la salle de musculation ?", reponse: "Le plateau de musculation est accessible 7 jours sur 7, de 6h à 23h, pour tous les adhérents — sans réservation." },
            { question: "Quel matériel propose HALL B ?", reponse: "Plateau musculation Panatta (made in Italy), cardio connecté Technogym, poids calibrés et certifiés pour la compétition, sacs de frappe, espace cross-training, machines guidées et charges libres." },
            { question: "Y a-t-il des coachs sur le plateau ?", reponse: "Oui, des coachs diplômés sont présents pour vous accompagner, corriger votre technique et vous proposer des programmes adaptés à vos objectifs (prise de masse, perte de poids, performance)." },
            { question: "Combien coûte un abonnement musculation ?", reponse: "L'accès libre au plateau est inclus dans la formule Classic (40€/mois). La formule Boost (55€/mois) ajoute les cours collectifs et les small groups. Détails sur la page Tarifs." },
            { question: "Faut-il prendre rendez-vous pour s'inscrire ?", reponse: "Non, l'inscription se fait en ligne ou directement sur place. Vous pouvez aussi profiter d'une séance d'essai gratuite pour visiter la salle avant de vous engager." },
            { question: "Y a-t-il un parking gratuit ?", reponse: "Oui, un grand parking gratuit est disponible directement devant la salle, à Saint Dionisy." },
        ],
        seo: {
            titre: "Salle de musculation à Saint Dionisy (Nîmes, Gard) | HALL B",
            description:
                "La plus grande salle de musculation du Gard. Plateau Panatta & Technogym, poids calibrés, 2 400 m² à Saint Dionisy (Nîmes). Essai gratuit.",
        },
        schemaExercice: {
            nom: "Musculation à HALL B",
            description: "Plateau de musculation 2 400 m² équipé Panatta et Technogym, accès libre 7j/7 de 6h à 23h.",
            typeExercice: "Strength training",
        },
    },
    {
        titre: "RPM",
        slug: "rpm",
        image: "salle_rpm",
        ordre: 2,
        carte: {
            resume: "Vélo indoor coaché en musique. Sprints, montées, jusqu'à 600 kcal par séance.",
            icone: "Bike",
            intensite: "Très élevée",
            duree: "45 min",
        },
        eyebrow: "Cours collectif",
        h1Top: "Cours de RPM",
        h1Bottom: "à Saint Dionisy",
        heroLead:
            "Le vélo indoor coaché en musique chez HALL B, à 15 minutes de Nîmes (Gard). Une séance, jusqu'à **600 calories brûlées** en 45 minutes.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "600 kcal", label: "Brûlées en moyenne" },
            { value: "100 %", label: "Sans impact" },
            { value: "Tous niveaux", label: "Débutant à confirmé" },
        ],
        quoi: {
            titre: "Le RPM, c'est quoi ?",
            p1: "Le **RPM** — pour *Raw Power in Motion* — est un cours collectif de **vélo indoor** créé par Les Mills. Pendant **45 minutes intenses**, un coach vous guide à travers sprints, montées et phases de récupération, le tout rythmé par une playlist soigneusement chorégraphiée.",
            p2: "C'est l'un des cours les plus efficaces pour **brûler des calories** et renforcer son endurance, sans aucun impact sur les articulations. Chaque pratiquant règle sa propre résistance : vous adaptez la difficulté à votre niveau tout en profitant de l'énergie collective.",
        },
        benefices: {
            titre: "6 raisons de se mettre au RPM",
            liste: [
                { icone: "Flame", titre: "Perte de poids", texte: "Jusqu'à 600 kcal brûlées par séance grâce à l'effet HIIT du vélo indoor." },
                { icone: "Heart", titre: "Cardio renforcé", texte: "Vos capacités pulmonaires et votre endurance progressent dès les premières semaines." },
                { icone: "Bike", titre: "Muscles tonifiés", texte: "Cuisses, fessiers, mollets et gainage travaillent sans impact pour les articulations." },
                { icone: "Users", titre: "Effet de groupe", texte: "L'énergie collective et la motivation du coach vous poussent à donner le meilleur." },
                { icone: "Music", titre: "Rythmé par la musique", texte: "Chaque séance suit une chorégraphie musicale précise — la séance passe vite." },
                { icone: "Timer", titre: "Efficace en 45 min", texte: "Le format court s'intègre facilement à un emploi du temps chargé." },
            ],
        },
        deroulement: [
            { titre: "Accueil & réglage du vélo", texte: "Vous arrivez 5 min en avance. Le coach vous aide à ajuster hauteur de selle et guidon." },
            { titre: "Échauffement progressif", texte: "3 à 5 minutes pour préparer le corps, augmenter la fréquence cardiaque en douceur." },
            { titre: "Plat à allure soutenue", texte: "Stabilisation du rythme cardiaque sur une cadence régulière, en groupe." },
            { titre: "Montées & sprints", texte: "Le cœur du cours — résistance augmentée puis explosions courtes de 20 à 60 secondes." },
            { titre: "Récupération", texte: "Phases pour réguler la respiration entre chaque bloc d'effort." },
            { titre: "Retour au calme & étirements", texte: "3 à 5 minutes pour terminer la séance et étirer les jambes." },
        ],
        publicCible: {
            intro: "Le RPM est **accessible à tous** grâce à l'auto-régulation de l'intensité. Il est particulièrement adapté si vous cherchez à :",
            points: [
                "perdre du poids sans traumatiser vos articulations,",
                "améliorer votre cardio pour la course à pied, le trail, le vélo de route,",
                "reprendre le sport dans un cadre structuré et motivant,",
                "rejoindre une activité dynamique en groupe, conviviale,",
                "obtenir un entraînement efficace en 45 minutes seulement.",
            ],
        },
        equipement: {
            titre: "Une salle entièrement dédiée",
            p1: "Le RPM se pratique dans une **salle dédiée** chez HALL B, équipée de vélos **Technogym Group Cycle**, référence mondiale du cycling collectif. Chaque vélo est équipé d'un écran qui affiche votre cadence et votre puissance en temps réel.",
            p2: "L'ambiance lumineuse et le système sonore professionnel ont été pensés pour *vous immerger pleinement* dans la séance. Une atmosphère qui change tout, par rapport à un cours improvisé.",
        },
        zone: {
            titre: "Du RPM dans le bassin nîmois",
            texte: "HALL B est situé à **Saint Dionisy**, en plein cœur de la Vaunage. Notre salle est accessible en **15 minutes depuis le centre de Nîmes**, et en moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac.\n\nSi vous cherchiez un *cours de RPM dans le Gard*, c'est ici que ça se passe.",
        },
        faq: [
            { question: "Qu'est-ce que le RPM ?", reponse: "Le RPM (Raw Power in Motion) est un cours collectif de vélo indoor coaché en musique, créé par Les Mills. Une séance dure 45 minutes et alterne sprints, montées et phases de récupération. Vous pouvez brûler entre 400 et 600 kcal par séance." },
            { question: "Le RPM est-il accessible aux débutants ?", reponse: "Oui, le RPM s'adresse à tous les niveaux. Chacun règle son vélo et sa résistance en fonction de sa condition physique. Le coach guide en permanence pour adapter l'intensité." },
            { question: "Combien de cours de RPM par semaine chez HALL B ?", reponse: "HALL B propose plusieurs séances de RPM par semaine dans une salle dédiée équipée de vélos Technogym. Consultez le planning à jour sur la page Plannings." },
            { question: "Faut-il un équipement particulier ?", reponse: "Une simple tenue de sport et une serviette suffisent. Une bouteille d'eau est fortement recommandée car les séances sont intenses. Les chaussures de sport classiques conviennent." },
            { question: "Comment essayer un cours de RPM chez HALL B ?", reponse: "Vous pouvez bénéficier d'une séance d'essai offerte. Réservez en ligne depuis la page Essai offert ou contactez-nous au 04 66 19 16 76." },
        ],
        seo: {
            titre: "Cours de RPM à Saint Dionisy (Nîmes, Gard) | HALL B",
            description:
                "Cours de RPM (Raw Power in Motion) près de Nîmes : vélo indoor coaché en musique chez HALL B à Saint Dionisy. Plannings, horaires, séance d'essai offerte.",
        },
        schemaExercice: {
            nom: "Cours de RPM (Raw Power in Motion)",
            description: "Cours collectif de vélo indoor coaché en musique. Séances de 45 minutes à haute intensité, brûlant jusqu'à 600 kcal.",
            typeExercice: "Indoor cycling",
        },
    },
    {
        titre: "Body Pump",
        slug: "body-pump",
        image: "sacs_boxe_1",
        ordre: 3,
        carte: {
            resume: "Renforcement musculaire complet avec barres lestées sur fond de musique.",
            icone: "Dumbbell",
            intensite: "Élevée",
            duree: "45 min",
        },
        eyebrow: "Cours collectif",
        h1Top: "Cours de Body Pump",
        h1Bottom: "à Saint Dionisy",
        heroLead:
            "Le cours de renforcement musculaire le plus efficace du monde, créé par Les Mills. Une barre, des disques, une playlist explosive — et jusqu'à **400 kcal brûlées** en 45 min.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "400 kcal", label: "Brûlées en moyenne" },
            { value: "Tous niveaux", label: "Charges adaptables" },
            { value: "10 muscles", label: "Travaillés en 1 séance" },
        ],
        quoi: {
            titre: "Le Body Pump, c'est quoi ?",
            p1: "Le **Body Pump** (parfois appelé *Pump* tout court) est un cours collectif créé par Les Mills en 1991. Le principe : utiliser des barres lestées et des disques de musculation sur fond de musique pour travailler en groupe tous les grands groupes musculaires.",
            p2: "Chaque chanson cible un muscle précis (squats, soulevé de terre, développé couché, biceps, triceps, épaules, gainage). C'est l'équivalent d'une séance complète de musculation, en format collectif motivant, avec un rythme et une intensité dictés par la musique.",
        },
        benefices: {
            titre: "6 raisons de faire du Body Pump",
            liste: [
                { icone: "Dumbbell", titre: "Renforcement complet", texte: "Tous les grands groupes musculaires travaillés en une seule séance." },
                { icone: "Flame", titre: "Brûle-graisses", texte: "Jusqu'à 400 kcal éliminées et un effet 'afterburn' qui prolonge la combustion." },
                { icone: "Music", titre: "Effet motivant", texte: "La musique rythme chaque exercice — vous ne voyez pas le temps passer." },
                { icone: "Users", titre: "Énergie du groupe", texte: "L'effet collectif vous pousse à donner le meilleur, même les jours sans." },
                { icone: "Heart", titre: "Cardio + force", texte: "Combinaison rare qui muscle ET améliore l'endurance cardio-vasculaire." },
                { icone: "Timer", titre: "Efficace en 45 min", texte: "Un entraînement complet sans avoir à enchaîner les machines de musculation." },
            ],
        },
        deroulement: [
            { titre: "Échauffement (5 min)", texte: "Activation musculaire générale avec barre légère, mobilisation articulaire." },
            { titre: "Squats", texte: "Travail des cuisses et fessiers — la base de tout entraînement." },
            { titre: "Pectoraux & dos", texte: "Développé couché, rowing barre, soulevé de terre. Les gros muscles du haut du corps." },
            { titre: "Biceps, triceps, épaules", texte: "Petits muscles isolés, exercices courts et intenses pour la tonicité." },
            { titre: "Gainage abdominal", texte: "Crunch, planches, oblique — la sangle abdominale en fin de séance." },
            { titre: "Étirements", texte: "Retour au calme et étirement de tous les muscles travaillés." },
        ],
        publicCible: {
            intro: "Le Body Pump est accessible à tous grâce aux charges adaptables. Particulièrement adapté si vous souhaitez :",
            points: [
                "renforcer vos muscles sans aller en salle de musculation,",
                "découvrir la musculation dans un cadre encadré,",
                "tonifier votre corps tout en brûlant des calories,",
                "profiter de l'effet motivant du groupe,",
                "compléter un cardio par du travail de force.",
            ],
        },
        equipement: {
            titre: "Une salle équipée pour le Pump",
            p1: "Notre salle de cours collectifs est équipée de barres olympiques et de disques de musculation calibrés Pannata (made in Italy), pour que chaque pratiquant ajuste sa charge en fonction de l'exercice et de son niveau.",
            p2: "Système sonore professionnel, miroirs grand format pour vérifier les placements, plancher antidérapant — *tout est pensé pour la pratique en groupe*. Notre coach diplômée corrige et adapte les mouvements.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, en Vaunage. Accessible en 15 minutes depuis Nîmes, et en moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac. Le seul vrai cours de Body Pump du bassin nîmois.",
        },
        faq: [
            { question: "Le Body Pump fait-il prendre du muscle ?", reponse: "Oui, surtout pour les débutants. Le travail régulier avec charges (même légères au début) stimule la croissance musculaire et tonifie progressivement. Pour de l'hypertrophie pure, compléter avec de la musculation classique." },
            { question: "Quelle charge choisir au début ?", reponse: "Commencez léger : 2 à 5 kg sur la barre suffisent pour la première séance, le temps d'apprendre les mouvements. La coach vous conseillera des progressions adaptées." },
            { question: "Body Pump vs musculation classique ?", reponse: "Le Body Pump travaille en endurance musculaire (séries longues, charges modérées). La musculation classique permet plus de spécialisation et de surcharge progressive. Les deux sont complémentaires." },
            { question: "Combien de fois par semaine ?", reponse: "2 à 3 séances par semaine, en alternant avec un jour de récupération ou un cours cardio (RPM, Zumba). Le corps a besoin de temps pour reconstruire les muscles entre deux séances de renforcement." },
            { question: "Faut-il un équipement particulier ?", reponse: "Tenue de sport, chaussures adaptées (éviter les semelles plates type Converse), serviette et bouteille d'eau. Tout le reste (barre, disques, tapis) est fourni par la salle." },
        ],
        seo: {
            titre: "Cours de Body Pump à Saint Dionisy (Nîmes, Gard) | HALL B",
            description:
                "Cours de Body Pump (Pump) près de Nîmes chez HALL B. Renforcement musculaire complet avec barres lestées, sur fond de musique. Brûlez jusqu'à 400 kcal.",
        },
        schemaExercice: {
            nom: "Cours de Body Pump",
            description: "Cours collectif de renforcement musculaire avec barres lestées et disques, créé par Les Mills. 45 minutes intenses.",
            typeExercice: "Strength training",
        },
    },
    {
        titre: "Pilates",
        slug: "pilates",
        image: "salle_coursco",
        ordre: 12,
        carte: {
            resume: "Renforcement profond, posture, gainage. Travail doux et précis sur la sangle abdominale.",
            icone: "Sparkles",
            intensite: "Modérée",
            duree: "45 min",
        },
        eyebrow: "Cours collectif",
        h1Top: "Cours de Pilates",
        h1Bottom: "à Saint Dionisy",
        heroLead:
            "Renforcez votre sangle abdominale, améliorez votre posture et gagnez en souplesse. Le Pilates chez HALL B, à 15 minutes de Nîmes, dans une salle dédiée.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "Tous niveaux", label: "Débutant à confirmé" },
            { value: "Sans impact", label: "Articulations préservées" },
            { value: "Effet posture", label: "Dès 4 semaines" },
        ],
        quoi: {
            titre: "Le Pilates, c'est quoi ?",
            p1: "Créée par **Joseph Pilates** au début du XXe siècle, cette méthode douce mais exigeante vise à **renforcer les muscles profonds** du tronc, à corriger les déséquilibres posturaux et à améliorer la coordination corps-esprit.",
            p2: "Une séance type alterne exercices au sol et postures contrôlées, toujours guidées par la respiration. Idéal pour soulager les douleurs de dos, affiner la silhouette et retrouver une meilleure conscience corporelle.",
        },
        benefices: {
            titre: "6 raisons de se mettre au Pilates",
            liste: [
                { icone: "Sparkles", titre: "Gainage profond", texte: "Travail ciblé du transverse et du plancher pelvien pour une ceinture abdominale solide." },
                { icone: "Activity", titre: "Posture améliorée", texte: "Réalignement de la colonne vertébrale et meilleure conscience corporelle." },
                { icone: "Heart", titre: "Réduction du stress", texte: "Le travail respiratoire calme le système nerveux et apaise l'esprit." },
                { icone: "Wind", titre: "Souplesse", texte: "Étirements progressifs et travail de la mobilité articulaire à chaque séance." },
                { icone: "Brain", titre: "Concentration", texte: "Chaque mouvement demande précision et focus — un vrai entraînement mental." },
                { icone: "Smile", titre: "Douleurs de dos", texte: "Méthode recommandée par les kinés pour prévenir et soulager les douleurs lombaires." },
            ],
        },
        deroulement: [
            { titre: "Centrage et respiration", texte: "Mise en condition, conscience du périnée et de la respiration thoracique." },
            { titre: "Échauffement articulaire", texte: "Mobilisation douce du bassin, des épaules et de la colonne." },
            { titre: "Exercices de gainage", texte: "Travail du transverse via les exercices fondamentaux : Hundred, Roll-up, Single Leg Stretch." },
            { titre: "Renforcement ciblé", texte: "Postures plus avancées pour cuisses, fessiers, dos et abdominaux." },
            { titre: "Étirements & retour au calme", texte: "Relâchement musculaire, étirements en profondeur, focus respiration." },
        ],
        publicCible: {
            intro: "Le Pilates est accessible à tous, du débutant absolu au sportif confirmé. Il est particulièrement adapté si vous souhaitez :",
            points: [
                "renforcer votre sangle abdominale en profondeur,",
                "soulager ou prévenir les douleurs de dos,",
                "améliorer votre posture au quotidien,",
                "vous remettre au sport en douceur après une pause,",
                "compléter une autre pratique sportive plus intense.",
            ],
        },
        equipement: {
            titre: "Une salle de cours collectifs dédiée",
            p1: "Le Pilates se pratique dans notre salle de cours collectifs, équipée de tapis épais, blocs de yoga, élastiques et petits accessoires Pilates pour varier les sensations.",
            p2: "L'ambiance est *calme et concentrée*, propice au travail postural et à la respiration. Notre coach diplômée corrige les placements et adapte chaque exercice à votre niveau.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, en Vaunage. Accessible en 15 minutes depuis Nîmes, et en moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac. Si vous cherchiez un *cours de Pilates dans le Gard*, vous êtes au bon endroit.",
        },
        faq: [
            { question: "Le Pilates fait-il maigrir ?", reponse: "Le Pilates n'est pas un cours brûle-graisse comme le RPM ou le Zumba, mais il affine la silhouette en raffermissant les muscles profonds. Couplé à une alimentation équilibrée et à une pratique cardio, il participe à une perte de poids durable." },
            { question: "Quelle différence entre Pilates et Yoga ?", reponse: "Le Yoga met l'accent sur la spiritualité, la méditation et la souplesse. Le Pilates est plus centré sur le renforcement musculaire profond et la posture. Les deux pratiques se complètent très bien." },
            { question: "Faut-il un équipement particulier ?", reponse: "Une tenue souple, des chaussettes antidérapantes ou les pieds nus. Le tapis et le petit matériel (élastiques, blocs) sont fournis par HALL B." },
            { question: "À quelle fréquence pratiquer le Pilates ?", reponse: "2 séances par semaine constituent un bon rythme pour ressentir des bénéfices durables en 4 à 6 semaines : meilleure posture, abdominaux plus toniques, moins de tensions dorsales." },
            { question: "Le Pilates convient-il aux femmes enceintes ?", reponse: "Oui, le Pilates est même recommandé pendant la grossesse — à condition d'adapter les postures. Informez la coach de votre situation avant le cours pour bénéficier de variantes sécurisées." },
        ],
        seo: {
            titre: "Cours de Pilates à Saint Dionisy (Nîmes, Gard) | HALL B",
            description:
                "Cours de Pilates près de Nîmes chez HALL B à Saint Dionisy. Renforcement profond, posture, gainage. Tous niveaux, séance d'essai offerte.",
        },
        schemaExercice: {
            nom: "Cours de Pilates",
            description: "Cours collectif de Pilates : renforcement profond, gainage abdominal, travail postural et de la respiration.",
            typeExercice: "Pilates",
        },
    },
    {
        titre: "Body Attack",
        slug: "body-attack",
        image: "salle_coursco",
        ordre: 4,
        carte: {
            resume: "Cardio athlétique haute énergie inspiré des sports. Jusqu'à 600 kcal par séance.",
            icone: "Activity",
            intensite: "Très élevée",
            duree: "45 min",
        },
        eyebrow: "Cours collectif",
        h1Top: "Cours de Body Attack",
        h1Bottom: "à Saint Dionisy",
        heroLead:
            "Le cardio athlétique haute énergie inspiré des mouvements sportifs. Jusqu'à **600 kcal en 45 minutes**, dans une salle dédiée chez HALL B, à 15 minutes de Nîmes.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "600 kcal", label: "Jusqu'à, par séance" },
            { value: "Cardio", label: "Intensité élevée" },
            { value: "Tous niveaux", label: "Options adaptées" },
        ],
        quoi: {
            titre: "Le Body Attack, c'est quoi ?",
            p1: "Le Body Attack est un cours collectif de cardio athlétique qui mélange *aérobic, course, sauts et mouvements inspirés des sports* (foot, basket, athlétisme). Le tout chorégraphié sur une musique entraînante.",
            p2: "Construit en entraînement par intervalles, il alterne pics d'effort cardio et phases de renforcement (fentes, squats, gainage). Résultat : un cours brûle-graisses redoutable qui booste l'endurance, l'agilité et le moral.",
        },
        benefices: {
            titre: "6 raisons d'essayer le Body Attack",
            liste: [
                { icone: "Flame", titre: "Brûle-graisses", texte: "Jusqu'à 600 kcal par séance, avec un effet 'afterburn' qui prolonge la combustion." },
                { icone: "Heart", titre: "Cardio en béton", texte: "Le cœur et le souffle progressent vite grâce au travail par intervalles." },
                { icone: "Activity", titre: "Agilité & coordination", texte: "Les déplacements et appuis sportifs améliorent la vivacité et l'équilibre." },
                { icone: "Dumbbell", titre: "Renforcement", texte: "Fentes, squats sautés et gainage tonifient les jambes et la sangle abdominale." },
                { icone: "Music", titre: "Énergie & musique", texte: "Une playlist qui pulse et un coach qui motive : le temps passe à toute vitesse." },
                { icone: "Users", titre: "Effet groupe", texte: "L'énergie collective vous porte et vous pousse à vous dépasser." },
            ],
        },
        deroulement: [
            { titre: "Échauffement dynamique", texte: "Montée cardiaque progressive et mobilisation des appuis (5 min)." },
            { titre: "Premiers blocs cardio", texte: "Déplacements, course et sauts simples pour entrer dans le rythme." },
            { titre: "Pics d'intensité", texte: "Intervalles haute intensité inspirés des mouvements sportifs." },
            { titre: "Renforcement", texte: "Fentes, squats, pompes et gainage pour tonifier le corps." },
            { titre: "Retour au calme", texte: "Récupération cardio et étirements pour bien terminer." },
        ],
        publicCible: {
            intro: "Le Body Attack s'adresse à tous ceux qui aiment le cardio dynamique. Particulièrement adapté si vous souhaitez :",
            points: [
                "perdre du poids avec un cours brûle-graisses très efficace,",
                "améliorer votre endurance et votre souffle,",
                "gagner en agilité, en vivacité et en coordination,",
                "vous défouler et évacuer le stress en musique,",
                "varier des cours plus calmes ou du plateau de musculation.",
            ],
        },
        equipement: {
            titre: "Une salle dédiée au cardio collectif",
            p1: "Le Body Attack se pratique dans notre salle de cours collectifs, spacieuse, au sol adapté pour amortir les sauts et préserver vos articulations.",
            p2: "Notre coach diplômé propose en permanence *une option à faible impact et une option à fort impact*, pour que chacun travaille à la bonne intensité, du débutant au sportif aguerri.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, en Vaunage. Accessible en 15 minutes depuis Nîmes, et en moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac.",
        },
        faq: [
            { question: "Le Body Attack est-il fait pour les débutants ?", reponse: "Oui, à condition d'y aller à son rythme. Le coach propose toujours des options à faible impact (sans saut) pour les débutants et des options à fort impact pour les confirmés. On adapte l'intensité, jamais l'inverse." },
            { question: "Combien de calories brûle-t-on ?", reponse: "Entre 400 et 600 kcal pour une séance de 45 minutes, ce qui en fait l'un des cours cardio les plus efficaces, au même niveau que le RPM ou le Step." },
            { question: "Quelle différence avec le Body Pump ?", reponse: "Le Body Pump est du renforcement musculaire avec barres lestées. Le Body Attack est du cardio athlétique (course, sauts, fentes dynamiques) sans matériel. L'un muscle, l'autre fait surtout grimper le cardio et brûler des calories." },
            { question: "Quel équipement prévoir ?", reponse: "De bonnes baskets avec un bon amorti (mouvements pliométriques), une tenue respirante, une serviette et une grande bouteille d'eau. Aucun matériel n'est nécessaire." },
        ],
        seo: {
            titre: "Cours de Body Attack à Saint Dionisy (Nîmes, Gard) | HALL B",
            description:
                "Cours de Body Attack près de Nîmes chez HALL B : cardio athlétique haute énergie, jusqu'à 600 kcal en 45 min. Tous niveaux, à 15 min de Nîmes.",
        },
        schemaExercice: {
            nom: "Cours de Body Attack",
            description: "Cours collectif de cardio athlétique haute énergie, inspiré des mouvements sportifs. Entraînement par intervalles. 45 minutes.",
            typeExercice: "Aerobic",
        },
    },
    {
        titre: "Cardio Boxe",
        slug: "cardio-boxe",
        image: "sacs_boxe_1",
        ordre: 5,
        carte: {
            resume: "Boxe fitness sans contact : frappe, cardio et défoulement. Anti-stress garanti.",
            icone: "Flame",
            intensite: "Élevée",
            duree: "45 min",
        },
        eyebrow: "Cours collectif",
        h1Top: "Cours de Cardio Boxe",
        h1Bottom: "à Saint Dionisy",
        heroLead:
            "La boxe fitness sans contact : frappe, cardio et défoulement en **45 minutes**. Un brûle-graisses anti-stress redoutable, chez HALL B à 15 minutes de Nîmes.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "~500 kcal", label: "Brûlées en moyenne" },
            { value: "Sans contact", label: "Aucun risque de coup" },
            { value: "Tous niveaux", label: "Aucune expérience requise" },
        ],
        quoi: {
            titre: "La Cardio Boxe, c'est quoi ?",
            p1: "La **cardio boxe** (ou boxe fitness) reprend les gestes de la boxe — directs, crochets, uppercuts, esquives, jeu de jambes — sous forme d'un entraînement cardio rythmé, *sans adversaire et sans contact*.",
            p2: "On enchaîne combinaisons de frappes sur sac ou dans le vide et exercices de renforcement (gainage, squats, pompes). Résultat : un cours complet qui défoule, fait fondre les calories et évacue le stress de la journée.",
        },
        benefices: {
            titre: "6 raisons d'essayer la Cardio Boxe",
            liste: [
                { icone: "Flame", titre: "Brûle-graisses", texte: "L'alternance frappes / renforcement fait grimper la dépense calorique." },
                { icone: "Heart", titre: "Anti-stress", texte: "Frapper défoule comme rien d'autre : la tension de la journée part dans le sac." },
                { icone: "Activity", titre: "Coordination", texte: "Le travail des combinaisons améliore les réflexes, la vitesse et la coordination." },
                { icone: "Dumbbell", titre: "Corps complet", texte: "Bras, épaules, jambes et sangle abdominale : tout le corps travaille." },
                { icone: "Timer", titre: "Confiance en soi", texte: "Maîtriser les gestes de la boxe est valorisant et booste l'assurance." },
                { icone: "Users", titre: "Ambiance & énergie", texte: "L'énergie du groupe et la musique rendent la séance addictive." },
            ],
        },
        deroulement: [
            { titre: "Échauffement", texte: "Corde à sauter, déplacements et mobilité des épaules et hanches (5 à 8 min)." },
            { titre: "Technique de base", texte: "Garde, directs, crochets, uppercuts, esquives — les fondamentaux expliqués." },
            { titre: "Combinaisons sur sac", texte: "Enchaînements de frappes rythmés, en intervalle haute intensité." },
            { titre: "Renforcement", texte: "Gainage, pompes, squats et abdos pour compléter le travail cardio." },
            { titre: "Retour au calme", texte: "Étirements des épaules, du dos et des jambes pour bien récupérer." },
        ],
        publicCible: {
            intro: "La cardio boxe s'adresse à **tous ceux qui veulent se défouler en s'entraînant**. Particulièrement adaptée si vous souhaitez :",
            points: [
                "évacuer le stress et l'énergie négative,",
                "brûler un maximum de calories en un cours fun,",
                "améliorer votre cardio, vos réflexes et votre coordination,",
                "tonifier le haut du corps et la sangle abdominale,",
                "découvrir les gestes de la boxe sans risque de coup.",
            ],
        },
        equipement: {
            titre: "Sacs de frappe et espace dédié",
            p1: "La cardio boxe profite de nos sacs de frappe et d'un espace adapté au sein de la salle. Pattes d'ours et accessoires viennent varier les exercices.",
            p2: "Notre coach veille à la *qualité des gestes* pour préserver poignets et épaules, et ajuste l'intensité des combinaisons selon votre niveau. Débutant ou habitué, vous frappez à votre rythme.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, en Vaunage. Accessible en 15 minutes depuis Nîmes, et en moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac.",
        },
        faq: [
            { question: "Faut-il savoir boxer pour participer ?", reponse: "Non, aucune expérience requise. Le coach enseigne les gestes de base (garde, directs, crochets, esquives) dès les premières séances. On progresse vite et chacun frappe à son intensité." },
            { question: "Y a-t-il des coups ou du contact ?", reponse: "Non. La cardio boxe est une boxe fitness sans adversaire et sans contact : on frappe dans le vide, sur sac ou sur pattes d'ours. Zéro risque de coup, 100 % défoulement." },
            { question: "Est-ce un bon cours pour maigrir ?", reponse: "Oui, c'est un excellent brûle-graisses : entre 400 et 600 kcal par séance grâce à l'alternance de frappes rapides et d'exercices de renforcement. Le corps est sollicité dans son ensemble." },
            { question: "Quel équipement prévoir ?", reponse: "Une tenue de sport, des baskets, une serviette et de l'eau. Les sacs de frappe et le matériel sont fournis ; des gants peuvent être recommandés (renseignez-vous à l'accueil)." },
        ],
        seo: {
            titre: "Cours de Cardio Boxe à Saint Dionisy (Nîmes, Gard) | HALL B",
            description:
                "Cours de Cardio Boxe près de Nîmes chez HALL B : boxe fitness sans contact, cardio et défoulement en 45 min. Tous niveaux, à 15 min de Nîmes.",
        },
        schemaExercice: {
            nom: "Cours de Cardio Boxe",
            description: "Cours collectif de boxe fitness sans contact : travail de frappe sur sac, cardio et renforcement. 45 minutes.",
            typeExercice: "Boxing",
        },
    },
    {
        titre: "PPG",
        slug: "ppg",
        image: "salle_coursco",
        ordre: 6,
        carte: {
            resume: "Préparation physique générale : cardio, force et mobilité. La base de tous les sports.",
            icone: "Zap",
            intensite: "Élevée",
            duree: "45 min",
        },
        eyebrow: "Cours collectif",
        h1Top: "Cours de PPG",
        h1Bottom: "Préparation Physique Générale",
        heroLead:
            "Cardio, force, explosivité et mobilité réunis en **45 minutes**. La PPG, c'est la base athlétique complète, encadrée par un coach, chez HALL B à 15 minutes de Nîmes.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "~500 kcal", label: "Brûlées en moyenne" },
            { value: "Corps entier", label: "Travail complet" },
            { value: "Tous niveaux", label: "Intensité adaptable" },
        ],
        quoi: {
            titre: "La PPG, c'est quoi ?",
            p1: "PPG signifie **Préparation Physique Générale**. C'est un cours collectif *complet* qui développe l'ensemble des qualités physiques : endurance cardio, force, vitesse, explosivité, coordination et mobilité.",
            p2: "La séance enchaîne **cardio, renforcement au poids du corps et exercices fonctionnels** sous forme de circuits dynamiques. C'est le socle idéal pour se remettre en forme, progresser dans son sport ou simplement gagner une condition physique solide et durable.",
        },
        benefices: {
            titre: "6 raisons de faire de la PPG",
            liste: [
                { icone: "Activity", titre: "Condition complète", texte: "Cardio, force et mobilité travaillés dans une seule et même séance." },
                { icone: "Flame", titre: "Brûle-graisses", texte: "Des circuits intenses qui font grimper la dépense calorique pendant et après l'effort." },
                { icone: "Dumbbell", titre: "Renforcement global", texte: "Haut du corps, bas du corps, gainage — tout le corps est sollicité." },
                { icone: "Heart", titre: "Endurance & souffle", texte: "Le cœur et la capacité cardio progressent séance après séance." },
                { icone: "Timer", titre: "Efficace en 45 min", texte: "Format dense et sans temps mort, parfait sur la pause déjeuner." },
                { icone: "Users", titre: "Dynamique de groupe", texte: "L'énergie collective vous pousse à donner le meilleur jusqu'à la fin." },
            ],
        },
        deroulement: [
            { titre: "Échauffement", texte: "Mobilité articulaire et activation cardio progressive (5 à 8 min)." },
            { titre: "Bloc cardio", texte: "Course, sauts, montées de genoux, déplacements — on monte en intensité." },
            { titre: "Renforcement", texte: "Squats, fentes, pompes, gainage, au poids du corps ou avec petites charges." },
            { titre: "Circuit fonctionnel", texte: "Stations enchaînées (kettlebell, élastiques, médecine-ball) en intervalle." },
            { titre: "Retour au calme", texte: "Étirements et relâchement musculaire pour bien récupérer." },
        ],
        publicCible: {
            intro: "La PPG s'adresse à **tous ceux qui veulent une condition physique solide**. Particulièrement adaptée si vous souhaitez :",
            points: [
                "vous remettre en forme de manière complète et progressive,",
                "gagner en endurance, en force et en explosivité,",
                "préparer physiquement un autre sport (course, trail, sports collectifs),",
                "perdre du poids grâce à des circuits brûle-graisses,",
                "varier vos entraînements et casser la routine du plateau.",
            ],
        },
        equipement: {
            titre: "Une salle pensée pour le fonctionnel",
            p1: "La PPG se pratique dans notre salle de cours collectifs, équipée de tapis, kettlebells, médecine-balls, élastiques, steps et petites charges pour varier les exercices.",
            p2: "Notre coach diplômé adapte l'intensité à chacun, corrige les placements et propose des *variantes plus douces ou plus exigeantes* selon votre niveau. Personne ne reste sur le bord.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, en Vaunage. Accessible en 15 minutes depuis Nîmes, et en moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac.",
        },
        faq: [
            { question: "La PPG, c'est pour qui ?", reponse: "Pour tout le monde. Débutants comme sportifs confirmés : l'intensité s'adapte à chacun. C'est aussi la base idéale pour préparer un autre sport (running, foot, rugby, trail, sports de raquette)." },
            { question: "Quelle différence avec le CAF ?", reponse: "Le CAF cible le bas du corps (cuisses, abdos, fessiers). La PPG travaille le corps entier en combinant cardio, renforcement, explosivité et mobilité. C'est plus complet et plus orienté condition physique générale." },
            { question: "Faut-il du matériel ?", reponse: "Non, tout est fourni : tapis, élastiques, kettlebells, médecine-balls, steps. Prévoyez juste une tenue de sport, des baskets, une serviette et de l'eau." },
            { question: "À quelle fréquence pratiquer ?", reponse: "1 à 3 séances par semaine selon vos objectifs. En complément de la musculation ou d'un sport, une à deux séances suffisent à gagner en condition physique." },
        ],
        seo: {
            titre: "Cours de PPG (Préparation Physique Générale) à Saint Dionisy (Nîmes) | HALL B",
            description:
                "Cours collectif de PPG près de Nîmes : préparation physique générale, cardio, renforcement et mobilité en 45 min chez HALL B Saint Dionisy. Tous niveaux.",
        },
        schemaExercice: {
            nom: "Cours de PPG — Préparation Physique Générale",
            description: "Cours collectif de préparation physique générale : cardio, renforcement musculaire, explosivité et mobilité. 45 minutes.",
            typeExercice: "Conditioning",
        },
    },
    {
        titre: "CAF",
        slug: "caf",
        image: "salle_coursco",
        ordre: 7,
        carte: {
            resume: "Cuisses, Abdos, Fessiers — Renforcement musculaire ciblé du bas du corps.",
            icone: "Flame",
            intensite: "Élevée",
            duree: "45 min",
        },
        eyebrow: "Cours collectif",
        h1Top: "Cours CAF",
        h1Bottom: "Cuisses · Abdos · Fessiers",
        heroLead:
            "Le cours qui ne ment pas. 45 minutes de renforcement ciblé sur le **bas du corps et la sangle abdominale**, dans une salle dédiée chez HALL B à 15 minutes de Nîmes.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "350 kcal", label: "Brûlées en moyenne" },
            { value: "6 sem", label: "Pour des résultats visibles" },
            { value: "Tous niveaux", label: "Intensité adaptable" },
        ],
        quoi: {
            titre: "Le CAF, c'est quoi ?",
            p1: "CAF est l'acronyme de **Cuisses, Abdos, Fessiers**. C'est un cours collectif *spécialisé dans le renforcement du bas du corps*, qui enchaîne sans temps mort des exercices ciblés sur ces trois zones musculaires.",
            p2: "Squats, fentes, ponts fessiers, planches, crunchs, relevés de jambes... La séance alterne phases d'intensité et récupérations courtes. Travail principalement au poids du corps complété parfois d'élastiques ou de petites charges. Idéal pour **raffermir, tonifier et affiner**.",
        },
        benefices: {
            titre: "6 raisons de faire du CAF",
            liste: [
                { icone: "Flame", titre: "Fessiers galbés", texte: "L'exercice n°1 pour des fessiers fermes et toniques en quelques semaines." },
                { icone: "Activity", titre: "Cuisses affinées", texte: "Travail des quadriceps, ischio-jambiers et adducteurs pour des jambes dessinées." },
                { icone: "Dumbbell", titre: "Sangle abdominale", texte: "Crunchs, planches, gainage — pour des abdos visibles et fonctionnels." },
                { icone: "Heart", titre: "Cardio en bonus", texte: "Le rythme soutenu sollicite aussi votre système cardio-vasculaire." },
                { icone: "Timer", titre: "Efficace en 45 min", texte: "Format court et intensif — parfait pour la pause méridienne." },
                { icone: "Users", titre: "Motivation collective", texte: "L'effet groupe vous pousse à tenir les séries jusqu'à la dernière répétition." },
            ],
        },
        deroulement: [
            { titre: "Échauffement dynamique", texte: "Mobilisation articulaire et activation des chaînes musculaires (5 min)." },
            { titre: "Cuisses", texte: "Squats, fentes, montées de genoux — quadriceps et ischio-jambiers." },
            { titre: "Fessiers", texte: "Ponts fessiers, kickbacks, fire hydrants — focus grand et moyen fessier." },
            { titre: "Abdos", texte: "Crunchs, relevés de jambes, planches, gainage latéral." },
            { titre: "Étirements", texte: "Étirements profonds des cuisses, fessiers et lombaires." },
        ],
        publicCible: {
            intro: "Le CAF s'adresse à **toutes les personnes qui veulent tonifier le bas du corps**, sans prendre de masse musculaire. Particulièrement adapté si vous souhaitez :",
            points: [
                "raffermir cuisses, fessiers et abdominaux,",
                "perdre la culotte de cheval ou les capitons,",
                "améliorer votre posture et votre stabilité,",
                "prévenir les douleurs lombaires liées à un manque de gainage,",
                "compléter une pratique cardio par du renforcement.",
            ],
        },
        equipement: {
            titre: "Une salle dédiée au renforcement",
            p1: "Le CAF se pratique dans notre salle de cours collectifs, équipée de tapis épais, élastiques de musculation, mini-bandes, steps et petites charges pour intensifier les exercices.",
            p2: "Notre coach diplômée veille à la *qualité des placements*, ajuste l'intensité pour chacun et propose des variantes plus douces ou plus difficiles selon votre niveau.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, en Vaunage. Accessible en 15 minutes depuis Nîmes, et en moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac.",
        },
        faq: [
            { question: "Le CAF fait-il maigrir ?", reponse: "Le CAF tonifie et raffermit, mais ne brûle pas autant de calories qu'un cours cardio pur (RPM, Zumba). Pour une perte de poids efficace, combiner CAF + cardio + une alimentation équilibrée." },
            { question: "À quelle fréquence pratiquer ?", reponse: "2 à 3 séances par semaine constituent un rythme idéal. Les muscles ont besoin de 48h pour récupérer entre deux séances de renforcement intensif." },
            { question: "Risque-t-on de prendre du volume ?", reponse: "Non, le CAF se pratique en endurance musculaire (séries longues, charges légères). L'effet est tonifiant, pas hypertrophiant. Pour prendre du volume, il faudrait de la musculation lourde." },
            { question: "Faut-il avoir un bon niveau au départ ?", reponse: "Non, le cours est adapté à tous les niveaux. La coach propose des variantes plus faciles pour les débutants et plus exigeantes pour les confirmés. Chacun avance à son rythme." },
            { question: "Quel équipement prévoir ?", reponse: "Tenue souple, baskets de salle, serviette, bouteille d'eau. Le tapis, les élastiques et accessoires sont fournis par la salle." },
        ],
        seo: {
            titre: "Cours CAF (Cuisses Abdos Fessiers) à Saint Dionisy (Nîmes) | HALL B",
            description:
                "Cours collectif CAF près de Nîmes : Cuisses, Abdos, Fessiers. Renforcement ciblé du bas du corps, 45 minutes intenses chez HALL B Saint Dionisy.",
        },
        schemaExercice: {
            nom: "Cours CAF — Cuisses Abdos Fessiers",
            description: "Cours collectif de renforcement musculaire ciblé du bas du corps. 45 minutes d'exercices intenses pour cuisses, abdos et fessiers.",
            typeExercice: "Strength training",
        },
    },
    {
        titre: "Step",
        slug: "step",
        image: "salle_coursco",
        ordre: 9,
        carte: {
            resume: "Cours chorégraphié sur step. Travail cardio et coordination en groupe.",
            icone: "Activity",
            intensite: "Élevée",
            duree: "45 min",
        },
        eyebrow: "Cours collectif",
        h1Top: "Cours de Step",
        h1Bottom: "à Saint Dionisy",
        heroLead:
            "Cardio chorégraphié sur step (marche surélevée). Brûle-graisses, coordination et ambiance musicale — jusqu'à **500 kcal en 45 min**.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "500 kcal", label: "Brûlées en moyenne" },
            { value: "Coordination", label: "Effet cerveau" },
            { value: "Tous niveaux", label: "Hauteur du step ajustable" },
        ],
        quoi: {
            titre: "Le Step, c'est quoi ?",
            p1: "Inventé dans les années 1980, le **Step** consiste à enchaîner des chorégraphies sur une marche surélevée (le step), au rythme d'une musique entraînante. Mouvements de montée-descente, sauts, déplacements latéraux, chorégraphies de plus en plus complexes.",
            p2: "C'est l'un des cours les plus efficaces pour brûler des calories tout en *développant la coordination*. Le cerveau travaille autant que les jambes pour mémoriser les chorégraphies. Effet anti-âge cognitif documenté.",
        },
        benefices: {
            titre: "6 raisons de faire du Step",
            liste: [
                { icone: "Flame", titre: "Brûle-graisses", texte: "Jusqu'à 500 kcal en 45 min, avec un effet 'afterburn' qui prolonge la combustion." },
                { icone: "Heart", titre: "Cardio renforcé", texte: "Endurance et capacités cardio-vasculaires en nette progression dès 4 semaines." },
                { icone: "Brain", titre: "Coordination & mémoire", texte: "Mémoriser les chorégraphies stimule les fonctions cognitives — vrai entraînement cérébral." },
                { icone: "Activity", titre: "Cuisses et fessiers", texte: "Les montées-descentes ciblent quadriceps, ischios et fessiers en profondeur." },
                { icone: "Music", titre: "Rythmé par la musique", texte: "Une chorégraphie = une chanson. Vous ne voyez pas le temps passer." },
                { icone: "Users", titre: "Effet de groupe", texte: "Apprendre les chorégraphies ensemble crée une vraie dynamique collective." },
            ],
        },
        deroulement: [
            { titre: "Échauffement", texte: "Mouvements simples sur place pour activer le corps (5 min)." },
            { titre: "Apprentissage des pas", texte: "La coach décompose les pas de base — basic step, V-step, knee-up..." },
            { titre: "Construction de la chorégraphie", texte: "Assemblage progressif des pas en chorégraphies de 32 temps." },
            { titre: "Intensification", texte: "Chorégraphies enchaînées, ajout de bras, de sauts, de variantes plus rapides." },
            { titre: "Retour au calme", texte: "Marche sur step ralentie, étirements et relâchement musculaire." },
        ],
        publicCible: {
            intro: "Le Step convient à **toute personne qui aime bouger en musique**. Particulièrement adapté si vous souhaitez :",
            points: [
                "brûler des calories dans un cadre fun,",
                "améliorer votre coordination et votre agilité,",
                "tonifier le bas du corps tout en faisant du cardio,",
                "développer votre mémoire motrice,",
                "rejoindre un cours convivial avec des chorégraphies progressives.",
            ],
        },
        equipement: {
            titre: "Une salle équipée et un step réglable",
            p1: "Le Step se pratique dans notre salle de cours collectifs, équipée de steps professionnels *à hauteur ajustable* (1, 2 ou 3 niveaux) pour adapter l'intensité à votre condition physique.",
            p2: "Système sonore professionnel, miroirs grand format pour vérifier les placements, plancher amorti pour protéger les articulations. Notre coach décompose toujours les chorégraphies pour que les débutants puissent suivre.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, en Vaunage. Accessible en 15 minutes depuis Nîmes, et en moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac.",
        },
        faq: [
            { question: "Le Step est-il difficile à apprendre ?", reponse: "Au début, oui — la coordination demande un peu de pratique. Mais la coach décompose toujours les chorégraphies. Au bout de 3 ou 4 séances, les pas de base sont acquis." },
            { question: "Combien de calories brûle-t-on ?", reponse: "Entre 400 et 500 kcal pour une séance de 45 minutes. C'est l'un des cours les plus efficaces côté combustion calorique, à égalité avec le RPM et la Zumba." },
            { question: "Le Step abîme-t-il les genoux ?", reponse: "Non, à condition de respecter la technique : pied à plat sur le step, genou aligné. La coach corrige les placements en permanence. Personnes avec pathologie articulaire : consultez votre médecin avant." },
            { question: "Faut-il déjà savoir danser ?", reponse: "Aucun pré-requis. Le Step est différent de la danse : les pas sont codifiés et progressifs. Si vous savez compter jusqu'à 8, vous savez faire du Step." },
            { question: "Quel équipement prévoir ?", reponse: "Tenue de sport, baskets avec bon amorti (running ou cross-training), serviette et eau. Le step est fourni par la salle." },
        ],
        seo: {
            titre: "Cours de Step à Saint Dionisy (Nîmes, Gard) | HALL B",
            description:
                "Cours collectif de Step près de Nîmes chez HALL B. Cardio chorégraphié sur step, jusqu'à 500 kcal en 45 min. Coordination et endurance.",
        },
        schemaExercice: {
            nom: "Cours de Step",
            description: "Cours collectif de cardio chorégraphié sur step (marche surélevée). Travail de coordination, d'endurance et brûle-graisses.",
            typeExercice: "Aerobic step",
        },
    },
    {
        titre: "Zumba",
        slug: "zumba",
        image: "salle_danse",
        ordre: 10,
        carte: {
            resume: "Danse fitness aux rythmes latins. Cardio intense déguisé en fête.",
            icone: "Music",
            intensite: "Élevée",
            duree: "45 min",
        },
        eyebrow: "Cours collectif",
        h1Top: "Cours de Zumba",
        h1Bottom: "à Saint Dionisy",
        heroLead:
            "Le sport qui ressemble à une fête. Salsa, reggaeton, merengue — jusqu'à **500 kcal brûlées** en 45 minutes, sans avoir l'impression de s'entraîner.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "500 kcal", label: "Brûlées en moyenne" },
            { value: "Tous niveaux", label: "Aucun pré-requis" },
            { value: "0 routine", label: "Chaque cours est différent" },
        ],
        quoi: {
            titre: "La Zumba, c'est quoi ?",
            p1: "Inventée à la fin des années 1990 par le chorégraphe colombien Beto Pérez, la Zumba est devenue en 20 ans le plus grand programme de **danse fitness** au monde. Le concept est simple : enchaîner des chorégraphies courtes sur des musiques latines (salsa, reggaeton, cumbia, merengue, samba) en mode fête.",
            p2: "Pas besoin de savoir danser : les pas sont *simples et répétitifs*, et chacun les adapte à son niveau. L'objectif n'est pas la perfection technique mais le plaisir et l'intensité. Cardio déguisé en sortie dansante.",
        },
        benefices: {
            titre: "6 raisons d'adorer la Zumba",
            liste: [
                { icone: "Flame", titre: "Brûle-graisses", texte: "Jusqu'à 500 kcal en 45 minutes — l'un des cardios les plus efficaces." },
                { icone: "Music", titre: "Le temps passe vite", texte: "Vous sortez du cours surpris d'avoir transpiré autant. La musique fait tout." },
                { icone: "Heart", titre: "Cardio renforcé", texte: "Endurance et capacités cardio-vasculaires progressent dès les premières semaines." },
                { icone: "Users", titre: "Ambiance festive", texte: "Le plus convivial des cours collectifs. Souvent suivi d'un café entre adhérents." },
                { icone: "Smile", titre: "Anti-stress", texte: "La danse libère endorphines et dopamine. Effet immédiat sur le moral." },
                { icone: "Globe", titre: "Coordination", texte: "Vous apprenez à enchaîner des mouvements complexes — utile dans toute pratique sportive." },
            ],
        },
        deroulement: [
            { titre: "Échauffement dansé", texte: "Premières chorégraphies lentes pour activer le corps en douceur." },
            { titre: "Chorégraphies cardio", texte: "Le cœur du cours — salsa, reggaeton, merengue, à haute intensité." },
            { titre: "Plateaux toniques", texte: "Mouvements ciblés cuisses-fessiers entre deux chorégraphies cardio." },
            { titre: "Retour au calme", texte: "Chorégraphies plus douces et étirements rythmés sur des musiques lentes." },
        ],
        publicCible: {
            intro: "La Zumba est **l'un des cours les plus inclusifs** : aucun niveau de danse requis. Particulièrement adapté si vous souhaitez :",
            points: [
                "perdre du poids sans courir sur un tapis,",
                "retrouver le plaisir du sport après une période d'arrêt,",
                "évacuer le stress de la semaine,",
                "rejoindre un groupe convivial,",
                "améliorer votre coordination et votre cardio en même temps.",
            ],
        },
        equipement: {
            titre: "Une salle conçue pour danser",
            p1: "Nous accueillons les cours de Zumba dans notre salle de danse équipée de miroirs grand format, plancher technique *conçu pour absorber les impacts*, et système son professionnel pour vibrer au rythme de la musique.",
            p2: "Notre coach Zumba est certifiée ZIN (Zumba Instructor Network) — gage de qualité chorégraphique et de respect du concept original.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, à 15 minutes de Nîmes. Accessible en moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac. Un des rares vrais cours de Zumba dans le bassin nîmois.",
        },
        faq: [
            { question: "Je ne sais pas danser, c'est grave ?", reponse: "Pas du tout. La Zumba est conçue pour les non-danseurs. Les pas sont simples, répétitifs, et personne ne juge. Après 2 ou 3 cours, vous connaîtrez les chorégraphies par cœur." },
            { question: "Combien de calories brûle-t-on ?", reponse: "Entre 300 et 500 kcal par séance, selon votre intensité et votre poids. C'est l'équivalent d'une heure de course modérée — en beaucoup plus fun." },
            { question: "Quel équipement faut-il ?", reponse: "Une tenue confortable et des baskets de salle (semelle souple pour pivoter sans bloquer le genou). Une bouteille d'eau et une serviette — ça transpire." },
            { question: "C'est ouvert aux hommes ?", reponse: "Évidemment. La Zumba est mixte. Les hommes représentent une part croissante des pratiquants. Aucune raison de s'en priver." },
            { question: "Y a-t-il des cours pour seniors ?", reponse: "La Zumba classique reste accessible. Pour les seniors recherchant un format plus doux, la Zumba Gold peut être proposée selon les périodes — consultez le planning." },
        ],
        seo: {
            titre: "Cours de Zumba à Saint Dionisy (Nîmes, Gard) | HALL B",
            description:
                "Cours de Zumba près de Nîmes chez HALL B. Danse fitness aux rythmes latins, jusqu'à 500 kcal en 45 min. Ambiance festive, tous niveaux bienvenus.",
        },
        schemaExercice: {
            nom: "Cours de Zumba",
            description: "Cours collectif de danse fitness aux rythmes latins. Mélange de cardio, danse et chorégraphies sur 45 minutes.",
            typeExercice: "Dance fitness",
        },
    },
    {
        titre: "Yoga",
        slug: "yoga",
        image: "salle_danse",
        ordre: 11,
        carte: {
            resume: "Postures, respiration et relaxation. Souplesse, gainage et sérénité.",
            icone: "Heart",
            intensite: "Modérée",
            duree: "45 min",
        },
        eyebrow: "Cours collectif",
        h1Top: "Cours de Yoga",
        h1Bottom: "à Saint Dionisy",
        heroLead:
            "Postures, respiration et relaxation en **45 minutes**. Gagnez en souplesse, gainage et sérénité dans une salle dédiée chez HALL B, à 15 minutes de Nîmes.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "Souplesse +", label: "Dès 4 semaines" },
            { value: "Anti-stress", label: "Effet immédiat" },
            { value: "Tous niveaux", label: "Aucun pré-requis" },
        ],
        quoi: {
            titre: "Le Yoga, c'est quoi ?",
            p1: "Le **yoga** est une pratique qui relie le corps et l'esprit à travers des postures (asanas), un travail de respiration (pranayama) et un temps de relaxation. Chez HALL B, on en propose une version *accessible et bienveillante*, sans dogme.",
            p2: "Au programme : enchaînements fluides, postures d'équilibre et de gainage, étirements profonds et respiration consciente. Le tout se termine par une relaxation guidée qui apaise le système nerveux et améliore la récupération.",
        },
        benefices: {
            titre: "6 raisons d'essayer le Yoga",
            liste: [
                { icone: "Wind", titre: "Souplesse", texte: "Des étirements progressifs qui améliorent durablement la mobilité." },
                { icone: "Heart", titre: "Anti-stress", texte: "La respiration et la relaxation finale font redescendre la pression immédiatement." },
                { icone: "Sparkles", titre: "Gainage profond", texte: "Les postures sollicitent en douceur la sangle abdominale et les muscles posturaux." },
                { icone: "Activity", titre: "Équilibre", texte: "Les postures sur appui renforcent les muscles stabilisateurs et la proprioception." },
                { icone: "Brain", titre: "Concentration", texte: "Vous apprenez à vous recentrer, à respirer et à relâcher les tensions." },
                { icone: "Smile", titre: "Meilleur sommeil", texte: "Un système nerveux apaisé favorise un sommeil plus profond et réparateur." },
            ],
        },
        deroulement: [
            { titre: "Centrage & respiration", texte: "Quelques minutes assis pour se reconnecter au souffle et au moment présent." },
            { titre: "Échauffement doux", texte: "Mobilisations articulaires et premiers enchaînements pour réveiller le corps." },
            { titre: "Salutations & postures debout", texte: "Enchaînements dynamiques, postures d'équilibre et de renforcement (guerrier, arbre, chaise)." },
            { titre: "Postures au sol", texte: "Étirements profonds, ouverture des hanches, travail du dos et du gainage." },
            { titre: "Relaxation finale", texte: "Posture du repos et relaxation guidée — quelques minutes de relâchement total." },
        ],
        publicCible: {
            intro: "Le yoga est idéal pour tous, et particulièrement adapté si vous souhaitez :",
            points: [
                "évacuer le stress et apaiser le mental,",
                "gagner en souplesse et en mobilité articulaire,",
                "soulager les tensions du dos et de la nuque,",
                "compléter une pratique intense par de la récupération active,",
                "améliorer votre sommeil, votre respiration et votre concentration.",
            ],
        },
        equipement: {
            titre: "Une ambiance pensée pour la détente",
            p1: "Le yoga se pratique dans une salle dédiée, dans une ambiance *calme et tamisée*. Tapis épais, blocs, sangles et coussins sont à votre disposition.",
            p2: "Notre professeur guide chaque posture, propose des *variantes et des ajustements individuels*, et ne met aucune pression de performance. Vous avancez à votre rythme, séance après séance.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, en Vaunage. Accessible en 15 minutes depuis Nîmes, et en moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac.",
        },
        faq: [
            { question: "Faut-il être souple pour commencer le yoga ?", reponse: "Non, c'est justement en pratiquant qu'on gagne en souplesse. Chaque posture est adaptable avec des supports (blocs, sangles) et progresse à votre rythme. Le yoga s'adresse vraiment à tous, y compris aux grands débutants." },
            { question: "Le yoga muscle-t-il vraiment ?", reponse: "Oui, en profondeur. Les postures de gainage et d'équilibre (planche, guerrier, chaise) renforcent les abdominaux, les jambes et le dos. C'est un renforcement doux mais réel, sans impact ni charge." },
            { question: "Quel type de yoga propose HALL B ?", reponse: "Un yoga accessible mêlant postures (hatha / vinyasa doux), travail de la respiration et relaxation finale. L'objectif : souplesse, gainage, calme et meilleure récupération — sans dimension spirituelle imposée." },
            { question: "À quelle fréquence pratiquer ?", reponse: "1 à 2 séances par semaine suffisent pour ressentir les bénéfices : souplesse, calme, meilleur sommeil. Excellent en complément d'une pratique plus intense (musculation, RPM, cardio)." },
        ],
        seo: {
            titre: "Cours de Yoga à Saint Dionisy (Nîmes, Gard) | HALL B",
            description:
                "Cours de Yoga près de Nîmes chez HALL B : postures, respiration, souplesse et relaxation en 45 min. Tous niveaux, à 15 min de Nîmes à Saint Dionisy.",
        },
        schemaExercice: {
            nom: "Cours de Yoga",
            description: "Cours collectif de yoga : postures (asanas), respiration (pranayama), souplesse et relaxation. 45 minutes.",
            typeExercice: "Yoga",
        },
    },
    {
        titre: "Aquagym",
        slug: "aquagym",
        image: "piscine",
        ordre: 13,
        carte: {
            resume: "Gym tonique en bassin chauffé. Mouvements rythmés, sans impact pour les articulations.",
            icone: "Waves",
            intensite: "Modérée",
            duree: "45 min",
            themeBleu: true,
        },
        eyebrow: "Bassin intérieur chauffé",
        h1Top: "Cours d'aquagym",
        h1Bottom: "à Saint Dionisy",
        heroLead:
            "Renforcement, cardio et bien-être en **bassin intérieur chauffé**. Le sport sans impact pour les articulations, idéal pour tous — du débutant au senior.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "400 kcal", label: "Brûlées en moyenne" },
            { value: "0 impact", label: "Articulations protégées" },
            { value: "Tous niveaux", label: "Aucune nage requise" },
        ],
        quoi: {
            titre: "L'aquagym, c'est quoi ?",
            p1: "L'**aquagym** est une activité physique pratiquée en milieu aquatique, dans la zone du bassin où l'on a pied. La *résistance naturelle de l'eau* remplace les charges : chaque mouvement devient un travail musculaire complet.",
            p2: "L'eau supporte 90% du poids du corps : aucune pression sur les articulations, les tendons ou la colonne vertébrale. C'est l'une des seules activités qui combine **cardio, renforcement musculaire et bien-être** sans aucun risque de traumatisme.",
        },
        benefices: {
            titre: "6 raisons d'essayer l'aquagym",
            liste: [
                { icone: "Heart", titre: "Articulations protégées", texte: "Aucun impact. Idéal en cas d'arthrose, mal de dos, surpoids ou pour les seniors." },
                { icone: "Flame", titre: "Brûle-graisses efficace", texte: "La résistance de l'eau fait travailler tous les muscles. 400-500 kcal par séance." },
                { icone: "Activity", titre: "Renforcement musculaire", texte: "Bras, jambes, fessiers, sangle abdominale — travail complet du corps." },
                { icone: "Wind", titre: "Effet drainant", texte: "L'eau exerce un massage naturel qui améliore la circulation et lutte contre la rétention." },
                { icone: "Sparkles", titre: "Effet bien-être", texte: "Sortir d'une séance dans l'eau chaude apaise corps et esprit. Anti-stress immédiat." },
                { icone: "Users", titre: "Convivialité", texte: "Cours en groupe, ambiance bienveillante. Le rendez-vous social de la semaine." },
            ],
        },
        deroulement: [
            { titre: "Échauffement dans l'eau", texte: "Mouvements doux pour préparer le corps à l'effort et s'adapter à la température." },
            { titre: "Travail cardio", texte: "Marche aquatique, running, déplacements latéraux — pour activer le système cardio-vasculaire." },
            { titre: "Renforcement bras et épaules", texte: "Avec frites ou haltères aquatiques, travail des bras, épaules et dos." },
            { titre: "Renforcement jambes et fessiers", texte: "Mouvements de cuisses, fessiers, mollets, en utilisant la résistance de l'eau." },
            { titre: "Gainage et abdos", texte: "Exercices ciblés sur la sangle abdominale et le plancher pelvien." },
            { titre: "Étirements & relaxation", texte: "Retour au calme dans l'eau, étirements et relâchement musculaire." },
        ],
        publicCible: {
            intro: "L'aquagym est **l'une des activités les plus accessibles**. Particulièrement adaptée si vous :",
            points: [
                "souffrez d'arthrose, de douleurs articulaires ou de mal de dos,",
                "êtes en surpoids et cherchez une activité sans impact,",
                "êtes senior et voulez rester en forme en douceur,",
                "êtes enceinte et cherchez une activité physique adaptée,",
                "voulez vous remettre au sport progressivement,",
                "cherchez un complément doux à une activité plus intense.",
            ],
        },
        equipement: {
            titre: "Un bassin intérieur chauffé",
            p1: "Notre bassin intérieur est *chauffé en permanence* à une température confortable. La luminosité naturelle traverse les baies vitrées et crée une ambiance apaisante, idéale pour la pratique sportive comme pour le bien-être.",
            p2: "**Frites, haltères aquatiques, ceintures flottantes** et autres accessoires sont fournis par la salle. Notre coach aquagym diplômée adapte les exercices à votre niveau et veille à la sécurité de chacun.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, en Vaunage. 15 minutes depuis Nîmes, et moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac. L'un des rares bassins privés du bassin nîmois proposant de l'aquagym régulière.",
        },
        faq: [
            { question: "Faut-il savoir nager pour faire de l'aquagym ?", reponse: "Non. Les cours se déroulent dans la zone du bassin où l'on a pied. Aucune compétence en natation n'est requise pour participer." },
            { question: "L'aquagym fait-elle maigrir ?", reponse: "Oui, l'aquagym brûle 400 à 500 kcal par séance grâce à la résistance de l'eau. Combinée à une alimentation équilibrée, elle participe efficacement à une perte de poids progressive." },
            { question: "L'aquagym est-elle adaptée aux seniors ?", reponse: "Particulièrement, oui. L'absence d'impact protège les articulations. C'est l'une des activités les plus recommandées pour rester en forme après 60 ans, ou en cas d'arthrose, de problème de dos ou de surpoids." },
            { question: "Le bassin est-il chauffé ?", reponse: "Oui, notre bassin intérieur est chauffé en permanence à une température confortable, idéale pour la pratique sportive sans frissons." },
            { question: "Quel équipement prévoir ?", reponse: "Maillot de bain, bonnet de bain (obligatoire), serviette et tongs. Les frites, haltères aquatiques et autres accessoires sont fournis par la salle." },
            { question: "Y a-t-il des cours pour femmes enceintes ?", reponse: "Oui, des créneaux peuvent être adaptés. L'aquagym prénatale est particulièrement recommandée par les sage-femmes. Informez la coach avant le cours." },
        ],
        seo: {
            titre: "Cours d'aquagym à Saint Dionisy (Nîmes, Gard) | HALL B",
            description:
                "Cours d'aquagym en bassin intérieur chauffé près de Nîmes. Renforcement, cardio et bien-être sans impact pour les articulations. Tous niveaux.",
        },
        schemaExercice: {
            nom: "Cours d'aquagym",
            description: "Cours collectif d'aquagym en bassin intérieur chauffé. Renforcement musculaire, cardio et bien-être sans impact articulaire.",
            typeExercice: "Aquatic exercise",
        },
    },
    {
        titre: "Aquabike",
        slug: "aquabike",
        image: "piscine",
        ordre: 14,
        carte: {
            resume: "Vélo immergé : cardio intense, jambes galbées et effet anti-cellulite, sans impact.",
            icone: "Bike",
            intensite: "Élevée",
            duree: "45 min",
            themeBleu: true,
        },
        eyebrow: "Bassin chauffé",
        h1Top: "Cours d'Aquabike",
        h1Bottom: "à Saint Dionisy",
        heroLead:
            "Le vélo dans l'eau : **cardio intense** et jambes galbées, sans impact pour les articulations. 45 minutes en bassin chauffé chez HALL B, à 15 minutes de Nîmes.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "~500 kcal", label: "Brûlées en moyenne" },
            { value: "Sans impact", label: "Articulations préservées" },
            { value: "Tous niveaux", label: "Aucun pré-requis" },
        ],
        quoi: {
            titre: "L'aquabike, c'est quoi ?",
            p1: "L'**aquabike** est un cours de **vélo immergé** : on pédale sur un vélo installé au fond d'un bassin chauffé, l'eau arrivant à la taille. La *résistance de l'eau* remplace les côtes et rend chaque coup de pédale plus efficace.",
            p2: "Le coach rythme la séance : pédalage souple, sprints, montées, travail debout sur les pédales. Le tout **sans aucun choc** pour les genoux et le dos, avec en prime l'effet drainant et massant de l'eau sur les jambes.",
        },
        benefices: {
            titre: "6 raisons d'essayer l'aquabike",
            liste: [
                { icone: "Bike", titre: "Jambes galbées", texte: "Cuisses, mollets et fessiers travaillés intensément contre la résistance de l'eau." },
                { icone: "Heart", titre: "Cardio efficace", texte: "Le souffle et l'endurance progressent vite, sans s'essouffler comme à sec." },
                { icone: "Sparkles", titre: "Anti-cellulite", texte: "Le massage continu de l'eau stimule la circulation et lisse l'aspect de la peau." },
                { icone: "Heart", titre: "Sans impact", texte: "Zéro choc pour les genoux, les hanches et le dos : idéal en reprise ou après blessure." },
                { icone: "Flame", titre: "Brûle-graisses", texte: "La dépense calorique est élevée et se poursuit après la séance." },
                { icone: "Wind", titre: "Jambes légères", texte: "Effet drainant immédiat : on ressort avec les jambes plus légères." },
            ],
        },
        deroulement: [
            { titre: "Installation & échauffement", texte: "Réglage du vélo et pédalage souple pour s'adapter à la résistance de l'eau." },
            { titre: "Montée en intensité", texte: "Augmentation progressive du rythme et de la résistance." },
            { titre: "Sprints & intervalles", texte: "Alternance d'efforts intenses et de récupérations pour booster le cardio." },
            { titre: "Travail ciblé", texte: "Pédalage debout et mouvements pour intensifier le travail des jambes et des fessiers." },
            { titre: "Retour au calme", texte: "Pédalage léger et étirements dans l'eau pour bien récupérer." },
        ],
        publicCible: {
            intro: "L'aquabike est **accessible à tous**, et particulièrement recommandé si vous souhaitez :",
            points: [
                "affiner et galber les jambes et les fessiers,",
                "lutter contre la cellulite et les jambes lourdes,",
                "faire du cardio sans agresser les articulations,",
                "reprendre le sport après une blessure ou une grossesse,",
                "perdre du poids dans une ambiance fun et rafraîchissante.",
            ],
        },
        equipement: {
            titre: "Des vélos dans un bassin chauffé",
            p1: "L'aquabike se pratique dans notre **bassin intérieur chauffé**, baigné de lumière naturelle. Les vélos immergés sont réglés à votre taille par le coach.",
            p2: "Notre coach aquatique diplômé *adapte l'intensité à chacun* et veille à la sécurité de tous. On a toujours pied et on ne nage jamais : aucune appréhension à avoir.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, en Vaunage. Accessible en 15 minutes depuis Nîmes, et en moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac.",
        },
        faq: [
            { question: "Faut-il savoir nager pour l'aquabike ?", reponse: "Non. Le vélo est posé au fond du bassin, là où vous avez pied, et vous restez assis dessus. On ne nage jamais : aucune crainte à avoir, même si vous n'êtes pas à l'aise dans l'eau." },
            { question: "L'aquabike fait-il maigrir et agit-il sur la cellulite ?", reponse: "Oui, c'est l'un des cours d'aqua les plus efficaces : la résistance de l'eau augmente la dépense calorique et le massage permanent de l'eau sur les jambes est réputé pour stimuler la circulation et atténuer l'aspect de la cellulite." },
            { question: "Quelle différence avec l'aquagym ?", reponse: "L'aquagym est une gym tonique avec des mouvements variés debout dans l'eau. L'aquabike est centré sur le pédalage assis : plus de cardio et un travail ciblé des jambes et des fessiers." },
            { question: "Quel équipement prévoir ?", reponse: "Un maillot de bain, une serviette et une bouteille d'eau. Selon le règlement du bassin, un bonnet peut être demandé. Les vélos sont fournis et réglés à votre taille." },
        ],
        seo: {
            titre: "Cours d'Aquabike à Saint Dionisy (Nîmes, Gard) | HALL B",
            description:
                "Cours d'aquabike près de Nîmes chez HALL B : vélo immergé en bassin chauffé, cardio intense et jambes galbées, sans impact. Tous niveaux, à 15 min de Nîmes.",
        },
        schemaExercice: {
            nom: "Cours d'Aquabike",
            description: "Cours collectif de vélo immergé en bassin chauffé. Cardio et renforcement du bas du corps sans impact. 45 minutes.",
            typeExercice: "Aquatic fitness",
        },
    },
    {
        titre: "Aqua Power",
        slug: "aquapower",
        image: "piscine",
        ordre: 15,
        carte: {
            resume: "Renforcement aquatique tonique avec accessoires. Tout le corps, sans impact.",
            icone: "Zap",
            intensite: "Élevée",
            duree: "45 min",
            themeBleu: true,
        },
        eyebrow: "Bassin chauffé",
        h1Top: "Cours d'Aqua Power",
        h1Bottom: "à Saint Dionisy",
        heroLead:
            "L'aqua le plus tonique : **renforcement haute intensité** avec accessoires, dans l'eau et sans impact. 45 minutes en bassin chauffé chez HALL B, à 15 minutes de Nîmes.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "Tonique", label: "Intensité élevée" },
            { value: "Sans impact", label: "Articulations préservées" },
            { value: "Corps entier", label: "Renforcement complet" },
        ],
        quoi: {
            titre: "L'aqua power, c'est quoi ?",
            p1: "L'**aqua power** est la version **intensive** des cours d'aqua. On enchaîne des mouvements de *renforcement musculaire* dans l'eau, en s'appuyant sur la résistance naturelle de l'eau et sur des accessoires (haltères en mousse, frites, plaques).",
            p2: "Plus rythmé et plus musculaire que l'aquagym, ce cours sollicite **tout le corps** — bras, épaules, jambes, fessiers et sangle abdominale — pour tonifier en profondeur, le tout *sans aucun choc* pour les articulations.",
        },
        benefices: {
            titre: "6 raisons d'essayer l'aqua power",
            liste: [
                { icone: "Dumbbell", titre: "Renforcement complet", texte: "Haut et bas du corps sollicités contre la résistance de l'eau et des accessoires." },
                { icone: "Flame", titre: "Brûle-graisses", texte: "Le rythme soutenu et l'eau font grimper la dépense calorique." },
                { icone: "Sparkles", titre: "Tonification", texte: "Un travail musculaire qui raffermit la silhouette sans prise de volume." },
                { icone: "Heart", titre: "Sans impact", texte: "L'eau porte le corps : aucun choc pour le dos, les genoux et les hanches." },
                { icone: "Activity", titre: "Cardio en bonus", texte: "L'intensité sollicite aussi le système cardio-vasculaire." },
                { icone: "Users", titre: "Effet de groupe", texte: "L'énergie collective et la musique vous poussent à donner le meilleur." },
            ],
        },
        deroulement: [
            { titre: "Échauffement dans l'eau", texte: "Adaptation à la résistance et mobilisation articulaire en douceur." },
            { titre: "Renforcement haut du corps", texte: "Bras, épaules et dos avec haltères mousse et plaques." },
            { titre: "Renforcement bas du corps", texte: "Jambes et fessiers : squats, fentes et sauts amortis par l'eau." },
            { titre: "Gainage & abdos", texte: "Travail de la sangle abdominale avec frites et déséquilibres contrôlés." },
            { titre: "Étirements & relâchement", texte: "Retour au calme et étirements dans l'eau pour bien récupérer." },
        ],
        publicCible: {
            intro: "L'aqua power s'adresse à **tous ceux qui veulent se tonifier dans l'eau**. Particulièrement adapté si vous souhaitez :",
            points: [
                "renforcer et raffermir tout le corps sans matériel à sec,",
                "brûler des calories avec un cours tonique mais sans impact,",
                "compléter le cardio (aquabike) par du renforcement,",
                "retrouver une activité intense après une blessure,",
                "varier des cours d'aqua plus doux comme l'aquagym.",
            ],
        },
        equipement: {
            titre: "Accessoires et bassin chauffé",
            p1: "L'aqua power se pratique dans notre **bassin intérieur chauffé**, avec haltères en mousse, frites, plaques et gants aquatiques pour intensifier chaque mouvement.",
            p2: "Notre coach aquatique diplômé *ajuste l'intensité à chacun* et veille à la bonne exécution. On a toujours pied et on ne nage jamais : l'intensité vient de l'eau, pas de la profondeur.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, en Vaunage. Accessible en 15 minutes depuis Nîmes, et en moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac.",
        },
        faq: [
            { question: "L'aqua power est-il trop intense pour un débutant ?", reponse: "Non, car l'intensité vient surtout de la vitesse d'exécution : chacun va à son rythme. Le coach propose des variantes plus douces. C'est plus tonique que l'aquagym, mais toujours sans choc grâce à l'eau." },
            { question: "Faut-il savoir nager ?", reponse: "Non, les exercices se font là où vous avez pied. On ne nage jamais : on enchaîne des mouvements de renforcement avec la résistance de l'eau et des accessoires." },
            { question: "Quelle différence avec l'aquagym ?", reponse: "L'aquagym est une gym tonique en douceur. L'aqua power est sa version plus intense et plus musculaire : on utilise davantage d'accessoires (haltères mousse, frites) et un rythme plus soutenu pour renforcer en profondeur." },
            { question: "Quel équipement prévoir ?", reponse: "Un maillot de bain, une serviette et une bouteille d'eau. Selon le règlement, un bonnet peut être demandé. Tous les accessoires aquatiques sont fournis par la salle." },
        ],
        seo: {
            titre: "Cours d'Aqua Power à Saint Dionisy (Nîmes, Gard) | HALL B",
            description:
                "Cours d'Aqua Power près de Nîmes chez HALL B : renforcement tonique haute intensité en bassin chauffé, avec accessoires, sans impact. Tous niveaux, à 15 min de Nîmes.",
        },
        schemaExercice: {
            nom: "Cours d'Aqua Power",
            description: "Cours collectif aquatique haute intensité avec accessoires de résistance. Renforcement musculaire complet sans impact. 45 minutes.",
            typeExercice: "Aquatic fitness",
        },
    },
    {
        titre: "Aqua Mix",
        slug: "aquamix",
        image: "piscine",
        ordre: 16,
        carte: {
            resume: "La séance complète : gym, vélo et renforcement aquatiques réunis. Variée et sans impact.",
            icone: "Sparkles",
            intensite: "Modérée",
            duree: "45 min",
            themeBleu: true,
        },
        eyebrow: "Bassin chauffé",
        h1Top: "Cours d'Aqua Mix",
        h1Bottom: "à Saint Dionisy",
        heroLead:
            "La séance complète : **gym, vélo et renforcement aquatiques** réunis dans 45 minutes variées, sans impact. En bassin chauffé chez HALL B, à 15 minutes de Nîmes.",
        stats: [
            { value: "45 min", label: "Durée d'une séance" },
            { value: "3-en-1", label: "Gym, vélo, renfo" },
            { value: "Sans impact", label: "Articulations préservées" },
            { value: "Tous niveaux", label: "Aucun pré-requis" },
        ],
        quoi: {
            titre: "L'aqua mix, c'est quoi ?",
            p1: "L'**aqua mix** est la séance **la plus complète** des cours d'aqua : elle combine dans un même cours *plusieurs disciplines aquatiques* — gym tonique, vélo immergé et renforcement avec accessoires.",
            p2: "On enchaîne les ateliers : un bloc **aquagym**, un bloc **aquabike**, un bloc renforcement façon **aqua power**. Résultat : une séance *variée et complète* qui travaille le cardio, les jambes et tout le corps, sans jamais s'ennuyer.",
        },
        benefices: {
            titre: "6 raisons d'essayer l'aqua mix",
            liste: [
                { icone: "Sparkles", titre: "Le plus complet", texte: "Cardio, renforcement et tonification réunis dans une seule séance." },
                { icone: "Activity", titre: "Jamais monotone", texte: "On change d'atelier régulièrement : le temps passe à toute vitesse." },
                { icone: "Bike", titre: "Jambes & cardio", texte: "Le bloc aquabike galbe les jambes et fait grimper le souffle." },
                { icone: "Dumbbell", titre: "Renforcement", texte: "Le bloc aqua power tonifie le haut et le bas du corps avec accessoires." },
                { icone: "Heart", titre: "Sans impact", texte: "L'eau porte le corps : zéro choc pour les articulations." },
                { icone: "Flame", titre: "Brûle-graisses", texte: "L'enchaînement des ateliers maintient une dépense calorique élevée." },
            ],
        },
        deroulement: [
            { titre: "Échauffement", texte: "Mise à l'eau et adaptation à la résistance en douceur." },
            { titre: "Bloc aquagym", texte: "Mouvements rythmés debout dans l'eau pour réveiller tout le corps." },
            { titre: "Bloc aquabike", texte: "Pédalage immergé : cardio et travail des jambes." },
            { titre: "Bloc renforcement", texte: "Haltères mousse et frites pour tonifier bras, jambes et abdos." },
            { titre: "Étirements & relâchement", texte: "Retour au calme dans l'eau pour bien récupérer." },
        ],
        publicCible: {
            intro: "L'aqua mix est **idéal pour tous**, et particulièrement si vous souhaitez :",
            points: [
                "tout faire en une seule séance (cardio + renfo + tonification),",
                "varier les plaisirs et ne jamais vous ennuyer,",
                "découvrir l'ensemble des cours d'aqua,",
                "travailler tout le corps sans agresser les articulations,",
                "reprendre une activité complète en douceur.",
            ],
        },
        equipement: {
            titre: "Un bassin chauffé tout équipé",
            p1: "L'aqua mix profite de notre **bassin intérieur chauffé** et de tout l'équipement aquatique : vélos, haltères en mousse, frites et plaques.",
            p2: "Notre coach aquatique diplômé *compose la séance et adapte l'intensité* à chacun. On a toujours pied et on ne nage jamais : c'est l'option idéale pour goûter à tout.",
        },
        zone: {
            texte: "HALL B est situé à Saint Dionisy, en Vaunage. Accessible en 15 minutes depuis Nîmes, et en moins de 20 minutes depuis Calvisson, Sommières, Quissac, Vergèze et Caveirac.",
        },
        faq: [
            { question: "Qu'est-ce qui est mélangé dans l'aqua mix ?", reponse: "L'aqua mix combine dans une même séance plusieurs disciplines aquatiques : gym tonique (aquagym), vélo immergé (aquabike) et renforcement avec accessoires (aqua power). On change d'atelier régulièrement pour ne jamais s'ennuyer." },
            { question: "Faut-il savoir nager ?", reponse: "Non, tous les ateliers se déroulent là où vous avez pied. On ne nage jamais : c'est l'option idéale pour découvrir l'ensemble des cours d'aqua en une seule séance." },
            { question: "C'est pour qui ?", reponse: "Pour tout le monde, et surtout pour ceux qui aiment varier. Cardio, renforcement et tonification sont réunis, sans impact pour les articulations. Parfait si vous hésitez entre les différents cours d'aqua." },
            { question: "Quel équipement prévoir ?", reponse: "Un maillot de bain, une serviette et une bouteille d'eau. Selon le règlement, un bonnet peut être demandé. Vélos et accessoires aquatiques sont fournis." },
        ],
        seo: {
            titre: "Cours d'Aqua Mix à Saint Dionisy (Nîmes, Gard) | HALL B",
            description:
                "Cours d'Aqua Mix près de Nîmes chez HALL B : aquagym, aquabike et renforcement réunis dans une séance variée, en bassin chauffé, sans impact. À 15 min de Nîmes.",
        },
        schemaExercice: {
            nom: "Cours d'Aqua Mix",
            description: "Cours collectif aquatique combinant aquagym, aquabike et renforcement dans une même séance. Sans impact. 45 minutes.",
            typeExercice: "Aquatic fitness",
        },
    },
    {
        titre: "Abdos Flash",
        slug: "abdos-flash",
        image: "salle_coursco",
        ordre: 8,
        pageActive: false,
        carte: {
            resume: "Format court et intensif dédié à la sangle abdominale. Idéal sur la pause déjeuner.",
            icone: "Zap",
            intensite: "Élevée",
            duree: "15 min",
        },
    },
];
