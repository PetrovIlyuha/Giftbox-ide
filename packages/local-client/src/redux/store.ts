import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { ActionType } from './action-types';

const middlewares = [thunk, logger];

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middlewares)),
);

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { id: null, type: 'code' },
});
store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { id: null, type: 'text' },
});
store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { id: null, type: 'code' },
});
store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: { id: null, type: 'text' },
});
