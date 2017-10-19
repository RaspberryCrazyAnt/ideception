const env = require('dotenv').config(),
      pgp = require('pg-promise')(),
      uri = process.env.ELEPHANTSQL_URL;

//db is being assigned to all tables found with the parameter as it's name ex. getAll: (users) --> will get all 'user' tables
const db = {
    /**
     * getAll - queries db and outputs all columns and rows for a given table
     *
     * @param {string} table - name of db table to query
     */
    getAll: (table) => {
        return db.conn.any(`SELECT * FROM ${table}`);
    }
};

//connection to the pg-promise database through uri listed in our secret file
db.conn = pgp(uri);



module.exports = db;

// CREATE TABLE high_scores (
//  id serial PRIMARY KEY,
//  username VARCHAR (50) NOT NULL,
//  targetWord VARCHAR (50) NOT NULL,
//  score INTEGER NOT NULL
// );
