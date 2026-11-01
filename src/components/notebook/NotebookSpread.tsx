import React, { useState } from 'react';
import type { NotebookEntry, NotebookPhoto } from '../../types/notebook';
import { PolaroidPhoto } from './PolaroidPhoto';
import { PhotoLightbox } from './PhotoLightbox';
import { Camera, FileText } from 'lucide-react';

interface NotebookSpreadProps {
  entry: NotebookEntry;
  chapterIndex: number;
  totalChapters: number;
}

export const NotebookSpread: React.FC<NotebookSpreadProps> = ({
  entry,
  chapterIndex,
  totalChapters,
}) => {
  // Mobile tab state: 'letter' or 'photos'
  const [mobileTab, setMobileTab] = useState<'letter' | 'photos'>('letter');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  const handleOpenPhoto = (idx: number) => {
    setActivePhotoIdx(idx);
    setLightboxOpen(true);
  };

  const paragraphs = entry.writtenMessage
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      {/* Mobile Tab Switcher (Visible only on small screens) */}
      <div className="md:hidden flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => setMobileTab('letter')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
            mobileTab === 'letter'
              ? 'bg-gold-500 text-obsidian-950 shadow-md'
              : 'bg-obsidian-900 text-gray-300 border border-white/10'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>WRITTEN LETTER</span>
        </button>

        <button
          onClick={() => setMobileTab('photos')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
            mobileTab === 'photos'
              ? 'bg-gold-500 text-obsidian-950 shadow-md'
              : 'bg-obsidian-900 text-gray-300 border border-white/10'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>PHOTOS ({entry.photos.length})</span>
        </button>
      </div>

      {/* Main Facing Two-Page Book Spread Container */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-2xl border border-gold-500/30">
        {/* =========================================================================
            LEFT FACING PAGE: THE HANDWRITTEN LETTER
            ========================================================================= */}
        <div
          className={`paper-page book-spine-left p-6 sm:p-8 md:p-10 flex flex-col justify-between text-neutral-900 border-b md:border-b-0 md:border-r border-neutral-300 relative ${
            mobileTab === 'photos' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Subtle Corner Brackets */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-gold-600/50" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-gold-600/50" />

          {/* Page Top Header */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500 border-b border-neutral-300/80 pb-2.5 mb-5">
              <span className="uppercase tracking-widest font-semibold text-gold-700">
                CHAPTER {chapterIndex + 1} OF {totalChapters}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400">
                SLOT: {entry.id}
              </span>
            </div>

            {/* Friend Identity & Chapter Title */}
            <div className="mb-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight leading-snug">
                {entry.chapterTitle || `Chapter 0${chapterIndex + 1}`}
              </h2>

              <div className="flex items-center gap-2 mt-1">
                <span className="font-display font-semibold text-sm text-neutral-800">
                  {entry.friendName}
                </span>
                {entry.callsign && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700 border border-neutral-300">
                    {entry.callsign}
                  </span>
                )}
              </div>
            </div>

            {/* Handwritten Personal Letter */}
            <div className="font-handwriting text-xl sm:text-2xl text-neutral-800 leading-relaxed space-y-4 my-4 max-h-[55vh] md:max-h-none overflow-y-auto pr-1">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Closing Note / Signoff */}
            {entry.closingNote && (
              <div className="mt-4 pt-3 border-t border-neutral-300/60 text-right">
                <p className="font-handwriting text-2xl sm:text-3xl text-gold-800 font-bold">
                  {entry.closingNote}
                </p>
              </div>
            )}
          </div>

          {/* Left Page Footer */}
          <div className="pt-4 border-t border-neutral-300/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>VAIBHEV • NINE CHAPTERS</span>
            <span>PAGE {String((chapterIndex + 1) * 2 - 1).padStart(2, '0')}</span>
          </div>
        </div>

        {/* =========================================================================
            RIGHT FACING PAGE: SCRAPBOOK PHOTOGRAPHS & STICKERS
            ========================================================================= */}
        <div
          className={`paper-page book-spine-right p-6 sm:p-8 md:p-10 flex flex-col justify-between text-neutral-900 relative ${
            mobileTab === 'letter' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Subtle Corner Brackets */}
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-gold-600/50" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-gold-600/50" />

          {/* Page Top Header */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-500 border-b border-neutral-300/80 pb-2.5 mb-6">
              <span className="uppercase tracking-widest font-semibold text-neutral-700">
                PHOTO ARCHIVE &amp; SCRAPBOOK
              </span>
              {entry.stickerBadge && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold-500/20 text-gold-800 border border-gold-600/30 font-bold uppercase">
                  {entry.stickerBadge}
                </span>
              )}
            </div>

            {/* Photographs Grid / Collage */}
            {entry.photos && entry.photos.length > 0 ? (
              <div
                className={`py-4 ${
                  entry.photos.length === 1
                    ? 'flex items-center justify-center min-h-[300px]'
                    : 'grid grid-cols-1 sm:grid-cols-2 gap-6 items-center justify-center'
                }`}
              >
                {entry.photos.map((photo: NotebookPhoto, pIdx: number) => (
                  <PolaroidPhoto
                    key={photo.id || pIdx}
                    photo={photo}
                    index={pIdx}
                    accentStyle={entry.accentStyle}
                    onClick={() => handleOpenPhoto(pIdx)}
                  />
                ))}
              </div>
            ) : (
              /* Empty state if friend hasn't dropped photos yet */
              <div className="min-h-[300px] flex flex-col items-center justify-center p-8 text-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100/60 my-6">
                <div className="w-12 h-12 rounded-full border border-gold-600/30 bg-gold-500/10 flex items-center justify-center text-gold-700 mb-3">
                  <Camera className="w-6 h-6" />
                </div>
                <h4 className="font-display font-semibold text-neutral-800 text-sm">
                  Scrapbook Photo Awaiting
                </h4>
                <p className="font-mono text-xs text-neutral-500 mt-1 max-w-xs">
                  Place images into <code>public/media/notebook/{entry.id}/</code>
                </p>
              </div>
            )}
          </div>

          {/* Right Page Footer */}
          <div className="pt-4 border-t border-neutral-300/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>MEMORIES WITH {entry.friendName.toUpperCase()}</span>
            <span>PAGE {String((chapterIndex + 1) * 2).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photos={entry.photos}
        currentIndex={activePhotoIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActivePhotoIdx((prev) => (prev + 1) % entry.photos.length)}
        onPrev={() =>
          setActivePhotoIdx((prev) => (prev - 1 + entry.photos.length) % entry.photos.length)
        }
      />
    </>
  );
};
