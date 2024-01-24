import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "my1234",
  database: "exam",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to the database: ", err);
    return;
  }

  console.log("connected to database");
});
