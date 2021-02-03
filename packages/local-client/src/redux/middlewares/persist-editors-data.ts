import { Dispatch } from 'redux';
import { saveCells } from '../action-creators';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { RootState } from '../reducers';

export const persistEditorsData = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => (next: (action: Action) => void) => (action: Action) => {
  next(action);
  if (
    [
      ActionType.MOVE_CELL,
      ActionType.UPDATE_CELL,
      ActionType.INSERT_CELL_AFTER,
      ActionType.DELETE_CELL,
    ].includes(action.type)
  ) {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('saving data');
      saveCells()(dispatch, getState);
    }, 250);
  }
};
