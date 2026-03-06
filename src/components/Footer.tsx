import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0b0b] border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grand CTA */}
        <div className="py-24 text-center border-b border-[#222222]">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-5">
            Travaillons ensemble
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-10">
            <span className="text-white">Démarrons votre</span>
            <br />
            <span className="text-gray-500">prochain projet.</span>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-full transition-all"
          >
            Prendre contact <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Grille infos */}
        <div className="grid md:grid-cols-4 gap-12 py-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-base font-bold text-white">OuezCorp</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Agence digitale spécialisée en architecture Headless
              WordPress + Next.js, SEO technique et performance web sur-mesure.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Services", href: "/services" },
                { label: "Réalisations", href: "/realisations" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail size={13} className="shrink-0" />
                <a
                  href="mailto:contact@ouezcorp.com"
                  className="hover:text-white transition-colors"
                >
                  contact@ouezcorp.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin size={13} className="shrink-0" />
                <span>France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-[#222222] py-8 gap-4">
          <p className="text-gray-400 text-xs">
            © {year} OuezCorp. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-xs transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-xs transition-colors"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
