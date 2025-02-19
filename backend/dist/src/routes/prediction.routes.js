"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openai_service_1 = require("../services/openai.service");
const Prediction_1 = require("../models/Prediction");
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, inputData } = req.body;
        if (!userId || !inputData) {
            return res.status(400).json({ error: "Missing required fields." });
        }
        const predictionText = yield (0, openai_service_1.generatePrediction)(inputData);
        const newPrediction = new Prediction_1.Prediction({
            userId,
            inputData,
            predictionText,
            createdAt: new Date(),
        });
        yield newPrediction.save();
        res.json({ prediction: predictionText });
    }
    catch (error) {
        console.error("❌ Error in prediction route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
