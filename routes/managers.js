import { getManagers, getPassword } from "../helper.js";
import express from "express";
import bcrypt from "bcrypt";
import { createConnection } from "../index.js";
const router = express.Router();

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
export const managerRouter = router;
