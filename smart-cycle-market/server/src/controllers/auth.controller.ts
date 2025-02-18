import { Request, Response, RequestHandler } from "express";
import { User } from "src/models/users.model";
import crypto from "crypto";
import { AuthVerifcationToken } from "src/models/authVerificationToken.model";
import nodemailer from "nodemailer";
import { ApiError, ApiResponse, asyncHandler } from "src/utils/helper";
import jwt from "jsonwebtoken";

export const createNewUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError("user is foung with same email", 401);
    }

    const user = await User.create({ email, password, name });

    const token = crypto.randomBytes(36).toString("hex");

    await AuthVerifcationToken.create({ owner: user._id, token });

    const link = `http://localhost:800/verify?id=${user._id}&token=${token}`;

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e1fe3c586231f2",
        pass: "df1b941ed6604d",
      },
    });

    await transport.sendMail({
      to: user.email,
      from: "info@ajaypatel.live",
      html: `<h1> Please click on <a href=${link}>this link</a> to verify your account <h1>`,
    });

    return res.json(new ApiResponse("Please Check your Email", {}, 200));
  }
);

export const verifyEmail = asyncHandler(async (req, res) => {
  const { id, token } = req.body;

  const authToken = await AuthVerifcationToken.findOne({ owner: id });

  if (!authToken) {
    throw new ApiError("Invalid Request", 403);
  }

  const tokenValid = await authToken.compareToken(token);

  if (!tokenValid) {
    throw new ApiError("Invalid token", 403);
  }

  await User.findByIdAndUpdate(id, {
    verified: true,
  });

  await AuthVerifcationToken.findByIdAndDelete(authToken._id);

  return res
    .status(200)
    .json(
      new ApiResponse("Thanks for joining us,Your email is verified", {}, 200)
    );
});

export const getLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError("User not found", 403);
  }

  const validPassword = user.comparePassword(password);

  if (!validPassword) {
    throw new ApiError("Please provide correct Password", 403);
  }

  if (!user.verified) {
    throw new ApiError("Please verify your email to get login", 403);
  }

  const accessToken = user.generateAccessToken();
  if (!accessToken) {
    throw new ApiError("something went wrong while generating token", 500);
  }

  const refreshToken = user.generateRefreshToken();
  if (!refreshToken) {
    throw new ApiError("something went wrong while generating token", 500);
  }

  // user.tokens = [refreshToken];
  if (!user.tokens) {
    user.tokens = [refreshToken];
  } else {
    user.tokens.push(refreshToken);
  }

  await user.save();

  return res.status(200).json(
    new ApiResponse(
      "You got it",
      {
        profile: {
          id: user._id,
          email: user.email,
          name: user.name,
          verified: user.verified,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      },
      200
    )
  );
});
