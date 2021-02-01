import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './text-editor.css';
import { Cell } from '../redux/cell';
import { useActions } from '../hooks/useActions';

interface TextEditorCellProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorCellProps> = ({ cell }) => {
  const [editingMode, setEditingMode] = useState(false);
  const editorMarkdownRef = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorMarkdownRef.current &&
        event.target &&
        editorMarkdownRef.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditingMode(false);
    };
    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editingMode) {
    return (
      <div className='text-editor' ref={editorMarkdownRef}>
        <MDEditor
          value={cell.content}
          onChange={v => updateCell(cell.id, v || '')}
        />
      </div>
    );
  }
  const enterEditingMode = () => {
    setEditingMode(true);
  };
  return (
    <div className='text-editor card' onClick={enterEditingMode}>
      <div className='card-content'>
        <MDEditor.Markdown
          source={cell.content || 'Click to start editing note'}
        />
      </div>
    </div>
  );
};

export default TextEditor;
