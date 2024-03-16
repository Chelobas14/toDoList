import { useEffect, useRef, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import "./App.css"
import Form from "./components/Form.jsx"
import ListItem from "./components/ListItem.jsx"
import { GrGithub } from "react-icons/gr"
import Footer from "./components/Footer.jsx"
const App = () => {
  const [list, setList] = useState([])
  const [value, setValue] = useState("")
  const [edit, setEdit] = useState({ id: "", status: false })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({ message: "", status: false })
  const ref = useRef(null)

  const setFocus = () => {

    ref.current.focus()
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((data) => data.json())
      .then((result) => setList(result.todos))
      .catch((error) => setError({ message: error.message, status: true }))
      .finally(() => setLoading(false))
  }, [])

  if (error.status) return <div>404</div>

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className={"container"}>
        <Form
          ref={ref}
          setFocus={setFocus}
          edit={edit}
          setEdit={setEdit}
          value={value}
          setValue={setValue}
          setList={setList}
        />

        {list.length === 0 && (
          <div
            style={{
              padding: "var(--size-fluid-1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                width: "fit-content",
                textAlign: "center",
                fontSize: "var(--font-size-fluid-1)",
                lineHeight: "var(--line-height-fluid-1)",
                fontWeight: "var(--font-weight-6)",
                color: "var(--teal-5)",
              }}
            >
              Добавить
            </h2>
            <img src="nodata.png" alt="empty" />
          </div>
        )}

        <ul>
          {list &&
            list.map((todo) => (
              <ListItem
                key={todo.id}
                todo={todo}
                edit={edit}
                setEdit={setEdit}
                list={list}
                setList={setList}
                setValue={setValue}
                setFocus={setFocus}
              />
            ))}
        </ul>
        <Toaster position={"bottom-right"} />
      </div>
      <Footer />
    </>
  )
}

export default App
