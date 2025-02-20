"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrediction = void 0;
const zodiacPredictions_1 = require("../data/zodiacPredictions");
const zodiacMap_1 = require("../data/zodiacMap");
const getPrediction = (birthdate, interests) => {
    const month = parseInt(birthdate.split("-")[1]);
    const zodiacId = zodiacMap_1.zodiacMap[month];
    const zodiac = zodiacPredictions_1.zodiacPredictions.find((z) => z.id === zodiacId);
    if (!zodiac)
        return { error: "מזל לא נמצא" };
    // שליפת נתונים על פי תחומי העניין
    const predictions = interests.reduce((acc, interest) => {
        acc[interest] = zodiac[interest] || "אין מידע זמין.";
        return acc;
    }, {});
    return { zodiac: zodiac.name, predictions };
};
exports.getPrediction = getPrediction;
