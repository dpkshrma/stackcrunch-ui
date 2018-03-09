import React from 'react';
import { RichUtils } from 'draft-js';
import { Bullets, Numbering, Code, Blockquote } from '../../../icons/editor';

const BlockTypeControls = props => {
  const { getEditorState, setEditorState } = props;
  const editorState = getEditorState();
  const selection = editorState.getSelection();
  const currentBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const onClick = blockType => e => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };
  return [
    <Numbering
      key="numbering"
      onMouseDown={onClick('ordered-list-item')}
      active={currentBlockType === 'ordered-list-item'}
    />,
    <Bullets
      key="bullets"
      onMouseDown={onClick('unordered-list-item')}
      active={currentBlockType === 'unordered-list-item'}
    />,
    <Blockquote
      key="blockquote"
      onMouseDown={onClick('blockquote')}
      active={currentBlockType === 'blockquote'}
    />,
    <Code
      key="code"
      onMouseDown={onClick('code-block')}
      active={currentBlockType === 'code-block'}
    />
  ];
};

export default BlockTypeControls;
