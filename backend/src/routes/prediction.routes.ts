import express from "express";
import { generatePrediction } from "../services/openai.service";
import { Prediction } from "../models/Prediction";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, inputData } = req.body;

    if (!userId || !inputData) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const predictionText = await generatePrediction(inputData);

    const newPrediction = new Prediction({
      userId,
      inputData,
      predictionText,
      createdAt: new Date(),
    });

    await newPrediction.save();

    res.json({ prediction: predictionText });
  } catch (error) {
    console.error("❌ Error in prediction route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
