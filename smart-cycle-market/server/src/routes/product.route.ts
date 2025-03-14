import { Router } from "express";
import {
  deleteProduct,
  deleteProductImage,
  getLatestProduct,
  getListedAllProduct,
  getProduct,
  getProductByCategory,
  listProduct,
  updateProduct,
} from "src/controllers/product.controller";
import { isAuth } from "src/middleware/isAuth";
import { fileParser } from "src/middleware/middleware";
import { validate } from "src/middleware/validator";
import { newProductSchema } from "src/utils/validationSchema";

export const productRouter = Router();

productRouter.use(isAuth);

productRouter.post(
  "/list",
  fileParser,
  validate(newProductSchema),
  listProduct
);
productRouter.patch(
  "/:id",
  fileParser,
  validate(newProductSchema),
  updateProduct
);
productRouter.delete("/:id", deleteProduct);
productRouter.delete("/image/:productId/:imageId", deleteProductImage);
productRouter.get("/:id", getProduct);
productRouter.get("/by-category/:category", getProductByCategory);
productRouter.get("/latest", getLatestProduct);
productRouter.get("/listings", getListedAllProduct);
