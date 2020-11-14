import express, { Request, Response } from "express";

const router = express();

router.post("/api/users/signout", (req: Request, res: Response) => {
  req.session = null;

  res.send({});
});

export { router as signoutRouter };
