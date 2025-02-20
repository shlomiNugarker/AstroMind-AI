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

router.get("/", (req, res) => {
  try {
    const { birthdate, interests } = req.query;

    if (!birthdate || typeof birthdate !== "string") {
      return res
        .status(400)
        .json({ error: "יש להזין תאריך לידה תקף (YYYY-MM-DD)" });
    }

    const interestsArray: ("career" | "love" | "health")[] = interests
      ? (interests.toString().split(",") as ("career" | "love" | "health")[])
      : ["career", "love", "health"];

    const prediction = getPrediction(birthdate, interestsArray);

    return res.json(prediction);
  } catch (error) {
    console.error("❌ Error in prediction route:", error);
    res.status(500).json({ error });
  }
});

export default router;
