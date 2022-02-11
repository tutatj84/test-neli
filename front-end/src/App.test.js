import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
})

test('renders without crashing', () => {
  const div = document.createElement('div')
  const app = (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
  ReactDOM.render(app, div)
  ReactDOM.unmountComponentAtNode(div)
});
