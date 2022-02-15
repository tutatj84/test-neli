/* eslint-disable testing-library/no-node-access */
import ReactDOM from 'react-dom';
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

test('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(app, div)
  ReactDOM.unmountComponentAtNode(div)
});

