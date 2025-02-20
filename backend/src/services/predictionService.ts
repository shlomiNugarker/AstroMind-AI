import { zodiacPredictions } from "../data/zodiacPredictions";

export const getPrediction = (birthdate: string, lang: "en" | "he" = "en") => {
  const [year, month, day] = birthdate.split("-").map(Number);
  if (!year || !month || !day) {
    return { error: "Invalid date format. Please use YYYY-MM-DD" };
  }

  const zodiac = zodiacPredictions.find((z) => {
    const [startMonth, startDay] = z.startDate.split("-").map(Number);
    const [endMonth, endDay] = z.endDate.split("-").map(Number);

    return (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (month > startMonth && month < endMonth)
    );
  });

  if (!zodiac) return { error: "No available data for this zodiac sign" };

  return {
    zodiac: zodiac.translations[lang],
    prediction: zodiac.predictions[lang],
  };
};
