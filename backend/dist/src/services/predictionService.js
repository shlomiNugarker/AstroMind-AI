"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrediction = void 0;
const zodiacPredictions_1 = require("../data/zodiacPredictions");
const getPrediction = (birthdate, interests) => {
    const [year, month, day] = birthdate.split("-").map(Number);
    if (!year || !month || !day) {
        return { error: "פורמט תאריך לא תקין. יש להזין YYYY-MM-DD" };
    }
    const zodiac = zodiacPredictions_1.zodiacPredictions.find((z) => {
        return ((month === z.startMonth && day >= z.startDay) ||
            (month === z.endMonth && day <= z.endDay) ||
            (month > z.startMonth && month < z.endMonth));
    });
    if (!zodiac)
        return { error: "אין מידע זמין למזל זה" };
    const predictions = interests.reduce((acc, interest) => {
        acc[interest] = zodiac[interest] || "אין מידע זמין.";
        return acc;
    }, {});
    return { zodiac: zodiac.name, predictions };
};
exports.getPrediction = getPrediction;
