import React from 'react';
import { RichUtils } from 'draft-js';
import { Bold, Italic, Underline } from '../../../icons/editor';

const InlineStyleControls = props => {
  const { editorState, updateEditorState } = props;

  const onClick = inlineStyle => e => {
    e.preventDefault();
    updateEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const currentStyle = editorState.getCurrentInlineStyle();

  return [
    <Bold
      key="bold"
      onMouseDown={onClick('BOLD')}
      active={currentStyle.has('BOLD')}
    />,
    <Italic
      key="italic"
      onMouseDown={onClick('ITALIC')}
      active={currentStyle.has('ITALIC')}
    />,
    <Underline
      key="underline"
      onMouseDown={onClick('UNDERLINE')}
      active={currentStyle.has('UNDERLINE')}
    />
  ];
};

export default InlineStyleControls;
