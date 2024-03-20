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
//error handler Middleware for the router file :
router.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: "in router handler" });
});
//the error handler should be for the next
//product routes :
router
  .get("/product", getAllProducts)
  .post("/product", body("name").isString(), handleInputErrors, createProduct)
  .get("/product/:id", getOneProduct)
  .put(
    "/product/:id",
    body("name").isString(), // Existing validation
    updateProduct
  )
  .delete("/product/:id", deleteProduct);

//update routes

router
  .get("/update", getUpdates)
  .get("/update/:id", getOneUpdate)
  .post(
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
  )
  .put(
    "/update/:id",
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]), // New validation

    // body("version").optional(),//because it is opstional () => {});
    updateUpdate
  )
  .delete("/update/:id", deleteUpdate);

//updatePoints routes
router
  .get("/updatepoints   ", () => {})
  .get("/updatepoints/:id", () => {})
  .put(
    "/updatepoints/:id",
    body("name").optional().isString(),
    body("description").optional().isString(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").optional(),
    () => {}
  )
  .post(
    "/updatepoints",
    body("name").optional().isString(),
    body("description").optional().isString(),
    body("updateId").exists().isString(),
    () => {}
  )
  .delete("/updatepoints/:id", () => {});

export default router;
