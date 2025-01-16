import './globals.css';
import { SessionProvider } from "next-auth/react";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import { getServerSession } from 'next-auth';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Imobiliária BC - Seu Imóvel em Balneário Camboriú',
  description: 'Encontre o imóvel dos seus sonhos em Balneário Camboriú. Casas, apartamentos e terrenos disponíveis para venda ou locação.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = getServerSession();
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {/* <SessionProvider> */}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}