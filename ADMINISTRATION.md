# Administration du site HALL B (back-office)

Le site dispose désormais d'un **back-office complet** accessible sur **`/admin`**
(ex : `https://www.hallb.fr/admin`). Il permet de modifier la quasi-totalité du site
sans toucher au code : textes, images, boutons, couleurs, polices, menus, pages,
tarifs, horaires, FAQ, référencement…

Propulsé par [Payload CMS](https://payloadcms.com) (open source, gratuit), intégré
directement dans l'application Next.js : pas de service externe, tout est déployé
avec le site sur Vercel.

---

## 1. Se connecter

1. Ouvrir `https://www.hallb.fr/admin`.
2. À la première visite, l'écran « Créer le premier utilisateur » s'affiche :
   choisissez l'email et un mot de passe **fort** (gestionnaire de mots de passe conseillé).
3. Les comptes suivants se créent dans **Réglages → Utilisateurs**.

> ⚠️ Toute personne disposant d'un compte peut modifier l'ensemble du site.

## 2. Organisation du back-office

### Contenu
| Élément | Ce que ça gère |
|---|---|
| **Cours** | Une fiche par cours (RPM, Pilates…) : page `/cours/<slug>` + carte dans « Nos cours ». Créez/supprimez librement — le site, le menu des disciplines et le sitemap suivent. |
| **Formules & tarifs** | Les cartes de la page Tarifs et les pages de souscription `/tarifs/<slug>` (offres Sportigo, filtres de paiement). |
| **Pages locales (SEO)** | Les pages « Salle de sport à Nîmes / Calvisson / … » et la grille des temps de trajet en bas de l'accueil. |
| **Pages libres** | Pages construites par blocs à la racine du site (mentions légales, événement, offre spéciale…). Deux mises en page : standard ou document. |
| **FAQ générale** | Les questions/réponses de la page `/faq` (transmises à Google). |
| **Témoignages** | Avis rédigés à la main (affichés à la place des avis Google si activé dans Page d'accueil → Témoignages). |
| **Médiathèque** | Toutes les images du site : téléversement, recadrage (point focal), texte alternatif. |

### Pages
Chaque page « fixe » du site a son entrée : Accueil, Tarifs, Nos cours, Plannings,
FAQ, Contact, Essai offert, Squash, Carte cadeau, Comment venir, Natation enfant,
Merci, et les sections communes des pages locales.

### Réglages
| Élément | Ce que ça gère |
|---|---|
| **Apparence** | Logo, toutes les couleurs du site, police des titres et du texte. |
| **Coordonnées & horaires** | Téléphone, email, adresse, horaires, réseaux sociaux, lien ostéopathe, logos partenaires. Utilisés partout (menu, pied de page, fiches Google). |
| **Menu & navigation** | Liens du menu, boutons de la barre du haut, liens du bas de page. |
| **Référencement du site** | Titre/description par défaut, image de partage, fiche Google (LocalBusiness). |
| **Fenêtre promotionnelle** | La popup d'offre (activable/désactivable). |

## 3. Brouillons, aperçu et publication

- Les contenus principaux fonctionnent en **brouillon → publication** :
  « Enregistrer le brouillon » ne change rien sur le site public,
  « Publier » met le site à jour (régénération automatique des pages).
- L'**aperçu en direct** (icône d'écran en haut à droite d'une fiche) affiche la page
  telle qu'elle sera publiée, mise à jour à chaque frappe, avec bascule
  mobile / tablette / ordinateur.
- L'historique des **versions** permet de restaurer un état précédent.

## 4. Ce qui reste dans le code

Volontairement hors back-office : la mise en page et les animations, le formulaire
de contact (envoi d'email + hCaptcha), la récupération des avis Google, les widgets
Sportigo (seuls les identifiants d'offres sont modifiables), la bannière cookies
(`public/klaro-config.js`) et les favicons.

---

## 5. Installation locale (développeurs)

```bash
pnpm install
cp .env.example .env.local   # compléter PAYLOAD_SECRET
pnpm db:migrate              # crée la base SQLite locale (cms.db)
pnpm seed                    # importe tout le contenu actuel du site
pnpm dev                     # site sur http://localhost:3000, admin sur /admin
```

Le contenu local vit dans `cms.db` (SQLite) et les images téléversées dans
`public/media/` — les deux sont ignorés par git.

## 6. Déploiement en production (Vercel)

Le site reste déployé sur Vercel. Trois services gratuits à provisionner **une fois** :

### a. Base de données — Turso (libSQL)
1. Créer un compte sur [turso.tech](https://turso.tech) (plan gratuit largement suffisant).
2. Créer une base (ex : `hallb-cms`, région `fra` ou `cdg`).
3. Récupérer l'URL (`libsql://…turso.io`) et créer un jeton d'accès.

### b. Stockage des images — Vercel Blob
1. Tableau de bord Vercel → projet Hall B → **Storage → Create → Blob**.
2. La variable `BLOB_READ_WRITE_TOKEN` est ajoutée automatiquement au projet.

### c. Variables d'environnement (Vercel → Settings → Environment Variables)
| Variable | Valeur |
|---|---|
| `PAYLOAD_SECRET` | Longue chaîne aléatoire (ex : `openssl rand -hex 32`). |
| `DATABASE_URI` | `libsql://<base>-<org>.turso.io` |
| `DATABASE_AUTH_TOKEN` | Jeton Turso. |
| `NEXT_PUBLIC_SERVER_URL` | `https://www.hallb.fr` |
| `BLOB_READ_WRITE_TOKEN` | (ajouté automatiquement par le store Blob) |

### d. Commande de build
Dans Vercel → Settings → Build & Development, définir la **Build Command** :
```
pnpm ci
```
(`payload migrate && next build` : applique les migrations de base puis construit le site.)

### e. Premier remplissage de la production
Depuis votre machine, en pointant vers la base de production :
```bash
DATABASE_URI="libsql://…" DATABASE_AUTH_TOKEN="…" BLOB_READ_WRITE_TOKEN="…" pnpm seed
```
(sous PowerShell : `$env:DATABASE_URI="…"; $env:DATABASE_AUTH_TOKEN="…"; $env:BLOB_READ_WRITE_TOKEN="…"; pnpm seed`)

Puis ouvrir `https://www.hallb.fr/admin` et créer le premier utilisateur.

## 7. Évolution du modèle de contenu (développeurs)

Après toute modification des collections/globals (`src/cms/…`) :
```bash
pnpm generate:types        # met à jour src/payload-types.ts
pnpm db:migrate:create ma-modif   # génère une migration
pnpm db:migrate            # l'applique en local
```
Les migrations (`src/migrations/`) sont commitées et s'appliquent en production au build.
