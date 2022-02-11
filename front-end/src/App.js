import { useQuery, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useEffect, useState } from "react";

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
const ADD_TODO = gql`
  mutation addTodo($description: String!) {
    addTodo(description: $description)
  }
`;

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

const MUTATE_TYPE = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}


const Todo = ({ todo, onItemChange }) => {
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

const AddTodo = ({ triggerAddTodo, lastItemId }) => {
  let input;
  const [addTodo, {data, loading, error }] = useMutation(ADD_TODO, {
    // refetchQueries: () => [{ query: GET_TODOS }]
  });

  if (loading) return 'Submitting...';
  if (error) {
    console.log(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addItem = {
      description: input.value,
      isFinished: false,
      id: lastItemId + 1
    }
    triggerAddTodo(addItem)
    addTodo({ variables: { description: input.value } });

    input.value = '';
  }

  return (
    <div>
      <form
        onSubmit={e => handleSubmit(e)}
      >
        <input
          className="inputTask"
          required={true}
          ref={node => {
            input = node;
          }}
        />
        <button className="btn-submit" type="submit">Add Todo</button>
      </form>
    </div>
  );
}

const TodoList = ({ data }) => {
  console.log(data);
  const [todos, setTodos] = useState(data.todos)

  console.log(todos);

  const triggerAddTodo = (updateItem) => {
    setTodos([...todos, updateItem])
  }

  const todoItems = todos.map(todo => (
    <Todo
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
