export type GalleryCategory = 'all' | 'automotive' | 'f1' | 'squad' | 'memories' | 'chaos';

export interface GalleryPhoto {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  category: GalleryCategory;
  dateOrEvent?: string;
  featured?: boolean;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}
