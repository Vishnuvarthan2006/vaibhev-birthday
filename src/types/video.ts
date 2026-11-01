export type VideoCategory =
  | 'all'
  | 'tribute'
  | 'wishes'
  | 'bloopers'
  | 'racing'
  | 'memes'
  | (string & {});

export interface VideoCategoryMeta {
  id: VideoCategory;
  label: string;
  description?: string;
}

export interface VideoEntry {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  posterUrl?: string;
  duration?: string;
  contributor?: string;
  category?: VideoCategory;
  dateAdded?: string;
  featured?: boolean;
  resolution?: string;
  aspectRatio?: '16/9' | '9/16' | '4/3';
}
