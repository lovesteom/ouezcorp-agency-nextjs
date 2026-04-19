import Link from "next/link";
import {
  Mail,
  MapPin,
  ArrowUpRight,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-(--bg) border-t border-(--border)">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Grand CTA ── */}
        <div className="py-24 text-center border-b border-(--border)">
          <p className="text-[11px] font-bold uppercase tracking-widest text-(--accent) mb-5">
            Travaillons ensemble
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-10">
            <span className="text-(--fg)">Démarrons votre</span>
            <br />
            <span className="text-(--fg-3)">prochain projet.</span>
          </h2>
          <Link
            href="/contact"
            className="btn btn-primary px-8 py-4 text-sm shadow-[0_4px_24px_var(--accent-subtle)]
              hover:shadow-[0_8px_40px_var(--accent-border)]"
          >
            Prendre contact <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* ── Grille infos ── */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-5 group w-fit"
            >
              <div
                className="w-7 h-7 rounded-lg bg-(--accent) flex items-center justify-center
                group-hover:scale-105 transition-transform duration-200"
              >
                <span className="w-2 h-2 rounded-full bg-black" />
              </div>
              <span className="text-base font-bold text-(--fg)">OuezCorp</span>
            </Link>
            <p className="text-(--fg-2) text-sm leading-relaxed max-w-xs mb-6">
              Agence digitale spécialisée en architecture Headless WordPress +
              Next.js, cybersécurité et performance web sur-mesure.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-(--border) bg-(--bg-card)
                    flex items-center justify-center text-(--fg-3)
                    hover:border-(--accent-border) hover:text-(--accent)
                    transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-(--fg) font-semibold text-sm mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-(--fg-2) hover:text-(--fg) text-sm transition-colors duration-150
                      hover:translate-x-0.5 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-(--fg) font-semibold text-sm mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@ouezcorp.com"
                  className="flex items-center gap-2 text-(--fg-2) hover:text-(--fg) text-sm
                    transition-colors duration-150"
                >
                  <Mail size={13} className="shrink-0 text-(--accent)" />
                  contact@ouezcorp.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-(--fg-2) text-sm">
                <MapPin size={13} className="shrink-0 text-(--accent)" />
                Cotonou, Bénin
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between
          border-t border-(--border) py-7 gap-4"
        >
          <p className="text-(--fg-3) text-xs">
            © {year} OuezCorp. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {["Mentions légales", "Confidentialité"].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-(--fg-3) hover:text-(--fg-2) text-xs transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
