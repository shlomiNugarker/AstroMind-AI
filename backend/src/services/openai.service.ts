import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateResponse = async (userInput: string) => {
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

    const lastMassege =
      response.choices[0]?.message?.content ||
      "No response from the assistant.";

    return lastMassege;
  } catch (error) {
    console.error("❌ Error generating answer:", error);
    throw new Error("Failed to generate answer.");
  }
};
