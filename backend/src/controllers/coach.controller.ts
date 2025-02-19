import { Request, Response } from "express";
import {
  findAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
  createUser,
  checkIfUserExists,
} from "../services/user.service";


export const getCoaches = async (req: Request, res: Response) => {
  try {
    const coaches = await findAllUsers();
    res.json(coaches.filter((user) => user.role === "coach"));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch coaches" });
  }
};


export const addCoach = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingCoach = await checkIfUserExists(email);
    if (existingCoach) {
      return res.status(400).json({ error: "Coach already exists" });
    }

    const newCoach = await createUser(name, email, password, "coach");
    res
      .status(201)
      .json({ _id: newCoach._id, name: newCoach.name, email: newCoach.email });
  } catch (error) {
    res.status(500).json({ error: "Failed to add coach" });
  }
};


export const deleteCoach = async (req: Request, res: Response) => {
  try {
    const { coachId } = req.params;

    const coach = await findUserById(coachId);
    if (!coach || coach.role !== "coach") {
      return res.status(404).json({ error: "Coach not found" });
    }

    await deleteUserById(coachId);
    res.json({ message: "Coach deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete coach" });
  }
};


export const updateCoach = async (req: Request, res: Response) => {
  try {
    const { coachId } = req.params;
    const data = req.body;

    const coach = await findUserById(coachId);
    if (!coach || coach.role !== "coach") {
      return res.status(404).json({ error: "Coach not found" });
    }

    const updatedCoach = await updateUserById(coachId, data);
    res.json(updatedCoach);
  } catch (error) {
    res.status(500).json({ error: "Failed to update coach" });
  }
};
