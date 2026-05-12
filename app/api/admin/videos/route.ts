import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { extractYouTubeVideoId, getThumbnailUrl } from '@/lib/youtube';

// GET — liste toutes les vidéos (admin)
export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json(videos);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST — créer une vidéo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { youtubeUrl, title, description, published, displayOrder } = body;

    if (!youtubeUrl || !title) {
      return NextResponse.json({ error: 'youtubeUrl et title sont requis' }, { status: 400 });
    }

    const youtubeVideoId = extractYouTubeVideoId(youtubeUrl);
    if (!youtubeVideoId) {
      return NextResponse.json({ error: 'URL YouTube invalide' }, { status: 400 });
    }

    const thumbnailUrl = getThumbnailUrl(youtubeVideoId);

    const video = await prisma.video.create({
      data: {
        youtubeUrl: youtubeUrl.trim(),
        youtubeVideoId,
        title: title.trim(),
        thumbnailUrl,
        description: description?.trim() || null,
        published: published ?? true,
        displayOrder: displayOrder ?? 0,
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return NextResponse.json({ error: 'Cette vidéo YouTube existe déjà' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
