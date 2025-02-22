import express, { Request, Response } from "express";
import { generateResponse } from "../services/openai.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ChatMessage } from "../models/ChatMessage";
import { ObjectId } from "mongodb";

const router = express.Router();

if (!process.env.OPENAI_API_KEY) {
  console.warn("⚠️ OPENAI_API_KEY is missing. The chatbot will not function.");
}

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { message, lang }: { message: string; lang: "en" | "he" } = req.body;

  // @ts-ignore
  const userId = req.user?._id as string | undefined;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    await ChatMessage.create({ userId, role: "user", text: message });

    const assistantResponse = await generateResponse(message, lang);

    await ChatMessage.create({
      userId,
      role: "system",
      text: assistantResponse,
    });

    res.json({ message: assistantResponse });
  } catch (error) {
    console.error("❌ Error handling chat message:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
});

router.get("/history", authMiddleware, async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user?._id as string | undefined;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const messages = await ChatMessage.find(
      { userId: new ObjectId(userId) },
      { _id: 0, updatedAt: 0, __v: 0, userId: 0 }
    ).sort({ createdAt: 1 });

    res.json({ messages });
  } catch (error) {
    console.error("❌ Error fetching chat history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
