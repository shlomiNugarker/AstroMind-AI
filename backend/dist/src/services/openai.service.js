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
exports.generatePrediction = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const generatePrediction = (userInput) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const response = yield openai.chat.completions.create({
            model: "gpt-4",
            max_tokens: 150,
            messages: [
                {
                    role: "user",
                    content: `תן חיזוי אישי למשתמש בהתבסס על הנתונים הבאים: ${userInput}`,
                },
            ],
        });
        const predictionText = ((_c = (_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.trim()) || "";
        return predictionText;
    }
    catch (error) {
        console.error("❌ Error generating prediction:", error);
        throw new Error("Failed to generate prediction.");
    }
});
exports.generatePrediction = generatePrediction;
