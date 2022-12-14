import * as allMigrations from '../migrations/index';
import { getDbClient } from './getDbClient';

export async function runMigrations() {
  const client = await getDbClient();
  const db = client.db('db');
  const migrations = db.collection('migrations');

  console.log('migrations:started');

  await Promise.all(
    Object.values(allMigrations).map(async ({ name, up }) => {
      console.log(`migrations|${name}:started`);
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
}
