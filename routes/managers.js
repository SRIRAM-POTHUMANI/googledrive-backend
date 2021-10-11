import { getManagers, getPassword} from "../helper.js";
import express from "express";
import { MongoClient } from "mongodb";
const router = express.Router();
export async function createConnection() {
  const MONGO_URL = process.env.MONGO_URL;
//   const MONGO_URL = "mongodb://localhost/users";
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Successfull 💚");
  // const insertData = await client.db("users").collec tion("people").insertMany(users);
  return client;
}
// get manager on local
router.get("/", async (request, response) => {
  const client = await createConnection();
  const managers = await getManagers(client);
  response.send(managers);
});
//manager sign up
router.post("/signup", async (request, response) => {
  const client = await createConnection();
  const { username, password } = request.body;
  const hashedpassword = await getPassword(password);
  const result = await client.db("users").collection("managers").insertOne({ username: username, password: hashedpassword });
  response.send(result);
});
export const managerRouter = router;
