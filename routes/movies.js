import {addMovies, getMovies } from "../helper.js";
import express from "express";
import { createConnection } from "../index.js";
// import { auth } from "../middleware/auth.js";

const router=express.Router();


// get movies
router.get("/", async (request, response) => {

  const client = await createConnection();
  const movieList = await getMovies(client);
  response.send(movieList);
});

//get movies by id from cloud
// router.get("/:id", async (request, response) => {
//   const { id } = request.params;
//   const client = await createConnection();
//   const user = await getUsersbyid(client, id);
//   response.send(user);
// });
//create movies to cloud
router.post("/", async (request, response) => {
  const client = await createConnection();
  const movieDetails = request.body;
  const result = await addMovies(client, movieDetails);
  response.send(result);
});

//update movies on cloud
// router.patch("/:id", async (request, response) => {
//   const { id } = request.params;
//   const client = await createConnection();
//   const newData = request.body;
//   const updateuser = await updateUser(client, id, newData);
//   response.send(updateuser);
// });

//delete movies on cloud
// router.delete("/:id", async (request, response) => {
//   const { id } = request.params;
//   const client = await createConnection();
//   const deleteuser = await delUser(client, id);
//   response.send(deleteuser);
// });

export const movieRouter = router;
