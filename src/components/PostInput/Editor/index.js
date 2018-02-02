import React from 'react';
import { Editor } from 'draft-js';
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
  render() {
    const { editorState, onChange } = this.props;
    return (
      <Container>
        <Toolbar show={this.state.showToolbar} />
        <Editor
          onFocus={this.onEditorFocus}
          placeholder="Write your article here..."
          editorState={editorState}
          onChange={onChange}
        />
      </Container>
    );
  }
}

export default PostEditor;
