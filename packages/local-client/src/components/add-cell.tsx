import React from 'react';
import { useActions } from '../hooks/useActions';
import './add-cell.css';
import { FiCodepen } from 'react-icons/fi';
import { HiOutlineAnnotation } from 'react-icons/hi';
import { FaPlus } from 'react-icons/fa';

interface AddCellProps {
  prevCellId: string | null;
  forceVisibility?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisibility }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisibility && 'always-show'}`}>
      <div className='add-buttons-actions'>
        <button
          onClick={() => insertCellAfter(prevCellId, 'code')}
          className='button is-rounded is-secondary'>
          <FaPlus />
          Code Block
          <FiCodepen />
        </button>
        <button
          onClick={() => insertCellAfter(prevCellId, 'text')}
          className='button is-rounded is-info'>
          <FaPlus />
          Annotations
          <HiOutlineAnnotation />
        </button>
      </div>
      <div className='divider' />
    </div>
  );
};

export default AddCell;
