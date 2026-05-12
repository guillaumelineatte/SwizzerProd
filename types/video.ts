export interface Video {
  id: number;
  youtubeUrl: string;
  youtubeVideoId: string;
  title: string;
  thumbnailUrl: string;
  description: string | null;
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}
