"use strict";
// import OpenAI from "openai";
// import dotenv from "dotenv";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrediction = void 0;
// dotenv.config();
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
const answer = "כמובן! שלומי נוגרקר נולד ב-11 בפברואר, כך שמזל השמש שלו הוא דלי. מזל דלי ידוע כמיוחד, עצמאי ומקורי, אולם גם כמי שמחפש צדק חברתי וחיבור לקהילה. להלן חיזוי אסטרולוגי כללי למזל דלי בתקופה הקרובה:\n\n1. **קריירה וכספים**: הפוטנציאלית לפריצה בקריירה גבוהה. יתכן שפרויקט חדש או הזדמנות עבודה מעניינת תופיע באופק. זהו זמן טוב לחשוב מחוץ לקופסה ולהציג רעיונות חדשניים. שים לב לצרכי התקציב האישי שלך ונסה להימנע מהוצאות לא נחוצות.\n\n2. **אהבה ומערכות יחסים**: יתכנו שינויים במערכות היחסים. אם אתה רווק, יש סיכוי להכיר אנשים חדשים ומרתקים. אם אתה במערכת יחסים, זהו זמן לבחון את הקשר ולהוסיף לו קצת מהרוח המיוחדת שלך.\n\n3. **בריאות**: חשוב להקשיב לגוף שלך בתקופה זו. התחל את היום עם פעילות גופנית קלה ונסה להכניס שינויים חיוביים לתזונה שלך. גם התפרסות נפשית יכולה לעזור.\n\n4. **התפתחות אישית**: המוח שלך בעיצומו של פריחה רעיונית, וזהו זמן נהדר ללמוד משהו חדש או לטפח תחביב יצירתי. החזון האישי והרצונות האישיים שלך מתחדדים, וזה הזמן לפעול בכיוון שמרגיש לך נכון.\n\nזכור שזהו רק חיזוי כללי ולא תחזית מדויקת למצבך האישי, וכמובן, שההחלטות שלך הן שיקבעו את העתיד שלך. בהצלחה!";
const generatePrediction = (userInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return answer;
        // const response = await openai.chat.completions.create({
        //   model: "gpt-4o",
        //   messages: [
        //     {
        //       role: "user",
        //       content: `תן חיזוי אסטרולוגי למשתמש בהתבסס על הנתונים הבאים: שם: שלומי נוגרקר. תאריך לידה: 11.02.1992.`,
        //     },
        //   ],
        // });
        // const predictionText =
        //   response.choices[0]?.message?.content || "לא התקבלה תשובה מהמודל.";
        // console.log("🔮 Prediction generated:", predictionText);
        // return predictionText;
    }
    catch (error) {
        console.error("❌ Error generating prediction:", error);
        throw new Error("Failed to generate prediction.");
    }
});
exports.generatePrediction = generatePrediction;
