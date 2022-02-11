import { useQuery, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import './App.css';

const GET_TODOS = gql`
  {
    todos {
      id
      description
      isFinished
    }
  }
`

const MUTATE_TYPE = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

const TodoList = ({ data }) => {
  console.log(data);
  const [todos, setTodos] = useState(data.todos)

  console.log(todos);

  const triggerAddTodo = (updateItem) => {
    setTodos([...todos, updateItem])
  }

  const todoItems = todos.map(todo => (
    <TodoItem
      className="todo-item"
      key={todo.id}
      todo={todo}
      onItemChange={(updateItem, mutateType) => {
        if (mutateType === MUTATE_TYPE.ADD) {
          setTodos([...todos, updateItem])
        } else if (mutateType === MUTATE_TYPE.UPDATE) {
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
      }}
    />
  ))
  return (
    <>
      <AddTodo triggerAddTodo={triggerAddTodo} lastItemId={todos[todos.length-1].id}/>
      <ul className="todo-list">
        {todoItems}
      </ul>
    </>
  )
}

const App = () => {
  const { loading, error, data } = useQuery(GET_TODOS)

  if (error) {
    console.log(error);
    return <h1>Something went wrong!</h1>
  }
  if (loading) return <h1>Loading...</h1>

  console.log(data);

  const todoList = loading ? null : <TodoList data={data} />

  return (
    <main className="App">
      <h1>TODO list</h1>
      {todoList}
    </main>
  )
}

export default App;
