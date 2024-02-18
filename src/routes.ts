import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/midleware";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "./handlers/product";
import { createUpdate } from "./handlers/update";

const router = Router();

//product routes
router.get("/product", getAllProducts);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.get("/product/:id", getOneProduct);
router.put("/product/:id", body("name").isString(), updateProduct);
router.delete("/product/:id", deleteProduct);

//update routes

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
  // oneOf([
  //   body("status").equals("IN_PROGRESS"),
  //   body("status").equals("SHIPPED"),
  //   body("status").equals("DEPRECATED"),
  // ]),
  // body("version").optional(),
  // () => {}
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
