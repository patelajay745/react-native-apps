import { isValidObjectId } from "mongoose";
import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;

yup.addMethod(yup.string, "email", function validateEmail(message) {
  return this.matches(emailRegex, {
    message,
    name: "email",
    excludeEmptyString: true,
  });
});

export const newUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("email is required"),
  password: yup
    .string()
    .min(6, "Password length should be minimum 6 characters long ")
    .max(20, "Password length should not be more than 20 characters long ")
    .required("Password is required")
    .matches(
      passwordRegex,
      "Password must include uppercase, lowercase, number and no spaces"
    ),
});

export const verifyTokenSchema = yup.object({
  id: yup.string().test({
    name: "valid-id",
    message: "Invalid user id",
    test: (value) => {
      return isValidObjectId(value);
    },
  }),
  token: yup.string().required("token is required"),
});

export const loginSchema = yup.object({
  email: yup.string().email("Invalid Email").required("Please provide emailId"),
  password: yup.string().required("Please provide password"),
});

export const forgetPasswordSchema = yup.object({
  email: yup.string().email("Invalid Email").required("Please provide emailId"),
});

export const resetPasswordSchema = yup.object({
  id: yup.string().test({
    name: "valid-id",
    message: "Invalid user id",
    test: (value) => {
      return isValidObjectId(value);
    },
  }),
  password: yup
    .string()
    .min(6, "Password length should be minimum 6 characters long ")
    .max(20, "Password length should not be more than 20 characters long ")
    .required("Password is required")
    .matches(
      passwordRegex,
      "Password must include uppercase, lowercase, number and no spaces"
    ),
});

export const updateProfileSchema = yup.object({
  name: yup.string().required("Name is required"),
});
