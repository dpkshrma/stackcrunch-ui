import React from 'react';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';

class PostEditor extends React.Component {
  render() {
    const { editorState, onChange } = this.props;
    return (
      <Editor
        placeholder="Write your article here..."
        editorState={editorState}
        onChange={onChange}
      />
    );
  }
}

export default PostEditor;
