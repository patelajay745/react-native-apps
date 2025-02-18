import { compare, genSalt, hash } from "bcrypt";
import mongoose, { Schema } from "mongoose";

interface authVerificationTokenDocument extends Document {
  owner: Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

const authVerificationTokenSchema = new Schema<
  authVerificationTokenDocument,
  {},
  Methods
>({
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

authVerificationTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const salt = await genSalt(10);
    this.token = await hash(this.token, salt);
  }

  next();
});

authVerificationTokenSchema.methods.compareToken = async function (token) {
  return await compare(token, this.token);
};

export const AuthVerifcationToken = mongoose.model(
  "AuthVerifcationToken",
  authVerificationTokenSchema
);
