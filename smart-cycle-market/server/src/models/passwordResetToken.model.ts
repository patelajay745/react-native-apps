import { compare, genSalt, hash } from "bcrypt";
import mongoose, { Schema } from "mongoose";

interface passwordResetTokenDocument extends Document {
  owner: Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

const passwordResetTokenSchema = new Schema<
  passwordResetTokenDocument,
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
    expires: 3600, //60*60
    default: Date.now(),
  },
});

passwordResetTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const salt = await genSalt(10);
    this.token = await hash(this.token, salt);
  }

  next();
});

passwordResetTokenSchema.methods.compareToken = async function (token) {
  return await compare(token, this.token);
};

export const PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  passwordResetTokenSchema
);
