import { Router } from "express";
import {
  createNewUser,
  getLogin,
  verifyEmail,
} from "src/controllers/auth.controller";
import { validate } from "src/middleware/validator";
import {
  loginSchema,
  newUserSchema,
  verifyTokenSchema,
} from "src/utils/validationSchema";

const authRouter = Router();

authRouter.post("/user", validate(newUserSchema), createNewUser);
authRouter.post("/verify", validate(verifyTokenSchema), verifyEmail);
authRouter.post("/login", validate(loginSchema), getLogin);

export default authRouter;
