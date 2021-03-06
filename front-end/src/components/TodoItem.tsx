
import { useMutation } from "@apollo/react-hooks"
import * as Queries from '../constant/queries'
import { HandleItemChange, TodoItem as TodoItemType, MUTATE_TYPE } from "../type";
import '../App.css';
import { FC } from "react";

interface ITodoItemProps {
  className: string,
  todo: TodoItemType,
  onItemChange: HandleItemChange
}

const TodoItem:FC<ITodoItemProps> = ({ todo, onItemChange }) => {
  const { id, description, isFinished } = todo

  const [ updateTodo ] = useMutation(Queries.UPDATE_TODO);

  const [ deleteTodo ] = useMutation(Queries.DELETE_TODO);

  const onToggleFinished = () => {
    const toggledFinishedItem = {
      description: description,
      isFinished: !isFinished,
      id: id
    }

    onItemChange(toggledFinishedItem, MUTATE_TYPE.UPDATE)

    updateTodo({
      variables: toggledFinishedItem
    })
  }

  const onDeleteTodoItem = () => {
    const deleteItem = {
      description: description,
      isFinished: isFinished,
      id: id
    }

    onItemChange(deleteItem, MUTATE_TYPE.DELETE)

    deleteTodo({
      variables: {
        id: id
      }
    })
  }

  return (
    <label className="card">
      <div className={isFinished ? "taskContent linethrough" : "taskContent"}>{description}</div>
      <div className="control">
        <input
          className="checkbox"
          data-testid="checkboxFinished"
          type="checkbox"
          checked={isFinished}
          onChange={onToggleFinished}
        />
        <button
          className="delete"
          onClick={onDeleteTodoItem}>X</button>
      </div>
    </label>
  )
}

export default TodoItem
