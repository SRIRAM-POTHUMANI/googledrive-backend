import bcrypt from "bcrypt";

//Extracted functions
export async function getPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
export async function addUser(client, addUsers) {
  return await client
  .db("googledrive")
  .collection("users")
  .insertMany(addUsers);
}
export async function getUsers(client) {
  return await client
  .db("googledrive")
  .collection("users")
  .find({})
  .toArray();
}
export async function getUsersbyid(client, username) {
  return await client
  .db("googledrive")
  .collection("users")
  .findOne({ username: username });
}
export async function updateUser(client, username, newData) {
  return await client
    .db("googledrive")
    .collection("users")
    .updateOne({ username: username }, { $set: newData });
}
export async function delUser(client, username) {
  return await client
  .db("googledrive")
  .collection("users")
  .deleteOne({ username: username });
}


//files

export async function addfiles(client, addFiles) {
  return await client
  .db("googledrive")
  .collection("userfiles")
  .insertOne(addFiles);
}
export async function getUserfiles(client) {
  return await client
  .db("googledrive")
  .collection("userfiles")
  .find({})
  .toArray();
}
export async function getUserfilesbyname(client, filename) {
  return await client
  .db("googledrive")
  .collection("userfiles")
  .findOne({ filename: filename });
}
export async function updatefiles(client, filename, newData) {
  return await client
    .db("googledrive")
    .collection("userfiles")
    .updateOne({ filename: filename }, { $set: newData });
}
export async function delfiles(client, filename) {
  return await client
  .db("googledrive")
  .collection("userfiles")
  .deleteOne({ filename: filename });
}
