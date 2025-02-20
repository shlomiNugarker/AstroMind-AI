"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodiacPredictions = void 0;
// Capricorn
const capricornForecast_1 = __importDefault(require("./forcasts/en/capricornForecast"));
const capricornForecast_2 = __importDefault(require("./forcasts/he/capricornForecast"));
// Aquarius
const aquariusForecast_1 = __importDefault(require("./forcasts/en/aquariusForecast"));
const aquariusForecast_2 = __importDefault(require("./forcasts/he/aquariusForecast"));
// Pisces
const piscesForecast_1 = __importDefault(require("./forcasts/en/piscesForecast"));
const piscesForecast_2 = __importDefault(require("./forcasts/en/piscesForecast"));
// General
const generalForecast_1 = __importDefault(require("./forcasts/en/generalForecast"));
const generalForecast_2 = __importDefault(require("./forcasts/he/generalForecast"));
exports.zodiacPredictions = [
    {
        id: 1,
        translations: { en: "Capricorn", he: "גדי" },
        startDate: "12-22",
        endDate: "01-19",
        predictions: {
            en: capricornForecast_1.default,
            he: capricornForecast_2.default,
        },
    },
    {
        id: 2,
        translations: { en: "Aquarius", he: "דלי" },
        startDate: "01-20",
        endDate: "02-18",
        predictions: {
            en: aquariusForecast_1.default,
            he: aquariusForecast_2.default,
        },
    },
    {
        id: 3,
        translations: { en: "Pisces", he: "דגים" },
        startDate: "02-19",
        endDate: "03-20",
        predictions: {
            en: piscesForecast_2.default,
            he: piscesForecast_1.default,
        },
    },
    {
        id: 4,
        translations: { en: "Aries", he: "טלה" },
        startDate: "03-21",
        endDate: "04-19",
        predictions: {
            en: generalForecast_1.default,
            he: generalForecast_2.default,
        },
    },
    {
        id: 5,
        translations: { en: "Taurus", he: "שור" },
        startDate: "04-20",
        endDate: "05-20",
        predictions: {
            en: generalForecast_1.default,
            he: generalForecast_2.default,
        },
    },
    {
        id: 6,
        translations: { en: "Gemini", he: "תאומים" },
        startDate: "05-21",
        endDate: "06-21",
        predictions: {
            en: generalForecast_1.default,
            he: generalForecast_2.default,
        },
    },
    {
        id: 7,
        translations: { en: "Cancer", he: "סרטן" },
        startDate: "06-22",
        endDate: "07-22",
        predictions: {
            en: generalForecast_1.default,
            he: generalForecast_2.default,
        },
    },
    {
        id: 8,
        translations: { en: "Leo", he: "אריה" },
        startDate: "07-23",
        endDate: "08-22",
        predictions: {
            en: generalForecast_1.default,
            he: generalForecast_2.default,
        },
    },
    {
        id: 9,
        translations: { en: "Virgo", he: "בתולה" },
        startDate: "08-23",
        endDate: "09-22",
        predictions: {
            en: generalForecast_1.default,
            he: generalForecast_2.default,
        },
    },
    {
        id: 10,
        translations: { en: "Libra", he: "מאזניים" },
        startDate: "09-23",
        endDate: "10-22",
        predictions: {
            en: generalForecast_1.default,
            he: generalForecast_2.default,
        },
    },
    {
        id: 11,
        translations: { en: "Scorpio", he: "עקרב" },
        startDate: "10-23",
        endDate: "11-21",
        predictions: {
            en: generalForecast_1.default,
            he: generalForecast_2.default,
        },
    },
    {
        id: 12,
        translations: { en: "Sagittarius", he: "קשת" },
        startDate: "11-22",
        endDate: "12-21",
        predictions: {
            en: generalForecast_1.default,
            he: generalForecast_2.default,
        },
    },
];
