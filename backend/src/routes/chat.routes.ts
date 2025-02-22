import express from "express";
import { generateResponse } from "../services/openai.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ChatMessage } from "../models/ChatMessage";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
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

    const assistantResponse = await generateResponse(message);

    const botMessage = await ChatMessage.create({
      userId,
      role: "assistant",
      text: assistantResponse,
    });

    res.json({ message: assistantResponse });
  } catch (error) {
    console.error("❌ Error handling chat message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/history", authMiddleware, async (req, res) => {
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

export default router;
