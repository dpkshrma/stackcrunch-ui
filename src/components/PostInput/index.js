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
    coverImageUrl: null,
    title: '',
    editing: false,
    fetchingEditPost: false,
    isDraft: false,
    publishing: false,
    saving: false,
    draftUrl: null,
    publishUrl: null,
    uploadingCover: false,
    coverAlignment: 'inset'
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
            coverAlignment: meta.coverAlignment,
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
  setCoverImageUrl = coverImageUrl => {
    this.setState({ coverImageUrl });
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
    const { title, selectedTags, coverImageUrl, coverAlignment } = this.state;
    const tagname = selectedTags.map(({ name }) => name);
    const rawPost = {
      post: { content },
      meta: { title, tagname, isDraft, coverImageUrl, coverAlignment }
    };
    return rawPost;
  };
  submitPost = (isDraft = true) => {
    return postAPI.create(this.getRawPostInput(isDraft));
  };
  submitPostEdit = (isDraft = true) => {
    const { slug } = this.props.match.params;
    return postAPI.update({ slug, post: this.getRawPostInput(isDraft) });
  };
  setUploadingCover = uploadingCover => this.setState({ uploadingCover });
  setCoverAlignment = coverAlignment => this.setState({ coverAlignment });
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
      publishUrl,
      uploadingCover,
      coverAlignment
    } = this.state;
    return (
      <Container>
        <CoverImage
          src={coverImageUrl}
          uploadingCover={uploadingCover}
          coverAlignment={coverAlignment}
          setCoverImageUrl={this.setCoverImageUrl}
          setUploadingCover={this.setUploadingCover}
          setCoverAlignment={this.setCoverAlignment}
        />
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
            !uploadingCover &&
            (this.state.editing && !this.state.isDraft) && (
              <PostSaveAlert>
                <b>Note:</b> Saving a published post as a draft will unpublish
                the post.
              </PostSaveAlert>
            )}
          {uploadingCover && (
            <PostSaveInfo>Uploading Cover Image...</PostSaveInfo>
          )}
          <Actions>
            <DraftButton
              onClick={this.draft}
              disabled={fetchingEditPost || uploadingCover}
            >
              {saving ? (
                <FlexSection>
                  Saving&hellip;&nbsp;
                  <LoadingIcon height={18} stroke="#07c" />
                </FlexSection>
              ) : (
                `Save as draft`
              )}
            </DraftButton>
            <PublishButton
              onClick={this.publish}
              disabled={fetchingEditPost || uploadingCover}
            >
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
              Story saved. You can check it out at{' '}
              <PostLink to={draftUrl.url}>{draftUrl.display}</PostLink>
            </PostSaveInfo>
          )}
          {publishUrl && (
            <PostSaveInfo>
              Your story is now published at{' '}
              <PostLink to={publishUrl.url}>{publishUrl.display}</PostLink>
            </PostSaveInfo>
          )}
        </PostInputWrapper>
      </Container>
    );
  }
}

export default promisifySetState(PostInput);
