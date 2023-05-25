const mysql = require("mysql2");

const mySqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

mySqlConnection.connect((err) => {
  if (err) {
    console.log("Error in DB Connection", JSON.stringify(err, undefined, 2));
  } else {
    console.log("DB Connected Successfully");
  }
});

module.exports = mySqlConnection;
