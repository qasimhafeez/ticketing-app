import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
// Importing middleware
import { currentUser } from "../middleware/current-user";

const router = express();

router.get(
  "/api/users/currentUser",
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
