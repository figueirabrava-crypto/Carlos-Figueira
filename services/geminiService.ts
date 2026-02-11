
import { GoogleGenAI, Modality } from "@google/genai";
import { Subject, AccessibilityConfig } from "../types";
import { audioService } from "./audioService";

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
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

export class GeminiService {
  private ai: GoogleGenAI;
  private activeSource: AudioBufferSourceNode | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async analyzeConsultancy(prompt: string, subject: Subject, history: any[], a11y: AccessibilityConfig) {
    const model = 'gemini-3-pro-preview';
    
    const simplifiedPrompt = a11y.simplifiedLanguage 
      ? "Use linguagem extremamente simples (nível fundamental), evite termos latinos ou técnicos densos. Se usar um termo técnico, explique-o com uma metáfora do cotidiano."
      : "Use terminologia jurídica e biológica de alto nível. Cite jurisprudência, resoluções CONAMA ou CFBio específicas.";

    const systemInstruction = subject === Subject.AIA 
      ? `Você é a Dra. Gaia, Mentora Sênior do IFAL. 
         POSTURA PEDAGÓGICA: Siga o método socrático. Se o aluno perguntar 'O que é EIA?', pergunte a ele qual o tamanho da obra que ele imagina e como ela poderia afetar o solo. Guie-o até a Resolução 001/86. 
         OBJETIVO: Ensinar o biólogo a ser um perito crítico. Nunca dê respostas de uma linha. Analise o contexto.
         ACESSIBILIDADE: Se houver dificuldade de compreensão, use analogias visuais (ex: 'O EIA é como um exame de sangue da natureza antes de uma cirurgia').
         ${simplifiedPrompt}`
      : `Você é a Dra. Sofia, Mestra em Bioética e Legislação. 
         POSTURA PEDAGÓGICA: Estimule o debate ético. Use dilemas. Se o aluno estiver certo, desafie-o com um 'E se...?'. Se estiver errado, mostre a contradição no raciocínio dele com base nos 4 princípios da Bioética.
         OBJETIVO: Formar profissionais com consciência moral inabalável.
         ACESSIBILIDADE: Seja acolhedora e paciente. Use exemplos humanos e práticos.
         ${simplifiedPrompt}`;

    try {
      const response = await this.ai.models.generateContent({
        model,
        contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
          temperature: 0.8, // Um pouco mais alto para criatividade pedagógica
        },
      });

      return { 
        text: response.text || "Estou processando as diretrizes pedagógicas para você.", 
        grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] 
      };
    } catch (error) {
      console.error("Erro Gemini:", error);
      throw error;
    }
  }

  async speak(text: string) {
    this.stop();
    // Limpar markdown para o TTS não ler asteriscos
    const cleanText = text.replace(/[*#_]/g, '').slice(0, 800);
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: cleanText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
        },
      });
      
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio && audioService.audioContext) {
        const audioBuffer = await decodeAudioData(decode(base64Audio), audioService.audioContext, 24000, 1);
        const source = audioService.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioService.audioContext.destination);
        source.start();
        this.activeSource = source;
      }
    } catch (e) {
      console.error("Erro no áudio pedagógico:", e);
    }
  }

  stop() {
    if (this.activeSource) {
      try { this.activeSource.stop(); } catch (e) {}
      this.activeSource = null;
    }
  }
}

export const geminiService = new GeminiService();
