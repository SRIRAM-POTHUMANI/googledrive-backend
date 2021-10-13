
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import { userRouter } from "./routes/users.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

export async function createConnection() {
  const MONGO_URL = process.env.MONGO_URL;
  // const MONGO_URL = "mongodb://localhost/users";

  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Successfull 💚");
  // const insertData = await client.db("googledrive").collection("users").insertMany(users);
  return client;
}
createConnection();

app.get("/", (request, response) => {
  response.send("Hello, Welcome to Hackathon...:)");
});
app.use("/users", userRouter);

app.listen(PORT, () => console.log("Our Server Started on Port: ", PORT));
