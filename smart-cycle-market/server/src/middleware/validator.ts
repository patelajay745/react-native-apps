import { RequestHandler } from "express";
import { ApiError, ApiResponse } from "src/utils/helper";
import * as yup from "yup";

export const validate = function (schema: yup.Schema): RequestHandler {
  return async (req, res, next) => {
    try {
      await schema.validate(
        { ...req.body },
        { strict: true, abortEarly: true }
      );

      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        next(new ApiError(error.message, 422));
        // throw new ApiError(error.message, 422);
        // return res.status(422).json(new ApiResponse(error.message, {}, 422));
      } else {
        console.log("reaqched here");
        next(error);
      }
    }
  };
};
