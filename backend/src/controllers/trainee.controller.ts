import { Request, Response } from "express";
import { User } from "../models/User";

export const getMyTrainees = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    if (req.user.role !== "coach") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    // @ts-ignore
    const trainees = await User.find({ coachId: req.user._id }).select(
      "-password"
    );
    res.json(trainees);
  } catch (error) {
    console.error("❌ Error in getMyTrainees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addTrainee = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    if (req.user.role !== "coach") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newTrainee = new User({
      name,
      email,
      password,
      role: "trainee",
      // @ts-ignore
      coachId: req.user._id,
    });

    await newTrainee.save();

    res
      .status(201)
      .json({ message: "Trainee added successfully", user: newTrainee });
  } catch (error) {
    console.error("❌ Error in addTrainee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTrainee = async (req: Request, res: Response) => {
  try {
    const { traineeId } = req.params;
    const { name, email, isActive } = req.body;

    // @ts-ignore
    if (req.user.role !== "coach") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const trainee = await User.findOne({
      _id: traineeId,
      // @ts-ignore
      coachId: req.user._id,
    });
    if (!trainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    trainee.name = name || trainee.name;
    trainee.email = email || trainee.email;
    trainee.isActive = isActive ?? trainee.isActive;

    await trainee.save();
    res.json({ message: "Trainee updated successfully", trainee });
  } catch (error) {
    console.error("❌ Error in updateTrainee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTrainee = async (req: Request, res: Response) => {
  try {
    const { traineeId } = req.params;

    // @ts-ignore
    if (req.user.role !== "coach") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const trainee = await User.findOne({
      _id: traineeId,
      // @ts-ignore
      coachId: req.user._id,
    });
    if (!trainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    await trainee.deleteOne();
    res.json({ message: "Trainee deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deleteTrainee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
