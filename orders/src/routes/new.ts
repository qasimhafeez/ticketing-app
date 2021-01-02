import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { requireAuth, validateRequest } from "@qh-tickets/shared";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Please enter ticket Id"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Find the ticker user is trying to buy in the database

    res.send({});
  }
);

export { router as newOrderRouter };
