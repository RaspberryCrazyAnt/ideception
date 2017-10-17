const env = require('dotenv').config(),
      pgp = require('pg-promise')(),
      uri = process.env.POSTGRES_URI;


//dotenv module => We don't want our passwords to be insecure, so instead of making our local variables available to our Github we put our env file in the .gitignore file and require in the dotenv module that provides you with environment variables. This file will be accessible to you and your collaborators, but no one else.

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
