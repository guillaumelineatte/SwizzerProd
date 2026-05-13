'use client';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-black">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header admin */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo + titre */}
          <div className="flex items-center gap-3 min-w-0">
            <Image
              src="/logo-swizzer_1080p/logo-swizzer_blanc_1080p.png"
              alt="Swizzer Prod"
              width={110}
              height={40}
              className="object-contain flex-shrink-0"
            />
            <div className="hidden sm:block h-6 w-px bg-gray-700" />
            <div className="hidden sm:block">
              <span className="text-cyan-400 text-xs font-medium tracking-widest uppercase">Administration</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <a
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/admin'
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <i className="ri-film-line text-base"></i>
              <span className="hidden sm:inline">Vidéos</span>
            </a>
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <i className="ri-external-link-line text-base"></i>
              <span className="hidden sm:inline">Voir le site</span>
            </a>
            <div className="w-px h-5 bg-gray-700 mx-1" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <i className="ri-logout-box-line text-base"></i>
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </nav>

        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}
