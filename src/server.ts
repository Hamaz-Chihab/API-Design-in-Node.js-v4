import express from "express";
import router from "./routes";
import morgan from "morgan";
import { protect } from "./modules/auth";
const app = express();
const customLogger = (message) => (res, req, next) => {
  console.log("hello forn ${message}");
  next();
};
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.shhhh_secret = "doggy";
  next();
});
app.use(customLogger("chihab"));
app.get("/", (req, res, next) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", protect, router);
export default app;
