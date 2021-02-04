import { Dispatch } from 'redux';
import axios from 'axios';
import { ActionType } from './../action-types/index';
import {
  UpdateCellAction,
  MoveCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  Action,
} from '../actions';
import { CellTypes, Cell, MoveDirection } from '../cell';
import bundle from '../../bundler';
import { RootState } from '../reducers';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (
  id: string,
  direction: MoveDirection,
): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: { id, direction },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes,
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, userCodeInput: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });
    const result = await bundle(userCodeInput);
    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: { cellId, bundle: result },
    });
  };
};

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.FETCH_CELLS });
  try {
    const { data }: { data: Cell[] } = await axios.get('/cells');
    dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
  } catch (error) {
    dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: error.message });
  }
};

export const saveCells = () => async (
  dispatch: Dispatch<Action>,
  getState: () => RootState,
) => {
  const {
    cells: { data, order },
  } = getState();
  const cells: Cell[] = order.map(id => data[id]);
  try {
    await axios.post('/cells', { cells });
    dispatch({ type: ActionType.SAVE_CELLS_SUCCESS });
  } catch (error) {
    dispatch({ type: ActionType.SAVE_CELLS_ERROR, payload: error.message });
  }
};
