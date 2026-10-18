// Audio and Speech synthesis utility for Petualangan 5 Pilar Islam

let audioContext: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioContext = new AudioCtx();
    }
  }
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
}

export const isSoundEnabled = (): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('pilar_sound_enabled');
    if (saved !== null) {
      soundEnabled = saved === 'true';
    }
  }
  return soundEnabled;
};

export const setSoundEnabled = (enabled: boolean): void => {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('pilar_sound_enabled', enabled ? 'true' : 'false');
  }
  if (!enabled) {
    stopNarration();
  }
};

/**
 * Play a cute button pop sound using Web Audio API
 */
export const playPopSound = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.error('Audio play error', e);
  }
};

/**
 * Play cheerful correct answer chime (Masyaallah, Hebat!)
 */
export const playSuccessSound = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);

      gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.09);
      osc.stop(ctx.currentTime + idx * 0.09 + 0.4);
    });
  } catch (e) {
    console.error('Audio play error', e);
  }
};

/**
 * Play gentle encouraging sound for try again (Belum tepat, ayo coba lagi!)
 */
export const playTryAgainSound = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [440, 349.23]; // A4 down to F4 (gentle, warm, not harsh)
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.14);

      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.14 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.14);
      osc.stop(ctx.currentTime + idx * 0.14 + 0.32);
    });
  } catch (e) {
    console.error('Audio play error', e);
  }
};

/**
 * Play a sparkling star sound effect
 */
export const playStarSound = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [659.25, 830.61, 987.77, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

      gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.3);
    });
  } catch (e) {
    console.error('Audio play error', e);
  }
};

/**
 * Play celebration fanfare for mission completed, chest opened, or certificate earned
 */
export const playFanfareSound = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [
      { f: 523.25, t: 0.0, d: 0.15 },
      { f: 523.25, t: 0.15, d: 0.15 },
      { f: 523.25, t: 0.3, d: 0.15 },
      { f: 659.25, t: 0.45, d: 0.3 },
      { f: 783.99, t: 0.75, d: 0.2 },
      { f: 1046.5, t: 0.95, d: 0.7 },
    ];

    notes.forEach((item) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, ctx.currentTime + item.t);

      gain.gain.setValueAtTime(0.25, ctx.currentTime + item.t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + item.t + item.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + item.t);
      osc.stop(ctx.currentTime + item.t + item.d + 0.05);
    });
  } catch (e) {
    console.error('Fanfare play error', e);
  }
};

/**
 * Text-to-Speech in Indonesian (id-ID) with friendly child-targeted pacing
 */
export const speakIndonesian = (text: string, onEnd?: () => void): void => {
  if (!isSoundEnabled()) {
    if (onEnd) onEnd();
    return;
  }

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.9; // slightly slower for Grade 1 children
    utterance.pitch = 1.05; // slightly higher and friendly

    // Attempt to pick Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find((v) => v.lang.startsWith('id') || v.lang.includes('IND') || v.lang.includes('Indonesia'));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis not supported or failed', err);
    if (onEnd) onEnd();
  }
};

export const stopNarration = (): void => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
};
