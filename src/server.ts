import express from "express";
import router from "./routes";
import morgan from "morgan";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use((req, res, next) => {
  req.shhhh_secret = "doggy";
  next();
});

app.get("/", (req, res, next) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", router);

export default app;
