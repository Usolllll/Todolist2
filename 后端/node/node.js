const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "todolist",
});

const SECRET_KEY = "todolist";
const cors = require("cors");
app.use(cors());
app.use(
  expressJwt({ secret: SECRET_KEY, algorithms: ["HS256"] }).unless({
    path: ["/", "/LogIn", "/delete", "/register"],
  }),
);
//主页面
app.get("/", (req, res) => {
  db.query("select * from main", (err, result) => {
    if (err) return console.log(err.message);
    console.log(result);
    res.json(result);
  });
});

app.post("/delete", (req, res) => {
  const { id } = req.body;
  const query = "DELETE FROM main WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("删除数据时出错:", err);
      res.status(500).send("服务器错误");
    } else {
      res.status(200).send("删除成功");
    }
  });
});

app.post("/", (req, res) => {
  const { text, date, id } = req.body;
  const insertUserQuery = `INSERT INTO main (item,date,id) VALUES (?, ?, ?)`;
  db.query(insertUserQuery, [text, date, id], (error, results) => {
    if (error) {
      console.error("Error", error);
      res.status(500).send("add failed");
      return;
    }
  });
});

//注册页面
app.post("/register", (req, res) => {
  const { account, password } = req.body;
  const createTableQuery = `CREATE TABLE ?? (
    item VARCHAR(255),
    date VARCHAR(255),
    id INT      
)`;
  // 查询数据库中是否已存在相同账号
  const checkDuplicateQuery = `SELECT * FROM userinformation WHERE account = ?`;
  db.query(checkDuplicateQuery, [account], (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      res.status(500).send("Registration failed due to a database error");
      return;
    }

    if (results.length > 0) {
      res.status(400).send("Account already registered");
      return;
    }

    const insertUserQuery = `INSERT INTO userinformation (account, password) VALUES (?, ?)`;
    db.query(insertUserQuery, [account, password], (error, results) => {
      if (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Registration failed");
        return;
      }
    });
    db.query(createTableQuery, [account], (error, results) => {
      if (error) {
        console.error("Error creating table:", error);
        res.status(500).send("Table creation failed");
        return;
      }
      console.log(`Table ${account} created successfully`);
    });
    console.log("User successfully registered");
    res.status(200).send("Registration successful");
  });
});

app.post("/LogIn", (req, res) => {
  const { account, password } = req.body;

  const checkUserQuery =
    "SELECT * FROM userinformation WHERE account = ? AND password = ?";
  db.query(checkUserQuery, [account, password], (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      res.status(500).send({ success: false, message: "数据库查询错误" });
      return;
    }
    if (results.length > 0) {
      const token = jwt.sign({ account }, SECRET_KEY, { expiresIn: "2h" });
      res.status(200).send({ success: true, message: "登陆成功", token });
    } else {
      res.status(401).send({ success: false, message: "账号或密码错误" });
    }
  });
});

afterLogQuery = `select * from ??`;
app.get("/AfterLogIn", (req, res) => {
  const { account } = req.user;
  const password = req.query.password;
  console.log(account);
  afterLogQuery = `select * from ??`;
  db.query(afterLogQuery, [account], (err, result) => {
    if (err) return console.log(err.message);
    console.log(result);
    res.json(result);
  });
});

app.delete("/AfterLogIn/delete/:id", (req, res) => {
  const { id } = req.params;
  const { account } = req.user;
  const query = "DELETE FROM ?? WHERE id = ?";
  db.query(query, [account, id], (err, results) => {
    if (err) {
      console.error("删除数据时出错:", err);
      res.status(500).send("服务器错误");
    } else {
      res.status(200).send("删除成功");
    }
  });
});

app.post("/AfterLogIn", (req, res) => {
  const { text, date, id } = req.body;
  const { account } = req.user;
  console.log(req.user);
  const insertUserQuery = `INSERT INTO ?? (item,date,id) VALUES (?, ?, ?)`;
  db.query(insertUserQuery, [account, text, date, id], (error, results) => {
    if (error) {
      console.error("Error", error);
      res.status(500).send("add failed");
      return;
    }
  });
});

app.listen(80, () => {
  console.log("Server is running on port 80");
});
