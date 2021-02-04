import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { persistEditorsData } from './middlewares/persist-editors-data';

const middlewares = [thunk, logger, persistEditorsData];
const middlewaresLoggerSilent = [thunk, persistEditorsData];

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middlewaresLoggerSilent)),
);
