import { forwardRef } from "react"
import { BiEdit, BiPlus } from "react-icons/bi"
import { toast } from "react-hot-toast"
import PropTypes from "prop-types"

// eslint-disable-next-line react/display-name
const Form = forwardRef(
  ({ setFocus, edit, setEdit, setList, value, setValue }, ref) => {
    const submitHandler = (e, id) => {
      e.preventDefault()


      const url = edit.status
        ? `http://localhost:5000/api/todos/${id}`
        : "http://localhost:5000/api/todos/create"
      const method = edit.status ? "PUT" : "POST"
      const headers = {
        "Content-Type": "application/json",
      }

      if (value === undefined || value.trim().length === 0) {
        setFocus()
        return toast("값을 입력해주세요", { type: "error" })
      }

      e.key === "Enter" && setValue("")

      if (edit.status) {
        return fetch(url, {
          method,
          headers,
          body: JSON.stringify({ id, value }),
        })
          .then((res) => res.json())
          .then((result) => {
            const { todos, message } = result

            setEdit((prevState) => {
              return { ...prevState, status: !prevState.status }
            })

            setList(todos)

            setValue("")

            toast(message, { type: "success" })
          })
      } else {
        return fetch(url, {
          method,
          headers,
          body: JSON.stringify({
            value,
            completed: false,
          }),
        })
          .then((result) => result.json())
          .then((result) => {
            setList((prevState) => [...prevState, result.todos])

            setValue("")

            setFocus()

            toast(`${value} 추가 성공`, { type: "success" })
          })
          .catch((error) => console.log(error))
      }
    }
    const changeHandler = (e) => {
      setValue(e.target.value)
    }

    return (
      <form
        className={"form-group"}
        onSubmit={(e) => submitHandler(e, edit.status ? edit.id : null)}
      >
        <label htmlFor="add-todo">
          {edit.status ? <BiEdit /> : <BiPlus />}
        </label>
        <input
          ref={ref}
          id="add-todo"
          type="text"
          onChange={changeHandler}
          value={value}
        />
        {edit.status ? (
          <button type="submit">수정</button>
        ) : (
          <button type="submit">추가</button>
        )}
      </form>
    )
  },
)

export default Form

Form.propTypes = {
  setFocus: PropTypes.func,
  edit: PropTypes.object,
  setEdit: PropTypes.func,
  setList: PropTypes.func,
  value: PropTypes.string,
  setValue: PropTypes.func,
}
