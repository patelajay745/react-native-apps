import { Router } from "express";
import {
  createNewUser,
  getAccessToken,
  getForgetPasswordLink,
  getIsValid,
  getLogin,
  getNewToken,
  getProfile,
  getPublicProfile,
  getSignOut,
  PasswordReset,
  updateAvatar,
  updateProfile,
  verifyEmail,
} from "src/controllers/auth.controller";
import { isAuth, isValidPasswordResetToken } from "src/middleware/isAuth";
import { fileParser } from "src/middleware/middleware";
import { validate } from "src/middleware/validator";
import {
  forgetPasswordSchema,
  loginSchema,
  newUserSchema,
  resetPasswordSchema,
  updateProfileSchema,
  verifyTokenSchema,
} from "src/utils/validationSchema";

export const authRouter = Router();

authRouter.post("/user", validate(newUserSchema), createNewUser);
authRouter.post("/verify", validate(verifyTokenSchema), verifyEmail);
authRouter.post("/verify-token", isAuth, getNewToken);
authRouter.post("/login", validate(loginSchema), getLogin);
authRouter.post("/profile", isAuth, getProfile);
authRouter.post("/sign-out", isAuth, getSignOut);
authRouter.post("/refresh-token", getAccessToken);
authRouter.post(
  "/forget-password",
  validate(forgetPasswordSchema),
  getForgetPasswordLink
);
authRouter.post(
  "/verify-password-reset-token",
  validate(verifyTokenSchema),
  isValidPasswordResetToken,
  getIsValid
);
authRouter.post(
  "/reset-password",
  validate(resetPasswordSchema),
  isValidPasswordResetToken,
  PasswordReset
);
authRouter.patch(
  "/update-profile",
  isAuth,
  validate(updateProfileSchema),
  updateProfile
);
authRouter.patch("/update-avatar", isAuth, fileParser, updateAvatar);
authRouter.get("/profile/:id", isAuth, getPublicProfile);
