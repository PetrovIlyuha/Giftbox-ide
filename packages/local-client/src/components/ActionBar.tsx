import React from 'react';
import { useActions } from '../hooks/useActions';
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from 'react-icons/io';
import { TiDelete } from 'react-icons/ti';
import './action-bar.css';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { deleteCell, moveCell } = useActions();
  return (
    <div className='action-bar'>
      <button className='button is-info is-small'>
        <IoIosArrowDropupCircle size={22} onClick={() => moveCell(id, 'up')} />
      </button>
      <button className='button is-secondary is-small'>
        <IoIosArrowDropdownCircle
          size={20}
          onClick={() => moveCell(id, 'down')}
        />
      </button>
      <button className='button is-danger is-small'>
        <TiDelete size={20} onClick={() => deleteCell(id)} />
      </button>
    </div>
  );
};

export default ActionBar;
