import express from "express";
import { generatePrediction } from "../services/openai.service";
import { Prediction } from "../models/Prediction";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getPrediction } from "../services/predictionService";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { userId, inputData } = req.body;

    if (!userId || !inputData) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const existingPrediction = await Prediction.findOne({ userId, inputData });
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
