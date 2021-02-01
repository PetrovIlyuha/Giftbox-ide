import { useTypedSelector } from './useTypedSelector';

export const useCumulativeCode = (cellId: string) => {
  const cumulativeCode = useTypedSelector(state => {
    const { data, order } = state.cells;
    const orderedCells = order.map(id => data[id]);
    const renderFunction = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      var render = (value) => {
        const rootNode = document.querySelector('#root')
          if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
            _ReactDOM.render(value, rootNode)
          } else {
            rootNode.innerHTML = JSON.stringify(value);
            }
          } else {
          rootNode.innerHTML = value
          }
        };
    `;
    const renderFunctionNoOp = 'var render = () => {}';
    const accumulatedPrevCode = [];
    for (let codeBlock of orderedCells) {
      if (codeBlock.type === 'code') {
        if (codeBlock.id === cellId) {
          accumulatedPrevCode.push(renderFunction);
        } else {
          accumulatedPrevCode.push(renderFunctionNoOp);
        }
        accumulatedPrevCode.push(codeBlock.content);
      }
      if (codeBlock.id === cellId) {
        break;
      }
    }
    return accumulatedPrevCode;
  });
  return cumulativeCode.join('\n');
};
