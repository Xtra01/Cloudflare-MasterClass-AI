import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Sen Dünyanın en iyi Cloudflare Çözüm Mimarı ve "MasterClass" eğitmenisin.
Görevin: Kullanıcıya Cloudflare araçlarını teknik derinliği yüksek, profesyonel ve eksiksiz bir şekilde öğretmek.

Format Kuralları:
1. İçerik "Dokümantasyon" kalitesinde olmalı, blog yazısı gibi değil.
2. Kesinlikle Markdown formatı kullan.
3. Her başlık altında:
   - **Teknik Detay**: Nasıl çalışır? (Arka plandaki teknoloji).
   - **Konfigürasyon**: CLI (Wrangler/Terraform) veya Dashboard adımları.
   - **Kod Örnekleri**: JavaScript/TypeScript (Workers), JSON (Rules), HCL (Terraform).
   - **Gerçek Hayat Senaryosu**: Büyük ölçekli bir şirket bunu nasıl kullanır?
4. **"MasterClass Pro Tip"**: Her bölümün sonunda sadece uzmanların bildiği, dokümantasyonda zor bulunan bir ipucu ver.
5. **Görselleştirme**: Mümkünse ASCII diyagramları ile akışı (flow) çiz.

Üslup:
- Otoriter ama yardımsever.
- "Bunu yapabilirsiniz" yerine "Bunu şu şekilde yapılandırın" gibi net yönergeler kullan.
- Türkçe terminolojiye hakim ol ama teknik terimleri (Edge, Cache, Handshake) orijinal İngilizce halleriyle parantez içinde belirt.
`;

export const generateTutorialContent = async (topicTitle: string, level: string): Promise<GeneratedContent> => {
  const prompt = `
  EĞİTİM KONUSU: ${topicTitle}
  HEDEF SEVİYE: ${level}

  Lütfen bu konu için eksiksiz, indirilebilir bir PDF kalitesinde eğitim modülü oluştur.
  Kullanıcı bu çıktıyı okuduğunda konuya tamamen hakim olmalı.

  Yapı:
  1. **Yönetici Özeti**: 2 cümle ile nedir?
  2. **Mimari ve Çalışma Prensibi**: Teknik derinlemesine bakış.
  3. **Adım Adım Kurulum**: (Dashboard ve CLI/API alternatifleriyle).
  4. **Production Readiness**: Canlıya almadan önce checklist.
  5. **Common Pitfalls**: Sık yapılan hatalar ve çözümleri.
  6. **Maliyet ve Limitler**: Free vs Enterprise farkları.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING, description: "Rich markdown content with diagrams and code" },
            relatedTopics: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3 specific follow-up questions for deep dive"
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
      title: "Servis Bağlantı Hatası",
      content: "Şu anda içeriğe erişilemiyor. Lütfen internet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.\n\n```bash\nError: API_CONNECTION_TIMEOUT\n```",
      relatedTopics: []
    };
  }
};

export const generateDeepDive = async (currentContext: string, specificQuery: string): Promise<GeneratedContent> => {
  const prompt = `
  MEVCUT KONU: ${currentContext}
  KULLANICI SORUSU: "${specificQuery}"

  Bu spesifik soru için "Consultant" (Danışman) modunda yanıt ver.
  Genel geçer bilgiler verme. Doğrudan çözüme, koda ve mimari kararlara odaklan.
  Varsa performans metrikleri veya benchmark stratejileri ekle.
  `;

  try {
     const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            relatedTopics: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    const text = response.text;
    if(!text) throw new Error("No text");
    return JSON.parse(text) as GeneratedContent;
  } catch (error) {
    return {
      title: "Hata",
      content: "Derinlemesine inceleme yapılamadı.",
      relatedTopics: []
    };
  }
};