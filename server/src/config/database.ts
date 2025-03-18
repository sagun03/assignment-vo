import sqlite3 from "sqlite3";

// SQLite in-memory database
const db = new sqlite3.Database(":memory:", (err) => {
  if (err) console.error("Error opening database", err);
  else {
    db.run(
      `CREATE TABLE IF NOT EXISTS activity (
        id INTEGER PRIMARY KEY, 
        userId TEXT, 
        type TEXT, 
        timestamp TEXT, 
        description TEXT)`,
      (err) => {
        if (err) console.error("Table creation error", err);
      }
    );
  }
});

export default db;
