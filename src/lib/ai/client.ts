import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT_PLAYER_EXPLANATION, buildPlayerPrompt } from "./prompts";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generatePlayerAiInsights(playerData: unknown): Promise<string | null> {
  if (!genAI) {
    return "AI API Key yapılandırılmadığı için AI açıklaması oluşturulamadı.";
  }

  try {
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT_PLAYER_EXPLANATION,
    });

    const prompt = buildPlayerPrompt(playerData);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("[AI Client] Error generating player AI insights:", error);
    return null;
  }
}
