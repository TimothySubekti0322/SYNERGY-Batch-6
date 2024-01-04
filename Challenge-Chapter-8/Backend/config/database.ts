import knex, { Knex } from "knex";

class Database {
  private static instance: Database;
  private _db: Knex;

  constructor() {
    this._db = knex({
      client: "pg",
      connection:
        "postgres://synergy_ch_8_server:NSYM8S0vV1ucTLE@app-server-db.flycast:5432/synergy_ch_8_server?sslmode=disable",
      // "postgresql://postgres:#synergyChapter8@db.faomeuknxwdkmsrvllwg.supabase.co:5432/postgres",
      // "postgres://postgres:docker@127.0.0.1:5432/postgres",
      searchPath: ["public"],
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  get db(): Knex {
    return this._db;
  }
}

export default Database.getInstance().db;
