const asyncHandler = require("express-async-handler");
const connection = require("../config/dbConnection");

const getTodoLists = asyncHandler(async (req, res) => {
  connection.query("SELECT * FROM todos", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400);
      throw new Error("Error Getting TodoLists");
    } else {
      res.status(200);
      res.json({
        rows,
      });
    }
  });
});

const getTodoList = asyncHandler(async (req, res) => {
  connection.query(
    "SELECT * FROM todos WHERE id =?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(400);
        throw new Error("Error Getting TodoList");
      } else {
        res.status(200);
        res.json({
          data: rows,
        });
      }
    }
  );
});

const deleteTodoList = asyncHandler(async (req, res) => {
  connection.query(
    "DELETE FROM todos WHERE id =?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(400);
        throw new Error("Error Deleteing TodoList");
      } else {
        res.status(200);
        res.json({
          data: rows,
        });
      }
    }
  );
});

const addTodoList = asyncHandler(async (req, res) => {
  const todolist = req.body;
  const data = [todolist.name, todolist.description];
  connection.query(
    "INSERT INTO todolist(name,description) values(?)",
    [data],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(400);
        throw new Error("Error Inserting TodoList");
      } else {
        res.status(200);
        res.json({
          data: rows,
        });
      }
    }
  );
});

const updateTodoList = asyncHandler(async (req, res) => {
  const todolist = req.body;
  connection.query(
    `UPDATE todos SET ? WHERE id =${req.params.id}`,
    [todolist],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(400);
        throw new Error("Error Inserting TodoList");
      } else {
        res.status(200);
        res.json({
          data: rows,
        });
      }
    }
  );
});

module.exports = {
  getTodoLists,
  getTodoList,
  addTodoList,
  deleteTodoList,
  updateTodoList,
};
