import mongoose from "mongoose";
import { app } from "./app";
const connect = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not defined!");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined!");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Tickets: Mongodb Connected");
  } catch (err) {
    console.error(err);
  }
};

connect();

const PORT = 3000;
app.listen(3000, () => {
  console.log(`Listening on PORT ${PORT}!`);
});
