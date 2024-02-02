import React, { useState, useEffect } from 'react';
import {
  Editor,
  EditorState,
  CompositeDecorator,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr, start;

  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index + matchArr[0].length;
    callback(start, text.length);
  }
};

const RedTextDecorator = {
  strategy: (contentBlock, callback) => {
    findWithRegex(/^\*\*\ /g, contentBlock, callback);
  },
  component: ({ children }) => <span style={{ color: 'red' }}>{children}</span>,
};

const UnderlineTextDecorator = {
  strategy: (contentBlock, callback) => {
    findWithRegex(/^\*\*\*\ /gm, contentBlock, callback);
  },
  component: ({ children }) => (
    <span style={{ textDecoration: 'underline', color: 'black' }}>
      {children}
    </span>
  ),
};

const HashTextDecorator = {
  strategy: (contentBlock, callback) => {
    findWithRegex(/^\#\ /gm, contentBlock, callback);
  },
  component: ({ children }) => (
    <span className='headerOne'>{children}
    </span>
  ),
};

const BoldTextDecorator = {
  strategy: (contentBlock, callback) => {
    findWithRegex(/^\*\ /gm, contentBlock, callback);
  },
  component: ({ children }) => (
    <span style={{ color: 'black' }}>
      <b>{children}</b>
    </span>
  ),
};

const TextEditor = () => {
  const decorator = new CompositeDecorator([
    RedTextDecorator,
    UnderlineTextDecorator,
    HashTextDecorator,
    BoldTextDecorator,
  ]);

  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      return EditorState.createWithContent(contentState, decorator);
    }
    return EditorState.createEmpty(decorator);
  });

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem('editorContent', JSON.stringify(rawContentState));
  }, []);  

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSaveClick = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem('editorContent', JSON.stringify(rawContentState));
  };

  return (
    <div className="editor">
      <div className='editor-container'>
        <Editor editorState={editorState} onChange={onChange} />
      </div>
      <br />
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default TextEditor;
