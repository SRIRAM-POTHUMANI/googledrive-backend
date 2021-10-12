import { getManagers, getPassword } from "../helper.js";
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { createConnection } from "../index.js";
const router = express.Router();
dotenv.config();

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
  if(passwordMatched)  {
    const token = jwt.sign({id: result._id}, process.env.SECRET_KEY);
    response.send({message : "login success", token: token});
  }
  else{
    response.send({message : "login failed"});
  }
  // response.send(passwordMatched ? {message: "login successful"} : {message: "login failed"});
});
export const managerRouter = router;
