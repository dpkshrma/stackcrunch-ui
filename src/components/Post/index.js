import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import ReactDisqusComments from 'react-disqus-comments';
// stateless components
import { Chip, DefaultTooltip } from '../common';
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
import ClockIcon from '../icons/Clock';
import { fetchPost, incViews, likePost } from '../../actions/post';
// global helpers
import { hooks } from '../../helpers/routes';
// component helpers
import { markdownToDraftOptions, blockRenderMap } from './helpers';
import markdownToDraft from './helpers/markdownToDraft';
// sample data
import { URL_PREFIX } from '../../config';
import HeartIcon from '../icons/Heart';
import LoadingPage from '../About/Loading';

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

const LikePost = ({ onLike, liked }) => {
  const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    padding: 36px 0;
  `;
  const Text = styled.div`
    font-size: 28px;
    color: #444;
  `;
  const scaleAnimation = keyframes`
    from {
      transform: scale(1.2);
    }
    to {
      transform: scale(1);
    }
  `;
  const LikeIcon = styled(HeartIcon)`
    margin-left: 14px;
    ${!liked &&
      css`
        animation: ${scaleAnimation} 0.8s infinite alternate;
      `} ${liked
        ? css`
            fill: #d7594a;
          `
        : css`
            fill: #d7594a99;
          `} cursor: pointer;
  `;
  return (
    <Container>
      <Text>
        Show your support! Hit the like button!{' '}
        <span role="img" aria-label="pointing right">
          👉
        </span>
      </Text>
      <LikeIcon onClick={onLike} height={28} data-tip={liked && 'Liked!'} />
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
  componentDidMount() {
    this.increaseViewsCount();
  }
  increaseViewsCount = () => {
    const { slug } = this.props.match.params;
    this.props.increaseViewsCount(slug);
  };
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
    const { likePost, liked } = this.props;
    const [author] = authors;
    if (!this.state.loaded) {
      return <LoadingPage />;
    }

    return (
      <Wrapper className="post-wrapper">
        <DefaultTooltip />
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
            <LikePost onLike={() => !liked && likePost(slug)} liked={liked} />
            <ReactDisqusComments
              shortname="stackcrunch"
              identifier={slug}
              title={title}
              category_id="post"
            />
          </Content>
        </Post>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ post, user }) => {
  const { likedPosts = [] } = user;
  const { meta = {} } = post;
  const previouslyLikedPost = likedPosts.indexOf(meta.slug) !== -1;
  const liked = previouslyLikedPost || meta.liked;
  return { post, liked };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchPost: fetchPost(dispatch),
    increaseViewsCount: incViews(dispatch),
    likePost: likePost(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
