const express = require("express");
const {
  addTodoList,
  getTodoList,
  getTodoLists,
  deleteTodoList,
  updateTodoList,
} = require("../controllers/todoController");
const { validateToken } = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/addTodo", validateToken, addTodoList);
router.get("/:id", validateToken, getTodoList);
router.get("/", validateToken, getTodoLists);
router.delete("/:id", validateToken, deleteTodoList);
router.patch("/:id", validateToken, updateTodoList);

module.exports = router;
