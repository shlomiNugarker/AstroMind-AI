import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generatePrediction = async (userInput: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      max_tokens: 150,
      messages: [
        {
          role: "user",
          content: `תן חיזוי אישי למשתמש בהתבסס על הנתונים הבאים: ${userInput}`,
        },
      ],
    });

    const predictionText = response.choices[0]?.message?.content?.trim() || "";
    return predictionText;
  } catch (error) {
    console.error("❌ Error generating prediction:", error);
    throw new Error("Failed to generate prediction.");
  }
};
