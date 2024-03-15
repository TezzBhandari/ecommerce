import { Router } from "express";
import authRoutes from "../modules/auth/routes/auth.router";

const router = Router();

// router.use("")
router.use("/auth", authRoutes);

export default router;
