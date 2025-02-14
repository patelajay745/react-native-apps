import { Router } from "express";
import { createNewUser } from "src/controllers/auth";

const authRouter = Router();

authRouter.get("/sign-up", createNewUser);

export default authRouter;
