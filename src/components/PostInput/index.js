import React from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
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
  PublishButton,
  PostSaveAlert
} from './styled';
import postAPI from '../../api/post';

const Meta = () => <DateString>{new Date().toDateString()}</DateString>;

// TODO: font size, letter spacing, line height
// TODO: keybindings
class PostInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(comboDecorator),
      selectedTags: [],
      coverImage: null,
      title: '',
      editing: false,
      fetchingEditPost: false,
      isDraft: false
    };
  }
  componentWillMount() {
    const { slug } = this.props.match.params;
    slug &&
      this.setState(
        {
          fetchingEditPost: true,
          editing: true
        },
        () => {
          postAPI.fetchOne(slug).then(result => {
            if (!result) return;
            const { content, meta } = result;
            this.setState({
              editorState: EditorState.createWithContent(
                convertFromRaw(content),
                comboDecorator
              ),
              title: meta.title,
              selectedTags: meta.tags || [],
              isDraft: meta.isDraft
            });
          });
        }
      );
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
    this.state.editing ? this.submitPostEdit() : this.submitPost();
  };
  publish = e => {
    e.preventDefault();
    this.state.editing ? this.submitPostEdit(false) : this.submitPost(false);
  };
  getRawPostInput = isDraft => {
    const content = convertToRaw(this.state.editorState.getCurrentContent());
    const { title, selectedTags } = this.state;
    const tagname = selectedTags.map(({ name }) => name);
    return {
      post: { content },
      meta: { title, tagname, isDraft }
    };
  };
  submitPost = (isDraft = true) => {
    const rawPost = this.getRawPostInput(isDraft);
    // TODO: update cover image on s3
    postAPI.create(rawPost).then(data => {
      console.log(data);
    });
  };
  submitPostEdit = (isDraft = true) => {
    const rawPost = this.getRawPostInput(isDraft);
    const { slug } = this.props.match.params;
    // TODO: store cover image on s3
    postAPI.update({ slug, post: rawPost }).then(data => {
      console.log(data);
    });
  };
  render() {
    const { fetchingEditPost, title, editorState, selectedTags } = this.state;
    return (
      <Container>
        <CoverImage setDataURL={this.setCoverImage} />
        <TitleInput
          placeholder="Add a descriptive Title"
          value={title}
          onChange={this.updateTitle}
        />
        <Meta />
        <EditorContainer>
          <Editor editorState={editorState} onChange={this.onEditorChange} />
        </EditorContainer>
        <TagInput
          selectedTags={selectedTags}
          addTag={this.addTag}
          removeTag={this.removeTag}
        />
        {this.state.editing &&
          !this.state.isDraft && (
            <PostSaveAlert>
              <b>Note:</b> Saving a published post as a draft will unpublish the
              post.
            </PostSaveAlert>
          )}
        <Actions>
          <DraftButton onClick={this.draft} disable={fetchingEditPost}>
            Save as draft
          </DraftButton>
          <PublishButton onClick={this.publish} disable={fetchingEditPost}>
            Publish
          </PublishButton>
        </Actions>
      </Container>
    );
  }
}

export default PostInput;
