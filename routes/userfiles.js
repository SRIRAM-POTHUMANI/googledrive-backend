import {getUserfiles, getUserfilesbyname, addfiles, delfiles, updatefiles } from "../helper.js";
import express from "express";
import { createConnection } from "../index.js";
import { auth } from "../middleware/auth.js";

const router=express.Router();


// getUserfiles
router.get("/", async (request, response) => {
  const client = await createConnection();
  const userFiles = await getUserfiles(client);
  response.send(userFiles);
});

//get userfiles by filename from cloud getUsersbyname
router.get("/:filename", async (request, response) => {
  const { filename } = request.params;
  const client = await createConnection();
  const userFiles = await getUserfilesbyname(client, filename);
  response.send(userFiles);
});
//create userfiles to cloud
router.post("/", async (request, response) => {
  console.log(request.body);
  const client = await createConnection();
  const addFiles = request.body;
  const result = await addfiles(client, addFiles);
  response.send(result);
});

//update user on cloud
router.patch("/:filename", async (request, response) => {
  const { filename } = request.params;
  const client = await createConnection();
  const newData = request.body;
  const updateuserFile = await updatefiles(client, filename, newData);
  response.send(updateuserFile);
});

//delete user on cloud
router.delete("/:filename", auth, async (request, response) => {
  const { filename } = request.params;
  const client = await createConnection();
  const deletefile = await delfiles(client, filename);
  response.send(deletefile);
});

export const userfilesRouter = router;
