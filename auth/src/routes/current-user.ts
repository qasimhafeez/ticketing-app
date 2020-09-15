import express from "express";

const router = express();

router.get("/api/users/currentUser", (req, res) => {
  res.send("Working");
});

export { router as currentUserRouter };
