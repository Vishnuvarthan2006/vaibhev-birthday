export type GalleryCategoryId =
  | 'all'
  | 'squad-memories'
  | 'celebrations'
  | 'random-moments'
  | 'cars-f1'
  | 'special-moments'
  | (string & {});

export interface GalleryCategoryMeta {
  id: GalleryCategoryId;
  label: string;
  description?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  category: GalleryCategoryId;
  dateOrEvent?: string;
  contributor?: string;
  featured?: boolean;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  tags?: string[];
}
