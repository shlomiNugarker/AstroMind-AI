export const isHebrew = (text: string) => /[\u0590-\u05FF]/.test(text);
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const hebrewToEnglishMap: { [key: string]: string } = {
  א: "t",
  ב: "c",
  ג: "d",
  ד: "s",
  ה: "v",
  ו: "u",
  ז: "z",
  ח: "j",
  ט: "y",
  י: "h",
  כ: "f",
  ל: "k",
  מ: "n",
  נ: "b",
  ס: "x",
  ע: "g",
  פ: "p",
  צ: "m",
  ק: "e",
  ר: "r",
  ש: "a",
  ת: ",",
  ך: "l",
  ם: "o",
  ן: "i",
  ף: ";",
  ץ: ".",
};

const englishToHebrewMap: { [key: string]: string } = Object.fromEntries(
  Object.entries(hebrewToEnglishMap).map(([he, en]) => [en, he])
);

export const convertHebrewToEnglish = (text: string): string => {
  return text
    .split("")
    .map((char) => hebrewToEnglishMap[char] || char)
    .join("");
};

export const convertEnglishToHebrew = (text: string) => {
  return text
    .split("")
    .map((char) => englishToHebrewMap[char] || char)
    .join("");
};
