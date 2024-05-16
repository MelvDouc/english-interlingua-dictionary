import chalk from "chalk";
import { MongoClient, ObjectId, type WithId } from "mongodb";
import type { Entry, User } from "$server/types.js";

const client = await new MongoClient(process.env.DB_URI as string).connect();
console.log(chalk.yellow("Connected to database."));

const db = client.db("interlingua");
const entryCollection = db.collection<Entry>("word");
const userCollection = db.collection<User>("user");
const closeClient = () => client.close();

export {
  ObjectId,
  entryCollection,
  userCollection,
  type WithId,
  closeClient
};