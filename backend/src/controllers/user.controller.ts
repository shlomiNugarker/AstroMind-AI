import { Request, Response } from "express";
import {
  deleteUserById,
  findAllUsers,
  findUserById,
  updateUserById,
  updateRole,
} from "../services/user.service";

export const getProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = await findUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("❌ Error in getProfile:", JSON.stringify(error, null, 2));
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { name, email } = req.body;

    const updatedUser = await updateUserById(userId, { name, email });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("❌ Error in updateProfile:", JSON.stringify(error, null, 2));
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deleteUser:", JSON.stringify(error, null, 2));
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    console.error("❌ Error in getAllUsers:", JSON.stringify(error, null, 2));
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (typeof role !== "string" || !["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const updatedUser = await updateRole(id, role);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User role updated successfully", user: updatedUser });
  } catch (error) {
    console.error(
      "❌ Error in updateUserRole:",
      JSON.stringify(error, null, 2)
    );
    res.status(500).json({ message: "Internal server error" });
  }
};
