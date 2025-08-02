
'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-center space-x-6 mb-6">
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-400">
            ©2025 Swizzer Prod. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-3">
            <video
              src="/logo-swizzer_1080p/logo-Swizzer_1080p-60fps.mp4"
              autoPlay
              loop
              muted
              playsInline
              width={90}
              height={90}
              className="object-contain"
            />
            <p className="text-white font-midfielder text-lg">
              Swizzer Prod
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
