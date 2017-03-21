import { createAction } from 'redux-actions';

const INITIAL_STATE = {
  id: 1,
  newId: 1
};

export const setId = createAction('DIRECTORY_SET_ID');

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case 'DIRECTORY_SET_ID': {
      const newId = action.payload;
      if (state.newId !== newId) {
        return {
          id: state.id,
          newId
        };
      }
      break;
    }
    default:
      break;
  }
  return state;
};
