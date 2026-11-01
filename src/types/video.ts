export interface VideoEntry {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  posterUrl?: string;
  duration?: string;
  category?: 'tribute' | 'wishes' | 'bloopers' | 'racing' | 'memes';
  featured?: boolean;
}
