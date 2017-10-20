import React from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { connect } from 'react-redux';
// stateless components
import { Chip } from '../common';
import {
  Wrapper,
  Header,
  HeaderMeta,
  HeaderMetaText,
  Separator,
  Post,
  Title,
  Content,
  authorCSS
} from './styled';
// services
import PostService from '../../services/Post';
// global helpers
import { hooks, getURLSegments } from '../../helpers/routes';
// component helpers
import { markdownToDraftOptions, blockRenderMap } from './helpers';
import markdownToDraft from './helpers/markdownToDraft';
import comboDecorator from './decorators';
// sample data
import { URL_PREFIX } from '../../config';
// css
import './decorators/custom/code/prism.css';

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      metadata: {},
      loaded: false
    };
  }
  componentWillMount() {
    const postId = this.getPostId();
    // Load post in the editor
    PostService.getPost(postId)
      .then(({ post, metadata }) => {
        const contentState = markdownToDraft(post, markdownToDraftOptions);
        const editorState = EditorState.createWithContent(
          convertFromRaw(contentState),
          comboDecorator
        );
        this.setState({ editorState, metadata, loaded: true });
      })
      .catch(err => {
        if (err.message.startsWith('Cannot find module')) {
          // redirect to NotFound page
          console.error(err);
          this.props.history.push(`${URL_PREFIX}/404`);
        }
        // TODO: handle other errors
      });
    // onEnter route hook
    hooks.post.onEnter(this.props.dispatch, postId);
  }
  componentWillUnmount() {
    hooks.post.onLeave(this.props.dispatch);
  }
  getPostId = () => {
    const { path } = this.props.match;
    const [, postId] = getURLSegments(path);
    return postId;
  };
  onChange = editorState => {
    this.setState({ editorState });
  };
  render() {
    const { author = {}, postedOn, ttr, title } = this.state.metadata;
    if (!this.state.loaded) {
      return <div>Loading the post...</div>;
    }
    return (
      <Wrapper>
        <Post>
          <Header>
            <HeaderMeta>
              <Chip
                img={author.img}
                text={author.name}
                href={author.link}
                css={authorCSS}
              />
              <HeaderMetaText>
                {postedOn} <Separator space={8} delimiter="|" /> {ttr}
              </HeaderMetaText>
            </HeaderMeta>
            <Title>{title}</Title>
          </Header>
          <Content>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              readOnly={true}
              blockRenderMap={blockRenderMap}
            />
          </Content>
        </Post>
      </Wrapper>
    );
  }
}

export default connect()(PostPage);
