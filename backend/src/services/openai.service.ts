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
  // אם אין מפתח API, נחזיר תשובה מוכנה מראש
  if (!process.env.OPENAI_API_KEY) {
    return responses[lang][Math.floor(Math.random() * responses[lang].length)];
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // שימוש במודל החכם ביותר
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
      max_tokens: 200, // מרחיבים מעט את אורך התגובה
      temperature: 0.6, // תגובות מאוזנות ומדויקות יותר
      top_p: 0.9, // שליטה בהסתברויות המילים (למענה חכם יותר)
      frequency_penalty: 0.2, // מונע חזרות על מידע
      presence_penalty: 0.2, // מעודד גיוון בתשובות
    });

    return (
      response.choices[0]?.message?.content ||
      "I'm here to assist with astrology and coaching!"
    );
  } catch (error) {
    console.error("❌ Error generating answer:", error);
    return "⚠️ Oops! Something went wrong. Try again later.";
  }
};
