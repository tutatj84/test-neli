
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

import '../App.css';

const MUTATE_TYPE = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

const UPDATE_TODO = gql`
  mutation updateTodo($description: String!, $isFinished: Boolean!, $id: Int!) {
    updateTodo(description: $description, , isFinished: $isFinished, id: $id)
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;

const TodoItem = ({ todo, onItemChange }) => {
  const { id, description, isFinished } = todo

  const [updateTodo, { loading, error }] = useMutation(UPDATE_TODO, {
    // refetchQueries: () => [{ query: GET_TODOS }]
  });

  const [deleteTodo, { }] = useMutation(DELETE_TODO, {
    // refetchQueries: () => [{ query: GET_TODOS }]
  });

  const handleToggleFinished = () => {
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

  const handleDeleteTodoItem = () => {
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
          type="checkbox"
          value={isFinished}
          checked={isFinished}
          onChange={handleToggleFinished}
        />
        <button
          className="delete"
          onClick={handleDeleteTodoItem}>X</button>
      </div>
    </label>
  )
}

export default TodoItem
