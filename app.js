const express = require("express");
//create server
const app = express();
const mysql = require("mysql");
const PORT = process.env.PORT || 4001;
app.use(express.json());

// console.log(`${process.env.PASSWORD}`);
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

////////////////////////////////    GET REQUEST

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
app.get("/showDatabases", (req, res) => {
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

////////////////////////////////    POST REQUEST
app.post("/addNewEmployee", (req, res, next) => {
  connection.query(
    `
  insert into employees(first_name,last_name,email,phone_number,hire_date,salary) values(?,?,?,?,?,?)`,
    Object.values(req.body),
    (err, table, fields) => {
      res.send(table);
    }
  );

  //for update values inside table
  /*   connection.query(`update table classes set course_name=? , course_id=?` ,["fbw32" ,5],(err,table,fields)=>{}) */

  //   const keys = Object.keys(req.body);
  //   const values = Object.values(req.body);

  //   connection.query(
  //     `insert into employees (${keys[0]},${keys[1]},${keys[2]},${keys[3]},${keys[4]},${keys[5]}) values("${values[0]}","${values[1]}","${values[2]}",${values[3]},"${values[4]}",${values[5]});`,
  //     (err, table, fields) => {
  //       if (err) {
  //         console.log(err.message);
  //       } else {
  //         res.send(table);
  //       }
  //     }
  //   );
});

/*
OUTPUT:
{
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 20,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
}
*/

////////////////////////////////   PUT REQUEST

app.put("/updateEmployees", (req, res, next) => {
  connection.query(
    `update employees set email="felix@dci.com" where employee_id=16`,
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
