import Link from "next/link";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";

const stats = [
  { value: "47+", label: "Projets livrés" },
  { value: "< 1 s", label: "Chargement moyen" },
  { value: "95+", label: "Score Lighthouse" },
];

const techStack = [
  "Next.js 16",
  "React 19",
  "WordPress",
  "WPGraphQL",
  "Vercel",
  "TypeScript 5",
];

const pillars = [
  { icon: Zap, label: "Performance" },
  { icon: Shield, label: "Sécurité" },
  { icon: Globe, label: "Afrique de l'Ouest" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-(--bg) pt-28">
      {/* ── Fond — orb gradient ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Orb principal */}
        <div
          className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[700px] h-[700px] rounded-full
          bg-amber-400/10 blur-[120px]"
        />
        {/* Orb secondaire gauche */}
        <div
          className="absolute top-[60%] left-[10%]
          w-[300px] h-[300px] rounded-full
          bg-orange-500/10 blur-[80px]"
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(var(--fg) 1px, transparent 1px),
              linear-gradient(90deg, var(--fg) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full py-20">
        {/* ── Badge ── */}
        <div className="flex justify-center mb-12">
          <span
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
            border border-(--border) bg-(--bg-card) text-xs text-(--fg-2)
            shadow-[0_2px_12px_rgba(0,0,0,0.1)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--accent) opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-(--accent)" />
            </span>
            Agence IT · Cybersécurité · Développement Web · Bénin
          </span>
        </div>

        {/* ── Piliers ── */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {pillars.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                bg-(--accent-subtle) border border-(--accent-border)
                text-xs font-semibold text-(--accent)"
            >
              <Icon size={12} />
              {label}
            </span>
          ))}
        </div>

        {/* ── Heading ── */}
        <div className="text-center mb-8">
          <h1
            className="text-5xl sm:text-6xl md:text-[88px] font-bold tracking-tight
            leading-[0.92] text-(--fg) mb-4"
          >
            Des solutions IT qui
          </h1>
          <h1
            className="text-5xl sm:text-6xl md:text-[88px] font-bold tracking-tight
            leading-[0.92]"
          >
            <span className="text-(--fg)">protègent et font</span>{" "}
            <span className="text-(--accent)" style={{ fontStyle: "italic" }}>
              croître.
            </span>
          </h1>
        </div>

        {/* ── Sous-titre ── */}
        <p className="text-base md:text-lg text-(--fg-2) max-w-2xl mx-auto text-center mb-10 leading-relaxed">
          WordPress, React JS et Java pour des sites performants. Cybersécurité,
          cloud et audit IT pour une infrastructure solide. Basés à{" "}
          <strong className="text-(--fg) font-semibold">Cotonou</strong>, on
          intervient partout en Afrique de l'Ouest.
        </p>

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link href="/contact" className="btn btn-primary px-8 py-4">
            Démarrer un projet <ArrowRight size={16} />
          </Link>
          <Link href="/realisations" className="btn btn-secondary px-8 py-4">
            Voir nos réalisations
          </Link>
        </div>

        {/* ── Tech row ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {techStack.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 text-[10px] font-semibold text-(--fg-3)
                bg-(--bg-card) border border-(--border) rounded-full
                hover:border-(--border-strong) hover:text-(--fg-2)
                transition-all duration-150 cursor-default"
            >
              {t}
            </span>
          ))}
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-8 border-t border-(--border) pt-12 max-w-lg mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div
                className="text-3xl md:text-4xl font-bold text-(--fg) mb-1
                group-hover:text-(--accent) transition-colors duration-200"
              >
                {stat.value}
              </div>
              <div className="text-xs text-(--fg-3)">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
