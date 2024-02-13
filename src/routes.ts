import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
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
router.post(
  "/update",
  body("title").optional(),
  body("body").optional(),
  oneOf("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  () => {}
);
router.put(
  "/update/:id",
  body("title").exists().isString(),
  body("body").exists().isString(),
  // body("version").optional(),//because it is opstional () => {});
  () => {}
);

router.delete("/update/:id", () => {});

//updatePoints routes
router.get("/updatepoints   ", () => {});
router.get("/updatepoints/:id", () => {});
router.put(
  "/updatepoints/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.post(
  "/updatepoints",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("updateId").exists().isString(),
  () => {}
);
router.delete("/updatepoints/:id", () => {});

export default router;
