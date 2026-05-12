'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Video } from '@/types/video';

export default function AdminDashboard() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function fetchVideos() {
    try {
      const res = await fetch('/api/admin/videos');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setVideos(data);
    } catch {
      console.error('Erreur de chargement des vidéos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  async function togglePublished(video: Video) {
    await fetch(`/api/admin/videos/${video.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !video.published }),
    });
    fetchVideos();
  }

  async function changeOrder(video: Video, direction: 'up' | 'down') {
    const currentIndex = videos.findIndex((v) => v.id === video.id);
    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= videos.length) return;

    const swapVideo = videos[swapIndex];

    await Promise.all([
      fetch(`/api/admin/videos/${video.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayOrder: swapVideo.displayOrder }),
      }),
      fetch(`/api/admin/videos/${swapVideo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayOrder: video.displayOrder }),
      }),
    ]);

    fetchVideos();
  }

  async function deleteVideo(id: number) {
    if (!confirm('Supprimer cette vidéo ? Cette action est irréversible.')) return;
    setDeletingId(id);
    await fetch(`/api/admin/videos/${id}`, { method: 'DELETE' });
    setDeletingId(null);
    fetchVideos();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-gray-400">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Chargement…
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* En-tête */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestion des vidéos</h1>
          <p className="text-gray-400 text-sm mt-1">
            {videos.length} vidéo{videos.length !== 1 ? 's' : ''} au total ·{' '}
            {videos.filter((v) => v.published).length} publiée{videos.filter((v) => v.published).length !== 1 ? 's' : ''}
          </p>
        </div>
        <a
          href="/admin/videos/new"
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300"
        >
          <i className="ri-add-line"></i>
          Nouvelle vidéo
        </a>
      </div>

      {/* Liste vide */}
      {videos.length === 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-16 text-center">
          <i className="ri-film-line text-5xl text-gray-700 block mb-4"></i>
          <h3 className="text-lg font-semibold text-white mb-2">Aucune vidéo</h3>
          <p className="text-gray-400 text-sm mb-6">Ajoutez votre première vidéo YouTube pour commencer.</p>
          <a
            href="/admin/videos/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all"
          >
            <i className="ri-add-line"></i>
            Ajouter une vidéo
          </a>
        </div>
      )}

      {/* Tableau des vidéos */}
      {videos.length > 0 && (
        <div className="space-y-3">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`bg-gray-900 border rounded-xl p-4 flex items-center gap-4 transition-colors ${
                video.published ? 'border-gray-800' : 'border-gray-800 opacity-60'
              }`}
            >
              {/* Miniature */}
              <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-semibold truncate">{video.title}</h3>
                  <span
                    className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                      video.published
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {video.published ? 'Publié' : 'Masqué'}
                  </span>
                </div>
                {video.description && (
                  <p className="text-gray-400 text-sm truncate">{video.description}</p>
                )}
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-cyan-400 transition-colors truncate block mt-1"
                >
                  <i className="ri-youtube-line mr-1"></i>
                  {video.youtubeVideoId}
                </a>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Ordre */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => changeOrder(video, 'up')}
                    disabled={index === 0}
                    title="Monter"
                    className="p-1 text-gray-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <i className="ri-arrow-up-s-line text-lg"></i>
                  </button>
                  <button
                    onClick={() => changeOrder(video, 'down')}
                    disabled={index === videos.length - 1}
                    title="Descendre"
                    className="p-1 text-gray-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <i className="ri-arrow-down-s-line text-lg"></i>
                  </button>
                </div>

                {/* Toggle publié */}
                <button
                  onClick={() => togglePublished(video)}
                  title={video.published ? 'Masquer' : 'Publier'}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    video.published
                      ? 'text-cyan-400 hover:bg-cyan-500/10'
                      : 'text-gray-500 hover:bg-gray-700'
                  }`}
                >
                  <i className={video.published ? 'ri-eye-line text-lg' : 'ri-eye-off-line text-lg'}></i>
                </button>

                {/* Modifier */}
                <a
                  href={`/admin/videos/${video.id}/edit`}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  title="Modifier"
                >
                  <i className="ri-pencil-line text-lg"></i>
                </a>

                {/* Supprimer */}
                <button
                  onClick={() => deleteVideo(video.id)}
                  disabled={deletingId === video.id}
                  title="Supprimer"
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                >
                  {deletingId === video.id ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <i className="ri-delete-bin-line text-lg"></i>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
