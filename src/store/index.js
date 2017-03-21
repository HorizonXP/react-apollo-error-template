import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';

export default client => createStore(
  reducers(client),
  compose(
    applyMiddleware(client.middleware()),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined')
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);
