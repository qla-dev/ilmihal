// Audio & Haptic Synthesizer for offline sound effects and prayer alerts

class SoundService {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientSources: AudioNode[] = [];
  private isAmbientPlaying = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play subtle tap sound
  playClick() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore audio error
    }
  }

  // Play Quiz Correct chime
  playSuccess() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        gain.gain.setValueAtTime(0, now + i * 0.09);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.45);
      });
      this.vibrate([40, 60, 40]);
    } catch {
      // Ignore
    }
  }

  // Play Quiz Wrong buzzer
  playError() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.setValueAtTime(140, now + 0.15);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
      this.vibrate([100]);
    } catch {
      // Ignore
    }
  }

  // Play gentle Islamic chime / Adhan reminder tone
  playAdhanChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // Traditional spiritual chime sequence (Bayati mode chords)
      const chord = [392.00, 440.00, 523.25, 659.25, 783.99]; // G4, A4, C5, E5, G5
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.3);
        gain.gain.setValueAtTime(0, now + idx * 0.3);
        gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.3 + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.3 + 2.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.3);
        osc.stop(now + idx * 0.3 + 2.6);
      });
      this.vibrate([100, 50, 100, 50, 200]);
    } catch {
      // Ignore
    }
  }

  // Play Tesbih bead click with haptic
  playTesbihClick() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
      this.vibrate(30);
    } catch {
      // Ignore
    }
  }

  // Start soothing ambient sound for Namaz Focus Mode
  startFocusAmbiance(type: 'stream' | 'rain' | 'silence' = 'stream') {
    if (type === 'silence') {
      this.stopFocusAmbiance();
      return;
    }
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      this.stopFocusAmbiance();

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink/Brown noise generator for relaxing stream/rain
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Gain factor
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
      filter.frequency.value = type === 'rain' ? 600 : 800;
      filter.Q.value = 1.0;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2); // Soft gentle volume

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      this.ambientGain = gain;
      this.ambientSources = [noise, filter];
      this.isAmbientPlaying = true;
    } catch {
      // Ignore
    }
  }

  stopFocusAmbiance() {
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      }
      setTimeout(() => {
        this.ambientSources.forEach(src => {
          try {
            if ('stop' in src && typeof (src as AudioScheduledSourceNode).stop === 'function') {
              (src as AudioScheduledSourceNode).stop();
            }
            src.disconnect();
          } catch {
            // Ignore
          }
        });
        this.ambientSources = [];
        this.ambientGain = null;
        this.isAmbientPlaying = false;
      }, 500);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  getIsAmbientPlaying() {
    return this.isAmbientPlaying;
  }

  // Device haptic vibration
  vibrate(pattern: number | number[]) {
    try {
      if (typeof window !== 'undefined' && 'navigator' in window && window.navigator.vibrate) {
        window.navigator.vibrate(pattern);
      }
    } catch {
      // Ignore
    }
  }

  // Text-to-speech for Arabic/Bosnian recitation guidance
  speak(
    text: string, 
    lang: string = 'ar-SA', 
    rate: number = 0.85,
    onEnd?: () => void,
    onStart?: () => void
  ) {
    try {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        if (onEnd) onEnd();
        return;
      }
      
      window.speechSynthesis.cancel();

      // Clean text for speech if needed (remove special decoration symbols if any)
      const cleanText = text.replace(/[۝۞۩]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = 1.0;

      // Try to find the best matching voice
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const arabicVoice = voices.find(v => v.lang.startsWith('ar') || v.lang.includes('AR') || v.name.toLowerCase().includes('arabic'));
        if (arabicVoice && lang.startsWith('ar')) {
          utterance.voice = arabicVoice;
        }
      }

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  stopSpeech() {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch {
      // Ignore
    }
  }
}

export const soundService = new SoundService();
