
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  private getAI(): GoogleGenAI {
    if (!this.ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is not configured. Please set GEMINI_API_KEY in your environment.");
      }
      this.ai = new GoogleGenAI({ apiKey });
    }
    return this.ai;
  }

  private getLanguageInstruction(): string {
    return "Berikan jawaban dalam Bahasa Indonesia yang baik dan benar. Hindari penggunaan Bahasa Sunda atau dialek daerah lainnya.";
  }

  async analyzeWaste(itemDescription: string): Promise<string> {
    try {
      const ai = this.getAI();
      const langInst = this.getLanguageInstruction();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analisis jenis sampah plastik berikut: "${itemDescription}". 
        ${langInst}
        Jelaskan: 1. Jenis plastiknya (misal PET, HDPE, dll), 2. Apakah bisa didaur ulang, 3. Langkah pembuangan yang benar di Bandung (misal bawa ke Bank Sampah). 
        Berikan format yang rapi dengan bullet points.`,
        config: {
          systemInstruction: "Anda adalah ahli pengelolaan sampah di Bandung (Kang Resik). Tugas Anda mengedukasi warga tentang pemilahan sampah plastik dengan ramah dan informatif.",
        }
      });
      return response.text || "Maaf, saya tidak dapat menganalisis item tersebut saat ini.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Terjadi kesalahan saat menghubungi asisten AI. Pastikan API Key sudah terkonfigurasi.";
    }
  }

  async getChatResponse(message: string): Promise<string> {
    try {
      const ai = this.getAI();
      const langInst = this.getLanguageInstruction();
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Anda adalah asisten virtual 'Kang Resik' dari Kota Bandung. 
          Anda ahli dalam isu lingkungan Bandung, lokasi bank sampah, dan cara mengolah sampah plastik. 
          PENTING: ${langInst} 
          Gunakan Bahasa Indonesia secara penuh dan formal namun tetap ramah. Jangan gunakan kata-kata Bahasa Sunda seperti 'Sampurasun', 'Hatur nuhun', dll.
          Jangan pernah keluar dari karakter sebagai Kang Resik.`,
        }
      });
      const response = await chat.sendMessage({ message });
      return response.text || "Maaf, saya kurang mengerti.";
    } catch (error) {
      console.error("Chat Error:", error);
      return "Maaf, ada gangguan dalam sistem AI.";
    }
  }

  async findWasteBanks(query: string, location?: { lat: number, lng: number }): Promise<{ text: string, chunks: any[] }> {
    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Cari lokasi bank sampah atau tempat daur ulang plastik di Bandung berdasarkan kueri: "${query}". Berikan informasi nama, alamat, dan jam operasional jika tersedia.`,
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: location ? { latitude: location.lat, longitude: location.lng } : undefined
            }
          }
        }
      });

      return {
        text: response.text || "",
        chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      };
    } catch (error) {
      console.error("Gemini Maps Error:", error);
      return { text: "Gagal mencari lokasi. Pastikan fitur AI sudah aktif.", chunks: [] };
    }
  }
}
