# Visite virtuelle 360°

La visite est un **dossier statique autonome** : `public/visite/`. Aucun CDN, aucun compte, aucun abonnement.
Le visualiseur (Photo Sphere Viewer 5.15.1 + three.js 0.185.1, licence MIT) est copié dans `public/visite/lib/`.
On peut copier ce dossier tel quel sur n'importe quel hébergement (NAS, OVH, GitHub Pages…), il marchera.

```
public/visite/
  index.html        visualiseur (+ mode édition avec ?edition)
  visite.json       les points de vue et les flèches entre eux
  photos/           photos 360 allégées pour le web (générées par le script)
  photos/vignettes/ miniatures de la galerie « Lieux »
  lib/              Photo Sphere Viewer + three.js (ne pas toucher)
```

La page `/visite-virtuelle` du site affiche simplement ce dossier dans une iframe.

## 1. Prise de vue avec l'Insta360 X5

- **Mode photo** HDR (ou PureShot en faible lumière), pleine résolution, retardateur 3-5 s pour sortir du champ.
- Caméra sur **perche invisible + trépied**, à **1,60 m** environ (hauteur des yeux), toujours la même hauteur.
- **Un point tous les 3 à 5 m**, et toujours un point dans chaque passage (portes, couloirs) : chaque photo doit « voir » la suivante.
- **Orientez la caméra toujours de la même façon** (par ex. bouton d'enregistrement tourné vers l'entrée de la salle).
  Ainsi, quand on passe d'un point à l'autre, on garde la même direction de regard et la transition est naturelle.
- Salle **fermée ou vide** : pas d'adhérents reconnaissables (droit à l'image). Google floute les visages, le site non.
- Lumières allumées, appareils rangés, miroirs : attention à son propre reflet.

## 2. Export

Dans Insta360 Studio : exporter chaque photo en **JPG équirectangulaire (360°)**, pleine résolution, en gardant les métadonnées.
Nommez les fichiers dans l'ordre de la visite : `01 Accueil.jpg`, `02 Plateau muscu.jpg`, `03 Salle de cours.jpg`…
**Gardez ces originaux** (c'est eux qu'on envoie à Google).

## 3. Préparer les photos pour le web

```
node scripts/visite-photos.mjs "C:\chemin\vers\les\photos exportées"
```

Le script redimensionne en 6144 × 3072 (lisible sur téléphone, ~1-2 Mo par photo), fabrique les vignettes et
ajoute chaque nouvelle photo dans `visite.json` (le numéro du nom de fichier est retiré : « 02 Plateau muscu » → « Plateau muscu »).
Relancer le script sur une photo déjà présente la remplace en gardant ses flèches.

## 4. Placer les flèches (mode édition)

1. Lancer le site en local, ouvrir `http://localhost:3000/visite/index.html?edition`.
2. Sur chaque photo : cliquer au sol dans la direction du point suivant, choisir la destination, « Ajouter ici ».
   Faire aussi le lien retour depuis l'autre photo.
3. Tourner la vue comme on veut l'accueil du visiteur → « Vue actuelle = vue de départ » sur le point de départ.
4. « 💾 Télécharger visite.json », puis remplacer `public/visite/visite.json` par le fichier téléchargé.

Champs utiles à la main dans `visite.json` : `legende` (texte affiché sous le nom), `correction` (degrés, si une photo
a été prise caméra mal orientée).

## 5. Google Maps / Street View

Deux niveaux, indépendants du site :

- **Photos 360 isolées** sur la fiche Google de la salle : depuis la fiche Google Business Profile ou l'app Google Maps
  (« Ajouter des photos »), en envoyant les JPG originaux. Gratuit, sans intermédiaire, mais pas de flèches entre photos.
- **Balade reliée (flèches, comme Street View)** : `scripts/visite-streetview.mjs` publie les photos via la
  *Street View Publish API* de Google, directement depuis votre PC avec votre compte Google, sans outil tiers.
  Il relit le même `visite.json` que le site : mêmes points, mêmes liens.

### Mise en place (une seule fois)

1. Sur <https://console.cloud.google.com> : créer un projet (ex. « HALL B visite »), puis
   *API et services → Bibliothèque* → activer **Street View Publish API** (gratuite).
2. *Écran de consentement OAuth* : type « Externe », laisser en mode **Test**, et ajouter votre adresse Gmail
   (celle qui gère la fiche Google de la salle) dans « Utilisateurs test ».
   En mode test, l'accès expire au bout de 7 jours : le script redemande simplement l'autorisation.
3. *Identifiants → Créer → ID client OAuth* → type **Application de bureau** → télécharger le JSON
   et l'enregistrer sous `.streetview/client.json` à la racine du projet (dossier ignoré par git : ne jamais le commiter).

### Réglages dans `visite.json` → bloc `streetview`

- `origine` : latitude/longitude **exactes du point de départ** (clic droit à cet endroit sur Google Maps → les coordonnées s'affichent).
- `capCamera` : dans le mode édition, sur n'importe quel point, tournez la vue vers un repère (porte, mur), mesurez sa direction
  avec la boussole du téléphone **depuis l'endroit de la photo**, tapez la valeur puis « Orientation boussole de la vue actuelle ».
  Comme la caméra a toujours été orientée pareil, une seule mesure suffit pour toutes les photos.
- `placeId` : identifiant Google de la salle, à copier depuis
  <https://developers.google.com/maps/documentation/places/web-service/place-id> (recherchez « HALL B Saint-Dionisy »).
- `distanceParDefaut` : écart en mètres entre deux points reliés (4 m par défaut). Pour plus de précision, indiquez la distance
  dans le champ « m » en ajoutant une flèche, ou forcez `"position": { "x": 12, "y": -3 }` (mètres est/nord depuis le départ) sur un point.

Les positions sont déduites des flèches : direction = celle de la flèche, longueur = la distance.

### Publier

```
node scripts/visite-streetview.mjs essai "C:\chemin\des\photos ORIGINALES"
```

Vérifie tout sans rien envoyer : photos trouvées, métadonnées 360 présentes, tableau des positions et caps,
et un plan `.streetview/plan.svg` (à ouvrir dans le navigateur) : il doit ressembler au plan de la salle.

```
node scripts/visite-streetview.mjs publier "C:\chemin\des\photos ORIGINALES"
node scripts/visite-streetview.mjs etat
```

`publier` envoie les photos pas encore publiées puis met à jour positions, orientations et liens de toutes.
On peut le relancer après avoir corrigé une flèche : les photos ne sont pas renvoyées
(le suivi est dans `.streetview/publie.json`, à garder). Google vérifie ensuite les photos (de quelques heures à quelques jours),
`etat` affiche leur statut et leur lien. `supprimer --oui` les retire toutes de Google.

Attention : une fois publiées sur Google, les photos sont soumises à leurs conditions (licence accordée à Google).
Le dossier du site, lui, reste entièrement à vous.
