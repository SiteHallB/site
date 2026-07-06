import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`cours_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cours_stats_order_idx\` ON \`cours_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cours_stats_parent_id_idx\` ON \`cours_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cours_benefices_liste\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icone\` text DEFAULT 'Sparkles',
  	\`titre\` text,
  	\`texte\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cours_benefices_liste_order_idx\` ON \`cours_benefices_liste\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cours_benefices_liste_parent_id_idx\` ON \`cours_benefices_liste\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cours_deroulement\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`texte\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cours_deroulement_order_idx\` ON \`cours_deroulement\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cours_deroulement_parent_id_idx\` ON \`cours_deroulement\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cours_public_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cours_public_points_order_idx\` ON \`cours_public_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cours_public_points_parent_id_idx\` ON \`cours_public_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cours_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`reponse\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cours_faq_order_idx\` ON \`cours_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cours_faq_parent_id_idx\` ON \`cours_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cours\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`slug\` text,
  	\`image_id\` integer,
  	\`ordre\` numeric DEFAULT 0,
  	\`page_active\` integer DEFAULT true,
  	\`carte_resume\` text,
  	\`carte_icone\` text DEFAULT 'Activity',
  	\`carte_intensite\` text DEFAULT 'Élevée',
  	\`carte_duree\` text DEFAULT '45 min',
  	\`carte_theme_bleu\` integer DEFAULT false,
  	\`eyebrow\` text DEFAULT 'Cours collectif',
  	\`h1_top\` text,
  	\`h1_bottom\` text DEFAULT 'à Saint Dionisy',
  	\`hero_lead\` text,
  	\`bouton_secondaire_texte\` text DEFAULT 'Voir les plannings',
  	\`bouton_secondaire_url\` text DEFAULT '/plannings',
  	\`bouton_secondaire_externe\` integer DEFAULT false,
  	\`bouton_secondaire_style\` text DEFAULT 'primary',
  	\`quoi_titre\` text,
  	\`quoi_paragraphe1\` text,
  	\`quoi_paragraphe2\` text,
  	\`benefices_titre\` text,
  	\`equipement_titre\` text,
  	\`equipement_paragraphe1\` text,
  	\`equipement_paragraphe2\` text,
  	\`public_intro\` text,
  	\`zone_titre\` text DEFAULT 'À 15 min de Nîmes',
  	\`zone_texte\` text,
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`schema_exercice_nom\` text,
  	\`schema_exercice_description\` text,
  	\`schema_exercice_type_exercice\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`cours_slug_idx\` ON \`cours\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`cours_image_idx\` ON \`cours\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`cours_seo_seo_image_idx\` ON \`cours\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`cours_updated_at_idx\` ON \`cours\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`cours_created_at_idx\` ON \`cours\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`cours__status_idx\` ON \`cours\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_cours_v_version_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cours_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cours_v_version_stats_order_idx\` ON \`_cours_v_version_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_version_stats_parent_id_idx\` ON \`_cours_v_version_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_cours_v_version_benefices_liste\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icone\` text DEFAULT 'Sparkles',
  	\`titre\` text,
  	\`texte\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cours_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cours_v_version_benefices_liste_order_idx\` ON \`_cours_v_version_benefices_liste\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_version_benefices_liste_parent_id_idx\` ON \`_cours_v_version_benefices_liste\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_cours_v_version_deroulement\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`texte\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cours_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cours_v_version_deroulement_order_idx\` ON \`_cours_v_version_deroulement\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_version_deroulement_parent_id_idx\` ON \`_cours_v_version_deroulement\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_cours_v_version_public_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cours_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cours_v_version_public_points_order_idx\` ON \`_cours_v_version_public_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_version_public_points_parent_id_idx\` ON \`_cours_v_version_public_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_cours_v_version_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`reponse\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cours_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cours_v_version_faq_order_idx\` ON \`_cours_v_version_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_version_faq_parent_id_idx\` ON \`_cours_v_version_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_cours_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_titre\` text,
  	\`version_slug\` text,
  	\`version_image_id\` integer,
  	\`version_ordre\` numeric DEFAULT 0,
  	\`version_page_active\` integer DEFAULT true,
  	\`version_carte_resume\` text,
  	\`version_carte_icone\` text DEFAULT 'Activity',
  	\`version_carte_intensite\` text DEFAULT 'Élevée',
  	\`version_carte_duree\` text DEFAULT '45 min',
  	\`version_carte_theme_bleu\` integer DEFAULT false,
  	\`version_eyebrow\` text DEFAULT 'Cours collectif',
  	\`version_h1_top\` text,
  	\`version_h1_bottom\` text DEFAULT 'à Saint Dionisy',
  	\`version_hero_lead\` text,
  	\`version_bouton_secondaire_texte\` text DEFAULT 'Voir les plannings',
  	\`version_bouton_secondaire_url\` text DEFAULT '/plannings',
  	\`version_bouton_secondaire_externe\` integer DEFAULT false,
  	\`version_bouton_secondaire_style\` text DEFAULT 'primary',
  	\`version_quoi_titre\` text,
  	\`version_quoi_paragraphe1\` text,
  	\`version_quoi_paragraphe2\` text,
  	\`version_benefices_titre\` text,
  	\`version_equipement_titre\` text,
  	\`version_equipement_paragraphe1\` text,
  	\`version_equipement_paragraphe2\` text,
  	\`version_public_intro\` text,
  	\`version_zone_titre\` text DEFAULT 'À 15 min de Nîmes',
  	\`version_zone_texte\` text,
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_schema_exercice_nom\` text,
  	\`version_schema_exercice_description\` text,
  	\`version_schema_exercice_type_exercice\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`cours\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_cours_v_parent_idx\` ON \`_cours_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_version_version_slug_idx\` ON \`_cours_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_version_version_image_idx\` ON \`_cours_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_version_seo_version_seo_image_idx\` ON \`_cours_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_version_version_updated_at_idx\` ON \`_cours_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_version_version_created_at_idx\` ON \`_cours_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_version_version__status_idx\` ON \`_cours_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_created_at_idx\` ON \`_cours_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_updated_at_idx\` ON \`_cours_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_latest_idx\` ON \`_cours_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_cours_v_autosave_idx\` ON \`_cours_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`formules_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`formules\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`formules_images_order_idx\` ON \`formules_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`formules_images_parent_id_idx\` ON \`formules_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`formules_images_image_idx\` ON \`formules_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`formules_avantages\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`icone\` text DEFAULT 'check',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`formules\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`formules_avantages_order_idx\` ON \`formules_avantages\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`formules_avantages_parent_id_idx\` ON \`formules_avantages\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`formules_filtres_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`nom\` text,
  	\`option_url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`formules_filtres\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`formules_filtres_options_order_idx\` ON \`formules_filtres_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`formules_filtres_options_parent_id_idx\` ON \`formules_filtres_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`formules_filtres\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titre_aucun\` text DEFAULT 'Tout type de paiement',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`formules\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`formules_filtres_order_idx\` ON \`formules_filtres\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`formules_filtres_parent_id_idx\` ON \`formules_filtres\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`formules_faq_seo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`reponse\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`formules\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`formules_faq_seo_order_idx\` ON \`formules_faq_seo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`formules_faq_seo_parent_id_idx\` ON \`formules_faq_seo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`formules\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`slug\` text,
  	\`sous_titre\` text,
  	\`groupe\` text DEFAULT 'principale',
  	\`ordre\` numeric DEFAULT 0,
  	\`prix_prefixe\` text,
  	\`prix_montant\` text,
  	\`prix_suffixe\` text,
  	\`lien_carte\` text,
  	\`page_dediee\` integer DEFAULT true,
  	\`sous_titre_page\` text,
  	\`afficher_contact\` integer DEFAULT false,
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`formules_slug_idx\` ON \`formules\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`formules_seo_seo_image_idx\` ON \`formules\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`formules_updated_at_idx\` ON \`formules\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`formules_created_at_idx\` ON \`formules\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`formules__status_idx\` ON \`formules\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`formules_numbers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` numeric,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`formules\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`formules_numbers_order_parent_idx\` ON \`formules_numbers\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_formules_v_version_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_formules_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_formules_v_version_images_order_idx\` ON \`_formules_v_version_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_version_images_parent_id_idx\` ON \`_formules_v_version_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_version_images_image_idx\` ON \`_formules_v_version_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_formules_v_version_avantages\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`icone\` text DEFAULT 'check',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_formules_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_formules_v_version_avantages_order_idx\` ON \`_formules_v_version_avantages\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_version_avantages_parent_id_idx\` ON \`_formules_v_version_avantages\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_formules_v_version_filtres_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nom\` text,
  	\`option_url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_formules_v_version_filtres\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_formules_v_version_filtres_options_order_idx\` ON \`_formules_v_version_filtres_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_version_filtres_options_parent_id_idx\` ON \`_formules_v_version_filtres_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_formules_v_version_filtres\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre_aucun\` text DEFAULT 'Tout type de paiement',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_formules_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_formules_v_version_filtres_order_idx\` ON \`_formules_v_version_filtres\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_version_filtres_parent_id_idx\` ON \`_formules_v_version_filtres\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_formules_v_version_faq_seo\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`reponse\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_formules_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_formules_v_version_faq_seo_order_idx\` ON \`_formules_v_version_faq_seo\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_version_faq_seo_parent_id_idx\` ON \`_formules_v_version_faq_seo\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_formules_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_titre\` text,
  	\`version_slug\` text,
  	\`version_sous_titre\` text,
  	\`version_groupe\` text DEFAULT 'principale',
  	\`version_ordre\` numeric DEFAULT 0,
  	\`version_prix_prefixe\` text,
  	\`version_prix_montant\` text,
  	\`version_prix_suffixe\` text,
  	\`version_lien_carte\` text,
  	\`version_page_dediee\` integer DEFAULT true,
  	\`version_sous_titre_page\` text,
  	\`version_afficher_contact\` integer DEFAULT false,
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`formules\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_formules_v_parent_idx\` ON \`_formules_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_version_version_slug_idx\` ON \`_formules_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_version_seo_version_seo_image_idx\` ON \`_formules_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_version_version_updated_at_idx\` ON \`_formules_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_version_version_created_at_idx\` ON \`_formules_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_version_version__status_idx\` ON \`_formules_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_created_at_idx\` ON \`_formules_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_updated_at_idx\` ON \`_formules_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_latest_idx\` ON \`_formules_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_formules_v_autosave_idx\` ON \`_formules_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_formules_v_numbers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` numeric,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_formules_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_formules_v_numbers_order_parent_idx\` ON \`_formules_v_numbers\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`villes_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`reponse\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`villes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`villes_faq_order_idx\` ON \`villes_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`villes_faq_parent_id_idx\` ON \`villes_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`villes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`ville\` text,
  	\`slug\` text,
  	\`link_label\` text,
  	\`ordre\` numeric DEFAULT 0,
  	\`h1\` text,
  	\`sous_titre\` text,
  	\`distance\` text,
  	\`temps\` text,
  	\`intro\` text,
  	\`trajet\` text,
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`villes_slug_idx\` ON \`villes\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`villes_seo_seo_image_idx\` ON \`villes\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`villes_updated_at_idx\` ON \`villes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`villes_created_at_idx\` ON \`villes\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`villes__status_idx\` ON \`villes\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_villes_v_version_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`reponse\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_villes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_villes_v_version_faq_order_idx\` ON \`_villes_v_version_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_villes_v_version_faq_parent_id_idx\` ON \`_villes_v_version_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_villes_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_ville\` text,
  	\`version_slug\` text,
  	\`version_link_label\` text,
  	\`version_ordre\` numeric DEFAULT 0,
  	\`version_h1\` text,
  	\`version_sous_titre\` text,
  	\`version_distance\` text,
  	\`version_temps\` text,
  	\`version_intro\` text,
  	\`version_trajet\` text,
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`villes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_villes_v_parent_idx\` ON \`_villes_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_villes_v_version_version_slug_idx\` ON \`_villes_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_villes_v_version_seo_version_seo_image_idx\` ON \`_villes_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_villes_v_version_version_updated_at_idx\` ON \`_villes_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_villes_v_version_version_created_at_idx\` ON \`_villes_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_villes_v_version_version__status_idx\` ON \`_villes_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_villes_v_created_at_idx\` ON \`_villes_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_villes_v_updated_at_idx\` ON \`_villes_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_villes_v_latest_idx\` ON \`_villes_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_villes_v_autosave_idx\` ON \`_villes_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_texte\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`contenu\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_texte_order_idx\` ON \`pages_blocks_texte\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_texte_parent_id_idx\` ON \`pages_blocks_texte\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_texte_path_idx\` ON \`pages_blocks_texte\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_markdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`contenu\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_markdown_order_idx\` ON \`pages_blocks_markdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_markdown_parent_id_idx\` ON \`pages_blocks_markdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_markdown_path_idx\` ON \`pages_blocks_markdown\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_image_texte\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`titre\` text,
  	\`texte\` text,
  	\`image_a_droite\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_texte_order_idx\` ON \`pages_blocks_image_texte\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_texte_parent_id_idx\` ON \`pages_blocks_image_texte\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_texte_path_idx\` ON \`pages_blocks_image_texte\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_texte_image_idx\` ON \`pages_blocks_image_texte\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`texte\` text,
  	\`bouton_texte\` text,
  	\`bouton_url\` text,
  	\`bouton_externe\` integer DEFAULT false,
  	\`bouton_style\` text DEFAULT 'accent',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`reponse\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_order_idx\` ON \`pages_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_parent_id_idx\` ON \`pages_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titre\` text DEFAULT 'Questions fréquentes',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_order_idx\` ON \`pages_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_parent_id_idx\` ON \`pages_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_path_idx\` ON \`pages_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cartes_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`texte\` text,
  	\`image_id\` integer,
  	\`url\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cartes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cartes_items_order_idx\` ON \`pages_blocks_cartes_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cartes_items_parent_id_idx\` ON \`pages_blocks_cartes_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cartes_items_image_idx\` ON \`pages_blocks_cartes_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cartes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cartes_order_idx\` ON \`pages_blocks_cartes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cartes_parent_id_idx\` ON \`pages_blocks_cartes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cartes_path_idx\` ON \`pages_blocks_cartes\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`slug\` text,
  	\`gabarit\` text DEFAULT 'standard',
  	\`sous_titre\` text,
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_seo_seo_image_idx\` ON \`pages\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_texte\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`contenu\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_texte_order_idx\` ON \`_pages_v_blocks_texte\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_texte_parent_id_idx\` ON \`_pages_v_blocks_texte\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_texte_path_idx\` ON \`_pages_v_blocks_texte\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_markdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`contenu\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_markdown_order_idx\` ON \`_pages_v_blocks_markdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_markdown_parent_id_idx\` ON \`_pages_v_blocks_markdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_markdown_path_idx\` ON \`_pages_v_blocks_markdown\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_image_texte\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`titre\` text,
  	\`texte\` text,
  	\`image_a_droite\` integer DEFAULT false,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_texte_order_idx\` ON \`_pages_v_blocks_image_texte\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_texte_parent_id_idx\` ON \`_pages_v_blocks_image_texte\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_texte_path_idx\` ON \`_pages_v_blocks_image_texte\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_texte_image_idx\` ON \`_pages_v_blocks_image_texte\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`texte\` text,
  	\`bouton_texte\` text,
  	\`bouton_url\` text,
  	\`bouton_externe\` integer DEFAULT false,
  	\`bouton_style\` text DEFAULT 'accent',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_order_idx\` ON \`_pages_v_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_parent_id_idx\` ON \`_pages_v_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_path_idx\` ON \`_pages_v_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`reponse\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_items_order_idx\` ON \`_pages_v_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_items_parent_id_idx\` ON \`_pages_v_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text DEFAULT 'Questions fréquentes',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_order_idx\` ON \`_pages_v_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_parent_id_idx\` ON \`_pages_v_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_path_idx\` ON \`_pages_v_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cartes_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`texte\` text,
  	\`image_id\` integer,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cartes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cartes_items_order_idx\` ON \`_pages_v_blocks_cartes_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cartes_items_parent_id_idx\` ON \`_pages_v_blocks_cartes_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cartes_items_image_idx\` ON \`_pages_v_blocks_cartes_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cartes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cartes_order_idx\` ON \`_pages_v_blocks_cartes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cartes_parent_id_idx\` ON \`_pages_v_blocks_cartes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cartes_path_idx\` ON \`_pages_v_blocks_cartes\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_titre\` text,
  	\`version_slug\` text,
  	\`version_gabarit\` text DEFAULT 'standard',
  	\`version_sous_titre\` text,
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_seo_version_seo_image_idx\` ON \`_pages_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`faq_items\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`reponse\` text NOT NULL,
  	\`ordre\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`faq_items_updated_at_idx\` ON \`faq_items\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`faq_items_created_at_idx\` ON \`faq_items\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`temoignages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nom\` text NOT NULL,
  	\`texte\` text NOT NULL,
  	\`note\` numeric DEFAULT 5,
  	\`visible\` integer DEFAULT true,
  	\`ordre\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`temoignages_updated_at_idx\` ON \`temoignages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`temoignages_created_at_idx\` ON \`temoignages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_miniature_url\` text,
  	\`sizes_miniature_width\` numeric,
  	\`sizes_miniature_height\` numeric,
  	\`sizes_miniature_mime_type\` text,
  	\`sizes_miniature_filesize\` numeric,
  	\`sizes_miniature_filename\` text,
  	\`sizes_carte_url\` text,
  	\`sizes_carte_width\` numeric,
  	\`sizes_carte_height\` numeric,
  	\`sizes_carte_mime_type\` text,
  	\`sizes_carte_filesize\` numeric,
  	\`sizes_carte_filename\` text,
  	\`sizes_grande_url\` text,
  	\`sizes_grande_width\` numeric,
  	\`sizes_grande_height\` numeric,
  	\`sizes_grande_mime_type\` text,
  	\`sizes_grande_filesize\` numeric,
  	\`sizes_grande_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_miniature_sizes_miniature_filename_idx\` ON \`media\` (\`sizes_miniature_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_carte_sizes_carte_filename_idx\` ON \`media\` (\`sizes_carte_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_grande_sizes_grande_filename_idx\` ON \`media\` (\`sizes_grande_filename\`);`)
  await db.run(sql`CREATE TABLE \`utilisateurs_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`utilisateurs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`utilisateurs_sessions_order_idx\` ON \`utilisateurs_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`utilisateurs_sessions_parent_id_idx\` ON \`utilisateurs_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`utilisateurs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nom\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`utilisateurs_updated_at_idx\` ON \`utilisateurs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`utilisateurs_created_at_idx\` ON \`utilisateurs\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`utilisateurs_email_idx\` ON \`utilisateurs\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`cours_id\` integer,
  	\`formules_id\` integer,
  	\`villes_id\` integer,
  	\`pages_id\` integer,
  	\`faq_items_id\` integer,
  	\`temoignages_id\` integer,
  	\`media_id\` integer,
  	\`utilisateurs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`cours_id\`) REFERENCES \`cours\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`formules_id\`) REFERENCES \`formules\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`villes_id\`) REFERENCES \`villes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_items_id\`) REFERENCES \`faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`temoignages_id\`) REFERENCES \`temoignages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`utilisateurs_id\`) REFERENCES \`utilisateurs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_cours_id_idx\` ON \`payload_locked_documents_rels\` (\`cours_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_formules_id_idx\` ON \`payload_locked_documents_rels\` (\`formules_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_villes_id_idx\` ON \`payload_locked_documents_rels\` (\`villes_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_faq_items_id_idx\` ON \`payload_locked_documents_rels\` (\`faq_items_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_temoignages_id_idx\` ON \`payload_locked_documents_rels\` (\`temoignages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_utilisateurs_id_idx\` ON \`payload_locked_documents_rels\` (\`utilisateurs_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`utilisateurs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`utilisateurs_id\`) REFERENCES \`utilisateurs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_utilisateurs_id_idx\` ON \`payload_preferences_rels\` (\`utilisateurs_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`accueil_hero_bandeau\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`url\` text,
  	\`externe\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`accueil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`accueil_hero_bandeau_order_idx\` ON \`accueil_hero_bandeau\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`accueil_hero_bandeau_parent_id_idx\` ON \`accueil_hero_bandeau\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`accueil_hero_boutons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`url\` text,
  	\`style\` text DEFAULT 'accent',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`accueil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`accueil_hero_boutons_order_idx\` ON \`accueil_hero_boutons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`accueil_hero_boutons_parent_id_idx\` ON \`accueil_hero_boutons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`accueil_concept_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`texte\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`accueil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`accueil_concept_sections_order_idx\` ON \`accueil_concept_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`accueil_concept_sections_parent_id_idx\` ON \`accueil_concept_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`accueil_concept_sections_image_idx\` ON \`accueil_concept_sections\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`accueil_valeurs_liste\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`nom\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`accueil\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`accueil_valeurs_liste_order_idx\` ON \`accueil_valeurs_liste\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`accueil_valeurs_liste_parent_id_idx\` ON \`accueil_valeurs_liste\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`accueil\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_titre\` text DEFAULT 'La plus grande salle de sport du Gard',
  	\`hero_video_desktop\` text,
  	\`hero_video_mobile\` text,
  	\`hero_poster_desktop_id\` integer,
  	\`hero_poster_mobile_id\` integer,
  	\`concept_titre\` text DEFAULT 'Notre Concept',
  	\`concept_intro\` text,
  	\`concept_cta_texte\` text,
  	\`concept_cta_bouton_texte\` text DEFAULT 'Je m''inscris',
  	\`concept_cta_bouton_url\` text DEFAULT '/tarifs',
  	\`concept_cta_bouton_externe\` integer DEFAULT false,
  	\`concept_cta_bouton_style\` text DEFAULT 'accent',
  	\`essai_offert_ligne1\` text DEFAULT 'Viens essayer',
  	\`essai_offert_ligne2\` text DEFAULT 'gratuitement et sans engagement',
  	\`essai_offert_bouton_texte\` text DEFAULT 'Essai Offert',
  	\`essai_offert_bouton_url\` text DEFAULT '/essai-offert',
  	\`essai_offert_bouton_externe\` integer DEFAULT false,
  	\`essai_offert_bouton_style\` text DEFAULT 'accent',
  	\`histoire_titre\` text DEFAULT 'Notre Histoire',
  	\`histoire_intro\` text,
  	\`histoire_image_id\` integer,
  	\`histoire_texte\` text,
  	\`valeurs_titre\` text DEFAULT 'Nos Valeurs',
  	\`valeurs_image_id\` integer,
  	\`seo_local_titre\` text,
  	\`seo_local_contenu\` text,
  	\`temoignages_source\` text DEFAULT 'google',
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_poster_desktop_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_poster_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`histoire_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`valeurs_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`accueil_hero_hero_poster_desktop_idx\` ON \`accueil\` (\`hero_poster_desktop_id\`);`)
  await db.run(sql`CREATE INDEX \`accueil_hero_hero_poster_mobile_idx\` ON \`accueil\` (\`hero_poster_mobile_id\`);`)
  await db.run(sql`CREATE INDEX \`accueil_histoire_histoire_image_idx\` ON \`accueil\` (\`histoire_image_id\`);`)
  await db.run(sql`CREATE INDEX \`accueil_valeurs_valeurs_image_idx\` ON \`accueil\` (\`valeurs_image_id\`);`)
  await db.run(sql`CREATE INDEX \`accueil_seo_seo_image_idx\` ON \`accueil\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`accueil__status_idx\` ON \`accueil\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_accueil_v_version_hero_bandeau\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`url\` text,
  	\`externe\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_accueil_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_hero_bandeau_order_idx\` ON \`_accueil_v_version_hero_bandeau\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_hero_bandeau_parent_id_idx\` ON \`_accueil_v_version_hero_bandeau\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_accueil_v_version_hero_boutons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`url\` text,
  	\`style\` text DEFAULT 'accent',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_accueil_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_hero_boutons_order_idx\` ON \`_accueil_v_version_hero_boutons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_hero_boutons_parent_id_idx\` ON \`_accueil_v_version_hero_boutons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_accueil_v_version_concept_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`texte\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_accueil_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_concept_sections_order_idx\` ON \`_accueil_v_version_concept_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_concept_sections_parent_id_idx\` ON \`_accueil_v_version_concept_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_concept_sections_image_idx\` ON \`_accueil_v_version_concept_sections\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_accueil_v_version_valeurs_liste\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nom\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_accueil_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_valeurs_liste_order_idx\` ON \`_accueil_v_version_valeurs_liste\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_valeurs_liste_parent_id_idx\` ON \`_accueil_v_version_valeurs_liste\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_accueil_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_titre\` text DEFAULT 'La plus grande salle de sport du Gard',
  	\`version_hero_video_desktop\` text,
  	\`version_hero_video_mobile\` text,
  	\`version_hero_poster_desktop_id\` integer,
  	\`version_hero_poster_mobile_id\` integer,
  	\`version_concept_titre\` text DEFAULT 'Notre Concept',
  	\`version_concept_intro\` text,
  	\`version_concept_cta_texte\` text,
  	\`version_concept_cta_bouton_texte\` text DEFAULT 'Je m''inscris',
  	\`version_concept_cta_bouton_url\` text DEFAULT '/tarifs',
  	\`version_concept_cta_bouton_externe\` integer DEFAULT false,
  	\`version_concept_cta_bouton_style\` text DEFAULT 'accent',
  	\`version_essai_offert_ligne1\` text DEFAULT 'Viens essayer',
  	\`version_essai_offert_ligne2\` text DEFAULT 'gratuitement et sans engagement',
  	\`version_essai_offert_bouton_texte\` text DEFAULT 'Essai Offert',
  	\`version_essai_offert_bouton_url\` text DEFAULT '/essai-offert',
  	\`version_essai_offert_bouton_externe\` integer DEFAULT false,
  	\`version_essai_offert_bouton_style\` text DEFAULT 'accent',
  	\`version_histoire_titre\` text DEFAULT 'Notre Histoire',
  	\`version_histoire_intro\` text,
  	\`version_histoire_image_id\` integer,
  	\`version_histoire_texte\` text,
  	\`version_valeurs_titre\` text DEFAULT 'Nos Valeurs',
  	\`version_valeurs_image_id\` integer,
  	\`version_seo_local_titre\` text,
  	\`version_seo_local_contenu\` text,
  	\`version_temoignages_source\` text DEFAULT 'google',
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_hero_poster_desktop_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_poster_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_histoire_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_valeurs_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_hero_version_hero_poster_desktop_idx\` ON \`_accueil_v\` (\`version_hero_poster_desktop_id\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_hero_version_hero_poster_mobile_idx\` ON \`_accueil_v\` (\`version_hero_poster_mobile_id\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_histoire_version_histoire_image_idx\` ON \`_accueil_v\` (\`version_histoire_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_valeurs_version_valeurs_image_idx\` ON \`_accueil_v\` (\`version_valeurs_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_seo_version_seo_image_idx\` ON \`_accueil_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_version_version__status_idx\` ON \`_accueil_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_created_at_idx\` ON \`_accueil_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_updated_at_idx\` ON \`_accueil_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_latest_idx\` ON \`_accueil_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_accueil_v_autosave_idx\` ON \`_accueil_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`page_tarifs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text DEFAULT 'Tarifs',
  	\`sous_titre\` text,
  	\`lien_squash_texte\` text DEFAULT 'Voir tarifs Squash',
  	\`texte_seo_titre\` text,
  	\`texte_seo_contenu\` text,
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`page_tarifs_seo_seo_image_idx\` ON \`page_tarifs\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_tarifs__status_idx\` ON \`page_tarifs\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_page_tarifs_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_titre\` text DEFAULT 'Tarifs',
  	\`version_sous_titre\` text,
  	\`version_lien_squash_texte\` text DEFAULT 'Voir tarifs Squash',
  	\`version_texte_seo_titre\` text,
  	\`version_texte_seo_contenu\` text,
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_tarifs_v_version_seo_version_seo_image_idx\` ON \`_page_tarifs_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_page_tarifs_v_version_version__status_idx\` ON \`_page_tarifs_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_page_tarifs_v_created_at_idx\` ON \`_page_tarifs_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_tarifs_v_updated_at_idx\` ON \`_page_tarifs_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_tarifs_v_latest_idx\` ON \`_page_tarifs_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_page_tarifs_v_autosave_idx\` ON \`_page_tarifs_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`page_cours_blocs_formules_boutons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`url\` text,
  	\`style\` text DEFAULT 'accent',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_cours_blocs_formules\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_cours_blocs_formules_boutons_order_idx\` ON \`page_cours_blocs_formules_boutons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_cours_blocs_formules_boutons_parent_id_idx\` ON \`page_cours_blocs_formules_boutons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_cours_blocs_formules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`titre\` text,
  	\`texte\` text,
  	\`couleur\` text DEFAULT 'accent',
  	\`icone\` text DEFAULT 'Sparkles',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_cours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_cours_blocs_formules_order_idx\` ON \`page_cours_blocs_formules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_cours_blocs_formules_parent_id_idx\` ON \`page_cours_blocs_formules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_cours_arguments_liste\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`texte\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_cours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_cours_arguments_liste_order_idx\` ON \`page_cours_arguments_liste\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_cours_arguments_liste_parent_id_idx\` ON \`page_cours_arguments_liste\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_cours_cta_final_boutons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`url\` text,
  	\`style\` text DEFAULT 'accent',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_cours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_cours_cta_final_boutons_order_idx\` ON \`page_cours_cta_final_boutons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_cours_cta_final_boutons_parent_id_idx\` ON \`page_cours_cta_final_boutons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_cours_maillage\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_cours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_cours_maillage_order_idx\` ON \`page_cours_maillage\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_cours_maillage_parent_id_idx\` ON \`page_cours_maillage\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_cours\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_eyebrow\` text DEFAULT 'Tous nos cours',
  	\`hero_h1_top\` text DEFAULT 'Cours collectifs',
  	\`hero_h1_bottom\` text DEFAULT 'à Saint Dionisy',
  	\`hero_texte\` text,
  	\`hero_image_id\` integer,
  	\`catalogue_eyebrow\` text DEFAULT 'Le catalogue',
  	\`catalogue_titre\` text DEFAULT 'Nos disciplines',
  	\`catalogue_texte\` text,
  	\`arguments_titre\` text DEFAULT 'Pourquoi nos cours collectifs ?',
  	\`planning_cta_titre\` text DEFAULT 'Quand viennent les cours ?',
  	\`planning_cta_texte\` text,
  	\`planning_cta_bouton_texte\` text DEFAULT 'Voir le planning complet',
  	\`planning_cta_bouton_url\` text DEFAULT '/plannings',
  	\`planning_cta_bouton_externe\` integer DEFAULT false,
  	\`planning_cta_bouton_style\` text DEFAULT 'accent',
  	\`cta_final_titre\` text DEFAULT 'Envie d''essayer ?',
  	\`cta_final_texte\` text,
  	\`cta_cours_titre\` text DEFAULT 'Envie d''essayer ?',
  	\`cta_cours_texte\` text,
  	\`cta_cours_bouton_texte\` text DEFAULT 'Réserver ma séance d''essai',
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`page_cours_hero_hero_image_idx\` ON \`page_cours\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_cours_seo_seo_image_idx\` ON \`page_cours\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_cours__status_idx\` ON \`page_cours\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_page_cours_v_version_blocs_formules_boutons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`url\` text,
  	\`style\` text DEFAULT 'accent',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_cours_v_version_blocs_formules\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_cours_v_version_blocs_formules_boutons_order_idx\` ON \`_page_cours_v_version_blocs_formules_boutons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_cours_v_version_blocs_formules_boutons_parent_id_idx\` ON \`_page_cours_v_version_blocs_formules_boutons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_cours_v_version_blocs_formules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`titre\` text,
  	\`texte\` text,
  	\`couleur\` text DEFAULT 'accent',
  	\`icone\` text DEFAULT 'Sparkles',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_cours_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_cours_v_version_blocs_formules_order_idx\` ON \`_page_cours_v_version_blocs_formules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_cours_v_version_blocs_formules_parent_id_idx\` ON \`_page_cours_v_version_blocs_formules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_cours_v_version_arguments_liste\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`texte\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_cours_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_cours_v_version_arguments_liste_order_idx\` ON \`_page_cours_v_version_arguments_liste\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_cours_v_version_arguments_liste_parent_id_idx\` ON \`_page_cours_v_version_arguments_liste\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_cours_v_version_cta_final_boutons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`url\` text,
  	\`style\` text DEFAULT 'accent',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_cours_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_cours_v_version_cta_final_boutons_order_idx\` ON \`_page_cours_v_version_cta_final_boutons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_cours_v_version_cta_final_boutons_parent_id_idx\` ON \`_page_cours_v_version_cta_final_boutons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_cours_v_version_maillage\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_cours_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_cours_v_version_maillage_order_idx\` ON \`_page_cours_v_version_maillage\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_cours_v_version_maillage_parent_id_idx\` ON \`_page_cours_v_version_maillage\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_cours_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_eyebrow\` text DEFAULT 'Tous nos cours',
  	\`version_hero_h1_top\` text DEFAULT 'Cours collectifs',
  	\`version_hero_h1_bottom\` text DEFAULT 'à Saint Dionisy',
  	\`version_hero_texte\` text,
  	\`version_hero_image_id\` integer,
  	\`version_catalogue_eyebrow\` text DEFAULT 'Le catalogue',
  	\`version_catalogue_titre\` text DEFAULT 'Nos disciplines',
  	\`version_catalogue_texte\` text,
  	\`version_arguments_titre\` text DEFAULT 'Pourquoi nos cours collectifs ?',
  	\`version_planning_cta_titre\` text DEFAULT 'Quand viennent les cours ?',
  	\`version_planning_cta_texte\` text,
  	\`version_planning_cta_bouton_texte\` text DEFAULT 'Voir le planning complet',
  	\`version_planning_cta_bouton_url\` text DEFAULT '/plannings',
  	\`version_planning_cta_bouton_externe\` integer DEFAULT false,
  	\`version_planning_cta_bouton_style\` text DEFAULT 'accent',
  	\`version_cta_final_titre\` text DEFAULT 'Envie d''essayer ?',
  	\`version_cta_final_texte\` text,
  	\`version_cta_cours_titre\` text DEFAULT 'Envie d''essayer ?',
  	\`version_cta_cours_texte\` text,
  	\`version_cta_cours_bouton_texte\` text DEFAULT 'Réserver ma séance d''essai',
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_cours_v_version_hero_version_hero_image_idx\` ON \`_page_cours_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_page_cours_v_version_seo_version_seo_image_idx\` ON \`_page_cours_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_page_cours_v_version_version__status_idx\` ON \`_page_cours_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_page_cours_v_created_at_idx\` ON \`_page_cours_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_cours_v_updated_at_idx\` ON \`_page_cours_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_cours_v_latest_idx\` ON \`_page_cours_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_page_cours_v_autosave_idx\` ON \`_page_cours_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`plannings_page_sections_jours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`plannings_page_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`plannings_page_sections_jours_order_idx\` ON \`plannings_page_sections_jours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`plannings_page_sections_jours_parent_id_idx\` ON \`plannings_page_sections_jours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`plannings_page_sections_jours_image_idx\` ON \`plannings_page_sections_jours\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`plannings_page_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`image_bureau_id\` integer,
  	FOREIGN KEY (\`image_bureau_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`plannings_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`plannings_page_sections_order_idx\` ON \`plannings_page_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`plannings_page_sections_parent_id_idx\` ON \`plannings_page_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`plannings_page_sections_image_bureau_idx\` ON \`plannings_page_sections\` (\`image_bureau_id\`);`)
  await db.run(sql`CREATE TABLE \`plannings_page_activites\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`illustration_id\` integer,
  	\`url\` text DEFAULT '/tarifs/boost',
  	\`description\` text,
  	FOREIGN KEY (\`illustration_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`plannings_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`plannings_page_activites_order_idx\` ON \`plannings_page_activites\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`plannings_page_activites_parent_id_idx\` ON \`plannings_page_activites\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`plannings_page_activites_illustration_idx\` ON \`plannings_page_activites\` (\`illustration_id\`);`)
  await db.run(sql`CREATE TABLE \`plannings_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text DEFAULT 'Plannings',
  	\`sous_titre\` text DEFAULT 'Consultez nos nombreuses activités',
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`plannings_page__status_idx\` ON \`plannings_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_plannings_page_v_version_sections_jours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_plannings_page_v_version_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_version_sections_jours_order_idx\` ON \`_plannings_page_v_version_sections_jours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_version_sections_jours_parent_id_idx\` ON \`_plannings_page_v_version_sections_jours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_version_sections_jours_image_idx\` ON \`_plannings_page_v_version_sections_jours\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_plannings_page_v_version_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`image_bureau_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_bureau_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_plannings_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_version_sections_order_idx\` ON \`_plannings_page_v_version_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_version_sections_parent_id_idx\` ON \`_plannings_page_v_version_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_version_sections_image_bureau_idx\` ON \`_plannings_page_v_version_sections\` (\`image_bureau_id\`);`)
  await db.run(sql`CREATE TABLE \`_plannings_page_v_version_activites\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text,
  	\`illustration_id\` integer,
  	\`url\` text DEFAULT '/tarifs/boost',
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`illustration_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_plannings_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_version_activites_order_idx\` ON \`_plannings_page_v_version_activites\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_version_activites_parent_id_idx\` ON \`_plannings_page_v_version_activites\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_version_activites_illustration_idx\` ON \`_plannings_page_v_version_activites\` (\`illustration_id\`);`)
  await db.run(sql`CREATE TABLE \`_plannings_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_titre\` text DEFAULT 'Plannings',
  	\`version_sous_titre\` text DEFAULT 'Consultez nos nombreuses activités',
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_version_version__status_idx\` ON \`_plannings_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_created_at_idx\` ON \`_plannings_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_updated_at_idx\` ON \`_plannings_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_latest_idx\` ON \`_plannings_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_plannings_page_v_autosave_idx\` ON \`_plannings_page_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`page_faq_liens\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_faq_liens_order_idx\` ON \`page_faq_liens\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_faq_liens_parent_id_idx\` ON \`page_faq_liens\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_faq\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text DEFAULT 'Questions fréquentes',
  	\`sous_titre\` text,
  	\`cta_texte\` text DEFAULT 'Une autre question ? La meilleure réponse, c''est d''essayer.',
  	\`cta_bouton_texte\` text DEFAULT 'Je profite de l''essai offert',
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`page_faq_seo_seo_image_idx\` ON \`page_faq\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_faq__status_idx\` ON \`page_faq\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_page_faq_v_version_liens\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_faq_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_faq_v_version_liens_order_idx\` ON \`_page_faq_v_version_liens\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_faq_v_version_liens_parent_id_idx\` ON \`_page_faq_v_version_liens\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_faq_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_titre\` text DEFAULT 'Questions fréquentes',
  	\`version_sous_titre\` text,
  	\`version_cta_texte\` text DEFAULT 'Une autre question ? La meilleure réponse, c''est d''essayer.',
  	\`version_cta_bouton_texte\` text DEFAULT 'Je profite de l''essai offert',
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_faq_v_version_seo_version_seo_image_idx\` ON \`_page_faq_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_page_faq_v_version_version__status_idx\` ON \`_page_faq_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_page_faq_v_created_at_idx\` ON \`_page_faq_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_faq_v_updated_at_idx\` ON \`_page_faq_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_faq_v_latest_idx\` ON \`_page_faq_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_page_faq_v_autosave_idx\` ON \`_page_faq_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`page_contact\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text DEFAULT 'Contact',
  	\`lien_aide_texte\` text DEFAULT 'Besoin d''aide ?',
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`page_contact_seo_seo_image_idx\` ON \`page_contact\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_contact__status_idx\` ON \`page_contact\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_page_contact_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_titre\` text DEFAULT 'Contact',
  	\`version_lien_aide_texte\` text DEFAULT 'Besoin d''aide ?',
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_contact_v_version_seo_version_seo_image_idx\` ON \`_page_contact_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_page_contact_v_version_version__status_idx\` ON \`_page_contact_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_page_contact_v_created_at_idx\` ON \`_page_contact_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_contact_v_updated_at_idx\` ON \`_page_contact_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_contact_v_latest_idx\` ON \`_page_contact_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_page_contact_v_autosave_idx\` ON \`_page_contact_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`page_essai_offert\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text DEFAULT 'Essai offert',
  	\`sous_titre\` text DEFAULT 'Venez tester la salle gratuitement et sans engagement',
  	\`id_sportigo\` numeric,
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`page_essai_offert_seo_seo_image_idx\` ON \`page_essai_offert\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_essai_offert__status_idx\` ON \`page_essai_offert\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_page_essai_offert_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_titre\` text DEFAULT 'Essai offert',
  	\`version_sous_titre\` text DEFAULT 'Venez tester la salle gratuitement et sans engagement',
  	\`version_id_sportigo\` numeric,
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_essai_offert_v_version_seo_version_seo_image_idx\` ON \`_page_essai_offert_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_page_essai_offert_v_version_version__status_idx\` ON \`_page_essai_offert_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_page_essai_offert_v_created_at_idx\` ON \`_page_essai_offert_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_essai_offert_v_updated_at_idx\` ON \`_page_essai_offert_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_essai_offert_v_latest_idx\` ON \`_page_essai_offert_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_page_essai_offert_v_autosave_idx\` ON \`_page_essai_offert_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`page_squash_points_cles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_squash\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_squash_points_cles_order_idx\` ON \`page_squash_points_cles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_squash_points_cles_parent_id_idx\` ON \`page_squash_points_cles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_squash_benefices_liste\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icone\` text DEFAULT 'Sparkles',
  	\`titre\` text,
  	\`texte\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_squash\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_squash_benefices_liste_order_idx\` ON \`page_squash_benefices_liste\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_squash_benefices_liste_parent_id_idx\` ON \`page_squash_benefices_liste\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_squash_infos_pratiques_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_squash\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_squash_infos_pratiques_points_order_idx\` ON \`page_squash_infos_pratiques_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_squash_infos_pratiques_points_parent_id_idx\` ON \`page_squash_infos_pratiques_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_squash_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`reponse\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_squash\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_squash_faq_order_idx\` ON \`page_squash_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_squash_faq_parent_id_idx\` ON \`page_squash_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_squash\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text DEFAULT 'Réservation Squash',
  	\`sous_titre\` text,
  	\`image_id\` integer,
  	\`section_seo_titre\` text,
  	\`section_seo_contenu\` text,
  	\`benefices_titre\` text DEFAULT 'Pourquoi jouer au squash ?',
  	\`infos_pratiques_titre\` text DEFAULT 'Infos pratiques',
  	\`infos_pratiques_note\` text,
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`page_squash_image_idx\` ON \`page_squash\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_squash_seo_seo_image_idx\` ON \`page_squash\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_squash__status_idx\` ON \`page_squash\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_page_squash_v_version_points_cles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_squash_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_squash_v_version_points_cles_order_idx\` ON \`_page_squash_v_version_points_cles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_squash_v_version_points_cles_parent_id_idx\` ON \`_page_squash_v_version_points_cles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_squash_v_version_benefices_liste\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icone\` text DEFAULT 'Sparkles',
  	\`titre\` text,
  	\`texte\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_squash_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_squash_v_version_benefices_liste_order_idx\` ON \`_page_squash_v_version_benefices_liste\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_squash_v_version_benefices_liste_parent_id_idx\` ON \`_page_squash_v_version_benefices_liste\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_squash_v_version_infos_pratiques_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_squash_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_squash_v_version_infos_pratiques_points_order_idx\` ON \`_page_squash_v_version_infos_pratiques_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_squash_v_version_infos_pratiques_points_parent_id_idx\` ON \`_page_squash_v_version_infos_pratiques_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_squash_v_version_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`reponse\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_squash_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_squash_v_version_faq_order_idx\` ON \`_page_squash_v_version_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_squash_v_version_faq_parent_id_idx\` ON \`_page_squash_v_version_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_squash_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_titre\` text DEFAULT 'Réservation Squash',
  	\`version_sous_titre\` text,
  	\`version_image_id\` integer,
  	\`version_section_seo_titre\` text,
  	\`version_section_seo_contenu\` text,
  	\`version_benefices_titre\` text DEFAULT 'Pourquoi jouer au squash ?',
  	\`version_infos_pratiques_titre\` text DEFAULT 'Infos pratiques',
  	\`version_infos_pratiques_note\` text,
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_squash_v_version_version_image_idx\` ON \`_page_squash_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_page_squash_v_version_seo_version_seo_image_idx\` ON \`_page_squash_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_page_squash_v_version_version__status_idx\` ON \`_page_squash_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_page_squash_v_created_at_idx\` ON \`_page_squash_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_squash_v_updated_at_idx\` ON \`_page_squash_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_squash_v_latest_idx\` ON \`_page_squash_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_page_squash_v_autosave_idx\` ON \`_page_squash_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`page_carte_cadeau\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text DEFAULT 'Carte cadeau',
  	\`sous_titre\` text,
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`page_carte_cadeau_seo_seo_image_idx\` ON \`page_carte_cadeau\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_carte_cadeau__status_idx\` ON \`page_carte_cadeau\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_page_carte_cadeau_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_titre\` text DEFAULT 'Carte cadeau',
  	\`version_sous_titre\` text,
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_carte_cadeau_v_version_seo_version_seo_image_idx\` ON \`_page_carte_cadeau_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_page_carte_cadeau_v_version_version__status_idx\` ON \`_page_carte_cadeau_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_page_carte_cadeau_v_created_at_idx\` ON \`_page_carte_cadeau_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_carte_cadeau_v_updated_at_idx\` ON \`_page_carte_cadeau_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_carte_cadeau_v_latest_idx\` ON \`_page_carte_cadeau_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_page_carte_cadeau_v_autosave_idx\` ON \`_page_carte_cadeau_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`page_comment_venir_infos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icone\` text DEFAULT 'Sparkles',
  	\`titre\` text,
  	\`texte\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_comment_venir\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_comment_venir_infos_order_idx\` ON \`page_comment_venir_infos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_comment_venir_infos_parent_id_idx\` ON \`page_comment_venir_infos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_comment_venir_itineraires_liste\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`ville\` text,
  	\`temps\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_comment_venir\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_comment_venir_itineraires_liste_order_idx\` ON \`page_comment_venir_itineraires_liste\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_comment_venir_itineraires_liste_parent_id_idx\` ON \`page_comment_venir_itineraires_liste\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_comment_venir\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text DEFAULT 'Comment venir',
  	\`sous_titre\` text,
  	\`bouton_itineraire_texte\` text DEFAULT 'Ouvrir l''itinéraire',
  	\`cta_texte\` text DEFAULT 'Première visite ? Profitez d''une séance d''essai offerte.',
  	\`cta_bouton_texte\` text DEFAULT 'Je profite de l''essai offert',
  	\`itineraires_titre\` text DEFAULT 'Itinéraires depuis les environs',
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`page_comment_venir_seo_seo_image_idx\` ON \`page_comment_venir\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_comment_venir__status_idx\` ON \`page_comment_venir\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_page_comment_venir_v_version_infos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icone\` text DEFAULT 'Sparkles',
  	\`titre\` text,
  	\`texte\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_comment_venir_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_comment_venir_v_version_infos_order_idx\` ON \`_page_comment_venir_v_version_infos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_comment_venir_v_version_infos_parent_id_idx\` ON \`_page_comment_venir_v_version_infos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_comment_venir_v_version_itineraires_liste\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`ville\` text,
  	\`temps\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_comment_venir_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_comment_venir_v_version_itineraires_liste_order_idx\` ON \`_page_comment_venir_v_version_itineraires_liste\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_comment_venir_v_version_itineraires_liste_parent_id_idx\` ON \`_page_comment_venir_v_version_itineraires_liste\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_comment_venir_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_titre\` text DEFAULT 'Comment venir',
  	\`version_sous_titre\` text,
  	\`version_bouton_itineraire_texte\` text DEFAULT 'Ouvrir l''itinéraire',
  	\`version_cta_texte\` text DEFAULT 'Première visite ? Profitez d''une séance d''essai offerte.',
  	\`version_cta_bouton_texte\` text DEFAULT 'Je profite de l''essai offert',
  	\`version_itineraires_titre\` text DEFAULT 'Itinéraires depuis les environs',
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_comment_venir_v_version_seo_version_seo_image_idx\` ON \`_page_comment_venir_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_page_comment_venir_v_version_version__status_idx\` ON \`_page_comment_venir_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_page_comment_venir_v_created_at_idx\` ON \`_page_comment_venir_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_comment_venir_v_updated_at_idx\` ON \`_page_comment_venir_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_comment_venir_v_latest_idx\` ON \`_page_comment_venir_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_page_comment_venir_v_autosave_idx\` ON \`_page_comment_venir_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`page_natation_offres\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icone\` text DEFAULT 'Sparkles',
  	\`texte\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_natation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_natation_offres_order_idx\` ON \`page_natation_offres\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_natation_offres_parent_id_idx\` ON \`page_natation_offres\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_natation_horaires_lignes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`page_natation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`page_natation_horaires_lignes_order_idx\` ON \`page_natation_horaires_lignes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`page_natation_horaires_lignes_parent_id_idx\` ON \`page_natation_horaires_lignes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`page_natation\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text DEFAULT 'Natation',
  	\`sous_titre\` text,
  	\`intro\` text DEFAULT 'Chez HALL B à Saint-Dionisy, nous proposons :',
  	\`bouton_texte\` text DEFAULT 'Acheter en ligne',
  	\`bouton_url\` text DEFAULT '/tarifs/carnet-seances',
  	\`bouton_externe\` integer DEFAULT false,
  	\`bouton_style\` text DEFAULT 'accent',
  	\`horaires_titre\` text DEFAULT 'Horaires : (tous les Mercredis)',
  	\`image_id\` integer,
  	\`seo_titre\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`page_natation_image_idx\` ON \`page_natation\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_natation_seo_seo_image_idx\` ON \`page_natation\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`page_natation__status_idx\` ON \`page_natation\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_page_natation_v_version_offres\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icone\` text DEFAULT 'Sparkles',
  	\`texte\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_natation_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_natation_v_version_offres_order_idx\` ON \`_page_natation_v_version_offres\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_natation_v_version_offres_parent_id_idx\` ON \`_page_natation_v_version_offres\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_natation_v_version_horaires_lignes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`texte\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_page_natation_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_natation_v_version_horaires_lignes_order_idx\` ON \`_page_natation_v_version_horaires_lignes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_page_natation_v_version_horaires_lignes_parent_id_idx\` ON \`_page_natation_v_version_horaires_lignes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_page_natation_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_titre\` text DEFAULT 'Natation',
  	\`version_sous_titre\` text,
  	\`version_intro\` text DEFAULT 'Chez HALL B à Saint-Dionisy, nous proposons :',
  	\`version_bouton_texte\` text DEFAULT 'Acheter en ligne',
  	\`version_bouton_url\` text DEFAULT '/tarifs/carnet-seances',
  	\`version_bouton_externe\` integer DEFAULT false,
  	\`version_bouton_style\` text DEFAULT 'accent',
  	\`version_horaires_titre\` text DEFAULT 'Horaires : (tous les Mercredis)',
  	\`version_image_id\` integer,
  	\`version_seo_titre\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_natation_v_version_version_image_idx\` ON \`_page_natation_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_page_natation_v_version_seo_version_seo_image_idx\` ON \`_page_natation_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_page_natation_v_version_version__status_idx\` ON \`_page_natation_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_page_natation_v_created_at_idx\` ON \`_page_natation_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_natation_v_updated_at_idx\` ON \`_page_natation_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_natation_v_latest_idx\` ON \`_page_natation_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_page_natation_v_autosave_idx\` ON \`_page_natation_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales_communs_atouts_liste\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icone\` text DEFAULT 'Sparkles',
  	\`titre\` text,
  	\`texte\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_locales_communs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_locales_communs_atouts_liste_order_idx\` ON \`pages_locales_communs_atouts_liste\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_locales_communs_atouts_liste_parent_id_idx\` ON \`pages_locales_communs_atouts_liste\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales_communs_decouvrir_liens\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_locales_communs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_locales_communs_decouvrir_liens_order_idx\` ON \`pages_locales_communs_decouvrir_liens\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_locales_communs_decouvrir_liens_parent_id_idx\` ON \`pages_locales_communs_decouvrir_liens\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales_communs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`cta_texte\` text DEFAULT 'Envie d''essayer ? Votre première séance est offerte.',
  	\`cta_bouton_texte\` text DEFAULT 'Je profite de l''essai offert',
  	\`atouts_titre\` text DEFAULT 'Pourquoi choisir HALL B ?',
  	\`decouvrir_titre\` text DEFAULT 'Découvrir HALL B',
  	\`autres_villes_titre\` text DEFAULT 'HALL B, votre salle de sport dans tout le bassin nîmois',
  	\`autres_villes_texte\` text DEFAULT 'Notre salle de Saint-Dionisy accueille aussi les sportifs de :',
  	\`image_id\` integer,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_locales_communs_image_idx\` ON \`pages_locales_communs\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_locales_communs__status_idx\` ON \`pages_locales_communs\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_pages_locales_communs_v_version_atouts_liste\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icone\` text DEFAULT 'Sparkles',
  	\`titre\` text,
  	\`texte\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_locales_communs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_locales_communs_v_version_atouts_liste_order_idx\` ON \`_pages_locales_communs_v_version_atouts_liste\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_locales_communs_v_version_atouts_liste_parent_id_idx\` ON \`_pages_locales_communs_v_version_atouts_liste\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_locales_communs_v_version_decouvrir_liens\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_locales_communs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_locales_communs_v_version_decouvrir_liens_order_idx\` ON \`_pages_locales_communs_v_version_decouvrir_liens\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_locales_communs_v_version_decouvrir_liens_parent_id_idx\` ON \`_pages_locales_communs_v_version_decouvrir_liens\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_locales_communs_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_cta_texte\` text DEFAULT 'Envie d''essayer ? Votre première séance est offerte.',
  	\`version_cta_bouton_texte\` text DEFAULT 'Je profite de l''essai offert',
  	\`version_atouts_titre\` text DEFAULT 'Pourquoi choisir HALL B ?',
  	\`version_decouvrir_titre\` text DEFAULT 'Découvrir HALL B',
  	\`version_autres_villes_titre\` text DEFAULT 'HALL B, votre salle de sport dans tout le bassin nîmois',
  	\`version_autres_villes_texte\` text DEFAULT 'Notre salle de Saint-Dionisy accueille aussi les sportifs de :',
  	\`version_image_id\` integer,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_locales_communs_v_version_version_image_idx\` ON \`_pages_locales_communs_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_locales_communs_v_version_version__status_idx\` ON \`_pages_locales_communs_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_locales_communs_v_created_at_idx\` ON \`_pages_locales_communs_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_locales_communs_v_updated_at_idx\` ON \`_pages_locales_communs_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_locales_communs_v_latest_idx\` ON \`_pages_locales_communs_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_locales_communs_v_autosave_idx\` ON \`_pages_locales_communs_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`page_merci\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre\` text DEFAULT 'Merci !',
  	\`texte\` text DEFAULT 'Vous vous êtes inscrit avec succès, à très vite. Vérifiez votre boite mail et rendez-vous sur l''application Sportigo.',
  	\`bouton_texte\` text DEFAULT 'Retour à l''accueil',
  	\`bouton_url\` text DEFAULT '/',
  	\`bouton_externe\` integer DEFAULT false,
  	\`bouton_style\` text DEFAULT 'primary',
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`page_merci__status_idx\` ON \`page_merci\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_page_merci_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_titre\` text DEFAULT 'Merci !',
  	\`version_texte\` text DEFAULT 'Vous vous êtes inscrit avec succès, à très vite. Vérifiez votre boite mail et rendez-vous sur l''application Sportigo.',
  	\`version_bouton_texte\` text DEFAULT 'Retour à l''accueil',
  	\`version_bouton_url\` text DEFAULT '/',
  	\`version_bouton_externe\` integer DEFAULT false,
  	\`version_bouton_style\` text DEFAULT 'primary',
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_page_merci_v_version_version__status_idx\` ON \`_page_merci_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_page_merci_v_created_at_idx\` ON \`_page_merci_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_merci_v_updated_at_idx\` ON \`_page_merci_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_page_merci_v_latest_idx\` ON \`_page_merci_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_page_merci_v_autosave_idx\` ON \`_page_merci_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`theme\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`couleurs_accent\` text DEFAULT '#E1C340' NOT NULL,
  	\`couleurs_fond_principal\` text DEFAULT '#121212' NOT NULL,
  	\`couleurs_fond_cartes\` text DEFAULT '#242424' NOT NULL,
  	\`couleurs_fond_sombre\` text DEFAULT '#000000' NOT NULL,
  	\`couleurs_texte\` text DEFAULT '#FFFFFF' NOT NULL,
  	\`couleurs_texte_attenue\` text DEFAULT '#FFFFFF99' NOT NULL,
  	\`couleurs_positif\` text DEFAULT '#15803D' NOT NULL,
  	\`couleurs_negatif\` text DEFAULT '#EF4444' NOT NULL,
  	\`polices_titres\` text DEFAULT 'futuretense' NOT NULL,
  	\`polices_corps\` text DEFAULT 'montserrat' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`theme_logo_idx\` ON \`theme\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`coordonnees_partenaires\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`nom\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`coordonnees\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`coordonnees_partenaires_order_idx\` ON \`coordonnees_partenaires\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`coordonnees_partenaires_parent_id_idx\` ON \`coordonnees_partenaires\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`coordonnees_partenaires_logo_idx\` ON \`coordonnees_partenaires\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`coordonnees\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`telephone\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`adresse_rue\` text,
  	\`adresse_code_postal\` text,
  	\`adresse_ville\` text,
  	\`adresse_affichage\` text,
  	\`adresse_lien_google_maps\` text,
  	\`horaires_ouverture\` text,
  	\`horaires_reception\` text,
  	\`horaires_ouverture_google\` text DEFAULT '06:00',
  	\`horaires_fermeture_google\` text DEFAULT '23:00',
  	\`reseaux_instagram\` text,
  	\`reseaux_instagram_label\` text DEFAULT 'hallb.fr',
  	\`reseaux_facebook\` text,
  	\`reseaux_facebook_label\` text DEFAULT 'HALL B',
  	\`reseaux_avis_google\` text,
  	\`osteo\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`navigation_liens_principaux\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`externe\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_liens_principaux_order_idx\` ON \`navigation_liens_principaux\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_liens_principaux_parent_id_idx\` ON \`navigation_liens_principaux\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation_liens_secondaires\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`externe\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_liens_secondaires_order_idx\` ON \`navigation_liens_secondaires\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_liens_secondaires_parent_id_idx\` ON \`navigation_liens_secondaires\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation_boutons_barre\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`texte\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`style\` text DEFAULT 'primary',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_boutons_barre_order_idx\` ON \`navigation_boutons_barre\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_boutons_barre_parent_id_idx\` ON \`navigation_boutons_barre\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation_liens_legaux\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_liens_legaux_order_idx\` ON \`navigation_liens_legaux\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_liens_legaux_parent_id_idx\` ON \`navigation_liens_legaux\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_menu_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`image_menu_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_image_menu_idx\` ON \`navigation\` (\`image_menu_id\`);`)
  await db.run(sql`CREATE TABLE \`parametres_seo_fiche_google_zones_desservies\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`nom\` text NOT NULL,
  	\`type\` text DEFAULT 'City',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`parametres_seo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`parametres_seo_fiche_google_zones_desservies_order_idx\` ON \`parametres_seo_fiche_google_zones_desservies\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`parametres_seo_fiche_google_zones_desservies_parent_id_idx\` ON \`parametres_seo_fiche_google_zones_desservies\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`parametres_seo_fiche_google_equipements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`nom\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`parametres_seo\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`parametres_seo_fiche_google_equipements_order_idx\` ON \`parametres_seo_fiche_google_equipements\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`parametres_seo_fiche_google_equipements_parent_id_idx\` ON \`parametres_seo_fiche_google_equipements\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`parametres_seo\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`titre_par_defaut\` text,
  	\`description_par_defaut\` text,
  	\`image_partage_id\` integer,
  	\`fiche_google_nom\` text DEFAULT 'HALL B',
  	\`fiche_google_description\` text,
  	\`fiche_google_logo_id\` integer,
  	\`fiche_google_gamme_prix\` text DEFAULT '€€',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`image_partage_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiche_google_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`parametres_seo_image_partage_idx\` ON \`parametres_seo\` (\`image_partage_id\`);`)
  await db.run(sql`CREATE INDEX \`parametres_seo_fiche_google_fiche_google_logo_idx\` ON \`parametres_seo\` (\`fiche_google_logo_id\`);`)
  await db.run(sql`CREATE TABLE \`popup\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`actif\` integer DEFAULT false,
  	\`titre\` text DEFAULT 'Essai Offert',
  	\`sous_titre\` text DEFAULT 'Vous hésitez encore à franchir le pas ?',
  	\`texte\` text DEFAULT 'Profitez d''une séance découverte 100% gratuite pour tester notre salle et vivre l''expérience par vous-même.',
  	\`bouton_texte\` text DEFAULT 'J''en profite' NOT NULL,
  	\`bouton_url\` text DEFAULT '/essai-offert' NOT NULL,
  	\`bouton_externe\` integer DEFAULT false,
  	\`bouton_style\` text DEFAULT 'accent',
  	\`delai\` numeric DEFAULT 1000,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`cours_stats\`;`)
  await db.run(sql`DROP TABLE \`cours_benefices_liste\`;`)
  await db.run(sql`DROP TABLE \`cours_deroulement\`;`)
  await db.run(sql`DROP TABLE \`cours_public_points\`;`)
  await db.run(sql`DROP TABLE \`cours_faq\`;`)
  await db.run(sql`DROP TABLE \`cours\`;`)
  await db.run(sql`DROP TABLE \`_cours_v_version_stats\`;`)
  await db.run(sql`DROP TABLE \`_cours_v_version_benefices_liste\`;`)
  await db.run(sql`DROP TABLE \`_cours_v_version_deroulement\`;`)
  await db.run(sql`DROP TABLE \`_cours_v_version_public_points\`;`)
  await db.run(sql`DROP TABLE \`_cours_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_cours_v\`;`)
  await db.run(sql`DROP TABLE \`formules_images\`;`)
  await db.run(sql`DROP TABLE \`formules_avantages\`;`)
  await db.run(sql`DROP TABLE \`formules_filtres_options\`;`)
  await db.run(sql`DROP TABLE \`formules_filtres\`;`)
  await db.run(sql`DROP TABLE \`formules_faq_seo\`;`)
  await db.run(sql`DROP TABLE \`formules\`;`)
  await db.run(sql`DROP TABLE \`formules_numbers\`;`)
  await db.run(sql`DROP TABLE \`_formules_v_version_images\`;`)
  await db.run(sql`DROP TABLE \`_formules_v_version_avantages\`;`)
  await db.run(sql`DROP TABLE \`_formules_v_version_filtres_options\`;`)
  await db.run(sql`DROP TABLE \`_formules_v_version_filtres\`;`)
  await db.run(sql`DROP TABLE \`_formules_v_version_faq_seo\`;`)
  await db.run(sql`DROP TABLE \`_formules_v\`;`)
  await db.run(sql`DROP TABLE \`_formules_v_numbers\`;`)
  await db.run(sql`DROP TABLE \`villes_faq\`;`)
  await db.run(sql`DROP TABLE \`villes\`;`)
  await db.run(sql`DROP TABLE \`_villes_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_villes_v\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_texte\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_markdown\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_image_texte\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cartes_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cartes\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_texte\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_markdown\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_image_texte\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cartes_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cartes\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`faq_items\`;`)
  await db.run(sql`DROP TABLE \`temoignages\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`utilisateurs_sessions\`;`)
  await db.run(sql`DROP TABLE \`utilisateurs\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`accueil_hero_bandeau\`;`)
  await db.run(sql`DROP TABLE \`accueil_hero_boutons\`;`)
  await db.run(sql`DROP TABLE \`accueil_concept_sections\`;`)
  await db.run(sql`DROP TABLE \`accueil_valeurs_liste\`;`)
  await db.run(sql`DROP TABLE \`accueil\`;`)
  await db.run(sql`DROP TABLE \`_accueil_v_version_hero_bandeau\`;`)
  await db.run(sql`DROP TABLE \`_accueil_v_version_hero_boutons\`;`)
  await db.run(sql`DROP TABLE \`_accueil_v_version_concept_sections\`;`)
  await db.run(sql`DROP TABLE \`_accueil_v_version_valeurs_liste\`;`)
  await db.run(sql`DROP TABLE \`_accueil_v\`;`)
  await db.run(sql`DROP TABLE \`page_tarifs\`;`)
  await db.run(sql`DROP TABLE \`_page_tarifs_v\`;`)
  await db.run(sql`DROP TABLE \`page_cours_blocs_formules_boutons\`;`)
  await db.run(sql`DROP TABLE \`page_cours_blocs_formules\`;`)
  await db.run(sql`DROP TABLE \`page_cours_arguments_liste\`;`)
  await db.run(sql`DROP TABLE \`page_cours_cta_final_boutons\`;`)
  await db.run(sql`DROP TABLE \`page_cours_maillage\`;`)
  await db.run(sql`DROP TABLE \`page_cours\`;`)
  await db.run(sql`DROP TABLE \`_page_cours_v_version_blocs_formules_boutons\`;`)
  await db.run(sql`DROP TABLE \`_page_cours_v_version_blocs_formules\`;`)
  await db.run(sql`DROP TABLE \`_page_cours_v_version_arguments_liste\`;`)
  await db.run(sql`DROP TABLE \`_page_cours_v_version_cta_final_boutons\`;`)
  await db.run(sql`DROP TABLE \`_page_cours_v_version_maillage\`;`)
  await db.run(sql`DROP TABLE \`_page_cours_v\`;`)
  await db.run(sql`DROP TABLE \`plannings_page_sections_jours\`;`)
  await db.run(sql`DROP TABLE \`plannings_page_sections\`;`)
  await db.run(sql`DROP TABLE \`plannings_page_activites\`;`)
  await db.run(sql`DROP TABLE \`plannings_page\`;`)
  await db.run(sql`DROP TABLE \`_plannings_page_v_version_sections_jours\`;`)
  await db.run(sql`DROP TABLE \`_plannings_page_v_version_sections\`;`)
  await db.run(sql`DROP TABLE \`_plannings_page_v_version_activites\`;`)
  await db.run(sql`DROP TABLE \`_plannings_page_v\`;`)
  await db.run(sql`DROP TABLE \`page_faq_liens\`;`)
  await db.run(sql`DROP TABLE \`page_faq\`;`)
  await db.run(sql`DROP TABLE \`_page_faq_v_version_liens\`;`)
  await db.run(sql`DROP TABLE \`_page_faq_v\`;`)
  await db.run(sql`DROP TABLE \`page_contact\`;`)
  await db.run(sql`DROP TABLE \`_page_contact_v\`;`)
  await db.run(sql`DROP TABLE \`page_essai_offert\`;`)
  await db.run(sql`DROP TABLE \`_page_essai_offert_v\`;`)
  await db.run(sql`DROP TABLE \`page_squash_points_cles\`;`)
  await db.run(sql`DROP TABLE \`page_squash_benefices_liste\`;`)
  await db.run(sql`DROP TABLE \`page_squash_infos_pratiques_points\`;`)
  await db.run(sql`DROP TABLE \`page_squash_faq\`;`)
  await db.run(sql`DROP TABLE \`page_squash\`;`)
  await db.run(sql`DROP TABLE \`_page_squash_v_version_points_cles\`;`)
  await db.run(sql`DROP TABLE \`_page_squash_v_version_benefices_liste\`;`)
  await db.run(sql`DROP TABLE \`_page_squash_v_version_infos_pratiques_points\`;`)
  await db.run(sql`DROP TABLE \`_page_squash_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_page_squash_v\`;`)
  await db.run(sql`DROP TABLE \`page_carte_cadeau\`;`)
  await db.run(sql`DROP TABLE \`_page_carte_cadeau_v\`;`)
  await db.run(sql`DROP TABLE \`page_comment_venir_infos\`;`)
  await db.run(sql`DROP TABLE \`page_comment_venir_itineraires_liste\`;`)
  await db.run(sql`DROP TABLE \`page_comment_venir\`;`)
  await db.run(sql`DROP TABLE \`_page_comment_venir_v_version_infos\`;`)
  await db.run(sql`DROP TABLE \`_page_comment_venir_v_version_itineraires_liste\`;`)
  await db.run(sql`DROP TABLE \`_page_comment_venir_v\`;`)
  await db.run(sql`DROP TABLE \`page_natation_offres\`;`)
  await db.run(sql`DROP TABLE \`page_natation_horaires_lignes\`;`)
  await db.run(sql`DROP TABLE \`page_natation\`;`)
  await db.run(sql`DROP TABLE \`_page_natation_v_version_offres\`;`)
  await db.run(sql`DROP TABLE \`_page_natation_v_version_horaires_lignes\`;`)
  await db.run(sql`DROP TABLE \`_page_natation_v\`;`)
  await db.run(sql`DROP TABLE \`pages_locales_communs_atouts_liste\`;`)
  await db.run(sql`DROP TABLE \`pages_locales_communs_decouvrir_liens\`;`)
  await db.run(sql`DROP TABLE \`pages_locales_communs\`;`)
  await db.run(sql`DROP TABLE \`_pages_locales_communs_v_version_atouts_liste\`;`)
  await db.run(sql`DROP TABLE \`_pages_locales_communs_v_version_decouvrir_liens\`;`)
  await db.run(sql`DROP TABLE \`_pages_locales_communs_v\`;`)
  await db.run(sql`DROP TABLE \`page_merci\`;`)
  await db.run(sql`DROP TABLE \`_page_merci_v\`;`)
  await db.run(sql`DROP TABLE \`theme\`;`)
  await db.run(sql`DROP TABLE \`coordonnees_partenaires\`;`)
  await db.run(sql`DROP TABLE \`coordonnees\`;`)
  await db.run(sql`DROP TABLE \`navigation_liens_principaux\`;`)
  await db.run(sql`DROP TABLE \`navigation_liens_secondaires\`;`)
  await db.run(sql`DROP TABLE \`navigation_boutons_barre\`;`)
  await db.run(sql`DROP TABLE \`navigation_liens_legaux\`;`)
  await db.run(sql`DROP TABLE \`navigation\`;`)
  await db.run(sql`DROP TABLE \`parametres_seo_fiche_google_zones_desservies\`;`)
  await db.run(sql`DROP TABLE \`parametres_seo_fiche_google_equipements\`;`)
  await db.run(sql`DROP TABLE \`parametres_seo\`;`)
  await db.run(sql`DROP TABLE \`popup\`;`)
}
