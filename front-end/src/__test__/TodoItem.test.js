/* eslint-disable testing-library/no-node-access */

import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';
import { SERVER_URI } from '../constant/links';

const client = new ApolloClient({
  uri: SERVER_URI
})
const app = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

afterEach(() => {
  cleanup()
})

test('delete a task from todo list', async () => {
  render(app)

  const inputTaskEl = await screen.findByTestId('input-task')
  const submitBtn = await screen.findByTestId('btn-submit')

  const now = Date.now()

  fireEvent.change(inputTaskEl, { target: { value: `newtask(${now})` } })
  fireEvent.click(submitBtn)

  const newTodo = await screen.findByText(`newtask(${now})`)
  const newDelBtn = newTodo.parentElement.querySelector('.delete')
  fireEvent.click(newDelBtn)
  
  expect(newTodo).not.toBeInTheDocument()
})

test('click to finish a task from todo list', async () => {
  render(app)

  const inputTaskEl = await screen.findByTestId('input-task')
  const submitBtn = await screen.findByTestId('btn-submit')

  const now = Date.now()

  fireEvent.change(inputTaskEl, { target: { value: `newtask(${now})` } })
  fireEvent.click(submitBtn)

  const newTodo = await screen.findByText(`newtask(${now})`)
  
  const checkboxFinishedEl = newTodo.parentElement.querySelector('input')
  fireEvent.click(checkboxFinishedEl)
  expect(checkboxFinishedEl).toBeChecked()
})
