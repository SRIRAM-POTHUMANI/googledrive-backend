import { getManagers, getPassword } from "../helper.js";
import express from "express";
import bcrypt from "bcrypt";
import { createConnection } from "../index.js";
const router = express.Router();
<<<<<<< HEAD

=======
export async function createConnection() {
  const MONGO_URL = process.env.MONGO_URL;
//   const MONGO_URL = "mongodb://localhost/users";
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Successfull 💚");
  // const insertData = await client.db("users").collec tion("people").insertMany(users);
  return client;
}
>>>>>>> eb9c66deac6fe90a5d8dcb2ef3f057c7cd5f50fe
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
  const result = await client
    .db("users")
    .collection("managers")
    .insertOne({ username: username, password: hashedpassword });
  response.send(result);
});
<<<<<<< HEAD
//manager login
router.post("/login", async (request, response) => {
  const client = await createConnection();
  const { username, password } = request.body;
  const result = await client
    .db("users")
    .collection("managers")
    .findOne({ username: username });
  const passwordMatched = await bcrypt.compare(password,result.password);
  response.send(passwordMatched ? "login successful" : "login failed");
});
=======
>>>>>>> eb9c66deac6fe90a5d8dcb2ef3f057c7cd5f50fe
export const managerRouter = router;
