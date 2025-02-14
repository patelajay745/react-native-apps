import mongoose, { Schema } from "mongoose";

const authVerificationTokenSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 86400, //60*60*24
    default: Date.now(),
  },
});

export const AuthVerifcationToken = mongoose.model(
  "AuthVerifcationToken",
  authVerificationTokenSchema
);
