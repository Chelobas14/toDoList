import { GiCancel } from "react-icons/gi"
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { toast } from "react-hot-toast"
import PropTypes from "prop-types"

const ListItem = ({
  todo,
  list,
  setList,
  edit,
  setEdit,
  setValue,
  setFocus,
}) => {
  const checkHandler = (id, completed) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        completed: !completed,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const { todos, message } = result
        setList(todos)
        toast(
          message === "완료" ? "완료로 상태 변경" : "진행중으로 상태 변경",
          { type: "success" },
        )
      })
      .catch((error) => console.log(error))
  }

  const deleteHandler = (id) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        const { todos, message } = result
        const getItem = list.find((todo) => todo.id === id)
        const filteredList = todos.filter((todo) => todo.id !== id)
        setList(filteredList)
        toast(getItem.title + message, { type: "success" })
      })
      .catch((error) => console.log(error))
  }

  return (
    <li key={todo.id}>
      <input
        id={todo.id}
        type="checkbox"
        checked={todo.completed}
        onChange={() => checkHandler(todo.id, todo.completed)}
      />
      <label htmlFor={todo.id}>{todo.title}</label>
      <div className="button-group">
        {edit.id === todo.id && edit.status ? (
          <button
            onClick={() => {
              setEdit((prevState) => {
                return { ...prevState, status: false }
              })
              setValue("")
            }}
          >
            <GiCancel color={"var(--orange-6)"} />
          </button>
        ) : (
          <button
            onClick={() => {
              setEdit((prevState) => {
                return {
                  id: todo.id,
                  title: todo.title,
                  status: !prevState.status,
                }
              })
              setFocus()
              setValue(todo.title)
            }}
          >
            <BiEdit color={"var(--teal-6)"} />
          </button>
        )}

        <button onClick={() => deleteHandler(todo.id)}>
          <AiFillDelete color={"var(--pink-6)"} />
        </button>
      </div>
    </li>
  )
}

export default ListItem

ListItem.propTypes = {
  todo: PropTypes.object,
  list: PropTypes.array,
  setList: PropTypes.func,
  edit: PropTypes.object,
  setEdit: PropTypes.func,
  setValue: PropTypes.func,
  setFocus: PropTypes.func,
}
