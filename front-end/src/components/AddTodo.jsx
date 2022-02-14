import React from "react";
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import '../App.css';

const ADD_TODO = gql`
  mutation addTodo($description: String!) {
    addTodo(description: $description)
  }
`;

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

export default AddTodo
