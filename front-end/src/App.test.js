/* eslint-disable testing-library/no-node-access */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
})
const app = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

afterEach(() => {
  cleanup()
})

test('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(app, div)
  ReactDOM.unmountComponentAtNode(div)
});

test('add a task to todo list', async () => {
  render(app)

  const inputTaskEl = await screen.findByTestId('input-task')
  const submitBtn = await screen.findByTestId('btn-submit')

  const now = Date.now()

  fireEvent.change(inputTaskEl, { target: { value: `newtask(${now})` } })
  fireEvent.click(submitBtn)

  const newTodo = await screen.findByText(`newtask(${now})`)
  const newInputTaskEl = await screen.findByTestId('input-task')
  
  expect(newTodo).toBeInTheDocument()
  
  expect(newInputTaskEl.value).toBe('')
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
