import express from "express";
import router from "./routes";
import morgan from "morgan";
const { check, validationResult } = require("express-validator");

import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
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
  res.status(200);
  res.json({ message: "hello" });
  res.json({ message2: "this is an auther test " });
});

const signupValidationRules = [
  check("username").isEmail().withMessage("Username must be a valid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least  8 characters long"),
];

app.use("/api", router); // by adding 'protect' we use auth in the routes
app.post(
  "/signup",
  signupValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
  createNewUser
);
app.post("/signin", signin);
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized request" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalide input" });
  } else {
    res.status(500).json({ message: "oops , thats on us " });
  }
  console.log(err.stack);
  res.status(500).send("something Broke !");
});
// app.use((err, req, res, next) => {
//   if (err.type === 'input') {
//     res.status(422).json({ error: err.message });
//   } else {
//     // Handle other types of errors
//     res.status(500).json({ error: 'An unexpected error occurred' });
//   }
// });

export default app;
