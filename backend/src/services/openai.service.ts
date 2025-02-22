import OpenAI from "openai";
import dotenv from "dotenv";
import { responses } from "../../data/responses";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const generateResponse = async (
  userInput: string,
  lang: "en" | "he"
) => {
  if (!process.env.OPENAI_API_KEY) {
    return responses[lang][Math.floor(Math.random() * responses.en.length)];
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are AstroMind-AI, an expert AI assistant for astrology and personal coaching.
          You provide astrological insights, daily horoscopes, and practical coaching advice.
          Stay concise and direct. Do NOT answer unrelated questions. If a question is off-topic, respond with:
          "I specialize in astrology and coaching. Let me know how I can help in these areas!"`,
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      max_tokens: 150, // מגביל את האורך של התגובה כדי לחסוך טוקנים
      temperature: 0.7, // שומר על איזון בין יצירתיות לרלוונטיות
    });

    return (
      response.choices[0]?.message?.content ||
      "I'm here to assist with astrology and coaching!"
    );
  } catch (error) {
    console.error("❌ Error generating answer:", error);
    throw new Error("Failed to generate answer.");
  }
};
