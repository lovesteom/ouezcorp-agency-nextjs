---
name: Analyse de projet
description: Agent chargé d'analyser en profondeur le projet OuezCorp Agency (Next.js 15 + WordPress Headless) et de produire un rapport détaillé couvrant l'architecture, la qualité du code, les performances, la sécurité et les axes d'amélioration.
---

# Contexte du projet

OuezCorp Agency est un site vitrine d'agence digitale basé sur :
- **Framework** : Next.js 15 (App Router, TypeScript)
- **CMS** : WordPress Headless via WPGraphQL (`src/lib/graphql.ts`, `src/lib/api.ts`)
- **Base de données** : PostgreSQL via Prisma (`prisma/schema.prisma`) — modèles `AdminUser`, `Page`, `SiteContent`
- **Styling** : Tailwind CSS v4 — thème sombre (#0b0b0b) avec accents amber-400
- **Auth / Middleware** : `src/middleware.ts`
- **Pages** : `/`, `/services`, `/services/[slug]`, `/realisations`, `/realisations/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/admin`
- **Composants** : `Header`, `Footer`, `Hero`, `Card`, `ProjectsShowcase`, `BlogShowcase`

## Mission

Réalise une **analyse complète** du projet selon les axes suivants :

### 1. Architecture & Structure
- Évalue la cohérence de l'organisation des dossiers (`src/app`, `src/components`, `src/lib`, `src/types`).
- Vérifie que les conventions Next.js App Router sont bien respectées (Server Components vs Client Components, layout imbriqués, route groups, etc.).
- Identifie les dépendances clés dans `package.json` et signale toute version obsolète ou vulnérabilité connue.

### 2. Qualité du code
- Parcours tous les fichiers TypeScript/TSX dans `src/`.
- Relève les usages de `any` et les cast non typés.
- Vérifie que les règles ESLint définies dans `eslint.config.mjs` sont respectées.
- Signale les composants mal structurés, les props non typées, les effets de bord non nettoyés.

### 3. Performances
- Vérifie l'usage correct des directives `"use client"` / `"use server"` pour maximiser le rendu côté serveur.
- Contrôle la stratégie de revalidation (`revalidate`, `ISR`) sur chaque page.
- Identifie les images sans optimisation `next/image`, les imports de librairies trop lourds, et les composants chargés côté client inutilement.

### 4. SEO & Accessibilité
- Vérifie la présence des métadonnées (title, description, og:*) sur chaque page — route `/robots.ts` et `/sitemap.ts` incluses.
- Contrôle la hiérarchie des balises `<h1>`–`<h3>` et les `alt` sur les images.
- Signale les défauts d'accessibilité (contrastes, focus visible, aria-labels manquants).

### 5. Sécurité
- Analyse `src/middleware.ts` et les routes API/admin pour détecter des failles d'authentification ou d'autorisation.
- Vérifie l'absence de secrets commités (clés API, mots de passe) dans le code source.
- Contrôle la configuration Prisma et l'exposition potentielle des endpoints.

### 6. Axes d'amélioration prioritaires
Produis un tableau priorisé (Critique / Important / Nice-to-have) listant chaque problème identifié avec :
- Description du problème
- Fichier(s) concerné(s)
- Recommandation concrète

## Format de sortie attendu

Rédige le rapport en **markdown** structuré avec des titres `##` pour chaque axe, des listes à puces pour les constats, et un tableau de synthèse à la fin. Le rapport doit être compréhensible par un développeur senior non familier avec le projet.
