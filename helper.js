import bcrypt from "bcrypt";

//Extracted functions
export async function getPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
export async function getManagers(client) {
  return await client
  .db("users")
  .collection("managers")
  .find({})
  .toArray();
}
export async function addUser(client, addUsers) {
  return await client
  .db("users")
  .collection("people")
  .insertMany(addUsers);
}
export async function getUsers(client) {
  return await client
  .db("users")
  .collection("people")
  .find({})
  .toArray();
}
export async function getUsersbyid(client, id) {
  return await client
  .db("users")
  .collection("people")
  .findOne({ id: id });
}
export async function updateUser(client, id, newData) {
  return await client
    .db("users")
    .collection("people")
    .updateOne({ id: id }, { $set: newData });
}
export async function delUser(client, id) {
  return await client
  .db("users")
  .collection("people")
  .deleteOne({ id: id });
}
