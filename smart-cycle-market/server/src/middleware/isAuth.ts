import { RequestHandler } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { PasswordResetToken } from "src/models/passwordResetToken.model";
import { User } from "src/models/users.model";
import { ApiError, asyncHandler } from "src/utils/helper";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  verified: boolean;
}
declare global {
  namespace Express {
    interface Request {
      user: UserProfile;
    }
  }
}

export const isAuth = asyncHandler(async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      throw new ApiError("unAuthorized request ! ", 403);
    }

    const token = authToken.split(" ")[1];

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      _id: string;
    };

    const user = await User.findById(payload._id);

    if (!user) throw new ApiError("Invalid Token", 403);

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      verified: user.verified,
    };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new ApiError("session Expired", 401);
    }
    if (error instanceof JsonWebTokenError) {
      throw new ApiError("unAutherized access", 401);
    }
  }

  next();
});
export const isValidPasswordResetToken = asyncHandler(
  async (req, res, next) => {
    try {
      const { token, id } = req.body;
      const foundToken = await PasswordResetToken.findOne({ owner: id });

      if (!foundToken) {
        throw new ApiError("No token found", 404);
      }

      const isValid = await foundToken.compareToken(token);
      if (!isValid) {
        throw new ApiError("Invalid token", 400);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(error.message, 500);
      }
    }

    next();
  }
);
