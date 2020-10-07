import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.get("/api/users/currentuser", (req, res) => {
  res.send("working alright");
});

app.get("/api/users/login", (req, res) => {
  res.send("working");
});

const PORT = 3000;
app.listen(3000, () => {
  console.log(`Listening on PORT ${PORT}`);
});
