import "src/db";
import express from "express";
import authRouter from "./routes/auth";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

//Api Routes
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`The App is running on port ${port}`);
});
