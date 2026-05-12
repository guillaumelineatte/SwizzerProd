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
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-swizzer_1080p/logo-swizzer_coin_1080p.png"
              alt="Swizzer Prod"
              width={36}
              height={36}
              className="object-contain"
            />
            <div>
              <span className="text-white font-bold text-sm">Swizzer Prod</span>
              <span className="text-cyan-400 text-xs block">Administration</span>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <a
              href="/admin"
              className={`text-sm font-medium transition-colors ${
                pathname === '/admin'
                  ? 'text-cyan-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <i className="ri-film-line mr-1"></i>
              Vidéos
            </a>
            <a
              href="/"
              target="_blank"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              <i className="ri-external-link-line mr-1"></i>
              Voir le site
            </a>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              <i className="ri-logout-box-line mr-1"></i>
              Déconnexion
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
