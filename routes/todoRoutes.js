const express = require("express");
const {
  addTodoList,
  getTodoList,
  getTodoLists,
  deleteTodoList,
  updateTodoList,
} = require("../controllers/todoController");

const router = express.Router();

router.post("/addTodoList", addTodoList);
router.get("/:id", getTodoList);
router.get("/", getTodoLists);
router.delete("/:id", deleteTodoList);
router.patch("/:id", updateTodoList);

module.exports = router;
