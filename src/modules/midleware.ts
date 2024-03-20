import { validationResult } from "express-validator";

export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ error: errors.array() });
  } else {
    next();
  }
};
export const validateIdParam = async (req, res, next, params) => {
  const { id } = params;

  // Validation logic
  if (isNaN(parseInt(id))) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  next(); // Continue processing the request if valid
};
