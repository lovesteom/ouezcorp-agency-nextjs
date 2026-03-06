import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "47+", label: "Projets livrés" },
  { value: "< 1 s", label: "Chargement moyen" },
  { value: "95+", label: "Score Lighthouse" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0b0b0b] pt-28">
      {/* Gradient orb de fond */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-amber-400/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full py-20">
        {/* Badge */}
        <div className="flex justify-center mb-14">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#2a2a2a] text-xs text-gray-400 bg-[#161616]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Agence IT · Cybersécurité · Développement Web · Bénin
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-6xl sm:text-7xl md:text-[96px] font-bold tracking-tight leading-[0.9] text-white">
            Des solutions IT qui protègent et font 
          </h1>
          <h1 className="text-6xl sm:text-7xl md:text-[96px] font-bold tracking-tight leading-[0.9] text-amber-400 animate-pulse">
            <span className="text-white">croître votre</span> business.
          </h1>
        </div>

        {/* Sous-titre */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-center mb-12 leading-relaxed">
         WordPress, React JS et Java pour des sites performants. Cybersécurité, cloud et audit IT pour une infrastructure solide. Basés à Cotonou, on intervient partout en Afrique de l'Ouest.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-full transition-all text-sm"
          >
            Démarrer un projet <ArrowRight size={16} />
          </Link>
          <Link
            href="/realisations"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#2a2a2a] hover:bg-white/5 text-white font-medium rounded-full transition-all text-sm"
          >
            Voir nos réalisations
          </Link>
        </div>

        {/* Tech row */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {[
            "Next.js 15",
            "React 19",
            "WordPress",
            "WPGraphQL",
            "Vercel",
            "TypeScript 5",
          ].map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 bg-[#161616] border border-[#2a2a2a] rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 border-t border-[#222222] pt-12 max-w-lg mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
