import { MongoClient } from 'mongodb';

let client: MongoClient;

export async function getDbClient(): Promise<MongoClient> {
  if (client) {
    return client.connect();
  }

  if (!process.env.MONGODB_CONN_STRING) {
    throw new Error('MongoDB connection string not found.');
  }

  client = await new MongoClient(process.env.MONGODB_CONN_STRING).connect();

  return client;
}
