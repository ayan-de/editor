'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

export default function MonacoEditor(): React.JSX.Element {

  return (
    <div className="h-full w-full">
         <Editor
          height="100%"
          width="100%"
          defaultLanguage="javascript"
        //   value={value}
        //   onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 20,
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            renderLineHighlight: 'gutter',
            contextmenu: true,
            mouseWheelZoom: true,
            selectOnLineNumbers: true,
            lineNumbers: 'on',
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 3,
            renderValidationDecorations: 'on',
          }}
        />
    </div>
  );
}
