import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";

const router = express();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 to 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email is already in use");
    }

    // Create a new User
    const user = User.build({ email, password });
    await user.save();

    // Generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "secret"
    );

    // Stored into session
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
