import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const bricolageGrotesque = localFont({
  src: [
    {
      path: "../../public/font/Bricolage_Grotesque/static/BricolageGrotesque-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/Bricolage_Grotesque/static/BricolageGrotesque-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/Bricolage_Grotesque/static/BricolageGrotesque-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/Bricolage_Grotesque/static/BricolageGrotesque-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/Bricolage_Grotesque/static/BricolageGrotesque-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/Bricolage_Grotesque/static/BricolageGrotesque-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

const notoSans = localFont({
  src: [
    {
      path: "../../public/font/Noto_Sans/static/NotoSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/Noto_Sans/static/NotoSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/Noto_Sans/static/NotoSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/Noto_Sans/static/NotoSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/Noto_Sans/static/NotoSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/Noto_Sans/static/NotoSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://ouezcorp.com";
const SITE_NAME = "OuezCorp";
const SITE_DESCRIPTION =
  "Agence digitale spécialisée en architecture Headless WordPress + Next.js, cybersécurité, cloud et SEO technique. Basés à Cotonou, on intervient partout en Afrique de l'Ouest.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Agence IT & Développement Web · Bénin`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/Ouez-corp-fav.jpg",
    shortcut: "/Ouez-corp-fav.jpg",
    apple: "/Ouez-corp-fav.jpg",
  },
  openGraph: {
    title: `${SITE_NAME} — Agence IT & Développement Web · Bénin`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/LogoOuez-corp.webp",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Agence IT & Développement Web`,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Agence IT & Développement Web · Bénin`,
    description: SITE_DESCRIPTION,
    images: ["/images/LogoOuez-corp.webp"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${bricolageGrotesque.variable} ${notoSans.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
