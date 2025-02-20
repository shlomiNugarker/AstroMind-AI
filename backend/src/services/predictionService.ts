import { zodiacPredictions } from "../data/zodiacPredictions";
import { zodiacMap } from "../data/zodiacMap";

export const getPrediction = (
  birthdate: string,
  interests: ("career" | "love" | "health")[]
) => {
  const month = parseInt(birthdate.split("-")[1]);
  const zodiacId = zodiacMap[month];

  const zodiac = zodiacPredictions.find((z) => z.id === zodiacId);
  if (!zodiac) return { error: "מזל לא נמצא" };

  // שליפת נתונים על פי תחומי העניין
  const predictions = interests.reduce((acc, interest) => {
    acc[interest] = zodiac[interest] || "אין מידע זמין.";
    return acc;
  }, {} as Record<string, string>);

  return { zodiac: zodiac.name, predictions };
};
