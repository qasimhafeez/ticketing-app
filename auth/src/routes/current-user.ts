import express, { Request, Response } from "express";
// Importing middleware
import { currentUser } from "@qh-tickets/shared";
const router = express();

router.get(
  "/api/users/current-user",
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
