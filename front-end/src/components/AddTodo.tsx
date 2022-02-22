import React, { FormEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import * as Queries from '../constant/queries'
import { useMutation } from "@apollo/react-hooks"
import '../App.css';
import { FC } from "react";
import { TodoItem } from '../type'

import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

interface IAddTodoProps {
  triggerAddTodo: (updateItem: TodoItem) => void,
  lastItemId: number
}

const AddTodo: FC<IAddTodoProps> = ({ triggerAddTodo, lastItemId }) => {
  let input = useRef<HTMLInputElement>(null);
  const [addTodo, { data, loading, error }] = useMutation(Queries.ADD_TODO);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor | undefined>("info");
  const [message, setMessage] = useState("Default Status!!!");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const addItem = {
      description: input!.current!.value,
      isFinished: false,
      id: lastItemId + 1
    }
    triggerAddTodo(addItem)
    addTodo({ variables: { description: input!.current!.value } });

    if (loading) {
      setOpen(true)
      setSeverity('info')
      setMessage('Adding the item!')
    } else if (error) {
      setOpen(true)
      setSeverity('error')
      setMessage('Failed to add! Try again!')
    } else {
      setOpen(true)
      setSeverity('success')
      setMessage('Added successfully!')
    }

    input!.current!.value = '';
  }

  const onCloseToast = (event: Event | SyntheticEvent<any, Event> , reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const toastEl = (
    <Snackbar open={open} autoHideDuration={2000} onClose={onCloseToast}>
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )

  return (
    <>
      {toastEl}
      <form
        onSubmit={e => onSubmit(e)}
      >
        <input
          className="inputTask"
          data-testid="input-task"
          required={true}
          ref={input}
        />
        <button
          className="btn-submit"
          type="submit"
          data-testid="btn-submit"
        >Add Todo</button>
      </form>
    </>
  );
}

export default AddTodo
