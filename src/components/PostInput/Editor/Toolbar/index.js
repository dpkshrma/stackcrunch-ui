import React from 'react';
import promisifySetState from 'promisify-setstate';
import styled from 'styled-components';
import InlineStyleControls from './InlineCtrls';
import BlockTypeControls from './BlockCtrls';
import SpecialControls from './SpecialCtrls';

const Container = styled.div`
  border: 1px solid #e0e0e0;
  margin-bottom: 24px;
  padding: 8px;
  display: flex;
  align-items: center;
  position: relative;
`;
const Separator = styled.div`
  border-right: 1px solid #e0e0e0;
  height: 24px;
  margin: 0 8px;
`;

const Toolbar = ({ editorState, updateEditorState, editorRef }) => {
  return (
    <Container>
      <InlineStyleControls
        editorState={editorState}
        updateEditorState={updateEditorState}
      />
      <Separator />
      <BlockTypeControls
        editorState={editorState}
        updateEditorState={updateEditorState}
      />
      <Separator />
      <SpecialControls
        editorState={editorState}
        updateEditorState={updateEditorState}
      />
    </Container>
  );
};

export default promisifySetState(Toolbar);
