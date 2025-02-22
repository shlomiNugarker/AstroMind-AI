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
exports.generateResponse = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
const responses_1 = require("../../data/responses");
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY || "",
});
const generateResponse = (userInput, lang) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // אם אין מפתח API, נחזיר תשובה מוכנה מראש
    if (!process.env.OPENAI_API_KEY) {
        return responses_1.responses[lang][Math.floor(Math.random() * responses_1.responses[lang].length)];
    }
    try {
        const response = yield openai.chat.completions.create({
            model: "gpt-4-turbo",
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
            max_tokens: 200,
            temperature: 0.6,
            top_p: 0.9,
            frequency_penalty: 0.2,
            presence_penalty: 0.2, // מעודד גיוון בתשובות
        });
        return (((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) ||
            "I'm here to assist with astrology and coaching!");
    }
    catch (error) {
        console.error("❌ Error generating answer:", error);
        return "⚠️ Oops! Something went wrong. Try again later.";
    }
});
exports.generateResponse = generateResponse;
