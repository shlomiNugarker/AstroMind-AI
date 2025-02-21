import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generatePrediction = async (userInput: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: userInput,
        },
      ],
    });

    const predictionText =
      response.choices[0]?.message?.content ||
      "No response from the assistant.";

    return predictionText;
  } catch (error) {
    console.error("❌ Error generating prediction:", error);
    throw new Error("Failed to generate prediction.");
  }
};
