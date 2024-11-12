import { body, validationResult } from "express-validator";
const validateRequest = async (req, res, next) => {
  // 1. Setup rules for validation
  const rules = [
    body("name").notEmpty().withMessage("Name is required."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive value."),
    body("imageUrl").isURL().withMessage("Invalid URL."),
  ];

  // 2. Run those rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. Check if there are any errors
  const validationErrors = validationResult(req);
  console.log(validationErrors.array()); // Log the array of errors to check output

  // 4. If any errors, render the error message
  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }

  // 5. If no errors, proceed to the next middleware or route handler
  next();
};

export default validateRequest;
