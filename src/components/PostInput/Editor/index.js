import React from 'react';
import { Editor, RichUtils } from 'draft-js';
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';
import Toolbar from './Toolbar';

const Container = styled.div``;

class PostEditor extends React.Component {
  focus = () => this.editor.focus();
  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.props.onChange(newState);
      return true;
    }
    return false;
  };
  render() {
    const { editorState, onChange } = this.props;
    return (
      <Container>
        <Toolbar
          editorRef={this.editor}
          editorState={editorState}
          updateEditorState={onChange}
        />
        <div onClick={this.focus}>
          <Editor
            ref={editor => {
              this.editor = editor;
            }}
            placeholder="Write your article here..."
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={onChange}
          />
        </div>
      </Container>
    );
  }
}

export default PostEditor;
