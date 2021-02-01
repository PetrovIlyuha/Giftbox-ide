import { useEffect } from 'react';
import Resizable from './resizable';

import CodeEditor from './code-editor';
import Preview from './preview';
import { Cell } from '../redux/cell';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { CgSpinnerTwo } from 'react-icons/cg';
import { useCumulativeCode } from '../hooks/useCumulativeCode';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(state => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
    }
    const runnerDebouncer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);
    return () => {
      clearTimeout(runnerDebouncer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={value => updateCell(cell.id, value)}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div className='preview-window-upper-wrapper'>
            <div className='loading-wrapper'>
              <CgSpinnerTwo
                color='#5F3299'
                size={80}
                className='loading-indicator'
              />
            </div>
          </div>
        ) : (
          <Preview code={bundle.code} statusOfBundle={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
