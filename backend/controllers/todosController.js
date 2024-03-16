const { v4: uuidv4 } = require("uuid")

const db = require("../db")

/**
 * @description todos 
 * @param {Object} req  
 * @param {Object} res  
 */
const getTodos = (req, res) => {
  
  db.all("SELECT * FROM todos", (err, rows) => {
    

    if (err) {
      res.status(400)
      throw new Error("todos 데이터를 가져올 수 없습니다")
    }
    
    res.status(200).json({ todos: rows, message: "" })
  })
}

/**
 * 
 * @param {*} req
 * @param {*} res
 */
const createTodo = (req, res) => {
  const { value, completed } = req.body
  const id = uuidv4()

  
  db.run(
    "INSERT INTO todos(id, title, completed) VALUES(?,?,?)",
    [id, value, false],
    (err) => {
      if (err) {
        res.status(400)
        throw new Error("todos err")
      }

      res.status(201).json({
        todos: { id, title: value, completed },
        message: `${value} To Do`,
      })
    },
  )
}
/**
 * @param {object} req
 * @param {object} res
 */
const updateTodo = (req, res) => {
  const { id } = req.params
  const { value } = req.body

  db.run("UPDATE todos SET title = ? WHERE id = ?", [value, id]).all(
    "SELECT * FROM todos",
    (err, rows) => {
      if (err) {
        res.status(400)
        throw new Error("todos 데이터를 업데이트할 수 없습니다")
      }
      res.status(200).json({ todos: rows, message: `${value}로 수정 완료` })
    },
  )
}

/**
 * 
 *
 * @param {Object} req - 
 * @param {Object} req.params
 * @param {string} req.params.id
 * @param {Object} req.body
 * @param {boolean} req.body.completed
 * @param {Object} res
 */
const completeTodo = (req, res) => {
  
  const { id } = req.params
  const { completed } = req.body

  
  db.run("UPDATE todos SET completed = ? WHERE id = ?", [completed, id]).all(
    "SELECT * FROM todos",
    (err, rows) => {
      
      if (err) {
        res.status(400)
        throw new Error("todos 데이터를 업데이트할 수 없습니다")
      }

      
      res
        .status(200)
        .json({ todos: rows, message: `${completed ? "완료" : "진행중"}` })
    },
  )
}
/**
 * 
 * @param {Object} req
 * @param {Object} res
 */
const deleteTodo = (req, res) => {
  const { id } = req.params

  db.run("DELETE FROM todos WHERE id = ?", [id]).all(
    "SELECT * FROM todos",
    (err, rows) => {
      
      if (err) {
        res.status(400)
        throw new Error("todos 데이터를 가져올 수 없습니다")
      }

      
      res.status(200).json({ todos: rows, message: `삭제 성공` })
    },
  )
}

module.exports = {
  getTodos,
  createTodo,
  completeTodo,
  deleteTodo,
  updateTodo,
}
