import { Router } from "express";
import { login, register } from "../controller/auth.controller";
import validate from "../../../lib/middlewares/validate";
import { loginSchema, userRegistrationSchema } from "../types";
const router = Router();

router.post(
  "/login",
  [
    // validates request body
    validate(loginSchema),
  ],
  login
);

router.post("/signup", [validate(userRegistrationSchema)], register);

export default router;
