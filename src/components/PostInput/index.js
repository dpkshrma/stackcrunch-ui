import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import CoverImage from './CoverImage';
import Editor from './Editor';
import comboDecorator from '../Post/decorators';
import TagInput from './TagInput';
import {
  Container,
  TitleInput,
  DateString,
  EditorContainer,
  Actions,
  DraftButton,
  PublishButton
} from './styled';
import postAPI from '../../api/post';

const Meta = () => <DateString>{new Date().toDateString()}</DateString>;

class PostInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(comboDecorator),
      selectedTags: [],
      coverImage: null,
      title: ''
    };
  }
  onEditorChange = (editorState, afterChange) => {
    if (afterChange) {
      this.setState({ editorState }, afterChange);
    } else {
      this.setState({ editorState });
    }
  };
  updateTitle = e => {
    e.preventDefault();
    this.setState({ title: e.target.value });
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
  setCoverImage = coverImage => {
    this.setState({ coverImage });
  };
  draft = e => {
    e.preventDefault();
    this.submitPost();
  };
  publish = e => {
    e.preventDefault();
    this.submitPost(false);
  };
  submitPost = (isDraft = true) => {
    const content = convertToRaw(this.state.editorState.getCurrentContent());
    const { title, tagname } = this.state;
    // TODO: store cover image on s3
    postAPI
      .create({
        post: { content },
        meta: { title, tagname, isDraft }
      })
      .then(data => {
        console.log(data);
      });
  };
  render() {
    return (
      <Container>
        <CoverImage setDataURL={this.setCoverImage} />
        <TitleInput
          placeholder="Descriptive Title"
          value={this.state.title}
          onChange={this.updateTitle}
        />
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
          <DraftButton onClick={this.draft}>Save as draft</DraftButton>
          <PublishButton onClick={this.publish}>Publish</PublishButton>
        </Actions>
      </Container>
    );
  }
}

export default PostInput;
