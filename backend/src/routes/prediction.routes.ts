import express from "express";
import { generatePrediction } from "../services/openai.service";
import { Prediction } from "../models/Prediction";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getPrediction } from "../services/predictionService";
import { ChatMessage } from "../models/ChatMessage";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/chat", authMiddleware, async (req, res) => {
  const { message } = req.body;
  // @ts-ignore
  const userId = req.user?._id;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const userMessage = await ChatMessage.create({
      userId,
      role: "user",
      text: message,
    });

    const assistantResponse = await generatePrediction(message);

    const botMessage = await ChatMessage.create({
      userId,
      role: "assistant",
      text: assistantResponse,
    });

    res.json(assistantResponse);
  } catch (error) {
    console.error("❌ Error handling chat message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/chat/history", authMiddleware, async (req, res) => {
  // @ts-ignore
  const userId = req.user?._id;

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

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { inputData } = req.body;
    // @ts-ignore
    const userId = req.user?._id;

    if (!inputData) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const existingPrediction = await Prediction.findOne({
      userId: new ObjectId(userId),
      inputData,
    });
    if (existingPrediction) {
      console.log("✅ Using cached prediction.");
      return res.json({ prediction: existingPrediction.predictionText });
    }

    const predictionText = await generatePrediction(inputData);
    const newPrediction = await Prediction.create({
      userId,
      inputData,
      predictionText,
      createdAt: new Date(),
    });

    res.json({ prediction: newPrediction.predictionText });
  } catch (error) {
    console.error("❌ Error in prediction route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { birthdate, lang } = req.query;

    if (
      !birthdate ||
      typeof birthdate !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(birthdate)
    ) {
      return res
        .status(400)
        .json({ error: "Invalid birthdate. Please use format YYYY-MM-DD" });
    }

    const prediction = getPrediction(birthdate, lang as "en" | "he");

    return res.json(prediction);
  } catch (error) {
    console.error("❌ Error in prediction route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
