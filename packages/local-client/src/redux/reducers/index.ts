import { combineReducers } from 'redux';
import bundlesReducer from './bundles-reducer';
import cellsReducer from './cells-reducer';

const rootReducer = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
