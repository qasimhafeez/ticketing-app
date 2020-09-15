import express from "express";

const router = express();

router.post("/api/users/signout", (req, res) => {
  res.send("Working");
});

export { router as signoutRouter };
