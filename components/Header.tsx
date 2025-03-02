"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Menu, Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();


  const navigation = [
    { name: "Início", href: "/" },
    { name: "Propriedades", href: "/propriedades" },
    // { name: 'Sobre Nós', href: '/sobre' },
    { name: "Contato", href: "/contato" },
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">ImobiliáriaBC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-medium text-gray-700 hover:text-primary">
                {item.name}
              </Link>
            ))}

            {session ? (
              <>
                <Link href="/propriedades/novo">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Imóvel
                  </Button>
                </Link>
            
                  <Button onClick={() => signOut()}>
                    Logout
                  </Button>
              </>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button type="button" className="text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-700 hover:text-primary px-2"
                  onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>
              ))}

              {session ? (
                <>
                <Link href="/propriedades/novo" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Imóvel
                  </Button>
                </Link>
                <Button onClick={() => signOut()}>
                    Logout
                  </Button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Login</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
