import { useQuery } from "@apollo/react-hooks"
import { useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import './App.css';
import * as Queries from './constant/queries'
const MUTATE_TYPE = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}
const TodoList = ({ data }) => {
  const initTodos = [...data.todos].reverse()
  const [todos, setTodos] = useState(initTodos)

  const listLength = todos.length
  const unFinishedTasks = todos.filter(task => !task.isFinished)

  const triggerAddTodo = (updateItem) => {
    setTodos([updateItem, ...todos])
  }

  const handleItemChange = (updateItem, mutateType) => {
    if (mutateType === MUTATE_TYPE.UPDATE) {
      const updatedTodo = todos.map(todoItem => {
        if (todoItem.id === updateItem.id) {
          return updateItem
        }
        return todoItem
      })
      setTodos(updatedTodo)
    } else if (mutateType === MUTATE_TYPE.DELETE) {
      const filteredTodo = todos.filter((item) => (item.id !== updateItem.id))
      setTodos(filteredTodo)
    }
  }

  const todoItems = todos.map(todo => (
    <TodoItem
      className="todo-item"
      data-testid="task"
      key={todo.id}
      todo={todo}
      onItemChange={handleItemChange}
    />
  ))
  return (
    <>
      <p><i>
        We have <b>{listLength}</b> task{listLength < 2 ? '' : 's'}
        &nbsp;and <b>{unFinishedTasks.length}</b> task{unFinishedTasks.length < 2 ? '' : 's'} to do!
      </i></p>
      <AddTodo triggerAddTodo={triggerAddTodo} lastItemId={todos[todos.length-1].id}/>
      <ul className="todo-list">
        {todoItems}
      </ul>
    </>
  )
}

const App = () => {
  const { loading, error, data } = useQuery(Queries.GET_TODOS)

  if (error) {
    return <h1>Something went wrong!</h1>
  }
  if (loading) return <h1>Loading...</h1>

  const todoList = loading ? null : <TodoList data={data} />

  return (
    <main className="App">
      <h1>TODO list</h1>
      {todoList}
    </main>
  )
}

export default App;
