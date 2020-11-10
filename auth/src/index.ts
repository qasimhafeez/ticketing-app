import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import {errorHandler} from "./middleware/error-handler";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.use(errorHandler);

const PORT = 3000;
app.listen(3000, () => {
  console.log(`Listening on PORT ${PORT}!`);
});
