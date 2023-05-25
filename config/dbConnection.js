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
    throw err
  } else {
    console.log("DB Connected Successfully");
    // let query = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;
    // mySqlConnection.query(query, (err, result) => {
    //   if (err) throw err;
    //   console.log(result)
    // })
    // let table_query = "CREATE TABLE IF NOT EXISTS Todo (task_id int NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, status VARCHAR(255), PRIMARY KEY (task_id))";
    // mySqlConnection.query(table_query, (err, result) => {
    //   if (err) throw err;
    //   console.log(result)
    // })
  }
});

module.exports = mySqlConnection;
