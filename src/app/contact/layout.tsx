import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlons de votre projet ! Contactez OuezCorp pour un devis personnalisé : développement web, e-commerce, SEO ou accompagnement digital.",
  alternates: {
    canonical: "https://ouezcorp.com/contact",
  },
  openGraph: {
    title: "Contactez OuezCorp",
    description:
      "Décrivez votre projet et recevez un devis en 24h. Développement web, SEO, e-commerce et plus.",
    url: "https://ouezcorp.com/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
