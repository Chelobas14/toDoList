const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")
const {
  getTodos,
  createTodo,
  completeTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todosController")

router.get("/todos", getTodos)

router.post("/todos/create", createTodo)

router.put("/todos/:id", updateTodo)

router.patch("/todos/:id", completeTodo)

router.delete("/todos/:id", deleteTodo)

module.exports = router
