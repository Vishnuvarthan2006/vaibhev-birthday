/**
 * Lightweight Web Audio API synthesizer for F1 race-start sound effects.
 * Zero external audio files required, runs client-side, gracefully fails if disabled.
 */

class F1AudioController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Crisp F1 gantry starting light beep (lights 1 through 5)
   */
  public playLightBeep(lightIndex: number) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pitch escalates slightly with each light (e.g., 750Hz up to 950Hz)
      const baseFreq = 760 + lightIndex * 35;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // AudioContext policy fallback
    }
  }

  /**
   * Dramatic "LIGHTS OUT" high-speed whoosh / ignition chord
   */
  public playLightsOutChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // 1. Low frequency engine roar impulse
      const oscLow = ctx.createOscillator();
      const gainLow = ctx.createGain();
      oscLow.type = 'sawtooth';
      oscLow.frequency.setValueAtTime(140, ctx.currentTime);
      oscLow.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.45);
      oscLow.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.9);

      gainLow.gain.setValueAtTime(0.18, ctx.currentTime);
      gainLow.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

      oscLow.connect(gainLow);
      gainLow.connect(ctx.destination);
      oscLow.start();
      oscLow.stop(ctx.currentTime + 0.95);

      // 2. High chime sparkle
      const oscHigh = ctx.createOscillator();
      const gainHigh = ctx.createGain();
      oscHigh.type = 'sine';
      oscHigh.frequency.setValueAtTime(1100, ctx.currentTime);
      gainHigh.gain.setValueAtTime(0.1, ctx.currentTime);
      gainHigh.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      oscHigh.connect(gainHigh);
      gainHigh.connect(ctx.destination);
      oscHigh.start();
      oscHigh.stop(ctx.currentTime + 0.65);
    } catch {
      // AudioContext policy fallback
    }
  }

  /**
   * Crisp UI micro-interaction click
   */
  public playUiClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Silently ignore
    }
  }
}

export const soundFx = new F1AudioController();
