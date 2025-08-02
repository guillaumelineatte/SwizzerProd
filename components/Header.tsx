
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-1">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-1">
            <Image
              src="/logo-swizzer_1080p/logo-swizzer_blanc_1080p.png"
              alt="Swizzer Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
            <span className="text-white font-bold text-lg">Swizzer</span>
          </div>

          <nav className="hidden md:flex items-center space-x-9">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-white hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
            >
              À Propos
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-white hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-white hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
            >
              Projets
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
            >
              Contact
            </button>
            <Link href="/resume" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap cursor-pointer">
              CV
            </Link>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="block text-white hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block text-white hover:text-cyan-400 transition-colors cursor-pointer"
              >
                À Propos
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="block text-white hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="block text-white hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Projets
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block text-white hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Contact
              </button>
              <Link href="/resume" className="block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer">
                CV
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
