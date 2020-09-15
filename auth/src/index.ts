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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}!`);
});
