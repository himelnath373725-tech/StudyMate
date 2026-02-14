
import { GoogleGenAI } from "@google/genai";

// Fix: Use process.env.API_KEY directly as per @google/genai coding guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askGemini = async (prompt: string, context?: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: context || "You are a helpful academic assistant for Bangladeshi students. Answer in Bangla where appropriate."
    }
  });
  return response.text;
};

export const translateText = async (text: string, targetLang: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Translate the following text to ${targetLang}: "${text}"`,
  });
  return response.text;
};
