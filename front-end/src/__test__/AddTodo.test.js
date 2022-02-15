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