import { prisma } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const revalidate = 60; // Revalide toutes les 60s

export default async function VideosPage() {
  const videos = await prisma.video.findMany({
    where: { published: true },
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="py-20">
        <div className="container mx-auto px-6">

          {/* En-tête */}
          <div className="text-center mb-16">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors mb-6"
            >
              <i className="ri-arrow-left-line"></i>
              Retour
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">Tous mes projets</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez l'ensemble de mes réalisations vidéo.
            </p>
          </div>

          {/* Grille de vidéos */}
          {videos.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <i className="ri-film-line text-5xl block mb-4"></i>
              <p>Aucune vidéo publiée pour le moment.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:border-cyan-500/40 transition-all duration-300">
                    {/* Miniature */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      {/* Bouton play au survol */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full">
                          <i className="ri-play-fill text-white text-2xl ml-1"></i>
                        </div>
                      </div>
                    </div>

                    {/* Infos */}
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-base mb-1 group-hover:text-cyan-400 transition-colors">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
                      )}
                      <div className="flex items-center gap-1 mt-3 text-gray-500 text-xs">
                        <i className="ri-youtube-line"></i>
                        <span>Voir sur YouTube</span>
                        <i className="ri-external-link-line ml-auto"></i>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
