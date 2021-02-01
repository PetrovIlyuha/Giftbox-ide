import React from 'react';
import { Cell } from '../redux/cell';
import ActionBar from './ActionBar';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import './cell-list-item.css';

interface CellItemProps {
  cell: Cell;
}
const CellListItem: React.FC<CellItemProps> = ({ cell }) => {
  return (
    <div className='cell-list-item'>
      {cell.type === 'code' ? (
        <>
          <div className='action-bar-wrapper'>
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>
      ) : (
        <>
          <TextEditor cell={cell} />
          <ActionBar id={cell.id} />
        </>
      )}
    </div>
  );
};

export default CellListItem;
