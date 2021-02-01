import React from 'react';

interface TooltipProps {
  toolTip: string;
  mousePointer: {
    x: number;
    y: number;
  };
}
const ThemeTooltip: React.FC<TooltipProps> = ({ toolTip, mousePointer }) => {
  return (
    <div
      className='tooltip-theme'
      style={{
        display: `${toolTip === 'theme' ? 'block' : 'none'}`,
        position: 'absolute',
        transition: 'all 0.2s ease-in',
        background: 'rgba(100,120,0,0.3)',
        top: mousePointer.y + 10,
        left: mousePointer.x - 20,
        fontSize: 10,
      }}>
      <span>Select Color Theme</span>
    </div>
  );
};

export default ThemeTooltip;
