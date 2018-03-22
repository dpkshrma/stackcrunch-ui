import React from 'react';
import { withRouter } from 'react-router-dom';
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
  AbstractBtn,
  AbstractInput
} from './styled';
import { FlexSection } from '../common';
import LoadingIcon from '../icons/Loading';
import PenIcon from '../icons/Pen';

const MAX_ABSTRACT_LENGTH = 200;

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
    coverAlignment: 'inset',
    showAbstractInput: false,
    abstract: '',
    userAbstractEdit: false,
    titleInputEmpty: false,
    tagsInputEmpty: false
  };
  componentDidMount() {
    // this.title.focus();
  }
  componentWillMount() {
    const { slug } = this.props.match.params;
    if (slug) this.loadPost(slug);
  }
  componentWillReceiveProps(nextProps) {
    const { slug: currentSlug } = this.props.match.params;
    const { slug: nextSlug } = nextProps.match.params;
    if (currentSlug !== nextSlug && nextSlug && nextSlug.length > 0) {
      this.setState({ editing: true });
    }
  }
  loadPost = slug => {
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
          fetchingEditPost: false,
          abstract: meta.abstract || '',
          userAbstractEdit: true
        });
      })
      .catch(err => {
        throw err;
      });
  };
  onEditorChange = (editorState, afterChange) => {
    const newState = { editorState };
    const { abstract, userAbstractEdit } = this.state;
    if (!userAbstractEdit) {
      const content = editorState.getCurrentContent();
      const postText = content.getPlainText();
      if (
        abstract.length < MAX_ABSTRACT_LENGTH ||
        postText.length < MAX_ABSTRACT_LENGTH
      ) {
        newState.abstract = postText.slice(0, MAX_ABSTRACT_LENGTH);
      }
    }

    if (afterChange) {
      return this.setState(newState, afterChange);
    } else {
      return this.setState(newState);
    }
  };
  updateTitle = e => {
    e.preventDefault();
    this.setState({ title: e.target.value, titleInputEmpty: false });
  };
  updateAbstract = e => {
    e.preventDefault();
    this.setState({ abstract: e.target.value, userAbstractEdit: true });
  };
  addTag = tag => {
    this.setState({
      selectedTags: [...this.state.selectedTags, tag],
      tagsInputEmpty: false
    });
  };
  removeTag = tagName => {
    this.setState({
      selectedTags: this.state.selectedTags.filter(tag => tag.name !== tagName)
    });
  };
  toggleAbstractInput = e => {
    e && e.preventDefault();
    this.setState({ showAbstractInput: !this.state.showAbstractInput });
  };
  setCoverImageUrl = coverImageUrl => {
    this.setState({ coverImageUrl });
  };
  validate = () => {
    let hasError = false;
    const { title, selectedTags } = this.state;
    if (title.length === 0) {
      hasError = true;
      this.setState({ titleInputEmpty: true });
    } else if (selectedTags.length === 0) {
      hasError = true;
      this.setState({ tagsInputEmpty: true });
    }
    return hasError;
  };
  draft = e => {
    e.preventDefault();
    const hasError = this.validate();
    if (hasError) return;

    const submitFn = this.state.editing ? this.submitPostEdit : this.submitPost;
    this.setState({ saving: true })
      .then(submitFn)
      .then(({ meta: { slug } }) => {
        this.props.history.push(`/write/${slug}`);
        return getPostUrl(slug);
      })
      .then(url =>
        this.setState({
          publishing: false,
          saving: false,
          draftUrl: url,
          publishUrl: null
        })
      )
      .catch(console.error);
  };
  publish = e => {
    e.preventDefault();
    const hasError = this.validate();
    if (hasError) return;

    const submitFn = this.state.editing ? this.submitPostEdit : this.submitPost;
    this.setState({ publishing: true })
      .then(() => submitFn(false))
      .then(({ meta: { slug } }) => {
        this.props.history.push(`/write/${slug}`);
        return getPostUrl(slug);
      })
      .then(url =>
        this.setState({
          publishing: false,
          saving: false,
          draftUrl: null,
          publishUrl: url
        })
      )
      .catch(console.error);
  };
  getRawPostInput = isDraft => {
    const content = convertToRaw(this.state.editorState.getCurrentContent());
    const {
      title,
      selectedTags,
      coverImageUrl,
      coverAlignment,
      abstract
    } = this.state;
    const tagname = selectedTags.map(({ name }) => name);
    const rawPost = {
      post: { content },
      meta: { title, tagname, isDraft, coverImageUrl, coverAlignment, abstract }
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
      coverAlignment,
      showAbstractInput,
      tagsInputEmpty,
      titleInputEmpty
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
          <FlexSection>
            <DateString>{new Date().toDateString()}</DateString>
            <AbstractBtn onClick={this.toggleAbstractInput}>
              <PenIcon height={12} />&nbsp;Abstract
            </AbstractBtn>
          </FlexSection>
          {showAbstractInput && (
            <FlexSection>
              <AbstractInput
                fontSize={14}
                data-placeholder="Abstract"
                onChange={this.updateAbstract}
                html={this.state.abstract}
              />
            </FlexSection>
          )}
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
          {titleInputEmpty && (
            <PostSaveAlert>
              <b>Error:</b> Title is required before drafting/publishing a post
            </PostSaveAlert>
          )}
          {tagsInputEmpty && (
            <PostSaveAlert>
              <b>Error:</b> Atleast one tag is required before
              drafting/publishing a post
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
              // TODO: enable Publish button after full launch
              disabled={true}
              // disabled={fetchingEditPost || uploadingCover}
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
          <PostSaveAlert>
            <b>Early Access:</b> Publishing is disabled at the moment
          </PostSaveAlert>
        </PostInputWrapper>
      </Container>
    );
  }
}

export default withRouter(promisifySetState(PostInput));
