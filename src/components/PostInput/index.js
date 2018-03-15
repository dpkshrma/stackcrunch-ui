import React from 'react';
import { convertToRaw } from 'draft-js';
import promisifySetState from 'promisify-setstate';
import postAPI from '../../api/post';
import CoverImage from './CoverImage';
import Editor, { createEditorState } from '../Editor';
import TagInput from './TagInput';
import {
  Container,
  PostInputWrapper,
  TitleInput,
  TitleInputPlaceholder,
  DateString,
  EditorContainer,
  Actions,
  DraftButton,
  PublishButton,
  PostSaveAlert
} from './styled';

const Meta = () => <DateString>{new Date().toDateString()}</DateString>;

// TODO: font size, letter spacing, line height
// TODO: keybindings
class PostInput extends React.Component {
  state = {
    editorState: createEditorState(),
    selectedTags: [],
    coverDataUri: null,
    title: '',
    editing: false,
    fetchingEditPost: false,
    isDraft: false
  };
  componentDidMount() {
    this.title.focus();
  }
  componentWillMount() {
    const { slug } = this.props.match.params;
    slug &&
      this.setState({ fetchingEditPost: true, editing: true })
        .then(() => postAPI.fetchOne(slug))
        .then(result => {
          if (!result) return;
          const { content, meta } = result;
          let rawContentState = content;
          if (Object.keys(content).indexOf('entityMap') === -1) {
            rawContentState = Object.assign({}, content, { entityMap: true });
          }
          this.setState({
            editorState: createEditorState(rawContentState),
            title: meta.title,
            selectedTags: meta.tags || [],
            isDraft: meta.isDraft,
            fetchingEditPost: false
          });
        })
        .catch(err => {
          throw err;
        });
  }
  onEditorChange = (editorState, afterChange) => {
    if (afterChange) {
      return this.setState({ editorState }, afterChange);
    } else {
      return this.setState({ editorState });
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
  setCoverDataUri = coverDataUri => {
    this.setState({ coverDataUri });
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
  uploadCover = () => {
    const { coverDataUri } = this.state;
    if (coverDataUri) return postAPI.uploadCoverImage(coverDataUri);
    return Promise.resolve();
  };
  uploadCoverAndGetRawPostInput = isDraft => {
    return this.uploadCover().then(coverResponse => {
      const rawPost = this.getRawPostInput(isDraft);
      if (coverResponse && coverResponse.location) {
        rawPost.meta.coverImageUrl = coverResponse.location;
      }
      return rawPost;
    });
  };
  submitPost = (isDraft = true) => {
    this.uploadCoverAndGetRawPostInput(isDraft)
      .then(postAPI.create)
      .then(data => {
        // TODO: show a snackbar
        console.log('submitPost final response: ', data);
      });
  };
  submitPostEdit = (isDraft = true) => {
    const { slug } = this.props.match.params;
    this.uploadCoverAndGetRawPostInput(isDraft)
      .then(rawPost => ({ slug, post: rawPost }))
      .then(postAPI.update)
      .then(data => {
        // TODO: show a snackbar
        console.log('submitPostEdit final response: ', data);
      });
  };
  render() {
    const { fetchingEditPost, title, editorState, selectedTags } = this.state;
    return (
      <Container>
        <CoverImage setDataUri={this.setCoverDataUri} />
        <PostInputWrapper>
          <TitleInput
            innerRef={el => {
              this.title = el;
            }}
            onChange={this.updateTitle}
            contentEditable="true"
            suppressContentEditableWarning
            data-placeholder="Add a descriptive title"
          >
            {title}
          </TitleInput>
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
                <b>Note:</b> Saving a published post as a draft will unpublish
                the post.
              </PostSaveAlert>
            )}
          <Actions>
            <DraftButton onClick={this.draft} disabled={fetchingEditPost}>
              Save as draft
            </DraftButton>
            <PublishButton onClick={this.publish} disabled={fetchingEditPost}>
              Publish
            </PublishButton>
            <DraftButton
              onClick={() => {
                const content = this.state.editorState.getCurrentContent();
                const rawContentState = convertToRaw(content);
                console.log(JSON.stringify(rawContentState, null, 2));
              }}
            >
              Log
            </DraftButton>
          </Actions>
        </PostInputWrapper>
      </Container>
    );
  }
}

export default promisifySetState(PostInput);
