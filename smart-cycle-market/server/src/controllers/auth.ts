import { Request, Response, RequestHandler } from "express";
import { User } from "src/models/users";
import crypto from "crypto";
import { AuthVerifcationToken } from "src/models/authVerificationToken";

export const createNewUser = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(422).json({ message: "please provide all the data" });
  }
  const { email, password, name } = req.body;

  if (!name) {
    return res.status(422).json({ message: "Name is missing" });
  }
  if (!email) {
    return res.status(422).json({ message: "email is missing" });
  }
  if (!password) {
    return res.status(422).json({ message: "passowrd is missing" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(401).json({ message: "user is found with same email" });
  }

  const user = await User.create({ email, password, name });

  const token = crypto.randomBytes(36).toString("hex");

  await AuthVerifcationToken.create({ owner: user._id, token });

  const link = `http://localhost:800/verify?id=${user._id}&token=${token}`;

  return res.status(200).json({ link });
};
