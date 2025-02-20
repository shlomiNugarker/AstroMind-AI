"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chatMessageSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role: { type: String, enum: ["user", "bot"], required: true },
    text: { type: String, required: true },
}, { timestamps: true });
exports.ChatMessage = mongoose_1.default.model("ChatMessage", chatMessageSchema);
