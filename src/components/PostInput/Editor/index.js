import React from 'react';
import { Editor, RichUtils } from 'draft-js';
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';
import Toolbar from './Toolbar';

const Container = styled.div``;

class PostEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showToolbar: false
    };
  }
  onEditorFocus = () => {
    this.setState({ showToolbar: true });
  };
  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.props.onChange(newState);
      return true;
    }
    return false;
  };
  toggleBlockType = blockType => {
    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, blockType)
    );
  };
  toggleInlineStyle = inlineStyle => {
    this.props.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    );
  };
  render() {
    const { editorState, onChange } = this.props;
    return (
      <Container>
        <Toolbar
          show={this.state.showToolbar}
          toggleBlockType={this.toggleBlockType}
          toggleInlineStyle={this.toggleInlineStyle}
          editorRef={this.editor}
        />
        <div onClick={this.focus}>
          <Editor
            ref={editor => {
              this.editor = editor;
            }}
            onFocus={this.onEditorFocus}
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
