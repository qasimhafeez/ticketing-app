import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@qh-tickets/shared";
import { Password } from "../services/password";

const router = express();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must enter your password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Your email or password is wrong");
    }

    const passwordsMatch = Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError("Your password is not correct.");
    }

    // Generate jwt
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store it in session
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
