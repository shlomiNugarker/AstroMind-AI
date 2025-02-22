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
const responses = {
    he: [
        "🔮 סבתא שלי תמיד אמרה: 'הגורל בידיים שלך... אבל תחזיות טובות עולות כסף!' 😉",
        "✨ אנשים חכמים יודעים שהעתיד לא כתוב באבן – אבל המידע האמיתי נמצא מאחורי מנוי!",
        "🌌 כולם רוצים לדעת מה הכוכבים אומרים, אבל רק החכמים באמת מוכנים להשקיע בעתיד שלהם!",
        "🌙 'אם אתה רוצה תשובות גדולות, תהיה מוכן לשלם קצת קטן' – אמר כל אסטרולוג חכם אי פעם.",
        "🔭 אנשים מצליחים לא מחכים שהמזל יגיע – הם דואגים שהוא יגיע עם מנוי פרימיום!",
        "🌠 סוד ההצלחה? לדעת לאן הכוכבים מובילים אותך – והם לוחשים רק למי שמוכן להקשיב...",
        "💫 חכמים אומרים ש'אין חיזוי טוב יותר מהחלטות שלך'... אבל בוא נגיד שחיזוי מדויק לא מזיק!",
        "🔥 כמו שסבתא תמיד אמרה: 'נכון, החיים הם הימור – אבל למה לא לקבל הצצה לקלפים?'",
        "🪐 בעולם שבו כולם מחפשים כיוון, מי שיש לו מפה טובה הוא זה שמגיע הכי רחוק!",
        "🔐 'אם היית יודע את המספרים של הלוטו, היית משחק?'... התשובות שלי זה בדיוק אותו דבר!",
        "🌙 'הכוכבים מכוונים אותך, אבל אתה זה שמחזיק בהגה' – מנוי יראה לך את הדרך!",
        "📜 בעולם של בלבול, יש כאלה שמקשיבים לרחוב – ואחרים שמקשיבים לאסטרולוגיה. אתה באיזה צד?",
        "🌠 'מזל טוב הוא לא קסם, הוא תוצאה של הכנה נכונה' – והכנה טובה מתחילה בחיזוי מדויק!",
        "✨ העולם שייך לאמיצים – ומי שמוכן להשקיע בעצמו הוא תמיד צעד אחד קדימה!",
        "🔮 'לשאול זה חינם, לדעת זה פרימיום' – כמו שהאסטרולוגים הקדומים תמיד אמרו!",
        "🌟 'אף פעם אל תזלזל בכוח הידיעה' – ומי שיודע יותר, מצליח יותר!",
        "💎 'אל תבזבז זמן על ניחושים כשאפשר לקבל תשובה מדויקת' – הרי זו חכמת הדורות!",
        "🔥 הכוכבים כבר יודעים את התשובות, רק צריך את הכלים כדי לקרוא אותן נכון!",
        "⚡ 'כשהיקום מדבר – החכמים מקשיבים, והשאר ממשיכים לנחש'. איזה מהם אתה רוצה להיות?",
        "🛸 כל המוצלחים שאני מכיר חיפשו תשובות. ההבדל? הם בחרו לשמוע אותן בפרימיום!",
    ],
    en: [
        "🔮 My grandma always said: 'Destiny is in your hands... but the best predictions come at a price!' 😉",
        "✨ Wise people know the future isn’t set in stone – but the real insights are behind a premium subscription!",
        "🌌 Everyone wants to know what the stars say, but only the truly wise invest in their future!",
        "🌙 'If you want great answers, be ready to pay a little price' – every wise astrologer ever.",
        "🔭 Successful people don’t wait for luck – they make sure it comes with a premium subscription!",
        "🌠 The secret to success? Knowing where the stars are leading you – and they whisper only to those who listen...",
        "💫 Smart people say, 'No prediction beats your own decisions'... but let’s just say, accurate predictions don’t hurt!",
        "🔥 As grandma always said: 'Sure, life is a gamble – but why not get a sneak peek at the cards?'",
        "🪐 In a world where everyone seeks direction, those with the best map get the farthest!",
        "🔐 'If you knew the winning lottery numbers, would you play?'... My answers work the same way!",
        "🌙 'The stars guide you, but you hold the steering wheel' – a premium subscription shows you the road!",
        "📜 In a world full of confusion, some listen to the streets – others listen to astrology. Which one are you?",
        "🌠 'Good fortune isn’t magic; it’s the result of good preparation' – and good preparation starts with accurate insights!",
        "✨ The world belongs to the bold – and those who invest in themselves are always one step ahead!",
        "🔮 'Asking is free, knowing is premium' – just like the ancient astrologers always said!",
        "🌟 'Never underestimate the power of knowledge' – because those who know more, win more!",
        "💎 'Don’t waste time guessing when you can get precise answers' – that’s just common wisdom!",
        "🔥 The stars already know the answers, you just need the right tools to read them!",
        "⚡ 'When the universe speaks – the wise listen, and the rest keep guessing.' Which one do you want to be?",
        "🛸 Every successful person I know looked for answers. The difference? They chose to get them in premium!",
    ],
};
if (!process.env.OPENAI_API_KEY) {
    console.warn("⚠️ OPENAI_API_KEY is missing. The chatbot will not function.");
}
router.post("/", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { message, lang } = req.body;
    if (!process.env.OPENAI_API_KEY) {
        return res.json({
            message: responses[lang][Math.floor(Math.random() * responses[lang].length)],
        });
    }
    // @ts-ignore
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }
    try {
        yield ChatMessage_1.ChatMessage.create({ userId, role: "user", text: message });
        const assistantResponse = yield (0, openai_service_1.generateResponse)(message);
        yield ChatMessage_1.ChatMessage.create({
            userId,
            role: "system",
            text: assistantResponse,
        });
        res.json({ message: assistantResponse });
    }
    catch (error) {
        console.error("❌ Error handling chat message:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Internal Server Error",
        });
    }
}));
router.get("/history", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // @ts-ignore
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
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
