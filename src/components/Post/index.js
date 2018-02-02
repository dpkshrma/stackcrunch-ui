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
import CommentThread from './CommentThread';
import { fetchPost } from '../../actions/post';
// global helpers
import { hooks } from '../../helpers/routes';
import { fromNow } from '../../utils/time';
// component helpers
import { markdownToDraftOptions, blockRenderMap } from './helpers';
import markdownToDraft from './helpers/markdownToDraft';
import comboDecorator from './decorators';
// sample data
import { URL_PREFIX } from '../../config';

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
    const { slug } = this.props.match.params;
    this.props
      .fetchPost(slug)
      .then(() => {
        if (this.props.post && this.props.post.meta) {
          const { text, meta = {} } = this.props.post;
          const contentState = markdownToDraft(text, markdownToDraftOptions);
          const editorState = EditorState.createWithContent(
            convertFromRaw(contentState),
            comboDecorator
          );
          this.setState({ editorState, metadata: meta, loaded: true });
          // onEnter route hook
          hooks.post.onEnter(this.props.dispatch, meta.refs);
        } else {
          console.error('Post not found in store');
          this.props.history.push(`${URL_PREFIX}/404`);
        }
      })
      .catch(err => {
        console.error(err);
        this.props.history.push(`${URL_PREFIX}/404`);
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
                {fromNow(createdOn)} <Separator space={8} delimiter="|" /> {ttr}
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
