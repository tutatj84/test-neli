import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import AddTodo from './components/AddTodo';

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

test('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(app, div)
  ReactDOM.unmountComponentAtNode(div)
});

test('add a task to todo list', () => {
  render(app)
  screen.getByRole('')
})
