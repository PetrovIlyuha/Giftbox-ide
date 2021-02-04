import React, { useRef, useState, useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import AddCell from './add-cell';
import CellListItem from './CellListItem';
import { AiFillDownCircle } from 'react-icons/ai';
import './cell-list.css';
import ThemeTooltip from './betterUI/theme-tooltip';
import ScrollDownTooltip from './betterUI/scroll-down-tooltip';
import DarkLogo from '../assets/logo-light-bg.svg';
import LightLogo from '../assets/logo-dark-bg.svg';
import { useActions } from '../hooks/useActions';

type MouseCoords = {
  x: number;
  y: number;
};
const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { data, order } }) =>
    order.map(id => data[id]),
  );
  const { fetchCells } = useActions();
  useEffect(() => {
    fetchCells();
  }, []);

  const [theme, setTheme] = useState<string>('dark');
  const [toolTip, setToolTip] = useState<string>('');
  const [mousePointer, setMouserPointer] = useState<MouseCoords>({
    x: 0,
    y: 0,
  });
  const bottomAnchor = useRef<any>(null);

  const scrollToBottom = () => {
    bottomAnchor.current.scrollIntoView({ behavior: 'smooth' });
  };

  const renderedCells = cells.map(cell => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </React.Fragment>
  ));

  const handleMultiTooltips = (
    e: React.MouseEvent<HTMLSelectElement | SVGElement, MouseEvent>,
    tooltip: string,
  ) => {
    setMouserPointer({ x: e.pageX, y: e.pageY });
    setTimeout(() => {
      setToolTip(tooltip);
      setTimeout(() => {
        handleRemoveMultiTooltips();
      }, 1200);
    }, 300);
  };

  const handleRemoveMultiTooltips = () => {
    setToolTip('');
  };
  return (
    <div style={{ backgroundColor: `${theme === 'light' ? 'beige' : ''}` }}>
      {theme === 'light' ? (
        <div className='logo-main-styles' style={{ marginLeft: 40 }}>
          <img src={DarkLogo} alt='app dark logo' />{' '}
          <span
            style={{
              backgroundColor: 'rgba(0,0,0,0.23)',
              padding: '3px 5px',
              borderRadius: 4,
            }}>
            GiftBox IDE
          </span>
        </div>
      ) : (
        <div className='logo-main-styles' style={{ marginLeft: 40 }}>
          <img src={LightLogo} alt='app light logo' /> <span>GiftBox IDE</span>
        </div>
      )}
      {cells.length > 2 && (
        <AiFillDownCircle
          size={24}
          onClick={scrollToBottom}
          onMouseEnter={e => handleMultiTooltips(e, 'scroll')}
          onMouseLeave={handleRemoveMultiTooltips}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: `${theme === 'light' ? 'blue' : 'lightgreen'}`,
            cursor: 'pointer',
            transition: 'all 0.2s ease-in',
          }}
        />
      )}
      <select
        style={{
          position: 'absolute',
          top: 10,
          right: 50,
          backgroundColor: 'darkblue',
          border: 'none',
          color: 'white',
          fontFamily: 'sans-serif',
          borderRadius: 10,
          width: 45,
          height: 24,
        }}
        name='theme'
        onMouseEnter={e => handleMultiTooltips(e, 'theme')}
        onMouseLeave={handleRemoveMultiTooltips}
        onChange={e => setTheme(e.target.value)}>
        <option value='dark'>🌔</option>
        <option value='light'>😎</option>
      </select>
      <ScrollDownTooltip toolTip={toolTip} mousePointer={mousePointer} />
      <ThemeTooltip toolTip={toolTip} mousePointer={mousePointer} />
      <AddCell forceVisibility={cells.length === 0} prevCellId={null} />
      {renderedCells}

      <div style={{ float: 'left', clear: 'both' }} ref={bottomAnchor}></div>
    </div>
  );
};

export default CellList;
