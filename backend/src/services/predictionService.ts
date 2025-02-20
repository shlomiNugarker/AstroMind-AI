import { zodiacPredictions } from "../data/zodiacPredictions";

export const getPrediction = (
  birthdate: string,
  interests: ("career" | "love" | "health")[]
) => {
  const [year, month, day] = birthdate.split("-").map(Number);
  if (!year || !month || !day) {
    return { error: "פורמט תאריך לא תקין. יש להזין YYYY-MM-DD" };
  }

  const zodiac = zodiacPredictions.find((z) => {
    return (
      (month === z.startMonth && day >= z.startDay) ||
      (month === z.endMonth && day <= z.endDay) ||
      (month > z.startMonth && month < z.endMonth)
    );
  });

  if (!zodiac) return { error: "אין מידע זמין למזל זה" };

  const predictions = interests.reduce((acc, interest) => {
    acc[interest] = zodiac[interest] || "אין מידע זמין.";
    return acc;
  }, {} as Record<string, string>);

  return { zodiac: zodiac.name, predictions };
};
