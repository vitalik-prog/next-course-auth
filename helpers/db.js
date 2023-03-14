import { MongoClient } from "mongodb/lib/mongo_client";

export async function connectToDatabase() {
  const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.tapjdba.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  return await MongoClient.connect(uri);
}
