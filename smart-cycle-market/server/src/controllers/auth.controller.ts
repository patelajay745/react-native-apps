import { Request, Response, RequestHandler } from "express";
import { User } from "src/models/users.model";
import crypto from "crypto";
import { AuthVerifcationToken } from "src/models/authVerificationToken.model";
import nodemailer from "nodemailer";
import { ApiError, ApiResponse, asyncHandler } from "src/utils/helper";
import jwt from "jsonwebtoken";
import MyMail from "src/utils/mail";

//register new user
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

    const link = `http://localhost:8000/verify.html?id=${user._id}&token=${token}`;

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const mail = new MyMail(user.email, link);
    await mail.sendVerification();

    return res.json(new ApiResponse("Please Check your Email", {}, 200));
  }
);

//verify emailId by checking provided token
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

//get user profile data
export const getProfile = asyncHandler(async (req, res) => {
  return res.json(new ApiResponse("User fetched", { profile: req.user }, 200));
});

//create new Token
export const getNewToken = asyncHandler(async (req, res) => {
  const { id } = req.user;

  await AuthVerifcationToken.deleteMany({ owner: id });

  const token = crypto.randomBytes(36).toString("hex");

  await AuthVerifcationToken.create({ owner: id, token });

  const link = `http://localhost:8000/verify.html?id=${id}&token=${token}`;

  // Looking to send emails in production? Check out our Email API/SMTP product!
  const mail = new MyMail(req.user.email, link);
  await mail.sendVerification();

  return res.json(new ApiResponse("Please Check your Email", {}, 200));
});

export const getAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new ApiError("UnAuthorized access", 403);

  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error(
      "REFRESH_TOKEN_SECRET is not defined in environment variables"
    );
  }

  const payload = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  ) as { _id: string };

  console.log(payload);

  if (!payload._id) {
    throw new ApiError("UnAuthorized request", 401);
  }

  const user = await User.findOne({
    _id: payload._id,
    tokens: refreshToken,
  });

  if (!user) {
    //user is compromised , remove all the prev tokens

    await User.findByIdAndUpdate(payload._id, { tokens: [] });
    throw new ApiError("UnAuthorized request", 401);
  }

  const newAccessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();

  user.tokens = user.tokens.filter((t) => t !== refreshToken);
  user.tokens.push(newRefreshToken);
  await user.save();

  return res.json(
    new ApiResponse(
      "New Accesstoken is fetched",
      {
        tokens: {
          refreshToken: newRefreshToken,
          accessToken: newAccessToken,
        },
      },
      200
    )
  );
});

export const getSignOut = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body.refreshToken;

  const user = await User.findOne({
    _id: req.user.id,
    token: refreshToken,
  });

  if (!user) {
    throw new ApiError("UnAuthorized request,user not found!", 403);
  }

  user.tokens = user.tokens.filter((t) => t !== refreshToken);
  await user.save();

  return res.json(new ApiResponse("Logout sucessfully", {}, 200));
});
