import OpenAI from "openai";
import dotenv from "dotenv";
import { simpleResponses } from "../../data/simpleResponses";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const chatHistory: { role: "system" | "user"; content: string }[] = [
  {
    role: "system",
    content: `You are AstroMind-AI, an expert AI assistant for astrology.
    You provide astrological insights, daily horoscopes, and practical coaching advice.
    Keep responses concise and direct. If a question is off-topic, respond with:
    "I specialize in astrology and coaching. Let me know how I can help in these areas!"`,
  },
];

const MAX_HISTORY = 5;
const addToHistory = (role: "system" | "user", content: string) => {
  if (chatHistory.length >= MAX_HISTORY) {
    chatHistory.shift();
  }
  chatHistory.push({ role, content });
};

const responseMap = new Map<string, string>(
  Object.entries(simpleResponses).map(([key, value]) => [
    key.toLowerCase(),
    value,
  ])
);

const levenshteinDistance = (a: string, b: string): number => {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
};

const rateLimit = new Map<string, number>();
const RATE_LIMIT_MS = 5000;

export const generateResponse = async (
  userInput: string,
  lang: "en" | "he",
  userId: string
) => {
  const now = Date.now();
  if (rateLimit.has(userId) && now - rateLimit.get(userId)! < RATE_LIMIT_MS) {
    return lang === "he"
      ? "⚠️ אנא המתן כמה שניות לפני שליחת שאלה נוספת."
      : "⚠️ Please wait a few seconds before sending another question.";
  }
  rateLimit.set(userId, now);

  const lowerInput = userInput.trim().toLowerCase();
  const threshold = 0.55;
  let bestMatch = "";
  let bestScore = 0;

  for (const key of responseMap.keys()) {
    const distance = levenshteinDistance(lowerInput, key);
    const maxLen = Math.max(lowerInput.length, key.length);
    const similarity = 1 - distance / maxLen;

    const substringMatch = lowerInput.includes(key) || key.includes(lowerInput);

    if (similarity > bestScore || substringMatch) {
      bestScore = substringMatch ? 1 : similarity;
      bestMatch = key;
    }
  }

  if (bestScore >= threshold && responseMap.has(bestMatch)) {
    return responseMap.get(bestMatch);
  }

  if (!process.env.OPENAI_API_KEY) {
    return lang === "he"
      ? "⚠️ נראה שהמערכת לא מוגדרת כראוי. אנא צור קשר עם המנהל."
      : "⚠️ It seems like the system is not configured properly. Please contact the administrator.";
  }

  const useCheaperModel = lowerInput.length < 50;

  addToHistory("user", userInput);

  try {
    const response = await openai.chat.completions.create({
      model: useCheaperModel ? "gpt-3.5-turbo" : "gpt-4-turbo",
      messages: chatHistory,
      max_tokens: 650,
      temperature: 0.5,
      top_p: 0.85,
      frequency_penalty: 0.2,
      presence_penalty: 0.2,
    });

    const answer =
      response.choices[0]?.message?.content || "I'm here to assist!";
    addToHistory("system", answer);

    return answer;
  } catch (error: any) {
    if (error.response) {
      console.error(
        `❌ OpenAI API Error: ${error.response.status} - ${error.response.data.error.message}`
      );
    } else if (error.request) {
      console.error("❌ No response from OpenAI API:", error.request);
    } else {
      console.error("❌ Unexpected error:", error.message);
    }

    return lang === "he"
      ? "⚠️ אופס! משהו השתבש, נסה שוב מאוחר יותר."
      : "⚠️ Oops! Something went wrong, try again later.";
  }
};
