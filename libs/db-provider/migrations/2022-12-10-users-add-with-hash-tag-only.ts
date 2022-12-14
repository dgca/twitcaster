import { Db } from "mongodb";

export default {
  name: '2022-12-10-users-add-with-has-tag-only',
  up: async (db: Db) => {
    await db.collection('users')
      .updateMany(
        { withHashTagOnly: undefined, },
        { $set: { withHashTagOnly: false } }
      );
  },
  down: async (db: Db) => {
    await db.collection('users')
      .updateMany(
        { withHashTagOnly: { $or: [true, false] } },
        { $unset: { withHashTagOnly: '' } }
      );
  }
};