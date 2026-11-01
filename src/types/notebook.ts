/**
 * Type definitions for the Interactive Birthday Notebook.
 * Designed for 9 friend entries with independent editing,
 * multiple photographs, and session-based non-mutating randomization.
 */

export interface NotebookPhoto {
  id: string;
  url: string;
  caption?: string;
  altText?: string;
  rotationDeg?: number; // subtle scrapbook tilt (-4 to +4 deg)
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface NotebookEntry {
  /**
   * Unique, immutable identifier (e.g., 'entry-1', 'friend-alex').
   * Used to preserve identity across randomized presentation orders.
   */
  id: string;

  /**
   * Canonical slot number (1 through 9).
   */
  friendNumber: number;

  /**
   * Full or display name of the friend.
   */
  friendName: string;

  /**
   * Personal heading or chapter title for this friend.
   * e.g., 'Chapter I: The Apex of Friendship', 'The Pit Wall Confessions'
   */
  chapterTitle?: string;

  /**
   * Optional nickname or F1 / Marvel / gaming callsign.
   * e.g., 'Pit Wall Strategist', 'Miles Morales', 'Diamond Miner'
   */
  callsign?: string;

  /**
   * Short one-line summary wish or quote.
   */
  tagline?: string;

  /**
   * The primary written message from this friend.
   * Supports multi-paragraph text.
   */
  writtenMessage: string;

  /**
   * Optional short closing note, signoff, or signature.
   * e.g., 'Always in your corner, — Alex', 'Keep pushing, — Driver #44'
   */
  closingNote?: string;


  /**
   * Array of photographs attached to this friend's notebook page.
   * Can contain 0, 1, or multiple photos.
   */
  photos: NotebookPhoto[];

  /**
   * Optional audio voice note URL for this entry.
   */
  voiceNoteUrl?: string;

  /**
   * Visual accent style for this friend's page corner/ribbon.
   */
  accentStyle?: 'gold' | 'ferrari-red' | 'carbon' | 'spider-crimson';

  /**
   * Stamp or sticker badge for scrapbook realism.
   */
  stickerBadge?: string;
}
