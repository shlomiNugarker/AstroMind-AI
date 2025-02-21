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
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY || "",
});
const generateResponse = (userInput) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!process.env.OPENAI_API_KEY) {
        const defaultResponse = `שגיאה 418: אני קומקום תה ☕\n
                            נראה שהמפתח שכח לשלם על ה-API, אז במקום תשובה חכמה, קיבלת אותי – קוד קשיח של מתכנת עם ניסיון ויותר מדי קפה.\n
                            👨‍💻 מי אני?\n
                            שלומי, מתכנת פולסטאק עם ניסיון עשיר ב-React, Next.js, Node.js, וכל מה שצריך כדי להפוך רעיון למערכת חיה ובועטת.\n
                            אני כותב קוד נקי, חכם, ויעיל, יודע להתמודד עם ארכיטקטורות מורכבות, ומומחה בפתירת באגים מסתוריים שמופיעים רק בייצור (כמובן).\n
                            🚀 אז למה הצ'אט מרגיש קצת רובוטי?\n
                            כי כרגע הוא רץ במצב חיסכון, בלי AI אמיתי מאחורי הקלעים. זה כמו אתר שמבקש "נסה שוב מאוחר יותר" בדיוק כשאתה צריך אותו.\n
                            🤖 רוצה לדבר עם מתכנת אמיתי?\n
                            אם אתה מחפש מישהו שיבנה לך מערכת יציבה, קוד ברור, ופתרונות חכמים שלא קורסים בדיוק ברגע הלא נכון – בוא נדבר!\n
                            > "מתכנתים לא עושים טעויות – זה פשוט באג שמחכה להפוך לפיצ'ר."\n
                            `;
        return defaultResponse;
    }
    try {
        const response = yield openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: userInput,
                },
            ],
        });
        const lastMassege = ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) ||
            "No response from the assistant.";
        return lastMassege;
    }
    catch (error) {
        console.error("❌ Error generating answer:", error);
        throw new Error("Failed to generate answer.");
    }
});
exports.generateResponse = generateResponse;
