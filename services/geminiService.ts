import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent, ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const INSTRUCTOR_PERSONA = `
Sen Cloudflare MasterClass Eğitmenisin.
Tarzın: Profesyonel, teknik derinliği yüksek ama anlaşılır.
Kullanıcı bir öğrenci veya sistem yöneticisi olabilir.
Yanıtların kısa, öz ve çözüm odaklı olmalı. Markdown kullanabilirsin.
`;

const CONTENT_GENERATION_INSTRUCTION = `
${INSTRUCTOR_PERSONA}
Görevin: Kullanıcıya Cloudflare konusunu eksiksiz bir "Dokümantasyon/Tutorial" formatında sunmak.
Format:
1. Başlık ve Özet
2. Teknik Mimari (Derinlemesine)
3. Konfigürasyon / Kod Örnekleri
4. Pro Tip (Sadece uzmanların bildiği)
`;

export const generateTutorialContent = async (topicTitle: string, level: string): Promise<GeneratedContent> => {
  const prompt = `
  KONU: ${topicTitle}
  SEVİYE: ${level}

  Lütfen bu konu için Markdown formatında kapsamlı bir eğitim içeriği oluştur.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: CONTENT_GENERATION_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            relatedTopics: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
            }
          },
          required: ["title", "content", "relatedTopics"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeneratedContent;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      title: "Hata",
      content: "İçerik oluşturulurken bir hata meydana geldi.",
      relatedTopics: []
    };
  }
};

export const chatWithContext = async (
  message: string, 
  currentContext: string | null, 
  history: ChatMessage[]
): Promise<string> => {
  
  const historyParts = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));

  const contextPrompt = currentContext 
    ? `KULLANICININ ŞU AN OKUDUĞU İÇERİK:\n${currentContext.substring(0, 3000)}...\n\n` 
    : "";

  const finalPrompt = `${contextPrompt}KULLANICI SORUSU: ${message}`;

  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: INSTRUCTOR_PERSONA + " Kısa ve net cevaplar ver. Eğer bir kod bloğu seçildiyse onu açıkla.",
      },
      history: historyParts
    });

    const result = await chat.sendMessage({ message: finalPrompt });
    return result.text || "Cevap alınamadı.";
  } catch (error) {
    return "Üzgünüm, şu an bağlantı kuramıyorum.";
  }
};

// Legacy Deep Dive wrapper (can be repurposed or removed, kept for compatibility)
export const generateDeepDive = async (currentContext: string, specificQuery: string): Promise<GeneratedContent> => {
    // This is now effectively handled by the chat, but we keep the structure for "GeneratedContent" type return if needed
    // or simply reuse the chat logic. For now, let's keep it distinct as a "Full Page Analysis".
    const responseText = await chatWithContext(specificQuery, currentContext, []);
    return {
        title: "Analiz Sonucu",
        content: responseText,
        relatedTopics: []
    };
};