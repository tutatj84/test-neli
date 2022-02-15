import React from "react";
import * as Queries from './constant/queries'
import { useMutation } from "@apollo/react-hooks"
import '../App.css';

const AddTodo = ({ triggerAddTodo, lastItemId }) => {
  let input;
  const [addTodo, {data, loading, error }] = useMutation(Queries.ADD_TODO);

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
          data-testid="input-task"
          required={true}
          ref={node => {
            input = node;
          }}
        />
        <button
          className="btn-submit"
          type="submit"
          data-testid="btn-submit"
        >Add Todo</button>
      </form>
    </div>
  );
}

export default AddTodo
