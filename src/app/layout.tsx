import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StyloHub - Plataforma Premium para Barbeiros Profissionais",
  description: "Domine a arte da barbearia profissional com cursos exclusivos, agenda inteligente e ferramentas premium. Junte-se a +2.500 barbeiros que estão transformando suas carreiras.",
  keywords: ["barbearia", "corte de cabelo", "barbeiros", "cursos de barbearia", "StyloHub", "reflexo de bolinha", "degradê"],
  authors: [{ name: "StyloHub Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "StyloHub - Plataforma #1 para Barbeiros Profissionais",
    description: "Aprenda com os melhores, organize sua agenda e construa um império na barbearia. Tudo em uma plataforma premium.",
    url: "https://stylohub.com",
    siteName: "StyloHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StyloHub - Plataforma Premium para Barbeiros",
    description: "Domine a arte da barbearia profissional com cursos exclusivos e ferramentas premium.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${plusJakarta.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
