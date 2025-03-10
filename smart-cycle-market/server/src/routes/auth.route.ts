import { Router } from "express";
import {
  createNewUser,
  getAccessToken,
  getLogin,
  getNewToken,
  getProfile,
  getSignOut,
  verifyEmail,
} from "src/controllers/auth.controller";
import { isAuth } from "src/middleware/isAuth";
import { validate } from "src/middleware/validator";
import {
  loginSchema,
  newUserSchema,
  verifyTokenSchema,
} from "src/utils/validationSchema";

const authRouter = Router();

authRouter.post("/user", validate(newUserSchema), createNewUser);
authRouter.post("/verify", validate(verifyTokenSchema), verifyEmail);
authRouter.post("/verify-token", isAuth, getNewToken);
authRouter.post("/login", validate(loginSchema), getLogin);
authRouter.post("/profile", isAuth, getProfile);
authRouter.post("/sign-out", isAuth, getSignOut);
authRouter.post("/refresh-token", getAccessToken);

export default authRouter;
