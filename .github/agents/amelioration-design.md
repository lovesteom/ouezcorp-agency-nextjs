---
name: Amélioration du design
description: Agent chargé de refondre le design de toutes les pages du site OuezCorp Agency pour adopter un style moderne, épuré et professionnel inspiré de https://tecnologia.vamtam.com/app-development/ — thème clair (light mode), flat design, palette blue/orange, tout en conservant la structure et les fonctionnalités existantes.
---

# Contexte

Le site OuezCorp Agency (Next.js 15 + Tailwind CSS) utilise actuellement un **thème sombre** (bg `#0b0b0b`, accents `amber-400`). L'objectif est de migrer vers un design **light mode**, flat, moderne et professionnel, aligné avec le design system défini dans `ui_ux_report.txt`.

## Design system cible

| Token         | Valeur      | Usage                          |
|---------------|-------------|-------------------------------|
| Primary       | `#2563EB`   | Liens, icônes, accents         |
| Secondary     | `#3B82F6`   | Hover, gradients légers        |
| CTA           | `#F97316`   | Boutons d'action principaux    |
| Background    | `#F8FAFC`   | Fond de page                   |
| Surface       | `#FFFFFF`   | Cards, formulaires             |
| Border        | `#E2E8F0`   | Séparateurs, bordures          |
| Text primary  | `#1E293B`   | Titres, corps de texte         |
| Text muted    | `#64748B`   | Sous-titres, meta              |

**Typographie** : Plus Jakarta Sans (déjà chargé dans `layout.tsx`) — utiliser les poids 400, 600, 700.

**Style** : Flat design — pas de gradients lourds, pas d'ombres excessives, transitions `150–200 ms ease`, icônes SVG (Lucide), coins arrondis `rounded-xl` / `rounded-2xl`.

**Référence visuelle** : https://tecnologia.vamtam.com/app-development/
- Hero en deux colonnes (texte à gauche, visuel/mockup à droite)
- Cards de services avec icônes colorées sur fond blanc
- Section "Comment ça marche" en étapes numérotées
- Footer sobre avec colonnes de navigation

## Pages à refondre

Modifie chacun des fichiers suivants en appliquant le design system ci-dessus :

### 1. `src/app/layout.tsx`
- Passer `bg-[#0b0b0b]` en `bg-[#F8FAFC]` sur `<body>` et retirer `text-white` globalement.
- S'assurer que le layout reste accessible (contraste 4.5:1 minimum sur tous les textes).

### 2. `src/components/Header.tsx`
- Fond blanc/translucide au scroll (`bg-white/90 backdrop-blur`), bordure `border-[#E2E8F0]`.
- Logo et liens en `#1E293B`, lien actif en `#2563EB`.
- CTA principal : `bg-[#F97316] text-white hover:bg-orange-600`.
- Barre d'annonce : fond `#EFF6FF`, texte `#2563EB`.
- Menu mobile : fond blanc, liens en `#1E293B`.

### 3. `src/components/Hero.tsx`
- Layout deux colonnes : texte à gauche (50%), visuel décoratif (mockup, stats flottantes) à droite.
- Badge : fond `#EFF6FF`, texte `#2563EB`, point vert pulsant.
- `<h1>` en `#1E293B`, mise en valeur du mot-clé en `#2563EB`.
- Sous-titre en `#64748B`.
- CTA primaire : `#F97316`, CTA secondaire : bordure `#2563EB`, texte `#2563EB`.
- Tech pills : fond `#EFF6FF`, texte `#2563EB`.
- Stats : texte chiffre en `#1E293B`, libellé en `#64748B`.

### 4. `src/app/page.tsx` (sections Approche, Services, ProjectsShowcase, BlogShowcase)
- Section "Notre Approche" : fond `#F8FAFC`, cards "bad/good" avec fond `#FEF2F2`/`#EFF6FF`.
- Section "Services" : fond `#FFFFFF`, cards avec hover `border-[#2563EB]/30 shadow-sm`.
- Accents jaunes `amber-400` → remplacer par `#2563EB` (bleu) ou `#F97316` (orange CTA) selon le contexte.

### 5. `src/components/ProjectsShowcase.tsx`
- Fond de section `#F8FAFC`, cards sur fond `#FFFFFF` avec ombre légère.
- Catégories en badges `#EFF6FF / #2563EB`.
- Couleurs d'accent par projet → remplacer les teintes Tailwind actuelles par des variantes du design system.

### 6. `src/components/BlogShowcase.tsx`
- Même logique que ProjectsShowcase : fond clair, cards blanches.

### 7. `src/app/services/page.tsx` et `src/app/services/[slug]/page.tsx`
- Header de page : fond `#F8FAFC`, titre en `#1E293B`.
- Cards de service : fond blanc, icône sur fond `#EFF6FF`, hover bleu.

### 8. `src/app/realisations/page.tsx` et `src/app/realisations/[slug]/page.tsx`
- Même charte que services.
- Images avec `rounded-2xl overflow-hidden`.

### 9. `src/app/blog/page.tsx` et `src/app/blog/[slug]/page.tsx`
- Article header : fond `#F8FAFC`.
- Corps de l'article : typographie lisible, `text-[#1E293B]` sur fond blanc.

### 10. `src/app/contact/page.tsx`
- Fond `#F8FAFC`, formulaire sur fond `#FFFFFF` avec bordure `#E2E8F0`.
- Inputs : fond blanc, focus `ring-[#2563EB]`.
- CTA : `bg-[#F97316] text-white hover:bg-orange-600`.
- Cards d'info : fond blanc, icônes `#2563EB`.

### 11. `src/components/Footer.tsx`
- Fond `#1E293B` (dark footer sobre), texte `#94A3B8`, liens `hover:text-white`.
- CTA grand : titre blanc, bouton `#F97316`.
- Séparateur `#334155`.

## Checklist de livraison

- [ ] Aucun emoji comme icône — utiliser Lucide React SVG uniquement
- [ ] `cursor-pointer` sur tous les éléments cliquables
- [ ] Hover states avec transitions `duration-150` ou `duration-200`
- [ ] Contraste texte ≥ 4.5:1 (light mode)
- [ ] Focus states visibles pour la navigation clavier (`focus:ring-2 focus:ring-[#2563EB]`)
- [ ] `prefers-reduced-motion` respecté (pas d'animations si `motion-reduce`)
- [ ] Responsive validé aux breakpoints : 375px, 768px, 1024px, 1440px
- [ ] Aucun résidu de classes dark (`bg-[#0b0b0b]`, `bg-[#161616]`, `text-white` globaux, etc.)
- [ ] Toutes les pages buildent sans erreur TypeScript (`npm run build`)

## Contraintes

- **Ne pas modifier** la logique métier (fetch GraphQL, Prisma, auth, middleware).
- **Ne pas modifier** les fichiers `src/lib/`, `src/types/`, `prisma/`, ni `next.config.ts`.
- **Conserver** tous les composants et routes existants — uniquement refondre le style.
- Utiliser exclusivement des classes Tailwind CSS et des valeurs inline `style={{}}` si nécessaire pour les couleurs non présentes dans la palette Tailwind par défaut.
