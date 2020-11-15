import mongoose from "mongoose";
import { app } from "./app";
const connect = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not defined!");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Mongodb Connected");
  } catch (err) {
    console.error(err);
  }
};

connect();

const PORT = 3000;
app.listen(3000, () => {
  console.log(`Listening on PORT ${PORT}!`);
});
