"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
// SQLite in-memory database
const db = new sqlite3_1.default.Database(":memory:", (err) => {
    if (err)
        console.error("Error opening database", err);
    else {
        db.run(`CREATE TABLE IF NOT EXISTS activity (
        id INTEGER PRIMARY KEY, 
        userId TEXT, 
        type TEXT, 
        timestamp TEXT, 
        description TEXT)`, (err) => {
            if (err)
                console.error("Table creation error", err);
        });
    }
});
exports.default = db;
