import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Shield,
  RotateCcw,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  Play,
  Zap,
  Flame,
} from 'lucide-react';
import { soundFx } from '../../utils/audioFx';
import { GoldButton } from '../common/GoldButton';
import { pureShuffle } from '../../utils/shuffle';

interface HeroQuestion {
  id: number;
  correctHero: string;
  codename: string;
  emblemIcon: string;
  colorScheme: string;
  glowColor: string;
  clues: string[];
  options: string[];
  funFact: string;
  difficulty: 'Recruit' | 'Agent' | 'Avenger' | 'Sorcerer' | 'Omega Level';
}

const HERO_QUESTIONS: HeroQuestion[] = [
  {
    id: 1,
    correctHero: 'Spider-Man',
    codename: 'Peter Parker • Queens, NY',
    emblemIcon: '🕷️',
    colorScheme: 'from-red-600 via-blue-700 to-red-800',
    glowColor: 'shadow-[0_0_40px_rgba(220,38,38,0.4)]',
    clues: [
      'Spider-Sense danger tingling at the base of the skull.',
      'Signature quote: "With great power comes great responsibility."',
      'Web-shooters loaded with synthetic fluid pressurized to 300 psi.',
      'Vaibhev\'s #1 all-time favorite comic book superhero!',
    ],
    options: ['Spider-Man', 'Deadpool', 'Daredevil', 'Ant-Man'],
    funFact:
      'Spider-Man first debuted in Amazing Fantasy #15 (1962). Stan Lee initially had to fight to publish him because editors thought teenagers hated spiders!',
    difficulty: 'Recruit',
  },
  {
    id: 2,
    correctHero: 'Iron Man',
    codename: 'Tony Stark • Stark Industries',
    emblemIcon: '🦾',
    colorScheme: 'from-amber-500 via-red-600 to-amber-700',
    glowColor: 'shadow-[0_0_40px_rgba(245,158,11,0.4)]',
    clues: [
      'Miniaturized Arc Reactor delivering 3 gigajoules per second.',
      'Gold-titanium alloy plating with integrated Jarvis HUD telemetry.',
      'Genius, billionaire, playboy, philanthropist.',
      'Defeated the Mad Titan with the ultimate snap: "I am Iron Man."',
    ],
    options: ['War Machine', 'Iron Man', 'Falcon', 'Ultron'],
    funFact:
      'Tony Stark built the original Mark I armor while held in a cave with scraps. His garage contains supercars rivaling the Maranello Scuderia!',
    difficulty: 'Agent',
  },
  {
    id: 3,
    correctHero: 'Doctor Strange',
    codename: 'Stephen Strange • Kamar-Taj',
    emblemIcon: '🔮',
    colorScheme: 'from-purple-600 via-red-600 to-indigo-800',
    glowColor: 'shadow-[0_0_40px_rgba(168,85,247,0.4)]',
    clues: [
      'Master of the Mystic Arts and guardian of the New York Sanctum.',
      'Wields the sentient Cloak of Levitation and the Eye of Agamotto.',
      'Casts the Crimson Bands of Cyttorak and Eldritch Mandalas of Tao.',
      'Scanned 14,000,605 future timelines to find the single victory vector.',
    ],
    options: ['Doctor Strange', 'Wong', 'Loki', 'Magneto'],
    funFact:
      'Before becoming Sorcerer Supreme, Stephen Strange was a world-renowned neurosurgeon whose hands were injured in a devastating sports car crash.',
    difficulty: 'Avenger',
  },
  {
    id: 4,
    correctHero: 'Black Panther',
    codename: "T'Challa • Kingdom of Wakanda",
    emblemIcon: '🐾',
    colorScheme: 'from-purple-900 via-stone-900 to-purple-950',
    glowColor: 'shadow-[0_0_40px_rgba(147,51,234,0.4)]',
    clues: [
      'Empowered by the mystical Heart-Shaped Herb of the Panther Goddess.',
      'Nanotech habit woven entirely from sound-absorbing Vibranium.',
      'Absorbs kinetic impact and redistributes it in purple shockwave bursts.',
      'Protects the most technologically advanced nation on Earth.',
    ],
    options: ['Killmonger', 'Black Panther', 'Falcon', 'Blade'],
    funFact:
      'Wakanda sits on a giant meteorite of Vibranium that crashed thousands of years ago, allowing them to build magnetic levitation trains and advanced stealth tech.',
    difficulty: 'Sorcerer',
  },
  {
    id: 5,
    correctHero: 'Wolverine',
    codename: 'Logan • Weapon X Program',
    emblemIcon: '⚔️',
    colorScheme: 'from-amber-500 via-blue-800 to-neutral-900',
    glowColor: 'shadow-[0_0_40px_rgba(245,158,11,0.4)]',
    clues: [
      'Six retractable 12-inch claws forged from indestructible Adamantium.',
      'Accelerated cellular regeneration healing factor and animal instincts.',
      'Berserker rage mode that strikes fear into the Brotherhood of Mutants.',
      'Signature catchphrase: "I\'m the best there is at what I do."',
    ],
    options: ['Sabertooth', 'Deadpool', 'Wolverine', 'Winter Soldier'],
    funFact:
      'Wolverine first appeared in The Incredible Hulk #180 (1974). His claws were originally thought to be gloves before being confirmed as part of his mutant skeleton!',
    difficulty: 'Omega Level',
  },
];

type GamePhase = 'intro' | 'question' | 'feedback' | 'gameOver';

function generateShuffledHeroQuestions(): HeroQuestion[] {
  return pureShuffle(HERO_QUESTIONS).map((q) => ({
    ...q,
    options: pureShuffle(q.options),
  }));
}

export const MarvelGuessGame: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [questions, setQuestions] = useState<HeroQuestion[]>(generateShuffledHeroQuestions);
  const [roundIdx, setRoundIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [streak, setStreak] = useState<number>(0);

  const timerRef = useRef<number | null>(null);
  const currentQ = questions[roundIdx] || questions[0];

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleStartGame = () => {
    soundFx.playUiClick();
    setQuestions(generateShuffledHeroQuestions());
    setPhase('question');
    setRoundIdx(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(15);
    setSelectedAnswer(null);
  };

  const handleNextQuestion = useCallback(() => {
    if (roundIdx + 1 < questions.length) {
      setRoundIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(15);
      setPhase('question');
    } else {
      clearTimer();
      setPhase('gameOver');
      soundFx.playVaultFanfare();
    }
  }, [roundIdx, questions.length]);

  // Question countdown timer
  useEffect(() => {
    if (phase === 'question') {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
            // Time out: reveal answer
            setSelectedAnswer('TIMEOUT');
            soundFx.playUiClick();
            setStreak(0);
            setPhase('feedback');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimer();
    }

    return () => clearTimer();
  }, [phase]);

  const handleSelectOption = (choice: string) => {
    if (phase !== 'question') return;
    clearTimer();
    setSelectedAnswer(choice);
    setPhase('feedback');

    if (choice === currentQ.correctHero) {
      soundFx.playReactionGreen();
      const speedBonus = timeLeft * 10;
      const roundPoints = 150 + speedBonus + (streak * 40);
      setScore((prev) => prev + roundPoints);
      setStreak((prev) => prev + 1);
    } else {
      soundFx.playUiClick();
      setStreak(0);
    }
  };

  const getMarvelRank = (finalScore: number) => {
    if (finalScore >= 1200) {
      return { rank: 'S.H.I.E.L.D. LEVEL 10 / AVENGERS COMMANDER', color: 'text-amber-400', desc: 'Omega-level intellect! Nick Fury is offering you the lead chair in the Avengers initiative.' };
    }
    if (finalScore >= 800) {
      return { rank: 'EARTH\'S MIGHTIEST HERO', color: 'text-emerald-400', desc: 'Supreme Marvel recall! You spot superhero variants across the multiverse with ease.' };
    }
    if (finalScore >= 400) {
      return { rank: 'SANCTUM SANCTORUM APPRENTICE', color: 'text-gold-300', desc: 'Solid comic awareness! You know your Peter Parker from your Miles Morales.' };
    }
    return { rank: 'DAILY BUGLE ROOKIE REPORTER', color: 'text-red-400', desc: 'J. Jonah Jameson wants photos of Spider-Man on his desk yesterday! Study up.' };
  };

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto rounded-xl border border-red-500/40 bg-obsidian-950 p-5 sm:p-7 select-none shadow-[0_0_50px_rgba(220,38,38,0.15)] relative overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-red-500/60" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-red-500/60" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-red-500/60" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-red-500/60" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              GUESS THE HERO
            </h3>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
              MARVEL CHARACTER GUESSING CHALLENGE • 5 CLUE ROUNDS
            </span>
          </div>
        </div>

        {phase === 'question' && (
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-gray-400">
              Hero <span className="text-white font-bold">{roundIdx + 1}/{questions.length}</span>
            </span>
            <span className="text-gold-400">
              Score: <span className="text-white font-bold">{score}</span>
            </span>
          </div>
        )}
      </div>

      {/* Intro Phase */}
      {phase === 'intro' && (
        <div className="py-8 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl border-2 border-red-500/40 bg-red-950/30 flex items-center justify-center text-3xl mx-auto shadow-[0_0_30px_rgba(220,38,38,0.4)]">
            🕸️
          </div>

          <h4 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            MULTIVERSE RECOGNITION DOSSIER
          </h4>

          <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
            Can you deduce the Marvel superhero from classified telemetry, powers, iconic catchphrases, and silhouette profiles?
          </p>

          <div className="p-3.5 rounded-lg bg-obsidian-900 border border-white/10 text-xs font-mono text-gray-300 space-y-1.5 text-left">
            <div className="flex items-center gap-2 text-gold-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RULES OF ENGAGEMENT:</span>
            </div>
            <p>• 5 Rounds: Spider-Man, Avengers, &amp; Legendary Heroes</p>
            <p>• 15 Seconds per hero. Fast answers earn speed bonus points</p>
            <p>• Uncover fun Marvel comic trivia after each round</p>
          </div>

          <div className="pt-2">
            <GoldButton variant="ferrari" size="lg" onClick={handleStartGame} icon={<Play className="w-4 h-4 ml-0.5" />}>
              COMMENCE SCAN
            </GoldButton>
          </div>
        </div>
      )}

      {/* Question & Feedback Phase */}
      {(phase === 'question' || phase === 'feedback') && (
        <div className="space-y-5 animate-fadeIn">
          {/* Top Dossier Card */}
          <div className="p-5 rounded-xl border border-white/10 bg-gradient-to-br from-obsidian-900 to-black relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Hero Silhouette / Emblem Display */}
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white/20 bg-gradient-to-br ${currentQ.colorScheme} flex items-center justify-center text-3xl sm:text-4xl shadow-xl shrink-0 ${currentQ.glowColor}`}
                >
                  {phase === 'feedback' ? currentQ.emblemIcon : '❓'}
                </div>

                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-red-950/60 border border-red-500/30 text-red-400 font-bold">
                      {currentQ.difficulty}
                    </span>
                    <span className="font-mono text-[9px] uppercase text-gray-400">
                      CLASSIFIED DOSSIER #{currentQ.id}
                    </span>
                  </div>

                  <h4 className="font-display text-lg sm:text-xl font-bold text-white uppercase mt-0.5">
                    {phase === 'feedback' ? currentQ.correctHero : 'WHO IS THIS HERO?'}
                  </h4>

                  <p className="text-xs text-gold-300/90 font-mono mt-0.5">
                    {phase === 'feedback' ? currentQ.codename : 'Decode the telemetry signatures below'}
                  </p>
                </div>
              </div>

              {/* Timer Bar & Streak */}
              <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 font-mono">
                <div
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 ${
                    timeLeft <= 4
                      ? 'border-red-500 bg-red-950/60 text-red-400 animate-bounce'
                      : 'border-white/10 bg-black/60 text-gold-400'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{timeLeft}s</span>
                </div>
                {streak > 1 && (
                  <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-500" /> {streak}x STREAK
                  </span>
                )}
              </div>
            </div>

            {/* Clue Bullet Points */}
            <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-2">
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
                INTELLIGENCE REPORT &amp; ABILITY SIGNATURES:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-gray-200">
                {currentQ.clues.map((clue, idx) => (
                  <div key={idx} className="p-2 rounded bg-black/60 border border-white/5 flex items-start gap-2">
                    <span className="text-gold-400 font-bold">0{idx + 1}.</span>
                    <span>{clue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Multiple Choice Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQ.correctHero;

              let btnStyle = 'border-white/10 bg-obsidian-900/80 text-gray-200 hover:border-gold-400/60 hover:text-white';
              if (phase === 'feedback') {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-red-500 bg-red-950/60 text-red-200 line-through';
                } else {
                  btnStyle = 'border-white/5 bg-black/40 text-gray-500 opacity-60';
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleSelectOption(option)}
                  disabled={phase === 'feedback'}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left flex items-center justify-between font-display text-sm sm:text-base tracking-wide transition-all cursor-pointer active:scale-95 ${btnStyle}`}
                >
                  <span className="font-bold uppercase">{option}</span>
                  {phase === 'feedback' && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-red-400" />
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Comic Fact Banner */}
          {phase === 'feedback' && (
            <div className="p-4 rounded-xl bg-obsidian-900 border border-gold-500/30 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2">
                {selectedAnswer === currentQ.correctHero ? (
                  <span className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> EXCELLENT RECALL! (+150 pts + speed bonus)
                  </span>
                ) : (
                  <span className="font-mono text-xs text-red-400 font-bold flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> INCORRECT! The hero was {currentQ.correctHero}.
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-300 font-mono leading-relaxed border-t border-white/[0.06] pt-2">
                <span className="text-gold-400 font-bold">Marvel Fact:</span> {currentQ.funFact}
              </p>

              <div className="pt-2 text-right">
                <GoldButton variant="gold-solid" size="sm" onClick={handleNextQuestion}>
                  {roundIdx + 1 < questions.length ? 'NEXT HERO DOSSIER' : 'VIEW FINAL RESULTS'}
                </GoldButton>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Game Over Screen */}
      {phase === 'gameOver' && (
        <div className="py-8 text-center max-w-md mx-auto space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-full border-2 border-gold-400 bg-gold-500/20 flex items-center justify-center text-gold-300 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.4)]">
            <Trophy className="w-8 h-8" />
          </div>

          <span className="font-mono text-xs text-red-500 font-bold uppercase tracking-widest block">
            MULTIVERSE RECOGNITION COMPLETE
          </span>

          <h4 className="font-display text-2xl sm:text-3xl font-black text-white uppercase">
            MARVEL DOSSIER SCORE
          </h4>

          <div className="font-display text-4xl sm:text-5xl font-black gold-text-gradient">
            {score} <span className="font-mono text-lg text-gold-400 font-bold">PTS</span>
          </div>

          {(() => {
            const rank = getMarvelRank(score);
            return (
              <div className="p-4 rounded-xl bg-obsidian-900 border border-gold-500/30">
                <span className={`font-display text-base font-bold uppercase ${rank.color} block`}>
                  {rank.rank}
                </span>
                <p className="text-xs text-gray-300 font-mono mt-1">
                  {rank.desc}
                </p>
              </div>
            );
          })()}

          <div className="pt-3 flex items-center justify-center gap-3">
            <GoldButton variant="ferrari" size="md" onClick={handleStartGame} icon={<RotateCcw className="w-4 h-4" />}>
              PLAY AGAIN
            </GoldButton>
          </div>
        </div>
      )}

      {/* Telemetry Footer */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-gray-400">
        <span className="text-red-400">MARVEL MULTIVERSE DOSSIER • SPIDER-MAN VARIANT APPROVED</span>
        <span className="text-gold-400">GUESS THE HERO</span>
      </div>
    </div>
  );
};
