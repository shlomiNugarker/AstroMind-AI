import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const generateResponse = async (userInput: string) => {
  if (!process.env.OPENAI_API_KEY) {
    const defaultResponse = `
                            שגיאה 418: אני קומקום תה ☕\n
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
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: userInput,
        },
      ],
    });

    const lastMassege =
      response.choices[0]?.message?.content ||
      "No response from the assistant.";

    return lastMassege;
  } catch (error) {
    console.error("❌ Error generating answer:", error);
    throw new Error("Failed to generate answer.");
  }
};
