import express from "express";

const router = express();

router.post("/api/users/signup", (req, res) => {
  res.send("Working");
});

export { router as signupRouter };
