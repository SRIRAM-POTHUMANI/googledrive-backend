// const { request, response } = require("express");
// const express = require("express");
import express, { request } from "express";
import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT;
app.use(express.json())
// const users = [
//   {
//     createdAt: "2021-10-01T00:49:47.780Z",
//     name: "Bennie Aufderhar",
//     avatar: "https://cdn.fakercloud.com/avatars/d_kobelyatsky_128.jpg",
//     age: 59,
//     color: "silver",
//     id: "5",
//   },
//   {
//     createdAt: "2021-09-30T14:22:51.638Z",
//     name: "Lana Witting",
//     avatar: "https://cdn.fakercloud.com/avatars/afusinatto_128.jpg",
//     age: 77,
//     color: "olive",
//     id: "6",
//   },
//   {
//     createdAt: "2021-09-30T18:01:06.642Z",
//     name: "Vickie Brekke",
//     avatar: "https://cdn.fakercloud.com/avatars/carlyson_128.jpg",
//     age: 80,
//     color: "tan",
//     id: "7",
//   },
//   {
//     createdAt: "2021-09-30T09:39:22.586Z",
//     name: "Al Runolfsdottir",
//     avatar: "https://cdn.fakercloud.com/avatars/areus_128.jpg",
//     age: 28,
//     color: "orange",
//     id: "8",
//   },
//   {
//     createdAt: "2021-09-30T18:22:41.955Z",
//     name: "Sam Orn",
//     avatar: "https://cdn.fakercloud.com/avatars/itolmach_128.jpg",
//     age: 49,
//     color: "indigo",
//     id: "9",
//   },
//   {
//     createdAt: "2021-09-30T18:30:05.224Z",
//     name: "Grace Grimes",
//     avatar: "https://cdn.fakercloud.com/avatars/smalonso_128.jpg",
//     age: 72,
//     color: "yellow",
//     id: "10",
//   },
//   {
//     createdAt: "2021-09-30T11:26:57.667Z",
//     name: "Cindy Reinger",
//     avatar: "https://cdn.fakercloud.com/avatars/vimarethomas_128.jpg",
//     age: 30,
//     color: "yellow",
//     id: "11",
//   },
//   {
//     createdAt: "2021-10-01T06:26:55.203Z",
//     name: "Beth Koelpin",
//     avatar: "https://cdn.fakercloud.com/avatars/anatolinicolae_128.jpg",
//     age: 0,
//     color: "purple",
//     id: "12",
//   },
//   {
//     createdAt: "2021-09-30T12:28:17.426Z",
//     name: "Doug Mayer",
//     avatar: "https://cdn.fakercloud.com/avatars/nerrsoft_128.jpg",
//     age: 25,
//     color: "cyan",
//     id: "13",
//   },
//   {
//     createdAt: "2021-10-01T01:09:41.654Z",
//     name: "Mrs. Garrett Becker",
//     avatar: "https://cdn.fakercloud.com/avatars/increase_128.jpg",
//     age: 20,
//     color: "yellow",
//     id: "14",
//   },
// ];

dotenv.config();
console.log(process.env);

async function createConnection() {
  const MONGO_URL = process.env.MONGO_URL;
  // const MONGO_URL = "mongodb://localhost/users";
  
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("successfully connected!!!");
  // const insertData = await client.db("users").collec tion("people").insertMany(users);
  return client;
}
app.get("/", (request, response) => {
  response.send("Hello,Welcome All...:)");
});
createConnection();
//get users by id from cloud
app.get("/users/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  const client = await createConnection();
  const user = await client
    .db("users")
    .collection("people")
    .findOne({ id: id });
  console.log(user);
  response.send(user);

  // response.send(users.filter((user) => user.id == id));
});
//create user to cloud
app.post("/users", async (request, response) => {
  // console.log(request.params);
  // const { id } = request.params;
  const client = await createConnection();
  console.log(request.body);
  const addUsers = request.body;
  
  const result = await client
    .db("users")
    .collection("people")
    .insertMany(addUsers);
  console.log(addUsers,result);
  response.send(result);  

  // response.send(users.filter((user) => user.id == id));
});


//delete user on cloud
app.delete("/users/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  const client = await createConnection();
  const deleteuser = await client
    .db("users")
    .collection("people")
    .deleteOne({ id: id });
  console.log(deleteuser);
  response.send(deleteuser);
});

//update user on cloud
app.patch("/users/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  const client = await createConnection();
  console.log(id,request.body);
  const newData=request.body;
  const updateuser = await client
    .db("users")
    .collection("people")
    .updateOne({ id: id }, { $set : newData });
  console.log(updateuser);
  response.send(updateuser);
});

// app.get("/users", (request, response) => {
//   response.send(users);
// });

app.get("/users", async(request, response) => {
  // const { color, ageGt } = request.query;
  const client = await createConnection();
  const user = await client
    .db("users")
    .collection("people")
    .find({  }).toArray();
  console.log(user);
  response.send(user);
 
});

 

// app.get("/users", (request, response) => {
//   response.send(users);
// });

// app.get("/users", (request, response) => {
//   const { color, ageGt } = request.query;
//   console.log(request.query, color, ageGt);

//   if (!color && !ageGt) {      //no query
//     response.send(users);
//   } else if (color && !ageGt) {   //only color
//     response.send(users.filter((user) => user.color == color));
//   } else if (!color && ageGt) {   //only age
//     response.send(users.filter((user) => user.age >= ageGt));
//   } else if (color && ageGt) {   //color & age
//     response.send(users.filter((user) => user.color == color && user.age >= ageGt));
//   } else {
//     response.send(users);
//   }
// });

app.listen(PORT, () => console.log("the server is started on Port: ", PORT));
