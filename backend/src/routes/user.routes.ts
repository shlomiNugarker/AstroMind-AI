import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import {
  getProfile,
  updateProfile,
  deleteUser,
  getAllUsers,
  updateUserRole,
  addTrainee,
} from "../controllers/user.controller";

const router = Router();

router.get("/profile", authMiddleware, getProfile);

router.patch("/profile", authMiddleware, updateProfile);

router.delete("/:id", authMiddleware, deleteUser);

router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["super_admin"]),
  getAllUsers
);

router.put(
  "/:id/role",
  authMiddleware,
  roleMiddleware(["super_admin"]),
  updateUserRole
);

router.post(
  "/add-trainee",
  authMiddleware,
  roleMiddleware(["super_admin", "coach"]),
  addTrainee
);

export default router;
