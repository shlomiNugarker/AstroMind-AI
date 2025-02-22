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
const auth_middleware_1 = require("../middlewares/auth.middleware");
const ChatMessage_1 = require("../models/ChatMessage");
const mongodb_1 = require("mongodb");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!process.env.OPENAI_API_KEY) {
        const defaultResponse = `
                  נראה שהמוח של הבינה המלאכותית לוקח הפסקה קצרה... 🧠💤
                  כרגע אין קרדיטים זמינים ב-API, ולכן העוזר החכם שלנו לא פעיל. אבל אל דאגה – זה זמני בלבד!

                  💡 מה אפשר לעשות בינתיים?
                  ✅ לחקור את שאר המערכת ולהתרשם מהיכולות שלנו
                  ✅ לבדוק שוב מאוחר יותר – הבוט יחזור לפעול בקרוב
                  ✅ להשאיר לנו הודעה ואנחנו נחזור אליך עם תשובה

                  אנחנו עובדים כדי להבטיח חוויית משתמש חלקה ואינטראקטיבית, אז תודה על הסבלנות! 🙏
                            `;
        return res.json({ message: defaultResponse });
    }
    const { message } = req.body;
    // @ts-ignore
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }
    try {
        const userMessage = yield ChatMessage_1.ChatMessage.create({
            userId,
            role: "user",
            text: message,
        });
        const assistantResponse = yield (0, openai_service_1.generateResponse)(message);
        const botMessage = yield ChatMessage_1.ChatMessage.create({
            userId,
            role: "assistant",
            text: assistantResponse,
        });
        res.json({ message: assistantResponse });
    }
    catch (error) {
        console.error("❌ Error handling chat message:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
router.get("/history", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // @ts-ignore
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    try {
        const messages = yield ChatMessage_1.ChatMessage.find({ userId: new mongodb_1.ObjectId(userId) }, { _id: 0, updatedAt: 0, __v: 0, userId: 0 }).sort({ createdAt: 1 });
        res.json({ messages });
    }
    catch (error) {
        console.error("❌ Error fetching chat history:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
