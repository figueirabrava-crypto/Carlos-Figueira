
class AudioService {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (!this.ctx) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass({ sampleRate: 24000 });
        }
      } catch (e) {
        console.error("Erro ao criar AudioContext:", e);
      }
    }
    return this.ctx;
  }

  async resume(): Promise<void> {
    const context = this.getContext();
    if (!context) return;
    
    // Essencial para Android/iOS: O contexto deve ser resumido em resposta a um toque.
    if (context.state !== 'running') {
      try {
        await context.resume();
      } catch (e) {
        console.error("Erro ao resumir AudioContext:", e);
      }
    }
  }

  playClick() {
    const context = this.getContext();
    if (!context || context.state !== 'running') return;
    
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
    gain.gain.setValueAtTime(0.05, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + 0.1);
  }

  playSuccess() {
    const context = this.getContext();
    if (!context || context.state !== 'running') return;
    
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1046.5, context.currentTime + 0.2);
    gain.gain.setValueAtTime(0.1, context.currentTime);
    gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + 0.3);
  }

  playError() {
    const context = this.getContext();
    if (!context || context.state !== 'running') return;
    
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, context.currentTime);
    osc.frequency.linearRampToValueAtTime(55, context.currentTime + 0.2);
    gain.gain.setValueAtTime(0.1, context.currentTime);
    gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + 0.2);
  }

  public get audioContext() {
    return this.getContext();
  }
}

export const audioService = new AudioService();
