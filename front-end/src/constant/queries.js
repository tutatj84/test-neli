import gql from "graphql-tag"

export const GET_TODOS = gql`
  {
    todos {
      id
      description
      isFinished
    }
  }
`

export const MUTATE_TYPE = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}


export const ADD_TODO = gql`
  mutation addTodo($description: String!) {
    addTodo(description: $description)
  }
`

export const UPDATE_TODO = gql`
  mutation updateTodo($description: String!, $isFinished: Boolean!, $id: Int!) {
    updateTodo(description: $description, , isFinished: $isFinished, id: $id)
  }
`

export const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`
