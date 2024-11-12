import express from "express";
import {
  changePassword,
  forgotPassword,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
  userLoginStatus,
  verifyEmail,
  verifyUser,
} from "../controllers/auth/userController.js";
import {
  adminMiddleware,
  creatorMiddleware,
  protect,
} from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getAllUsers,
} from "../controllers/auth/adminController.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/login-status", userLoginStatus);

// User profile and updates
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);
router.patch("/change-password", protect, changePassword); // Change password (user must be logged in)

// Email verification
router.post("/verify-email", protect, verifyEmail);
router.post("/verify-user/:verificationToken", verifyUser); // Email verification using token

// Password recovery
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetPasswordToken", resetPassword);

// Admin-only routes (requires adminMiddleware)
router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);

// Admin/creator routes
router.get("/admin/users", protect, creatorMiddleware, getAllUsers); // Get all users

export default router;
