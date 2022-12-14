import { MongoClient } from 'mongodb';
import * as allMigrations from '../../migrations';

let client: MongoClient;

export async function getDbClient(): Promise<MongoClient> {
  if (client) {
    return client.connect();
  }

  if (!process.env.MONGODB_CONN_STRING) {
    throw new Error('MongoDB connection string not found.');
  }

  client = await new MongoClient(process.env.MONGODB_CONN_STRING).connect();
  const db = client.db('db');
  const migrations = db.collection('migrations');
  console.log('migrations:started');
  await Promise.all(
    Object.values(allMigrations).map(async ({ name, up }) => {
      console.log(`migrations|${name}:started`)
      const migrated = await migrations.findOne({ name });
      if (migrated) return Promise.resolve();
      await up(db);
      await migrations.insertOne({
        name,
        timestamp: Date.now(),
      });
      console.log(`migrations|${name}:finished`);
    })
  ).catch((e) => console.log(`error:${e.message}`));
  console.log('migrations:finished');

  return client;
}
