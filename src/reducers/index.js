import { combineReducers } from 'redux';
import directory from './directory';

export default client => combineReducers({
  apollo: client.reducer(),
  directory
});
