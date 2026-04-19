"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, Clock, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  }

  return (
    <div className="bg-(--bg) min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-6 py-32">
        {/* Header */}
        <div className="mb-20">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
            Discutons
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <h1 className="text-5xl md:text-7xl font-bold text-(--fg) tracking-tight leading-[0.92]">
              Parlons de
              <br />
              votre projet.
            </h1>
            <p className="text-(--fg-2) text-lg leading-relaxed max-w-md">
              Remplissez le formulaire et nous vous revenons sous 24&nbsp;h avec
              une proposition adaptée à vos besoins.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Infos */}
          <div className="md:col-span-2 space-y-4">
            {[
              {
                icon: Mail,
                title: "Email",
                content: (
                  <a
                    href="mailto:contact@ouezcorp.com"
                    className="text-(--fg-2) hover:text-(--fg) transition-colors text-sm"
                  >
                    contact@ouezcorp.com
                  </a>
                ),
              },
              {
                icon: Clock,
                title: "Délai de réponse",
                content: (
                  <p className="text-(--fg-2) text-sm">
                    Sous 24 heures ouvrées
                  </p>
                ),
              },
              {
                icon: MessageSquare,
                title: "Appel découverte",
                content: (
                  <p className="text-(--fg-2) text-sm">
                    Gratuit — 30 min pour discuter de votre projet
                  </p>
                ),
              },
            ].map(({ icon: Icon, title, content }) => (
              <div
                key={title}
                className="p-6 bg-(--bg-card) border border-(--border) rounded-2xl"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 mb-4">
                  <Icon size={19} />
                </div>
                <h3 className="text-(--fg) font-semibold text-sm mb-2">
                  {title}
                </h3>
                {content}
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <div className="md:col-span-3">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-16 bg-(--bg-card) border border-amber-400/20 rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-amber-400/10 flex items-center justify-center mb-6">
                  <ArrowUpRight size={30} className="text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-(--fg) mb-3">
                  Message envoyé !
                </h3>
                <p className="text-(--fg-2) text-sm">
                  Nous vous revenons sous 24&nbsp;h. À très vite&nbsp;!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-8 bg-(--bg-card) border border-(--border) rounded-2xl"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-(--fg-3) uppercase tracking-wider mb-2"
                    >
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 bg-(--bg) border border-(--border) rounded-xl focus:ring-1 focus:ring-(--accent-border) focus:border-(--accent-border) outline-none transition-all text-(--fg) placeholder:text-(--fg-3) text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-(--fg-3) uppercase tracking-wider mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 bg-(--bg) border border-(--border) rounded-xl focus:ring-1 focus:ring-(--accent-border) focus:border-(--accent-border) outline-none transition-all text-(--fg) placeholder:text-(--fg-3) text-sm"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold text-(--fg-3) uppercase tracking-wider mb-2"
                  >
                    Type de projet
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 bg-(--bg) border border-(--border) rounded-xl focus:ring-1 focus:ring-(--accent-border) focus:border-(--accent-border) outline-none transition-all text-(--fg) text-sm"
                  >
                    <option>Site Vitrine Headless</option>
                    <option>E-commerce sur mesure</option>
                    <option>Refonte & Migration</option>
                    <option>Audit & Performance SEO</option>
                    <option>Autre demande</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-xs font-semibold text-(--fg-3) uppercase tracking-wider mb-2"
                  >
                    Budget indicatif
                  </label>
                  <select
                    id="budget"
                    className="w-full px-4 py-3 bg-(--bg) border border-(--border) rounded-xl focus:ring-1 focus:ring-(--accent-border) focus:border-(--accent-border) outline-none transition-all text-(--fg) text-sm"
                  >
                    <option>Moins de 5 000 €</option>
                    <option>5 000 € – 15 000 €</option>
                    <option>15 000 € – 30 000 €</option>
                    <option>Plus de 30 000 €</option>
                    <option>Je ne sais pas encore</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-(--fg-3) uppercase tracking-wider mb-2"
                  >
                    Votre projet
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-(--bg) border border-(--border) rounded-xl focus:ring-1 focus:ring-(--accent-border) focus:border-(--accent-border) outline-none transition-all text-(--fg) placeholder:text-(--fg-3) resize-none text-sm"
                    placeholder="Décrivez votre projet, vos objectifs et vos contraintes…"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? (
                    "Envoi en cours…"
                  ) : (
                    <>
                      Envoyer le message <ArrowUpRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ */}
        <section className="pt-16 mt-4 border-t border-(--border)">
          <h2 className="text-2xl font-bold text-(--fg) mb-8">
            Questions fréquentes
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                q: "Quel est le coût d'un site headless ?",
                a: "Les forfaits démarrent à 5 000 € pour un site vitrine jusqu'à 30 000 €+ pour une plateforme e-commerce complexe. Chaque projet est devisé sur-mesure après un premier échange gratuit.",
              },
              {
                q: "Combien de temps prend la réalisation ?",
                a: "De 4 semaines pour un site vitrine à 8–12 semaines pour un e-commerce complet. Le délai est fixé contractuellement dès le démarrage du projet.",
              },
              {
                q: "Gardons-nous la main sur le contenu ?",
                a: "Oui. WordPress reste votre CMS habituel. Vous gérez articles, pages et médias depuis l'interface classique, sans aucune compétence technique requise.",
              },
              {
                q: "Que se passe-t-il après la livraison ?",
                a: "3 mois de maintenance corrective inclus dans chaque forfait. Un contrat de support mensuel (mises à jour, sauvegardes, monitoring) est ensuite disponible en option.",
              },
            ].map(({ q, a }) => (
              <div
                key={q}
                className="p-6 bg-(--bg-card) border border-(--border) rounded-2xl"
              >
                <h3 className="text-(--fg) font-semibold text-sm mb-2">{q}</h3>
                <p className="text-(--fg-2) text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
