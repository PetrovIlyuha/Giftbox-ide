import produce from 'immer';
import { Action } from './../actions/index';
import { ActionType } from './../action-types/index';
import { Cell } from '../cell';

interface EditorsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: EditorsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsReducer = produce(
  (state: EditorsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.SAVE_CELLS_SUCCESS:
        state.loading = false;
        state.error = null;
        return state;
      case ActionType.SAVE_CELLS_ERROR:
        state.error = action.payload;
        return state;
      case ActionType.FETCH_CELLS:
        state.loading = true;
        state.error = null;
        return state;
      case ActionType.FETCH_CELLS_COMPLETE:
        state.loading = false;
        state.order = action.payload.map(cell => cell.id);
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as EditorsState['data']);
        return state;
      case ActionType.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload;
        return state;
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter(id => id !== action.payload);
        return state;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex(id => id === action.payload.id);
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex > state.order.length - 1) {
          return state;
        }
        state.order[index] = state.order[newIndex];
        state.order[newIndex] = action.payload.id;
        return state;
      case ActionType.INSERT_CELL_AFTER:
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: uuid(),
        };
        state.data[cell.id] = cell;
        const foundIndex = state.order.findIndex(
          idx => idx === action.payload.id,
        );
        if (foundIndex < 0) {
          state.order.unshift(cell.id);
        } else {
          state.order.splice(foundIndex + 1, 0, cell.id);
        }
        return state;
      default:
        return state;
    }
  },
);

const uuid = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default cellsReducer;
