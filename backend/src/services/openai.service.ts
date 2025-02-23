import OpenAI from "openai";
import dotenv from "dotenv";
import { simpleResponses } from "../../data/simpleResponses";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// שמירת היסטוריה קצרה כדי לשפר הקשר מבלי לבזבז טוקנים
let chatHistory: { role: "system" | "user"; content: string }[] = [
  {
    role: "system",
    content: `You are AstroMind-AI, an expert AI assistant for astrology and personal coaching.
    You provide astrological insights, daily horoscopes, and practical coaching advice.
    Keep responses concise and direct. If a question is off-topic, respond with:
    "I specialize in astrology and coaching. Let me know how I can help in these areas!"`,
  },
];

// פונקציית Levenshtein לחישוב מרחק בין מחרוזות
function levenshteinDistance(a: string, b: string): number {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // מחיקה
          matrix[i][j - 1] + 1, // הוספה
          matrix[i - 1][j - 1] + 1 // החלפה
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

export const generateResponse = async (
  userInput: string,
  lang: "en" | "he"
) => {
  const lowerInput = userInput.trim().toLowerCase();
  const threshold = 0.35; // יותר סלחני - תופס התאמות גם אם הן לא חזקות
  let bestMatch = "";
  let bestScore = 0;

  for (const key of Object.keys(simpleResponses)) {
    const keyLower = key.toLowerCase();

    // בדיקת התאמה באמצעות levenshtein
    const distance = levenshteinDistance(lowerInput, keyLower);
    const maxLen = Math.max(lowerInput.length, keyLower.length);
    const similarity = 1 - distance / maxLen;

    // בדיקת התאמה ע"י חיפוש מחרוזות (במידה והתשובה מכילה את השאלה)
    const substringMatch =
      lowerInput.includes(keyLower) || keyLower.includes(lowerInput);

    // בוחרים את ההתאמה הכי טובה
    if (similarity > bestScore || substringMatch) {
      bestScore = substringMatch ? 1 : similarity; // אם זו התאמה חלקית, ניתן לה משקל גבוה
      bestMatch = key;
    }
  }

  if (bestScore >= threshold && simpleResponses[bestMatch]) {
    return simpleResponses[bestMatch];
  }

  if (!process.env.OPENAI_API_KEY) {
    return lang === "he"
      ? "אני לא חכם מספיק כדי לענות על זה בגלל שהאפליקציה במצב דמו, צור קשר עם המפתח לעוד פרטים - shlomin1231@gmail.com"
      : "I'm not smart enough to answer this because the app is in demo mode, contact the developer for more details - shlomin1231@gmail.com";
  }

  const useCheaperModel = lowerInput.length < 50;

  chatHistory.push({ role: "user", content: userInput });
  chatHistory = chatHistory.slice(-5);

  try {
    const response = await openai.chat.completions.create({
      // model: "gpt-4-turbo",
      model: useCheaperModel ? "gpt-3.5-turbo" : "gpt-4-turbo",
      messages: chatHistory,
      max_tokens: 650, // תגובות קצרות ומדויקות
      temperature: 0.5, // פחות חזרות ויותר רלוונטיות
      top_p: 0.85, // איזון בין יצירתיות לאמינות
      frequency_penalty: 0.2, // מונע חזרות
      presence_penalty: 0.2, // שומר על גיוון
    });

    const answer =
      response.choices[0]?.message?.content || "I'm here to assist!";
    chatHistory.push({ role: "system", content: answer });

    return answer;
  } catch (error) {
    console.error("❌ Error generating answer:", error);
    return lang === "he"
      ? "⚠️ אופס! משהו השתבש, נסה שוב מאוחר יותר."
      : "⚠️ Oops! Something went wrong, try again later.";
  }
};
