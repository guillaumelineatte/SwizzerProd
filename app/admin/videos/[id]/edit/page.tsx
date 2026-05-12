import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import VideoForm from '@/components/admin/VideoForm';
import type { Video } from '@/types/video';

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const videoId = parseInt(id, 10);

  if (isNaN(videoId)) notFound();

  const video = await prisma.video.findUnique({ where: { id: videoId } });
  if (!video) notFound();

  // Conversion du type Prisma vers notre interface Video
  const videoData: Video = {
    ...video,
    description: video.description ?? null,
    createdAt: video.createdAt.toISOString(),
    updatedAt: video.updatedAt.toISOString(),
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <a href="/admin" className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1 mb-4">
          <i className="ri-arrow-left-line"></i>
          Retour au dashboard
        </a>
        <h1 className="text-2xl font-bold text-white">Modifier la vidéo</h1>
        <p className="text-gray-400 text-sm mt-1">{videoData.title}</p>
      </div>

      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <VideoForm video={videoData} />
      </div>
    </div>
  );
}
