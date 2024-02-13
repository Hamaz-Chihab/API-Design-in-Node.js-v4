import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/midleware";

const router = Router();
//product routes
router.get("/product", (req, res) => {
  res.json({ message: req.shhhh_secret });
});
router.get("/product/:id", () => {});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post("/product", body("name").isString(), handleInputErrors, () => {});
router.delete("/product/:id", () => {});

//update routes
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.delete("/update/:id", () => {});

//updatePoints routes
router.get("/updatepoints   ", () => {});
router.get("/updatepoints/:id", () => {});
router.put("/updatepoints/:id", () => {});
router.post("/updatepoints", () => {});
router.delete("/updatepoints/:id", () => {});
export default router;
