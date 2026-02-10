
import { GoogleGenAI, Modality } from "@google/genai";
import { audioService } from "./audioService";

class GeminiService {
  private ai: GoogleGenAI;
  private currentSource: AudioBufferSourceNode | null = null;

  constructor() {
    // Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async stop() {
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch (e) {}
      this.currentSource = null;
    }
  }

  async speak(text: string): Promise<void> {
    try {
      await this.stop();
      
      // Garante que o contexto esteja resumido (importante para mobile)
      await audioService.resume();
      
      const context = audioService.audioContext;
      if (!context) {
        console.error("AudioContext não disponível");
        return;
      }

      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Diga de forma clara, didática e com voz feminina profissional de professora universitária: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        await this.playPCM(base64Audio);
      }
    } catch (error) {
      console.error("Erro na narração Gemini:", error);
    }
  }

  private async playPCM(base64: string): Promise<void> {
    const context = audioService.audioContext;
    if (!context) return;

    try {
      const bytes = this.decode(base64);
      const buffer = await this.decodeAudioData(bytes, context, 24000, 1);
      
      const source = context.createBufferSource();
      const gainNode = context.createGain();
      
      gainNode.gain.setValueAtTime(1.0, context.currentTime);
      
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(context.destination);
      
      this.currentSource = source;
      source.start(0);
      
      source.onended = () => {
        if (this.currentSource === source) {
          this.currentSource = null;
        }
      };
    } catch (e) {
      console.error("Erro ao reproduzir PCM:", e);
    }
  }

  private decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  private async decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }
}

export const geminiService = new GeminiService();
