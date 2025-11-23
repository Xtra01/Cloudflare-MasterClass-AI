
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent, ChatMessage, Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const INSTRUCTOR_PERSONA = (lang: Language) => `
You are a Cloudflare MasterClass Instructor.
Language: ${lang === 'tr' ? 'Turkish (Türkçe)' : 'English'}
Style: Professional, high technical depth but understandable.
Target Audience: Students or System Administrators.
Responses: Concise, solution-oriented. Use Markdown.
`;

const CONTENT_GENERATION_INSTRUCTION = (lang: Language) => `
${INSTRUCTOR_PERSONA(lang)}
Task: Provide a comprehensive "Documentation/Tutorial" for the Cloudflare topic provided.
Format:
1. Title and Executive Summary
2. Technical Architecture (Deep Dive)
3. Configuration / Code Examples
4. Pro Tip (Only known by experts)

Ensure the output is strictly in ${lang === 'tr' ? 'Turkish' : 'English'}.
`;

export const generateTutorialContent = async (topicTitle: string, level: string, lang: Language): Promise<GeneratedContent> => {
  const prompt = `
  TOPIC: ${topicTitle}
  LEVEL: ${level}
  LANGUAGE: ${lang === 'tr' ? 'Turkish' : 'English'}

  Please create comprehensive training content in Markdown format for this topic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: CONTENT_GENERATION_INSTRUCTION(lang),
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
    
    const parsed = JSON.parse(text);
    return {
        ...parsed,
        language: lang
    } as GeneratedContent;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      title: lang === 'tr' ? "Hata" : "Error",
      content: lang === 'tr' ? "İçerik oluşturulurken bir hata meydana geldi." : "An error occurred while generating content.",
      relatedTopics: [],
      language: lang
    };
  }
};

export const chatWithContext = async (
  message: string, 
  currentContext: string | null, 
  history: ChatMessage[],
  lang: Language
): Promise<string> => {
  
  const historyParts = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));

  const contextPrompt = currentContext 
    ? `USER CURRENTLY READING:\n${currentContext.substring(0, 3000)}...\n\n` 
    : "";

  const finalPrompt = `${contextPrompt}USER QUESTION: ${message}`;

  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: INSTRUCTOR_PERSONA(lang) + (lang === 'tr' ? " Kısa ve net cevaplar ver." : " Give short and clear answers."),
      },
      history: historyParts
    });

    const result = await chat.sendMessage({ message: finalPrompt });
    return result.text || (lang === 'tr' ? "Cevap alınamadı." : "No response received.");
  } catch (error) {
    return lang === 'tr' ? "Üzgünüm, şu an bağlantı kuramıyorum." : "Sorry, I cannot connect right now.";
  }
};
