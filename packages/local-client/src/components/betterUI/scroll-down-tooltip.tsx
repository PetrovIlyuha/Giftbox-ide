import React from 'react';

interface TooltipProps {
  toolTip: string;
  mousePointer: {
    x: number;
    y: number;
  };
}

const ScrollDownTooltip: React.FC<TooltipProps> = ({
  toolTip,
  mousePointer,
}) => {
  return (
    <div
      className='tooltip-theme'
      style={{
        display: `${toolTip === 'scroll' ? 'block' : 'none'}`,
        position: 'absolute',
        transition: 'all 0.2s ease-in',
        background: 'rgba(100,120,0,0.5)',
        top: mousePointer.y + 10,
        left: mousePointer.x - 25,
        fontSize: 10,
      }}>
      <span>Scroll to Bottom</span>
    </div>
  );
};

export default ScrollDownTooltip;
