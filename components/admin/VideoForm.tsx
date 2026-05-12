'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { extractYouTubeVideoId, getThumbnailUrl } from '@/lib/youtube';
import type { Video } from '@/types/video';

interface VideoFormProps {
  video?: Video; // Présent en mode édition
}

export default function VideoForm({ video }: VideoFormProps) {
  const router = useRouter();
  const isEditing = !!video;

  const [youtubeUrl, setYoutubeUrl] = useState(video?.youtubeUrl ?? '');
  const [title, setTitle] = useState(video?.title ?? '');
  const [description, setDescription] = useState(video?.description ?? '');
  const [published, setPublished] = useState(video?.published ?? true);
  const [displayOrder, setDisplayOrder] = useState(video?.displayOrder ?? 0);
  const [previewVideoId, setPreviewVideoId] = useState(video?.youtubeVideoId ?? '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Prévisualisation de la miniature en temps réel
  useEffect(() => {
    const id = extractYouTubeVideoId(youtubeUrl);
    setPreviewVideoId(id ?? '');
  }, [youtubeUrl]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      youtubeUrl: youtubeUrl.trim(),
      title: title.trim(),
      description: description.trim() || null,
      published,
      displayOrder,
    };

    try {
      const url = isEditing ? `/api/admin/videos/${video.id}` : '/api/admin/videos';
      const method = isEditing ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Une erreur est survenue');
      }
    } catch {
      setError('Erreur réseau. Réessayez.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* URL YouTube + prévisualisation */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Lien YouTube <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            required
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
          />
          {youtubeUrl && !previewVideoId && (
            <p className="text-red-400 text-xs mt-1">URL YouTube non reconnue</p>
          )}
          {previewVideoId && (
            <p className="text-cyan-400 text-xs mt-1">
              <i className="ri-checkbox-circle-line mr-1"></i>
              ID détecté : {previewVideoId}
            </p>
          )}
        </div>

        {/* Miniature preview */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Aperçu de la miniature
          </label>
          <div className="relative w-full h-36 rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
            {previewVideoId ? (
              <Image
                src={getThumbnailUrl(previewVideoId)}
                alt="Miniature YouTube"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <i className="ri-image-line text-3xl block mb-1"></i>
                  <span className="text-xs">Entrez une URL valide</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Titre */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Titre <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={100}
          placeholder="Ex : Podcast avec Jean-Michel"
          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description courte <span className="text-gray-500">(optionnel)</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
          rows={3}
          placeholder="Courte description affichée sur le site…"
          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition resize-none"
        />
        <p className="text-right text-xs text-gray-500 mt-1">{description.length}/200</p>
      </div>

      {/* Paramètres */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Ordre d'affichage
          </label>
          <input
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
            min={0}
            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
          />
          <p className="text-xs text-gray-500 mt-1">0 = premier affiché</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Statut
          </label>
          <button
            type="button"
            onClick={() => setPublished(!published)}
            className={`w-full px-4 py-3 rounded-lg border font-medium text-sm transition-all cursor-pointer ${
              published
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <i className={`mr-2 ${published ? 'ri-eye-line' : 'ri-eye-off-line'}`}></i>
            {published ? 'Publié — visible sur le site' : 'Masqué — non visible'}
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={loading || !previewVideoId}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {isEditing ? 'Enregistrement…' : 'Création…'}
            </span>
          ) : (
            <>{isEditing ? 'Enregistrer les modifications' : 'Créer la vidéo'}</>
          )}
        </button>

        <a
          href="/admin"
          className="px-6 py-3 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-lg font-medium text-sm transition-colors"
        >
          Annuler
        </a>
      </div>
    </form>
  );
}
