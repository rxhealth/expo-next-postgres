import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const INITIAL_STATE = {
  isAuthenticated: false,
  viewer: null,
};

const mergeNewKeyValues = (data, state) => {
  return { ...state, ...data };
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_KEY_VALUES':
      return mergeNewKeyValues(action.data, state);
    default:
      return state;
  }
};

export const initStore = initialState => {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
};
