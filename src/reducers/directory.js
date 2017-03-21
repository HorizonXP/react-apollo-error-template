import { createAction } from 'redux-actions';

const INITIAL_STATE = {
  id: 1
};

export const setId = createAction('DIRECTORY_SET_ID');

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case 'DIRECTORY_SET_ID': {
      const id = action.payload;
      if (state.id !== id) {
        return {
          id
        };
      }
      break;
    }
    default:
      break;
  }
  return state;
};
