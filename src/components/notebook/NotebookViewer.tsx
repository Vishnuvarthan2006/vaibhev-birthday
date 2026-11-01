import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ArrowLeft,
  Shuffle,
  Volume2,
  VolumeX,
  FileText,
  Camera,
} from 'lucide-react';
import { useNotebookEntries } from '../../hooks/useNotebookEntries';
import { PageFace } from './PageFace';
import { ChapterIndexDrawer } from './ChapterIndexDrawer';
import { PhotoLightbox } from './PhotoLightbox';
import { soundFx } from '../../utils/audioFx';
import type { NotebookEntry, NotebookPhoto } from '../../types/notebook';

interface NotebookViewerProps {
  onReturnToPaddock: () => void;
}

export const NotebookViewer: React.FC<NotebookViewerProps> = ({ onReturnToPaddock }) => {
  const { entries, totalEntries, reshuffle } = useNotebookEntries();
  const totalSpreads = totalEntries + 2; // Cover (0) + 9 Chapters (1..9) + Ending (10)

  // Active spread state
  const [currentSpread, setCurrentSpread] = useState<number>(0);

  // 3D Page Turn State
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | null>(null);
  const [turnProgress, setTurnProgress] = useState<number>(0); // 0.0 to 1.0
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Mobile single-page tab: 'letter' | 'photos'
  const [mobileTab, setMobileTab] = useState<'letter' | 'photos'>('letter');

  // Drawer & Sound state
  const [indexDrawerOpen, setIndexDrawerOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getIsMuted());

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxPhotos, setLightboxPhotos] = useState<NotebookPhoto[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // DOM Refs
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragDirectionRef = useRef<'next' | 'prev' | null>(null);
  const startXRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Cancel any running rAF animation
  const cancelAnim = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  // Programmatic Page Flip (via Next/Prev buttons or keyboard)
  const animateTurn = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating || isDraggingRef.current) return;
      if (direction === 'next' && currentSpread >= totalSpreads - 1) return;
      if (direction === 'prev' && currentSpread <= 0) return;

      cancelAnim();
      setIsAnimating(true);
      setTurnDirection(direction);
      soundFx.playPageTurn();

      const startTime = performance.now();
      const duration = 750; // ms

      const step = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(1, elapsed / duration);

        // Smooth cubic-bezier curve for natural paper flip
        const progress =
          rawProgress < 0.5
            ? 4 * rawProgress * rawProgress * rawProgress
            : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

        setTurnProgress(progress);

        if (rawProgress < 1) {
          animationFrameRef.current = requestAnimationFrame(step);
        } else {
          // Animation Complete
          setCurrentSpread((prev) => (direction === 'next' ? prev + 1 : prev - 1));
          setTurnDirection(null);
          setTurnProgress(0);
          setIsAnimating(false);
          animationFrameRef.current = null;
        }
      };

      animationFrameRef.current = requestAnimationFrame(step);
    },
    [isAnimating, currentSpread, totalSpreads, cancelAnim]
  );

  const goToNextSpread = useCallback(() => {
    animateTurn('next');
  }, [animateTurn]);

  const goToPrevSpread = useCallback(() => {
    animateTurn('prev');
  }, [animateTurn]);

  // Jump to specific chapter from Index Drawer
  const jumpToEntryId = useCallback(
    (id: string) => {
      const idx = entries.findIndex((e) => e.id === id);
      if (idx !== -1) {
        cancelAnim();
        soundFx.playPageTurn();
        setCurrentSpread(idx + 1);
        setTurnDirection(null);
        setTurnProgress(0);
        setIsAnimating(false);
      }
    },
    [entries, cancelAnim]
  );

  // Photo click handler to open Lightbox
  const handleOpenPhoto = useCallback((photoIdx: number, friendEntry: NotebookEntry) => {
    setLightboxPhotos(friendEntry.photos);
    setLightboxIndex(photoIdx);
    setLightboxOpen(true);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen || indexDrawerOpen) return;
      if (e.key === 'ArrowRight') {
        goToNextSpread();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSpread();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSpread, goToPrevSpread, lightboxOpen, indexDrawerOpen]);

  // =========================================================================
  // MOUSE & TOUCH DRAGGING SYSTEM
  // =========================================================================

  const startDrag = useCallback(
    (clientX: number, pageSide: 'left' | 'right') => {
      if (isAnimating || lightboxOpen || indexDrawerOpen) return;

      if (pageSide === 'right') {
        if (currentSpread >= totalSpreads - 1) return; // No next page
        isDraggingRef.current = true;
        dragDirectionRef.current = 'next';
        startXRef.current = clientX;
        setTurnDirection('next');
        setTurnProgress(0);
      } else {
        if (currentSpread <= 0) return; // No previous page
        isDraggingRef.current = true;
        dragDirectionRef.current = 'prev';
        startXRef.current = clientX;
        setTurnDirection('prev');
        setTurnProgress(0);
      }
    },
    [isAnimating, currentSpread, totalSpreads, lightboxOpen, indexDrawerOpen]
  );

  // Handle Drag Pointer Down
  const handlePointerDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    pageSide: 'left' | 'right'
  ) => {
    const target = e.target as HTMLElement;
    // Don't drag if user clicked a button, link, photo, or interactive item
    if (
      target.closest(
        'button, a, input, textarea, select, .polaroid-card, .img-fallback, [data-no-drag]'
      )
    ) {
      return;
    }

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startDrag(clientX, pageSide);
  };

  // Global Pointer Move & Up Listeners
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || !dragDirectionRef.current) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const bookEl = bookContainerRef.current;
      if (!bookEl) return;

      const rect = bookEl.getBoundingClientRect();
      const halfWidth = rect.width / 2;

      let progress = 0;
      if (dragDirectionRef.current === 'next') {
        const delta = startXRef.current - clientX;
        progress = Math.max(0, Math.min(1, delta / halfWidth));
      } else {
        const delta = clientX - startXRef.current;
        progress = Math.max(0, Math.min(1, delta / halfWidth));
      }

      setTurnProgress(progress);
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current || !dragDirectionRef.current) return;

      isDraggingRef.current = false;
      const direction = dragDirectionRef.current;
      dragDirectionRef.current = null;

      // Finish or cancel based on threshold (35% turned)
      setTurnProgress((currentProg) => {
        cancelAnim();
        setIsAnimating(true);

        const startTime = performance.now();
        const duration = 350; // Quick smooth snap

        if (currentProg >= 0.35) {
          // Complete page turn
          soundFx.playPageTurn();
          const startProg = currentProg;

          const finishStep = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / duration);
            const easeOut = 1 - Math.pow(1 - t, 3);
            const prog = startProg + (1 - startProg) * easeOut;

            setTurnProgress(prog);

            if (t < 1) {
              animationFrameRef.current = requestAnimationFrame(finishStep);
            } else {
              setCurrentSpread((prev) => (direction === 'next' ? prev + 1 : prev - 1));
              setTurnDirection(null);
              setTurnProgress(0);
              setIsAnimating(false);
              animationFrameRef.current = null;
            }
          };

          animationFrameRef.current = requestAnimationFrame(finishStep);
        } else {
          // Cancel and spring back to original position
          const startProg = currentProg;

          const cancelStep = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / duration);
            const easeOut = 1 - Math.pow(1 - t, 3);
            const prog = startProg * (1 - easeOut);

            setTurnProgress(prog);

            if (t < 1) {
              animationFrameRef.current = requestAnimationFrame(cancelStep);
            } else {
              setTurnDirection(null);
              setTurnProgress(0);
              setIsAnimating(false);
              animationFrameRef.current = null;
            }
          };

          animationFrameRef.current = requestAnimationFrame(cancelStep);
        }

        return currentProg;
      });
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [cancelAnim]);

  // Audio Toggle
  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFx.setMuted(next);
    if (!next) {
      soundFx.playUiClick();
    }
  };

  // Active header label
  const isCover = currentSpread === 0;
  const isEnding = currentSpread === totalSpreads - 1;
  const currentChapterIdx = currentSpread - 1;
  const activeEntry = !isCover && !isEnding ? entries[currentChapterIdx] : null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center">
      {/* Top Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-6 bg-obsidian-950/80 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10 select-none">
        {/* Return to Paddock */}
        <button
          onClick={() => {
            soundFx.playUiClick();
            onReturnToPaddock();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-gold-500/40 text-xs font-mono text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-gold-400" />
          <span>THE PADDOCK</span>
        </button>

        {/* Center Progress Indicator */}
        <div className="text-center font-mono">
          <div className="text-xs sm:text-sm font-bold text-white tracking-wider">
            {isCover && 'PROLOGUE • THE NINE CHAPTERS'}
            {activeEntry && (
              <span className="text-gold-300">
                CHAPTER 0{currentChapterIdx + 1} / 0{totalEntries} •{' '}
                <span className="text-white font-normal">{activeEntry.friendName}</span>
              </span>
            )}
            {isEnding && 'EPILOGUE • THE END OF THE CHAPTERS'}
          </div>
          <div className="text-[10px] text-gray-400 tracking-widest mt-0.5">
            SPREAD {currentSpread + 1} OF {totalSpreads} • DRAG PAGE OR CLICK TO TURN
          </div>
        </div>

        {/* Right Tools: Index, Sound, Shuffle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIndexDrawerOpen(true)}
            title="Open Chapter Index"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold-500/30 bg-gold-500/10 text-xs font-mono text-gold-300 hover:bg-gold-500/20 transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">INDEX</span>
          </button>

          <button
            onClick={() => {
              soundFx.playUiClick();
              reshuffle();
              setCurrentSpread(0);
              setTurnDirection(null);
            }}
            title="Randomize Chapter Order For Fresh Session"
            className="p-2 rounded-lg border border-white/10 hover:border-gold-500/30 text-gray-400 hover:text-gold-300 transition-colors cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute page audio' : 'Mute page audio'}
            title={isMuted ? 'Unmute Page Sounds' : 'Mute Page Sounds'}
            className="p-2 rounded-lg border border-white/10 hover:border-gold-500/30 text-gray-400 hover:text-gold-300 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-gold-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Tab Switcher (Visible only on small screens) */}
      <div className="md:hidden flex items-center justify-center gap-2 mb-4 w-full">
        <button
          onClick={() => setMobileTab('letter')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
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
          className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
            mobileTab === 'photos'
              ? 'bg-gold-500 text-obsidian-950 shadow-md'
              : 'bg-obsidian-900 text-gray-300 border border-white/10'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>SCRAPBOOK PHOTOS</span>
        </button>
      </div>

      {/* =========================================================================
          PHYSICAL 3D OPEN-BOOK STAGE
          ========================================================================= */}
      <div className="w-full relative leather-journal-cover rounded-2xl p-2.5 sm:p-5 md:p-6 mb-8 select-none">
        {/* Brass corner protectors on leather book */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-gold-400/80 rounded-tl-sm pointer-events-none z-30" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-gold-400/80 rounded-tr-sm pointer-events-none z-30" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-gold-400/80 rounded-bl-sm pointer-events-none z-30" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-gold-400/80 rounded-br-sm pointer-events-none z-30" />

        {/* Center Leather Spine Stitching Line */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 pointer-events-none z-30">
          <div className="h-full w-0.5 mx-auto bg-gradient-to-b from-gold-500/50 via-gold-500/10 to-gold-500/50" />
        </div>

        {/* 3D Perspective Stage Container */}
        <div
          ref={bookContainerRef}
          className="book-3d-stage relative z-10 w-full min-h-[560px] sm:min-h-[620px] rounded-xl overflow-hidden shadow-2xl border border-gold-500/30 bg-[#090807]"
        >
          {/* =====================================================================
              STATIC SPREAD VIEW (When not turning or idle)
              ===================================================================== */}
          {turnDirection === null && (
            <div className="w-full h-full min-h-[560px] sm:min-h-[620px] grid grid-cols-1 md:grid-cols-2">
              {/* Left Page Half */}
              <div
                onMouseDown={(e) => handlePointerDown(e, 'left')}
                onTouchStart={(e) => handlePointerDown(e, 'left')}
                className={`w-full h-full relative cursor-grab border-b md:border-b-0 md:border-r border-neutral-300 ${
                  mobileTab === 'photos' ? 'hidden md:block' : 'block'
                }`}
              >
                <PageFace
                  spreadIndex={currentSpread}
                  side="left"
                  entries={entries}
                  totalEntries={totalEntries}
                  onBegin={goToNextSpread}
                  onOpenIndex={() => setIndexDrawerOpen(true)}
                  onReturnToPaddock={onReturnToPaddock}
                  onRestart={() => {
                    soundFx.playPageTurn();
                    setCurrentSpread(0);
                  }}
                  onReshuffle={() => {
                    soundFx.playUiClick();
                    reshuffle();
                    setCurrentSpread(0);
                  }}
                  onOpenPhoto={handleOpenPhoto}
                  isMobileSinglePage={true}
                  mobileTab={mobileTab}
                />

                {/* Visual Grab & Drag Corner Peel Handle (Left / Previous) */}
                {currentSpread > 0 && (
                  <div
                    className="page-curl-corner-left"
                    title="Grab and drag right to turn to previous page"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      startDrag(e.clientX, 'left');
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      startDrag(e.touches[0].clientX, 'left');
                    }}
                  />
                )}
              </div>

              {/* Right Page Half */}
              <div
                onMouseDown={(e) => handlePointerDown(e, 'right')}
                onTouchStart={(e) => handlePointerDown(e, 'right')}
                className={`w-full h-full relative cursor-grab ${
                  mobileTab === 'letter' ? 'hidden md:block' : 'block'
                }`}
              >
                <PageFace
                  spreadIndex={currentSpread}
                  side="right"
                  entries={entries}
                  totalEntries={totalEntries}
                  onBegin={goToNextSpread}
                  onOpenIndex={() => setIndexDrawerOpen(true)}
                  onReturnToPaddock={onReturnToPaddock}
                  onRestart={() => {
                    soundFx.playPageTurn();
                    setCurrentSpread(0);
                  }}
                  onReshuffle={() => {
                    soundFx.playUiClick();
                    reshuffle();
                    setCurrentSpread(0);
                  }}
                  onOpenPhoto={handleOpenPhoto}
                  isMobileSinglePage={true}
                  mobileTab={mobileTab}
                />

                {/* Visual Grab & Drag Corner Peel Handle (Right / Next) */}
                {currentSpread < totalSpreads - 1 && (
                  <div
                    className="page-curl-corner-right"
                    title="Grab and drag left to turn to next page"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      startDrag(e.clientX, 'right');
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      startDrag(e.touches[0].clientX, 'right');
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* =====================================================================
              FORWARD 3D PAGE TURN (NEXT SPREAD)
              ===================================================================== */}
          {turnDirection === 'next' && (
            <div className="w-full h-full min-h-[560px] sm:min-h-[620px] relative preserve-3d">
              {/* Underlying Base Left Page: Spread S (stays stationary on left) */}
              <div className="absolute top-0 bottom-0 left-0 w-full md:w-1/2 z-0 border-r border-neutral-300">
                <PageFace
                  spreadIndex={currentSpread}
                  side="left"
                  entries={entries}
                  totalEntries={totalEntries}
                  onOpenPhoto={handleOpenPhoto}
                />
                {/* Dynamic landing shadow falling on left page as turning leaf approaches 180deg */}
                {turnProgress > 0.4 && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity"
                    style={{
                      background: 'linear-gradient(to left, rgba(0,0,0,0.35), transparent)',
                      opacity: (turnProgress - 0.4) * 1.5,
                    }}
                  />
                )}
              </div>

              {/* Underlying Base Right Page: Spread S + 1 (revealed as leaf turns) */}
              <div className="hidden md:block absolute top-0 bottom-0 right-0 w-1/2 z-0">
                <PageFace
                  spreadIndex={currentSpread + 1}
                  side="right"
                  entries={entries}
                  totalEntries={totalEntries}
                  onOpenPhoto={handleOpenPhoto}
                />
                {/* Cast shadow underneath the turning leaf on the right base page */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 30%, transparent 70%)',
                    opacity: 1 - turnProgress,
                  }}
                />
              </div>

              {/* 3D TURNING PHYSICAL SHEET (Right half hinged at spine) */}
              <div
                className="absolute top-0 bottom-0 left-0 md:left-1/2 w-full md:w-1/2 preserve-3d z-20 pointer-events-none"
                style={{
                  transformOrigin: 'left center',
                  transform: `rotateY(${-180 * turnProgress}deg)`,
                }}
              >
                {/* Front Face of Turning Sheet (Right Page of Spread S) */}
                <div className="absolute inset-0 backface-hidden z-10 shadow-2xl">
                  <PageFace
                    spreadIndex={currentSpread}
                    side="right"
                    entries={entries}
                    totalEntries={totalEntries}
                    onOpenPhoto={handleOpenPhoto}
                  />
                  {/* Dynamic Shading Gradient on Front Face */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.08) 35%, rgba(0,0,0,0.2) 100%)',
                      opacity: Math.sin(turnProgress * Math.PI) * 0.7,
                    }}
                  />
                </div>

                {/* Back Face of Turning Sheet (Left Page of Spread S + 1) */}
                <div
                  className="absolute inset-0 backface-hidden z-0 shadow-2xl"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <PageFace
                    spreadIndex={currentSpread + 1}
                    side="left"
                    entries={entries}
                    totalEntries={totalEntries}
                    onOpenPhoto={handleOpenPhoto}
                  />
                  {/* Dynamic Shading Gradient on Back Face */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to left, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.08) 35%, rgba(0,0,0,0.2) 100%)',
                      opacity: Math.sin(turnProgress * Math.PI) * 0.7,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              BACKWARD 3D PAGE TURN (PREVIOUS SPREAD)
              ===================================================================== */}
          {turnDirection === 'prev' && (
            <div className="w-full h-full min-h-[560px] sm:min-h-[620px] relative preserve-3d">
              {/* Underlying Base Right Page: Spread S (stays stationary on right) */}
              <div className="hidden md:block absolute top-0 bottom-0 right-0 w-1/2 z-0">
                <PageFace
                  spreadIndex={currentSpread}
                  side="right"
                  entries={entries}
                  totalEntries={totalEntries}
                  onOpenPhoto={handleOpenPhoto}
                />
                {/* Dynamic landing shadow falling on right page as backward leaf lands */}
                {turnProgress > 0.4 && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity"
                    style={{
                      background: 'linear-gradient(to right, rgba(0,0,0,0.35), transparent)',
                      opacity: (turnProgress - 0.4) * 1.5,
                    }}
                  />
                )}
              </div>

              {/* Underlying Base Left Page: Spread S - 1 (revealed on left underneath) */}
              <div className="absolute top-0 bottom-0 left-0 w-full md:w-1/2 z-0 border-r border-neutral-300">
                <PageFace
                  spreadIndex={currentSpread - 1}
                  side="left"
                  entries={entries}
                  totalEntries={totalEntries}
                  onOpenPhoto={handleOpenPhoto}
                />
                {/* Cast shadow underneath the backward turning leaf */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 30%, transparent 70%)',
                    opacity: 1 - turnProgress,
                  }}
                />
              </div>

              {/* 3D TURNING PHYSICAL SHEET (Left half hinged at spine) */}
              <div
                className="absolute top-0 bottom-0 left-0 w-full md:w-1/2 preserve-3d z-20 pointer-events-none"
                style={{
                  transformOrigin: 'right center',
                  transform: `rotateY(${180 * turnProgress}deg)`,
                }}
              >
                {/* Front Face of Turning Sheet (Left Page of Spread S) */}
                <div className="absolute inset-0 backface-hidden z-10 shadow-2xl">
                  <PageFace
                    spreadIndex={currentSpread}
                    side="left"
                    entries={entries}
                    totalEntries={totalEntries}
                    onOpenPhoto={handleOpenPhoto}
                  />
                  {/* Dynamic Shading on Front Face */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to left, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.08) 35%, rgba(0,0,0,0.2) 100%)',
                      opacity: Math.sin(turnProgress * Math.PI) * 0.7,
                    }}
                  />
                </div>

                {/* Back Face of Turning Sheet (Right Page of Spread S - 1) */}
                <div
                  className="absolute inset-0 backface-hidden z-0 shadow-2xl"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <PageFace
                    spreadIndex={currentSpread - 1}
                    side="right"
                    entries={entries}
                    totalEntries={totalEntries}
                    onOpenPhoto={handleOpenPhoto}
                  />
                  {/* Dynamic Shading on Back Face */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.08) 35%, rgba(0,0,0,0.2) 100%)',
                      opacity: Math.sin(turnProgress * Math.PI) * 0.7,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Page Turn Controls */}
      <div className="w-full flex items-center justify-between gap-4 select-none">
        <button
          onClick={goToPrevSpread}
          disabled={currentSpread === 0 || isAnimating}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-mono text-xs font-semibold transition-all cursor-pointer ${
            currentSpread === 0 || isAnimating
              ? 'border-white/5 text-gray-600 bg-obsidian-900/40 cursor-not-allowed opacity-40'
              : 'border-white/10 hover:border-gold-400 bg-obsidian-900 text-gray-200 hover:text-gold-200 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]'
          }`}
        >
          <ChevronLeft className="w-4 h-4 text-gold-400" />
          <span>PREVIOUS PAGE</span>
        </button>

        {/* Spread Navigation Dots */}
        <div className="hidden sm:flex items-center gap-1.5">
          {Array.from({ length: totalSpreads }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (isAnimating || i === currentSpread) return;
                cancelAnim();
                soundFx.playPageTurn();
                setCurrentSpread(i);
                setTurnDirection(null);
                setTurnProgress(0);
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentSpread
                  ? 'w-6 bg-gold-400 shadow-[0_0_8px_#d4af37]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              title={`Jump to spread ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNextSpread}
          disabled={currentSpread === totalSpreads - 1 || isAnimating}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-mono text-xs font-semibold transition-all cursor-pointer ${
            currentSpread === totalSpreads - 1 || isAnimating
              ? 'border-white/5 text-gray-600 bg-obsidian-900/40 cursor-not-allowed opacity-40'
              : 'border-gold-500/40 hover:border-gold-400 bg-gradient-to-r from-gold-500/20 to-gold-500/10 text-gold-300 hover:text-gold-100 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]'
          }`}
        >
          <span>NEXT PAGE</span>
          <ChevronRight className="w-4 h-4 text-gold-400" />
        </button>
      </div>

      {/* Chapter Index Modal Drawer */}
      <ChapterIndexDrawer
        entries={entries}
        currentEntryId={activeEntry ? activeEntry.id : ''}
        isOpen={indexDrawerOpen}
        onClose={() => setIndexDrawerOpen(false)}
        onSelectEntry={jumpToEntryId}
        onReshuffle={() => {
          reshuffle();
          setCurrentSpread(0);
          setTurnDirection(null);
        }}
      />

      {/* Photo Lightbox */}
      <PhotoLightbox
        photos={lightboxPhotos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxPhotos.length)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev - 1 + lightboxPhotos.length) % lightboxPhotos.length)
        }
      />
    </div>
  );
};
