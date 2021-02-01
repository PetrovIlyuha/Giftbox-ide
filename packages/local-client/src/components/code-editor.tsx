import { useRef } from 'react';
import './code-editor.css';
import './syntax-highlight.css';
import monaco from 'monaco-editor';
import Editor, { Monaco } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) {
    editorRef.current = editor;
    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      editor,
    );
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {},
    );
  }

  const handleEditorChange = () => {
    onChange(editorRef.current.getValue());
  };
  const formatCode = () => {
    const codeBeforeFormat = editorRef.current.getValue();
    const formattedCode = prettier
      .format(codeBeforeFormat, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    editorRef.current.setValue(formattedCode);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-info is-small'
        onClick={formatCode}>
        Prettier Format
      </button>
      <Editor
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        value={initialValue}
        height='100%'
        width='100%'
        theme='vs-dark'
        language='javascript'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          tabSize: 2,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
