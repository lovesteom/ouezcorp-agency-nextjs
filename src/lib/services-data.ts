import {
  Code2,
  Search,
  LifeBuoy,
  PenTool,
  MonitorPlay,
  Video,
  Share2,
  type LucideIcon,
} from "lucide-react";

export interface ServiceData {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  icon: LucideIcon;
  seoTitle: string;
  seoDescription: string;
  content: string;
}

export const fallbackServices: ServiceData[] = [
  {
    slug: "developpement-web",
    title: "Développement Web",
    excerpt:
      "Création d'applications web performantes, interfaces Headless et sites vitrines sur-mesure. Architecture robuste et évolutive pour un résultat haut de gamme.",
    tags: ["Next.js 15", "React 19", "TypeScript", "WordPress Headless"],
    icon: Code2,
    seoTitle: "Développement Web Sur-Mesure | OuezCorp",
    seoDescription:
      "Applications web performantes avec Next.js 15 & WordPress Headless. Architecture robuste, score Lighthouse > 95, livraison en 4 à 8 semaines. Basé à Cotonou.",
    content: `
      <h2>Développement Web Headless : Performance & Évolutivité</h2>
      <p>Chez OuezCorp, le développement web n'est pas un simple assemblage de templates. Nous concevons des <strong>architectures découplées</strong> qui séparent le front-end (Next.js 15) du back-end (WordPress via WPGraphQL), offrant des performances inégalées et une flexibilité maximale.</p>

      <h3>Notre stack technique</h3>
      <ul>
        <li><strong>Next.js 15</strong> avec App Router, Server Components et Turbopack pour des builds ultra-rapides</li>
        <li><strong>React 19</strong> avec les dernières optimisations de rendu concurrent</li>
        <li><strong>TypeScript 5</strong> pour une base de code robuste et maintenable</li>
        <li><strong>Tailwind CSS v4</strong> pour un design system cohérent et performant</li>
        <li><strong>WordPress 6</strong> comme CMS headless via WPGraphQL</li>
        <li><strong>Vercel Edge Network</strong> pour un déploiement mondial à faible latence</li>
      </ul>

      <h3>Ce que vous obtenez</h3>
      <p>Chaque projet web que nous livrons garantit :</p>
      <ul>
        <li>Score <strong>Lighthouse > 95</strong> sur les 4 axes (Performance, Accessibilité, SEO, Bonnes pratiques)</li>
        <li>Chargement initial <strong>< 1 seconde</strong> grâce au ISR (Incremental Static Regeneration)</li>
        <li>Architecture <strong>scalable</strong> qui supporte des pics de trafic sans dégradation</li>
        <li>Code source <strong>documenté et livré</strong> — vous êtes propriétaire de votre solution</li>
        <li>Maintenance corrective <strong>3 mois incluse</strong> après la mise en production</li>
      </ul>

      <h3>Processus de développement</h3>
      <p>Nous travaillons en <strong>sprints bi-hebdomadaires</strong> avec un accès à l'environnement de staging dès la première semaine. Les tests E2E avec Playwright et le CI/CD via GitHub Actions garantissent la stabilité à chaque déploiement.</p>

      <h3>Types de projets réalisés</h3>
      <ul>
        <li>Sites vitrines & portfolios haute performance</li>
        <li>Applications SaaS avec tableau de bord administrateur</li>
        <li>Plateformes de contenu multi-auteurs</li>
        <li>Intégrations d'API tierces (CRM, ERP, paiement)</li>
      </ul>
    `,
  },
  {
    slug: "seo",
    title: "SEO & Visibilité",
    excerpt:
      "Audit technique, optimisation Core Web Vitals et stratégie de contenu avancée. Boostez votre trafic organique et dominez les résultats de recherche.",
    tags: ["Core Web Vitals", "Schema.org", "GA4", "Search Console"],
    icon: Search,
    seoTitle: "SEO Technique & Stratégie de Contenu | OuezCorp",
    seoDescription:
      "Audit Core Web Vitals, structured data Schema.org, stratégie de contenu. +280 % de trafic organique en moyenne. Rapport mensuel inclus.",
    content: `
      <h2>SEO Technique : Dominez les Résultats de Recherche</h2>
      <p>Le SEO ne se résume pas aux mots-clés. Une <strong>architecture technique solide</strong> est le fondement de toute stratégie de visibilité durable. Nos audits vont au fond des choses : Core Web Vitals, structured data, crawlabilité, et signaux d'autorité.</p>

      <h3>Audit SEO Technique Complet</h3>
      <ul>
        <li>Analyse des <strong>Core Web Vitals</strong> (LCP, INP, CLS) et plan d'action priorisé</li>
        <li>Audit de la <strong>structure URL</strong>, canonicals et gestion des redirections</li>
        <li>Vérification du <strong>crawl budget</strong> et optimisation du fichier robots.txt</li>
        <li>Analyse des <strong>backlinks</strong> et identification des opportunités de netlinking</li>
        <li>Audit du <strong>contenu dupliqué</strong> et des pages orphelines</li>
      </ul>

      <h3>Données Structurées Schema.org</h3>
      <p>Nous implémentons les <strong>rich snippets</strong> adaptés à votre activité : Organisation, LocalBusiness, Article, BreadcrumbList, FAQ, Product. Résultat : une meilleure visibilité dans les SERP avec des extraits enrichis.</p>

      <h3>Stratégie de Contenu</h3>
      <ul>
        <li>Recherche sémantique et identification des <strong>clusters de contenu</strong></li>
        <li>Optimisation des métadonnées (title, description, OG tags)</li>
        <li>Création de <strong>sitemaps dynamiques</strong> avec priorités et fréquences</li>
        <li>Configuration <strong>hreflang</strong> pour les sites multilingues</li>
      </ul>

      <h3>Suivi & Reporting</h3>
      <p>Chaque mois, vous recevez un <strong>rapport détaillé</strong> incluant : évolution des positions, trafic GA4, Core Web Vitals depuis Search Console, et les 3 actions prioritaires du mois suivant.</p>

      <h3>Résultats observés</h3>
      <ul>
        <li><strong>+280 %</strong> de trafic organique en moyenne sur 6 mois</li>
        <li><strong>Top 3</strong> sur les requêtes cibles principales en 4 à 6 mois</li>
        <li><strong>-40 %</strong> de taux de rebond grâce à l'amélioration de la vitesse</li>
      </ul>
    `,
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    excerpt:
      "Suivi informatique proactif, mises à jour de sécurité et monitoring continu. Un support réactif pour garantir la stabilité de votre activité.",
    tags: ["Monitoring", "Sécurité", "Sentry", "Uptime"],
    icon: LifeBuoy,
    seoTitle: "Maintenance & Support Informatique | OuezCorp",
    seoDescription:
      "Maintenance proactive, monitoring 24/7, mises à jour de sécurité et support réactif. Garantissez la disponibilité et la sécurité de votre infrastructure web.",
    content: `
      <h2>Maintenance & Support : Votre Infrastructure en Bonnes Mains</h2>
      <p>Un site web n'est pas un produit fini — c'est un actif vivant qui nécessite une attention constante. Notre service de maintenance <strong>proactive</strong> garantit la disponibilité, la sécurité et les performances de votre infrastructure numérique.</p>

      <h3>Monitoring Continu 24/7</h3>
      <ul>
        <li>Surveillance de la <strong>disponibilité</strong> (uptime monitoring avec alertes instantanées)</li>
        <li>Monitoring des <strong>performances</strong> en production (Lighthouse CI, Web Vitals)</li>
        <li>Suivi des <strong>erreurs JavaScript</strong> en temps réel via Sentry</li>
        <li>Alertes <strong>Core Web Vitals</strong> dès qu'un seuil est franchi</li>
        <li>Surveillance des <strong>certificats SSL</strong> et renouvellement automatique</li>
      </ul>

      <h3>Mises à Jour de Sécurité</h3>
      <p>La cybersécurité est au cœur de notre approche. Chaque semaine, nous :</p>
      <ul>
        <li>Appliquons les <strong>patches de sécurité</strong> critiques (WordPress, plugins, dépendances)</li>
        <li>Analysons les <strong>vulnérabilités</strong> CVE affectant votre stack</li>
        <li>Effectuons des <strong>scans de malware</strong> et vérifications d'intégrité</li>
        <li>Maintenant les <strong>backups quotidiens</strong> chiffrés avec rotation 30 jours</li>
      </ul>

      <h3>Support Technique Réactif</h3>
      <ul>
        <li>Ticket traité en <strong>moins de 4 heures ouvrées</strong> pour les incidents critiques</li>
        <li>Accès à un <strong>espace client dédié</strong> pour le suivi des demandes</li>
        <li>Rapport mensuel : performances, incidents, actions réalisées</li>
        <li>Conseil stratégique inclus : recommandations d'amélioration continues</li>
      </ul>

      <h3>Formules disponibles</h3>
      <ul>
        <li><strong>Essentiel</strong> — Monitoring + mises à jour + support email</li>
        <li><strong>Pro</strong> — Essentiel + audits trimestriels + 5 h d'interventions incluses</li>
        <li><strong>Premium</strong> — Pro + astreinte fine de semaine + SLA garanti 99,9 %</li>
      </ul>
    `,
  },
  {
    slug: "design-identite",
    title: "Design & Identité Visuelle",
    excerpt:
      "Conception d'interfaces UI/UX premium, création de logos et chartes graphiques. Une identité forte pour marquer durablement vos utilisateurs.",
    tags: ["Figma", "UI/UX", "Branding", "WCAG 2.1"],
    icon: PenTool,
    seoTitle: "Design UI/UX & Identité Visuelle | OuezCorp",
    seoDescription:
      "Design System Figma, interfaces accessibles WCAG 2.1 AA, logos et chartes graphiques. Prototype validé avant tout développement.",
    content: `
      <h2>Design & Identité Visuelle : L'Expérience Avant Tout</h2>
      <p>Un bon design n'est pas beau — il <strong>convertit</strong>. Notre approche UX-first part toujours des besoins utilisateurs et des objectifs business pour créer des interfaces qui guident naturellement vers l'action souhaitée.</p>

      <h3>Design System & Composants</h3>
      <ul>
        <li>Conception d'un <strong>Design System complet dans Figma</strong> : couleurs, typographies, espacements, composants atomiques</li>
        <li>Export vers <strong>Storybook</strong> pour une documentation interactive des composants</li>
        <li>Composants <strong>accessibles WCAG 2.1 AA</strong> — conformité légale et meilleure expérience pour tous</li>
        <li>Animations avec <strong>Framer Motion</strong> — fluides, intentionnelles, sans impact sur les performances</li>
      </ul>

      <h3>Identité de Marque</h3>
      <ul>
        <li>Création de <strong>logo</strong> : moodboard, esquisses, déclinaisons vectorielles</li>
        <li><strong>Charte graphique</strong> complète : palette de couleurs, typographies, iconographie, ton éditorial</li>
        <li>Templates pour les <strong>supports de communication</strong> : présentations, documents commerciaux, réseaux sociaux</li>
        <li>Kit de <strong>brand guidelines</strong> pour assurer la cohérence sur tous vos canaux</li>
      </ul>

      <h3>UX Research & Prototypage</h3>
      <p>Avant d'écrire une seule ligne de code, chaque écran est <strong>prototypé et validé</strong> avec vous :</p>
      <ul>
        <li>Wireframes fonctionnels basse fidélité</li>
        <li>Maquettes haute fidélité avec interactions Figma</li>
        <li>Tests utilisateurs (5 sessions minimum) et itérations</li>
        <li>Handoff développement structuré avec annotations de specs</li>
      </ul>

      <h3>Résultats mesurables</h3>
      <ul>
        <li><strong>+35 %</strong> de taux de conversion moyen après refonte UX</li>
        <li><strong>-50 %</strong> de tickets support liés à la navigation</li>
        <li>Score <strong>accessibilité Lighthouse > 95</strong> systématiquement</li>
      </ul>
    `,
  },
  {
    slug: "visuels-motion",
    title: "Visuels & Motion Design",
    excerpt:
      "Création de visuels engageants et d'animations dynamiques. Donnez vie à votre marque avec des éléments visuels modernes et percutants.",
    tags: ["After Effects", "Figma", "Lottie", "SVG Animation"],
    icon: MonitorPlay,
    seoTitle: "Motion Design & Visuels Engageants | OuezCorp",
    seoDescription:
      "Animations web, motion graphics, visuels de marque. Donnez vie à votre communication digitale avec des créations percutantes et optimisées pour le web.",
    content: `
      <h2>Visuels & Motion Design : Donnez Vie à Votre Marque</h2>
      <p>Dans un flux d'information saturé, le <strong>mouvement capte l'attention</strong>. Nos créations motion design ne sont pas des ornements — elles sont des outils de communication qui expliquent, engagent et mémorisent.</p>

      <h3>Animations Web Optimisées</h3>
      <ul>
        <li><strong>Micro-interactions</strong> : feedback visuels sur boutons, formulaires, états de chargement</li>
        <li><strong>Animations de scroll</strong> (parallax, révélations progressives) avec impact minimal sur les Core Web Vitals</li>
        <li><strong>Lottie animations</strong> exportées depuis After Effects — légères et vectorielles</li>
        <li><strong>SVG animés</strong> pour des illustrations de marque uniques et scalables</li>
        <li>Transitions de page fluides avec <strong>Framer Motion</strong> et View Transitions API</li>
      </ul>

      <h3>Motion Graphics</h3>
      <ul>
        <li>Animations de <strong>logo</strong> (intro, boucle, version simplifiée)</li>
        <li>Teasers et <strong>bumpers de marque</strong> pour les réseaux sociaux</li>
        <li><strong>Vidéos explicatives</strong> animées (2D) pour présenter un service ou un produit</li>
        <li>Templates <strong>stories Instagram / Reels</strong> animés et personnalisables</li>
      </ul>

      <h3>Visuels Statiques Premium</h3>
      <ul>
        <li>Illustrations <strong>sur-mesure</strong> en harmonie avec votre identité visuelle</li>
        <li>Infographies <strong>data-driven</strong> pour rendre vos chiffres parlants</li>
        <li>Visuels <strong>Open Graph</strong> automatisés pour un partage social cohérent</li>
        <li>Assets pour campagnes <strong>Google Display</strong> et Meta Ads</li>
      </ul>

      <h3>Notre workflow</h3>
      <p>Chaque création passe par un brief détaillé, une planche d'inspiration validée avec vous, puis 2 rounds de révisions. Livraison en formats multiples (Web, Print, Social) avec les <strong>fichiers sources</strong>.</p>
    `,
  },
  {
    slug: "production-video",
    title: "Production Vidéo",
    excerpt:
      "Réalisation, montage et habillage vidéo professionnels. Des contenus immersifs pour magnifier vos campagnes et votre communication.",
    tags: ["Réalisation", "Montage", "Color Grading", "Motion"],
    icon: Video,
    seoTitle: "Production Vidéo Professionnelle | OuezCorp",
    seoDescription:
      "Réalisation, montage, color grading et habillage motion. Films d'entreprise, vidéos de marque et contenus social media percutants.",
    content: `
      <h2>Production Vidéo : Des Contenus qui Marquent les Esprits</h2>
      <p>La vidéo est le format le plus consommé sur internet. Mais une vidéo mal réalisée peut nuire à votre image. Notre équipe produit des contenus <strong>professionnels et stratégiques</strong> qui renforcent votre crédibilité et boostent vos conversions.</p>

      <h3>Films d'Entreprise & Marque</h3>
      <ul>
        <li><strong>Films institutionnels</strong> : présentation de l'entreprise, valeurs, équipes</li>
        <li><strong>Vidéos de produit</strong> : démonstrations, unboxing, hero shots</li>
        <li><strong>Témoignages clients</strong> filmés et montés avec motion design</li>
        <li><strong>Films événementiels</strong> : conférences, lancements, inaugurations</li>
      </ul>

      <h3>Contenus Social Media</h3>
      <ul>
        <li>Reels et <strong>vidéos courtes</strong> optimisées pour Instagram, TikTok, LinkedIn</li>
        <li>Séries de contenus <strong>éducatifs</strong> ou informatifs (formats 9:16, 1:1, 16:9)</li>
        <li>Publicités vidéo pour <strong>Meta Ads et Google Video</strong> (pre-roll, bumper)</li>
        <li>Live event <strong>recaps</strong> en 24h</li>
      </ul>

      <h3>Post-Production</h3>
      <ul>
        <li><strong>Montage narratif</strong> : rythme, structure, storytelling</li>
        <li><strong>Color grading</strong> cinématographique cohérent avec votre charte</li>
        <li>Habillage <strong>motion design</strong> : titres, lower thirds, génériques, transitions</li>
        <li><strong>Sound design</strong> et mixage audio professionnel</li>
        <li>Sous-titres <strong>accessibles</strong> en français et anglais</li>
      </ul>

      <h3>Livraison</h3>
      <p>Chaque projet inclut les <strong>formats optimisés</strong> pour chaque plateforme (web, mobile, TV), les fichiers sources, et une version adaptée aux publications sponsorisées.</p>
    `,
  },
  {
    slug: "gestion-reseaux-sociaux",
    title: "Gestion de Réseaux Sociaux",
    excerpt:
      "Stratégie de communication, création de contenu régulier et animation de communauté. Engagez votre audience et développez un lien unique.",
    tags: ["Instagram", "LinkedIn", "Meta Ads", "Community Management"],
    icon: Share2,
    seoTitle: "Gestion Réseaux Sociaux & Community Management | OuezCorp",
    seoDescription:
      "Stratégie social media, création de contenu, community management et publicité Meta/LinkedIn. Développez votre présence digitale en Afrique de l'Ouest.",
    content: `
      <h2>Gestion de Réseaux Sociaux : Une Présence Digitale Cohérente</h2>
      <p>Les réseaux sociaux ne sont pas un canal de plus — ils sont la <strong>vitrine de votre marque</strong> auprès de votre communauté. Une gestion stratégique et régulière transforme vos abonnés en ambassadeurs.</p>

      <h3>Stratégie Editoriale</h3>
      <ul>
        <li>Audit de votre présence actuelle et analyse des <strong>concurrents</strong></li>
        <li>Définition des <strong>personas</strong> et des objectifs par plateforme</li>
        <li>Création d'un <strong>calendrier éditorial mensuel</strong> avec thèmes, formats et fréquences</li>
        <li>Charte tonale et <strong>guide de voix de marque</strong></li>
      </ul>

      <h3>Création de Contenu</h3>
      <ul>
        <li>Visuels <strong>sur-mesure</strong> adaptés à chaque format (feed, stories, reels, LinkedIn)</li>
        <li>Rédaction de <strong>captions optimisées</strong> avec hashtags stratégiques</li>
        <li>Contenus vidéo courts <strong>Reels / TikTok</strong> tendance et engageants</li>
        <li>Infographies et <strong>carousels</strong> éducatifs pour booster la portée organique</li>
      </ul>

      <h3>Community Management</h3>
      <ul>
        <li><strong>Animation quotidienne</strong> : réponses aux commentaires et messages privés</li>
        <li>Veille sur les <strong>mentions de marque</strong> et gestion de la réputation</li>
        <li>Gestion des <strong>situations de crise</strong> avec protocole pré-défini</li>
        <li>Partenariats avec des <strong>créateurs locaux</strong> pertinents pour votre niche</li>
      </ul>

      <h3>Publicité Digitale</h3>
      <ul>
        <li>Campagnes <strong>Meta Ads</strong> (Facebook & Instagram) avec A/B testing créatifs</li>
        <li>Publicités <strong>LinkedIn</strong> pour les cibles B2B</li>
        <li>Optimisation continue des <strong>CPC et CPM</strong> pour maximiser le ROI</li>
        <li>Rapport mensuel avec KPIs : portée, engagement, conversions, ROAS</li>
      </ul>
    `,
  },
];

export const fallbackServicesBySlug: Record<string, ServiceData> =
  Object.fromEntries(fallbackServices.map((s) => [s.slug, s]));
