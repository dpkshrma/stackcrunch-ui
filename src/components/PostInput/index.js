import React from 'react';
import styled from 'styled-components';
import { EditorState } from 'draft-js';
import CoverImage from './CoverImage';
import Editor from './Editor';
import comboDecorator from '../Post/decorators';
import TagInput from './TagInput';

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
  min-height: 200px;
`;
const Actions = styled.div`
  margin-top: 24px;
`;
const DraftButton = styled.button`
  text-decoration: none;
  font-size: 14px;
  outline: none;
  background: #fff;
  border: 1px solid #0095ff;
  border-radius: 2px;
  padding: 8px 16px;
  color: #07c;
  cursor: pointer;
  margin-right: 16px;
  &:hover {
    background: #eaf5fd;
  }
`;
const PublishButton = DraftButton.extend`
  background: #0095ff;
  color: #fff;
  &:hover {
    background: #0585e2;
  }
`;

const Meta = () => <DateString>{new Date().toDateString()}</DateString>;

class PostInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(comboDecorator),
      selectedTags: []
    };
  }
  onEditorChange = (editorState, afterChange) => {
    if (afterChange) {
      this.setState({ editorState }, afterChange);
    } else {
      this.setState({ editorState });
    }
  };
  addTag = tag => {
    this.setState({
      selectedTags: [...this.state.selectedTags, tag]
    });
  };
  removeTag = tagName => {
    this.setState({
      selectedTags: this.state.selectedTags.filter(tag => tag.name !== tagName)
    });
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
        <TagInput
          selectedTags={this.state.selectedTags}
          addTag={this.addTag}
          removeTag={this.removeTag}
        />
        <Actions>
          <DraftButton>Save as draft</DraftButton>
          <PublishButton>Publish</PublishButton>
        </Actions>
      </Container>
    );
  }
}

export default PostInput;
