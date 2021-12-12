const express = require("express");
//create server
const app = express();
const mysql = require("mysql");
const PORT = process.env.PORT || 4001;
app.use(express.json());

console.log(`${process.env.PASSWORD}`);
//create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: `Tenten@2252`,
  database: "company",
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`connection to mysql established!`);
  }
});

app.get("/company", (req, res, next) => {
  connection.query(`select * from employees;`, (err, table, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(table);
    }
  });
});

//to get may second salary
app.get("/getSecondMaxSalary", (req, res, next) => {
  connection.query(
    `select max(salary) from employees where salary<(select max(salary) from employees);`,
    (err, table, fileds) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(table);
        // {
        //     "max(salary)": 5300
        // }
      }
    }
  );
});

///to display all databases
app.get("/showdatabases", (req, res) => {
  connection.query(`show databases;`, (err, table, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(table);
    }
  });
});

//to display all emails which ends with @gmail.com
app.get("/showEmails", (req, res) => {
  connection.query(
    `select email from employees where email like "%@gmail.com"`,
    (err, table, fields) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(table);
      }
    }
  );
});

//to display salaries ascending order

app.get("/ascSalary", (req, res) => {
  connection.query(
    `select * from employees order by salary asc`,
    (err, table, fields) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(table);
      }
    }
  );
});

//to display only specific ids

app.get("/in", (req, res) => {
  connection.query(
    `select * from employees where employee_id in (7, 13, 15)`,
    (err, table, fields) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(table);
      }
    }
  );
});

app.listen(PORT, () => console.log("server is running on port :", PORT));
