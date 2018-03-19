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
  DateString,
  EditorContainer,
  Actions,
  DraftButton,
  PublishButton,
  PostSaveAlert,
  PostSaveInfo,
  PostLink,
  FlexSection
} from './styled';
import LoadingIcon from '../icons/Loading';

const Meta = () => <DateString>{new Date().toDateString()}</DateString>;

const getPostUrl = slug => ({
  url: `/post/${slug}`,
  display: `${document.location.origin}/post/${slug}`
});

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
    isDraft: false,
    publishing: false,
    saving: false,
    draftUrl: null,
    publishUrl: null
  };
  componentDidMount() {
    // this.title.focus();
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
            coverImageUrl: meta.coverImageUrl,
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
    const submitFn = this.state.editing ? this.submitPostEdit : this.submitPost;
    this.setState({ saving: true })
      .then(submitFn)
      .then(({ meta: { slug } }) => getPostUrl(slug))
      .then(url =>
        this.setState({ saving: false, draftUrl: url, publishUrl: null })
      )
      .catch(console.error);
  };
  publish = e => {
    e.preventDefault();
    const submitFn = this.state.editing ? this.submitPostEdit : this.submitPost;
    this.setState({ publishing: true })
      .then(() => submitFn(false))
      .then(({ meta: { slug } }) => getPostUrl(slug))
      .then(url =>
        this.setState({ publishing: false, publishUrl: url, draftUrl: null })
      )
      .catch(console.error);
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
    return this.uploadCoverAndGetRawPostInput(isDraft).then(postAPI.create);
  };
  submitPostEdit = (isDraft = true) => {
    const { slug } = this.props.match.params;
    return this.uploadCoverAndGetRawPostInput(isDraft)
      .then(rawPost => ({ slug, post: rawPost }))
      .then(postAPI.update);
  };
  render() {
    const {
      fetchingEditPost,
      title,
      editorState,
      coverImageUrl,
      selectedTags,
      publishing,
      saving,
      draftUrl,
      publishUrl
    } = this.state;
    return (
      <Container>
        <CoverImage setDataUri={this.setCoverDataUri} url={coverImageUrl} />
        <PostInputWrapper>
          <TitleInput
            innerRef={el => {
              this.title = el;
            }}
            html={title}
            onChange={this.updateTitle}
            contentEditable="true"
            suppressContentEditableWarning
            data-placeholder="Add a descriptive title"
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
          {!publishUrl &&
            !draftUrl &&
            (this.state.editing && !this.state.isDraft) && (
              <PostSaveAlert>
                <b>Note:</b> Saving a published post as a draft will unpublish
                the post.
              </PostSaveAlert>
            )}
          <Actions>
            <DraftButton onClick={this.draft} disabled={fetchingEditPost}>
              {saving ? (
                <FlexSection>
                  Saving&hellip;&nbsp;
                  <LoadingIcon height={18} stroke="#07c" />
                </FlexSection>
              ) : (
                `Save as draft`
              )}
            </DraftButton>
            <PublishButton onClick={this.publish} disabled={fetchingEditPost}>
              {publishing ? (
                <FlexSection>
                  Publishing&hellip;&nbsp;
                  <LoadingIcon height={18} stroke="#fff" />
                </FlexSection>
              ) : (
                `Publish`
              )}
            </PublishButton>
            {/* <DraftButton
              onClick={() => {
                const content = this.state.editorState.getCurrentContent();
                const rawContentState = convertToRaw(content);
                console.log(JSON.stringify(rawContentState, null, 2));
              }}
            >
              Log
            </DraftButton> */}
          </Actions>
          {draftUrl && (
            <PostSaveInfo>
              Post saved at{' '}
              <PostLink to={draftUrl.url}>{draftUrl.display}</PostLink>
            </PostSaveInfo>
          )}
          {publishUrl && (
            <PostSaveInfo>
              Post published at{' '}
              <PostLink to={publishUrl.url}>{publishUrl.display}</PostLink>
            </PostSaveInfo>
          )}
        </PostInputWrapper>
      </Container>
    );
  }
}

export default promisifySetState(PostInput);
