import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import { networkInterface } from './graphql/networkInterface';
import configureStore from './store';
import App from './App';

const client = new ApolloClient({ networkInterface });
const store = configureStore(client);

ReactDOM.render(
  <ApolloProvider client={client} store={store}><App /></ApolloProvider>,
  document.getElementById('root'),
);
