import React from 'react';
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
import Editor, { createEditorState } from '../Editor';
import CommentThread from './CommentThread';
import { fetchPost } from '../../actions/post';
// global helpers
import { hooks } from '../../helpers/routes';
import { fromNow } from '../../utils/time';
// component helpers
import { markdownToDraftOptions, blockRenderMap } from './helpers';
import markdownToDraft from './helpers/markdownToDraft';
// sample data
import { URL_PREFIX } from '../../config';

class PostPage extends React.Component {
  state = {
    editorState: createEditorState(),
    metadata: {},
    loaded: false
  };
  componentWillMount() {
    const { slug } = this.props.match.params;
    this.props
      .fetchPost(slug)
      .then(() => {
        if (this.props.post && this.props.post.meta) {
          const { text, content, meta = {} } = this.props.post;
          let contentState;
          if (content) {
            contentState = content;
            if (Object.keys(content).indexOf('entityMap') === -1) {
              contentState = Object.assign({}, content, { entityMap: true });
            }
          } else {
            contentState = markdownToDraft(text, markdownToDraftOptions);
          }
          const editorState = createEditorState(contentState);
          this.setState({ editorState, metadata: meta, loaded: true });
          // onEnter route hook
          hooks.post.onEnter(this.props.dispatch, meta.refs);
        } else {
          console.error('Post not found in store');
          this.props.history.push(`${URL_PREFIX}/404`);
        }
      })
      .catch(err => {
        throw err;
      });
  }
  componentWillUnmount() {
    hooks.post.onLeave(this.props.dispatch);
  }
  onChange = editorState => {
    this.setState({ editorState });
  };
  render() {
    const { author = {}, createdOn = 0, ttr, title } = this.state.metadata;
    const { slug } = this.props.match.params;
    if (!this.state.loaded) {
      return <div>Loading the post...</div>;
    }
    return (
      <Wrapper className="post-wrapper">
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
                {fromNow(createdOn)} <Separator space={8} delimiter="|" />{' '}
                {ttr.text}
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
            <CommentThread
              shortname={'stackcrunch'}
              identifier={slug}
              title={title}
              category_id={'post'}
            />
          </Content>
        </Post>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ post }) => ({ post });
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchPost: fetchPost(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
