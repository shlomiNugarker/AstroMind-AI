import express, { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { connectDB } from "./src/database/db";
import { config } from "./src/config";
import userRoutes from "./src/routes/user.routes";
import authRoutes from "./src/routes/auth.routes";
import chatRoutes from "./src/routes/chat.routes";
import compression from "compression";

dotenv.config();

const app: Express = express();
const server = http.createServer(app);

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.isProduction },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: config.allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(compression());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Server Error:", JSON.stringify(err, null, 2));
  res.status(500).json({ error: "Internal Server Error" });
});

connectDB();

server.listen(config.port, () => {
  console.log(`🚀 Server is running on port ${config.port}`);
});
