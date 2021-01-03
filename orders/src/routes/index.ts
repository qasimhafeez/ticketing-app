import express, { Request, Response } from "express";
import { requireAuth } from "@qh-tickets/shared";
import { Order } from "../models/order";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate("ticket");
  res.send({ orders });
});

export { router as indexOrderRouter };
