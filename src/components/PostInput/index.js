import React from 'react';
import styled from 'styled-components';
import { EditorState, convertToRaw } from 'draft-js';
import CoverImage from './CoverImage';
import Editor from './Editor';
import comboDecorator from '../Post/decorators';

const Container = styled.div`
  width: 100%;
`;
const TitleInput = styled.input`
  font-size: 40px;
  color: #555;
  margin-top: 20px;
  padding: 0;
  outline: none;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  font-family: roboto;
  font-weight: 300;
  &::placeholder {
    font-weight: 100;
    color: #777;
  }
  &:focus {
    border-bottom: 2px solid #ffa000;
  }
`;
const DateString = styled.div`
  font-family: roboto;
  font-weight: 300;
  font-size: 12px;
  padding: 8px 0;
  letter-spacing: 2px;
`;
const EditorContainer = styled.div`
  margin-top: 16px;
  font-family: roboto;
`;

const Meta = () => <DateString>{new Date().toDateString()}</DateString>;

class PostInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(comboDecorator)
    };
  }
  onEditorChange = (editorState, afterChange) => {
    if (afterChange) {
      this.setState({ editorState }, afterChange);
    } else {
      this.setState({ editorState });
    }
  };
  render() {
    return (
      <Container>
        <CoverImage />
        <TitleInput placeholder="Descriptive Title" />
        <Meta />
        <EditorContainer>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onEditorChange}
          />
        </EditorContainer>
      </Container>
    );
  }
}

export default PostInput;
