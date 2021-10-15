import {getUsers, getUsersbyid, addUser, delUser, updateUser } from "../helper.js";
import express from "express";
import { createConnection } from "../index.js";
import { auth } from "../middleware/auth.js";

const router=express.Router();


// get users
router.get("/", async (request, response) => {
  const client = await createConnection();
  const user = await getUsers(client);
  response.send(user);
});

//get users by username from cloud
router.get("/:username", async (request, response) => {
  const { username } = request.params;
  const client = await createConnection();
  const user = await getUsersbyid(client, username);
  response.send(user);
});
//create user to cloud
router.post("/", async (request, response) => {
  console.log(request.body);
  const client = await createConnection();
  const addUsers = request.body;
  const result = await addUser(client, addUsers);
  response.send(result);
});

//update user on cloud
router.patch("/:username", async (request, response) => {
  const { username } = request.params;
  const client = await createConnection();
  const newData = request.body;
  const updateuser = await updateUser(client, username, newData);
  response.send(updateuser);
});

//delete user on cloud
router.delete("/:username", auth, async (request, response) => {
  const { username } = request.params;
  const client = await createConnection();
  const deleteuser = await delUser(client, username);
  response.send(deleteuser);
});

export const userRouter = router;
