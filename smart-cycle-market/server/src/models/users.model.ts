import { compare, genSalt, hash } from "bcrypt";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { object, string } from "yup";

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  tokens: string[];
  avatar?: { url: string; id: string };
}

interface Methods {
  comparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema<UserDocument, {}, Methods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    tokens: [String],
    avatar: {
      type: Object,
      url: String,
      id: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign(
    { _id: this._id },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "24h",
    }
  );

  return accessToken;
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET!
  );

  return refreshToken;
};

export const User = mongoose.model("User", userSchema);
