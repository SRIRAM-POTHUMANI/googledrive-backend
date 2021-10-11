import {getUsers, getUsersbyid, addUser, delUser, updateUser } from "../helper.js";
import express from "express";
import { createConnection } from "../index.js";

const router=express.Router();


// get users
router.get("/", async (request, response) => {
  // const { color, ageGt } = request.query;
  const client = await createConnection();
  const user = await getUsers(client);
  response.send(user);
});

//get users by id from cloud
router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const client = await createConnection();
  const user = await getUsersbyid(client, id);
  response.send(user);
});
//create user to cloud
router.post("/", async (request, response) => {
  const client = await createConnection();
  const addUsers = request.body;
  const result = await addUser(client, addUsers);
  response.send(result);
});

//update user on cloud
router.patch("/:id", async (request, response) => {
  const { id } = request.params;
  const client = await createConnection();
  const newData = request.body;
  const updateuser = await updateUser(client, id, newData);
  response.send(updateuser);
});

//delete user on cloud
router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const client = await createConnection();
  const deleteuser = await delUser(client, id);
  response.send(deleteuser);
});

export const userRouter = router;
