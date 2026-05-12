import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { extractYouTubeVideoId, getThumbnailUrl } from '@/lib/youtube';

// PATCH — modifier une vidéo
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const videoId = parseInt(id, 10);
    if (isNaN(videoId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const body = await request.json();
    const { youtubeUrl, title, description, published, displayOrder } = body;

    const data: Record<string, unknown> = {};

    if (youtubeUrl !== undefined) {
      const youtubeVideoId = extractYouTubeVideoId(youtubeUrl);
      if (!youtubeVideoId) {
        return NextResponse.json({ error: 'URL YouTube invalide' }, { status: 400 });
      }
      data.youtubeUrl = youtubeUrl.trim();
      data.youtubeVideoId = youtubeVideoId;
      data.thumbnailUrl = getThumbnailUrl(youtubeVideoId);
    }

    if (title !== undefined) data.title = title.trim();
    if (description !== undefined) data.description = description?.trim() || null;
    if (published !== undefined) data.published = published;
    if (displayOrder !== undefined) data.displayOrder = displayOrder;

    const video = await prisma.video.update({
      where: { id: videoId },
      data,
    });

    return NextResponse.json(video);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Vidéo introuvable' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE — supprimer une vidéo
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const videoId = parseInt(id, 10);
    if (isNaN(videoId)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    await prisma.video.delete({ where: { id: videoId } });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Vidéo introuvable' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
