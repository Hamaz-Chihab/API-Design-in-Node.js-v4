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
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

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

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
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
  updateUpdate
);

router.delete("/update/:id", deleteUpdate);

//updatePoints routes
router.get("/updatepoints   ", () => {});
router.get("/updatepoints/:id", () => {});
router.put(
  "/updatepoints/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
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
