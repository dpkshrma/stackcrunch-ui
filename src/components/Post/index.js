import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// stateless components
import { Chip } from '../common';
import {
  Wrapper,
  Header,
  HeaderMeta,
  HeaderMetaItem,
  HeaderMetaText,
  Post,
  Title,
  Content,
  DateString,
  authorCSS
} from './styled';
import Editor, { createEditorState } from '../Editor';
import CommentThread from './CommentThread';
import ClockIcon from '../icons/Clock';
import { fetchPost } from '../../actions/post';
// global helpers
import { hooks } from '../../helpers/routes';
// component helpers
import { markdownToDraftOptions, blockRenderMap } from './helpers';
import markdownToDraft from './helpers/markdownToDraft';
// sample data
import { URL_PREFIX } from '../../config';

const Meta = () => <DateString>{new Date().toDateString()}</DateString>;

const CoverImg = props => {
  const { alignment } = props;
  let imgWidth;
  if (alignment === 'inset') imgWidth = '740px';
  else if (alignment === 'outset') imgWidth = '945px';
  else imgWidth = '100vw';

  const Img = styled.img`
    width: ${imgWidth};
  `;
  const Container = styled.div``;
  return (
    <Container>
      <Img {...props} />
    </Container>
  );
};

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
    const {
      authors = [],
      ttr,
      title,
      coverImageUrl,
      coverAlignment,
      showAuthorChip
    } = this.state.metadata;
    const { slug } = this.props.match.params;
    const [author] = authors;
    if (!this.state.loaded) {
      return <div>Loading the post...</div>;
    }
    return (
      <Wrapper className="post-wrapper">
        {coverImageUrl && (
          <CoverImg src={coverImageUrl} alignment={coverAlignment} />
        )}
        <Post>
          <Header>
            <HeaderMeta>
              {showAuthorChip && (
                <HeaderMetaItem>
                  <Chip
                    img={author.avatarURL}
                    text={author.name || author.username}
                    to={author.link}
                    css={authorCSS}
                    useDefaultImg
                  />
                </HeaderMetaItem>
              )}
              <HeaderMetaItem>
                <HeaderMetaText>
                  <ClockIcon height={12} /> &nbsp; {ttr.text} read
                </HeaderMetaText>
              </HeaderMetaItem>
            </HeaderMeta>
            <Title>{title}</Title>
            <Meta />
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
