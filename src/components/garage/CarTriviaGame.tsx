import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Car,
  RotateCcw,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  Play,
  Gauge,
  Flame,
} from 'lucide-react';
import { soundFx } from '../../utils/audioFx';
import { GoldButton } from '../common/GoldButton';
import { pureShuffle } from '../../utils/shuffle';

interface CarQuestion {
  id: number;
  correctCar: string;
  category: string;
  badgeIcon: string;
  country: string;
  era: string;
  specs: {
    engine: string;
    power: string;
    topSpeed: string;
    layout: string;
  };
  clues: string[];
  options: string[];
  automotiveFact: string;
  difficulty: 'Street' | 'Sport' | 'Supercar' | 'Hypercar' | 'Grand Prix';
}

const CAR_QUESTIONS: CarQuestion[] = [
  {
    id: 1,
    correctCar: 'Ferrari F40',
    category: 'MARANELLO CROWN JEWEL',
    badgeIcon: '🏎️',
    country: 'Italy 🇮🇹',
    era: '1987 - 1992',
    specs: {
      engine: '2.9L Twin-Turbo Tipo F120A V8',
      power: '471 BHP @ 7,000 RPM',
      topSpeed: '324 KM/H (201 MPH)',
      layout: 'Mid-Engine, Rear-Wheel Drive',
    },
    clues: [
      'Iconic massive rectangular rear wing with the model name embossed in carbon weave.',
      'Pop-up headlights combined with twin NACA ducts on the front clamshell.',
      'Stripped-out race cockpit with green adhesive showing and pull-cord door releases.',
      'The final production supercar personally approved by Enzo Ferrari before his death in 1988.',
    ],
    options: ['Ferrari F40', 'Ferrari Testarossa', 'Lamborghini Countach', 'Porsche 959'],
    automotiveFact:
      'The Ferrari F40 was the first production road car to officially break the 200 mph barrier (324 km/h), built to celebrate Maranello\'s 40th anniversary.',
    difficulty: 'Supercar',
  },
  {
    id: 2,
    correctCar: 'Ferrari SF-24',
    category: 'FORMULA 1 RACECRAFT',
    badgeIcon: '🏁',
    country: 'Italy 🇮🇹',
    era: '2024 - 2025 F1 Season',
    specs: {
      engine: '1.6L Turbo Hybrid V6 + MGU-K & MGU-H',
      power: '1,020+ BHP Combined E-Boost',
      topSpeed: '350+ KM/H with DRS',
      layout: 'Carbon Monocoque, Push-Rod Front',
    },
    clues: [
      'Rosso Corsa scarlet livery accented with Giallo Modena and white longitudinal stripes.',
      'Features the iconic Prancing Horse livery boldly emblazoned on the nosecone and engine cowl.',
      'Driven by seven-time World Champion Lewis Hamilton in his Scuderia Ferrari era.',
      'Equipped with advanced ground-effect Venturi tunnels and halo cockpit protection.',
    ],
    options: ['Ferrari SF-24', 'Red Bull RB20', 'Mercedes W15', 'McLaren MCL38'],
    automotiveFact:
      'Lewis Hamilton brought his iconic championship racecraft directly to Scuderia Ferrari Maranello!',
    difficulty: 'Grand Prix',
  },
  {
    id: 3,
    correctCar: 'McLaren F1',
    category: 'NA PURIST PINNACLE',
    badgeIcon: '🏆',
    country: 'United Kingdom 🇬🇧',
    era: '1992 - 1998',
    specs: {
      engine: '6.1L Naturally Aspirated BMW S70/2 V12',
      power: '618 BHP @ 7,400 RPM',
      topSpeed: '386 KM/H (240.1 MPH)',
      layout: 'Central Driver 3-Seat Monocoque',
    },
    clues: [
      'Revolutionary 3-seater cockpit with the steering wheel positioned dead-center.',
      'Engine bay lined with 16 grams of pure gold foil for maximum thermal heat reflection.',
      'Dihedral butterfly doors and no power steering, ABS, or traction control.',
      'Held the title of the fastest naturally aspirated production car in history for over 30 years.',
    ],
    options: ['McLaren F1', 'Bugatti EB110', 'Jaguar XJ220', 'Pagani Zonda'],
    automotiveFact:
      'Chief designer Gordon Murray required gold leaf in the engine bay because nothing else could insulate the carbon tub from the BMW V12 exhaust temperatures.',
    difficulty: 'Hypercar',
  },
  {
    id: 4,
    correctCar: 'Porsche 911 GT3 RS (992)',
    category: 'NÜRBURGRING APEX PREDATOR',
    badgeIcon: '⏱️',
    country: 'Germany 🇩🇪',
    era: '2023 - Present',
    specs: {
      engine: '4.0L Naturally Aspirated Boxer-6',
      power: '518 BHP @ 9,000 RPM',
      topSpeed: '296 KM/H',
      layout: 'Rear-Engine, Rear-Wheel Drive',
    },
    clues: [
      'Colossal swan-neck rear wing higher than the roofline with active F1-style DRS hydraulics.',
      'Carbon-fiber front fender louvres to evacuate high-pressure air from the front wheel wells.',
      'Screaming 4.0-litre flat-six engine revving all the way to a spine-tingling 9,000 RPM.',
      'Replaced the front trunk entirely with a massive central radiator derived from Le Mans race cars.',
    ],
    options: ['Porsche 911 GT3 RS (992)', 'Nissan GT-R Nismo', 'Chevrolet Corvette Z06', 'Aston Martin Vantage'],
    automotiveFact:
      'At 285 km/h, the 992 GT3 RS generates 860 kg (1,895 lbs) of aerodynamic downforce — equivalent to having a small elephant sitting on the rear wing!',
    difficulty: 'Sport',
  },
  {
    id: 5,
    correctCar: 'Mercedes-AMG ONE',
    category: 'F1 POWERTRAIN FOR THE ROAD',
    badgeIcon: '⚡',
    country: 'Germany 🇩🇪',
    era: '2022 - Present',
    specs: {
      engine: '1.6L Turbo V6 from Hamilton\'s 2015 F1 Car',
      power: '1,049 BHP Quad-Motor Hybrid',
      topSpeed: '352 KM/H (219 MPH)',
      layout: 'Mid-Engine All-Wheel Drive Hybrid',
    },
    clues: [
      'Directly powered by the exact 1.6L turbocharged V6 hybrid engine from Mercedes\' championship F1 cars.',
      'Features a massive roof-mounted snorkel intake feeding cold air directly into the turbo plenum.',
      'Active front louvres and shark-fin rear stabilizer that deploy automatically in "Track" mode.',
      'Idles at a ferocious 1,280 RPM and revs all the way to 11,000 RPM.',
    ],
    options: ['Mercedes-AMG ONE', 'Aston Martin Valkyrie', 'Ferrari LaFerrari', 'McLaren P1'],
    automotiveFact:
      'It took AMG engineers over 5 years to get an actual Formula 1 engine to pass emissions and idle smoothly without requiring an F1 pit crew with laptops to start it!',
    difficulty: 'Street',
  },
];

type GamePhase = 'intro' | 'question' | 'feedback' | 'gameOver';

function generateShuffledCarQuestions(): CarQuestion[] {
  return pureShuffle(CAR_QUESTIONS).map((q) => ({
    ...q,
    options: pureShuffle(q.options),
  }));
}

export const CarTriviaGame: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [questions, setQuestions] = useState<CarQuestion[]>(generateShuffledCarQuestions);
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
    setQuestions(generateShuffledCarQuestions());
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

  // Countdown timer
  useEffect(() => {
    if (phase === 'question') {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
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

    if (choice === currentQ.correctCar) {
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

  const getCarExpertRank = (finalScore: number) => {
    if (finalScore >= 1200) {
      return { rank: 'MARANELLO CHIEF TEST DRIVER / CONNOISSEUR', color: 'text-amber-400', desc: 'God-tier automotive encyclopedia! You can identify a supercar by its exhaust frequency alone.' };
    }
    if (finalScore >= 800) {
      return { rank: 'SCUDERIA PADDOCK VETERAN', color: 'text-emerald-400', desc: 'Outstanding technical knowledge! You know your aero packages and V12 architectures.' };
    }
    if (finalScore >= 400) {
      return { rank: 'WEEKEND TRACK-DAY DRIVER', color: 'text-gold-300', desc: 'Solid petrolhead pedigree! A few more laps around Monza and you will be podium ready.' };
    }
    return { rank: 'PIT LANE NOVICE', color: 'text-red-400', desc: 'Check your telemetry and review the car catalogs! Give it another run.' };
  };

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto rounded-xl border border-gold-500/30 bg-obsidian-950 p-5 sm:p-7 select-none shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden">
      {/* Corner Brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-400/60" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-400/60" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-400/60" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-400/60" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-gold-400 font-bold">
            <Car className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide uppercase">
              NAME THAT MACHINE
            </h3>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
              CAR &amp; F1 IDENTIFICATION CHALLENGE • 5 SPECIFICATION ROUNDS
            </span>
          </div>
        </div>

        {phase === 'question' && (
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-gray-400">
              Machine <span className="text-white font-bold">{roundIdx + 1}/{questions.length}</span>
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
          <div className="w-16 h-16 rounded-2xl border-2 border-gold-500/40 bg-gold-950/30 flex items-center justify-center text-3xl mx-auto shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            🏎️
          </div>

          <h4 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            THE AUTOMOTIVE DYNO CHALLENGE
          </h4>

          <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
            Vaibhev lives and breathes sports cars and Formula 1. Can you identify these five legendary machines strictly from engine specs, aero features, and telemetry clues?
          </p>

          <div className="p-3.5 rounded-lg bg-obsidian-900 border border-white/10 text-xs font-mono text-gray-300 space-y-1.5 text-left">
            <div className="flex items-center gap-2 text-gold-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CHALLENGE PROTOCOL:</span>
            </div>
            <p>• 5 Rounds: Maranello icons, F1 championship cars, &amp; hypercars</p>
            <p>• 15 Seconds per car. Quick answers yield speed multipliers</p>
            <p>• Discover rare engineering facts after each round</p>
          </div>

          <div className="pt-2">
            <GoldButton variant="gold-solid" size="lg" onClick={handleStartGame} icon={<Play className="w-4 h-4 ml-0.5" />}>
              FIRE UP THE DYNO
            </GoldButton>
          </div>
        </div>
      )}

      {/* Question & Feedback Phase */}
      {(phase === 'question' || phase === 'feedback') && (
        <div className="space-y-5 animate-fadeIn">
          {/* Machine Telemetry Card */}
          <div className="p-5 rounded-xl border border-gold-500/30 bg-gradient-to-br from-obsidian-900 via-black to-obsidian-950 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-gold-400 bg-gold-500/10 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(212,175,55,0.25)] shrink-0 animate-pulse">
                  {phase === 'feedback' ? currentQ.badgeIcon : '🚗'}
                </div>

                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-gold-500/20 border border-gold-500/40 text-gold-300 font-bold">
                      {currentQ.difficulty}
                    </span>
                    <span className="font-mono text-[9px] uppercase text-gray-400">
                      {currentQ.country} • {currentQ.era}
                    </span>
                  </div>

                  <h4 className="font-display text-lg sm:text-xl font-bold text-white uppercase mt-0.5">
                    {phase === 'feedback' ? currentQ.correctCar : 'NAME THAT MACHINE'}
                  </h4>

                  <p className="text-xs text-red-400 font-mono mt-0.5 uppercase tracking-wider">
                    {currentQ.category}
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
                  <Gauge className="w-3.5 h-3.5" />
                  <span>{timeLeft}s</span>
                </div>
                {streak > 1 && (
                  <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-500" /> {streak}x STREAK
                  </span>
                )}
              </div>
            </div>

            {/* Dyno Specifications Grid */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs">
              <div className="p-2 rounded bg-black/60 border border-white/5">
                <span className="text-[9px] text-gray-400 block uppercase">ENGINE SPEC</span>
                <span className="text-white font-bold text-[11px] truncate block">{currentQ.specs.engine}</span>
              </div>
              <div className="p-2 rounded bg-black/60 border border-white/5">
                <span className="text-[9px] text-gray-400 block uppercase">OUTPUT</span>
                <span className="text-gold-300 font-bold text-[11px] block">{currentQ.specs.power}</span>
              </div>
              <div className="p-2 rounded bg-black/60 border border-white/5">
                <span className="text-[9px] text-gray-400 block uppercase">VELOCITY</span>
                <span className="text-red-400 font-bold text-[11px] block">{currentQ.specs.topSpeed}</span>
              </div>
              <div className="p-2 rounded bg-black/60 border border-white/5">
                <span className="text-[9px] text-gray-400 block uppercase">DRIVETRAIN</span>
                <span className="text-emerald-400 font-bold text-[11px] block">{currentQ.specs.layout}</span>
              </div>
            </div>

            {/* Aero & Styling Clues */}
            <div className="mt-4 pt-3 border-t border-white/[0.08] space-y-1.5">
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">
                DISTINCTIVE AERO &amp; STYLING SIGNATURES:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-gray-200">
                {currentQ.clues.map((clue, idx) => (
                  <div key={idx} className="p-2 rounded bg-black/60 border border-white/5 flex items-start gap-2">
                    <span className="text-red-500 font-bold">🏎️</span>
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
              const isCorrect = option === currentQ.correctCar;

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

          {/* Feedback & Automotive Fact Banner */}
          {phase === 'feedback' && (
            <div className="p-4 rounded-xl bg-obsidian-900 border border-gold-500/30 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2">
                {selectedAnswer === currentQ.correctCar ? (
                  <span className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> EXACT IDENTIFICATION! (+150 pts + speed bonus)
                  </span>
                ) : (
                  <span className="font-mono text-xs text-red-400 font-bold flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> INCORRECT! The machine was the {currentQ.correctCar}.
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-300 font-mono leading-relaxed border-t border-white/[0.06] pt-2">
                <span className="text-gold-400 font-bold">Automotive Heritage:</span> {currentQ.automotiveFact}
              </p>

              <div className="pt-2 text-right">
                <GoldButton variant="gold-solid" size="sm" onClick={handleNextQuestion}>
                  {roundIdx + 1 < questions.length ? 'NEXT MACHINE ON DYNO' : 'VIEW FINAL RESULTS'}
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
            AUTOMOTIVE DYNO EVALUATION COMPLETE
          </span>

          <h4 className="font-display text-2xl sm:text-3xl font-black text-white uppercase">
            PETROLHEAD SCORE
          </h4>

          <div className="font-display text-4xl sm:text-5xl font-black gold-text-gradient">
            {score} <span className="font-mono text-lg text-gold-400 font-bold">PTS</span>
          </div>

          {(() => {
            const rank = getCarExpertRank(score);
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
            <GoldButton variant="gold-solid" size="md" onClick={handleStartGame} icon={<RotateCcw className="w-4 h-4" />}>
              TEST AGAIN
            </GoldButton>
          </div>
        </div>
      )}

      {/* Telemetry Footer */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-gray-400">
        <span className="text-red-400">SCUDERIA AUTOMOTIVE ENCYCLOPEDIA • FERRARI APPROVED</span>
        <span className="text-gold-400">NAME THAT MACHINE</span>
      </div>
    </div>
  );
};
