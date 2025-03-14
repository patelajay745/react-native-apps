import "src/db";
import "dotenv/config";
import express from "express";
import { errorHandler } from "./middleware/ErrorHandler";

// swagger
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json";

const app = express();
const port = process.env.PORT || 4000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

//Api Routes
import { authRouter } from "./routes/auth.route";
import { productRouter } from "./routes/product.route";

app.use("/auth", authRouter);
app.use("/product", productRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`The App is running on port ${port}`);
});
