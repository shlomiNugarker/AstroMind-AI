import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "super_admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
  } catch (error) {
    console.error(
      "❌ Error in adminMiddleware:",
      JSON.stringify(error, null, 2)
    );
    res.status(500).json({ message: "Internal server error" });
  }
};
