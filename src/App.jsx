import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TodoList from './components/TodoList'

const LOCAL_STORAGE_KEY = "todoApp.todos"
function App() {
   const storedTodos = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  const [todos, setTodos] = useState(storedTodos )
  const todoNameRef = useRef()



  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo() {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleToggle(id) {
    const newTodo = [...todos]
    const todo = newTodo.find(todo => todo.id == id)
    todo.complete = !todo.complete;
    setTodos(newTodo)
  }

  function handleClearTodo() {
    const newTodo = todos.filter(todo => !todo.complete);
    setTodos(newTodo);
  }
  return (
    <>
      <TodoList todos={todos} toggleTodo={handleToggle}/>
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do </div>
    </>
  )
}

export default App
