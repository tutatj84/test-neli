import { useState } from "react";
import TodoItem from "../components/TodoItem";
import AddTodo from "../components/AddTodo";
import { HandleItemChange, TodoItem as TodoItemType, MUTATE_TYPE } from "../type";

import '../App.css';
import { FC } from "react";

interface ITodoListProps {
  data: {
    todos: TodoItemType[]
  }
}

const TodoList: FC<ITodoListProps> = ({ data }) => {
  // sort data to see the newest first
  const initTodos = [...data.todos].reverse()
  const [todos, setTodos] = useState<TodoItemType[]>(initTodos)

  const listLength = todos.length
  const unFinishedTasks = todos.filter(task => !task.isFinished)

  const triggerAddTodo = (updateItem: TodoItemType) => {
    setTodos([updateItem, ...todos])
  }

  const onItemChange: HandleItemChange = (updateItem, mutateType) => {
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
      className= "todo-item"
      data-testid="task"
      key = { todo.id }
      todo = { todo }
      onItemChange = { onItemChange }
    />
  ))
  return (
    <>
      <p><i data-testid="status">
        We have <b>{listLength}</b> task{listLength < 2 ? '' : 's'}
        &nbsp;and <b>{unFinishedTasks.length}</b> task{unFinishedTasks.length < 2 ? '' : 's'} to do!
      </i></p>
      <AddTodo triggerAddTodo={triggerAddTodo} lastItemId={todos[0].id}/>
      <ul className="todo-list">
        {todoItems}
      </ul>
    </>
  )
}

export default TodoList