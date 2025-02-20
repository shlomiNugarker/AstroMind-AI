// Capricorn
import capricornForecastEn from "./forcasts/en/capricornForecast";
import capricornForecastHe from "./forcasts/he/capricornForecast";
// Aquarius
import aquariusForecastEn from "./forcasts/en/aquariusForecast";
import aquariusForecastHe from "./forcasts/he/aquariusForecast";
// Pisces
import piscesForecastHe from "./forcasts/en/piscesForecast";
import piscesForecastEn from "./forcasts/en/piscesForecast";

// General
import generalForecastEn from "./forcasts/en/generalForecast";
import generalForecastHe from "./forcasts/he/generalForecast";

export const zodiacPredictions = [
  {
    id: 1,
    translations: { en: "Capricorn", he: "גדי" },
    startDate: "12-22",
    endDate: "01-19",
    predictions: {
      en: capricornForecastEn,
      he: capricornForecastHe,
    },
  },
  {
    id: 2,
    translations: { en: "Aquarius", he: "דלי" },
    startDate: "01-20",
    endDate: "02-18",
    predictions: {
      en: aquariusForecastEn,
      he: aquariusForecastHe,
    },
  },
  {
    id: 3,
    translations: { en: "Pisces", he: "דגים" },
    startDate: "02-19",
    endDate: "03-20",
    predictions: {
      en: piscesForecastEn,
      he: piscesForecastHe,
    },
  },
  {
    id: 4,
    translations: { en: "Aries", he: "טלה" },
    startDate: "03-21",
    endDate: "04-19",
    predictions: {
      en: generalForecastEn,
      he: generalForecastHe,
    },
  },
  {
    id: 5,
    translations: { en: "Taurus", he: "שור" },
    startDate: "04-20",
    endDate: "05-20",
    predictions: {
      en: generalForecastEn,
      he: generalForecastHe,
    },
  },
  {
    id: 6,
    translations: { en: "Gemini", he: "תאומים" },
    startDate: "05-21",
    endDate: "06-21",
    predictions: {
      en: generalForecastEn,
      he: generalForecastHe,
    },
  },
  {
    id: 7,
    translations: { en: "Cancer", he: "סרטן" },
    startDate: "06-22",
    endDate: "07-22",
    predictions: {
      en: generalForecastEn,
      he: generalForecastHe,
    },
  },
  {
    id: 8,
    translations: { en: "Leo", he: "אריה" },
    startDate: "07-23",
    endDate: "08-22",
    predictions: {
      en: generalForecastEn,
      he: generalForecastHe,
    },
  },
  {
    id: 9,
    translations: { en: "Virgo", he: "בתולה" },
    startDate: "08-23",
    endDate: "09-22",
    predictions: {
      en: generalForecastEn,
      he: generalForecastHe,
    },
  },
  {
    id: 10,
    translations: { en: "Libra", he: "מאזניים" },
    startDate: "09-23",
    endDate: "10-22",
    predictions: {
      en: generalForecastEn,
      he: generalForecastHe,
    },
  },
  {
    id: 11,
    translations: { en: "Scorpio", he: "עקרב" },
    startDate: "10-23",
    endDate: "11-21",
    predictions: {
      en: generalForecastEn,
      he: generalForecastHe,
    },
  },
  {
    id: 12,
    translations: { en: "Sagittarius", he: "קשת" },
    startDate: "11-22",
    endDate: "12-21",
    predictions: {
      en: generalForecastEn,
      he: generalForecastHe,
    },
  },
];
