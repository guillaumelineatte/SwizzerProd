import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Pré-remplissage avec les 3 vidéos déjà présentes sur le site
  const videos = [
    {
      youtubeUrl: 'https://www.youtube.com/watch?v=zTaxhA-QTU0',
      youtubeVideoId: 'zTaxhA-QTU0',
      title: 'Podcast',
      thumbnailUrl: 'https://img.youtube.com/vi/zTaxhA-QTU0/hqdefault.jpg',
      description: null,
      published: true,
      displayOrder: 0,
    },
    {
      youtubeUrl: 'https://www.youtube.com/watch?v=TlQSxtZN3EA',
      youtubeVideoId: 'TlQSxtZN3EA',
      title: 'Concept',
      thumbnailUrl: 'https://img.youtube.com/vi/TlQSxtZN3EA/hqdefault.jpg',
      description: null,
      published: true,
      displayOrder: 1,
    },
    {
      youtubeUrl: 'https://www.youtube.com/watch?v=2ShuHJMoXAY',
      youtubeVideoId: '2ShuHJMoXAY',
      title: 'Débat',
      thumbnailUrl: 'https://img.youtube.com/vi/2ShuHJMoXAY/hqdefault.jpg',
      description: null,
      published: true,
      displayOrder: 2,
    },
  ];

  for (const video of videos) {
    await prisma.video.upsert({
      where: { youtubeVideoId: video.youtubeVideoId },
      update: {},
      create: video,
    });
  }

  console.log('Base de données initialisée avec les vidéos existantes.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
