import * as PouchDB from "pouchdb";
import * as PouchDBFind from "pouchdb-find";
PouchDB.plugin(PouchDBFind);

const DB = new PouchDB(process.env.DB_ADDRESS, {
  auth: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS
  }
});

DB.info()
  .then(() => console.log("DB loaded"))
  .catch((e: any) => console.error("DB-Error", e));

export default DB;
