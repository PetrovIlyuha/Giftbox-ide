import { Dispatch } from 'redux';
import { ActionType } from './../action-types/index';
import {
  UpdateCellAction,
  MoveCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  Action,
} from '../actions';
import { CellTypes, MoveDirection } from '../cell';
import bundle from '../../bundler';

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
