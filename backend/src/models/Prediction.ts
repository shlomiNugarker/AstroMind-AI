import mongoose, { Schema, Document } from "mongoose";

export interface IPrediction extends Document {
  userId: string;
  inputData: string;
  predictionText: string;
  createdAt: Date;
}

const PredictionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  inputData: { type: String, required: true },
  predictionText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Prediction = mongoose.model<IPrediction>(
  "Prediction",
  PredictionSchema
);
