import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  fetchDrafts,
  fetchUserPublishedPosts,
  deletePost,
  likePostDispatchLater
} from '../../actions/post';
import ListItem from '../ListItem';
import { InfiniteList, Loader as LoaderIcon } from '../common';
import { Container, List, LoadMoreButton, LoaderButton } from './styled';
import { Button, DefaultTooltip } from '../common';

const NoPosts = ({ postType }) => {
  const Container = styled.div`
    padding: 36px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid #ddd;
    width: 100%;
    margin-top: 24px;
    font-size: 20px;
    color: #777;
  `;
  const EditorButton = Button.extend`
    margin-top: 24px;
  `;
  const EditorLink = styled(Link)`
    text-decoration: none;
    color: #07c;
  `;
  let title = 'Welcome! Create your first story!';
  const link = 'Share your experience!';
  if (postType === 'published') {
    title = 'No Posts published yet! :|';
  }
  return (
    <Container>
      {title}
      <EditorButton>
        <EditorLink to="/write">{link}</EditorLink>
      </EditorButton>
    </Container>
  );
};

const renderPost = (post, editable, onDelete, liked, onLike) => {
  return (
    <ListItem
      {...post}
      showEditBtn={true}
      showDeleteBtn={true}
      onDelete={onDelete}
      key={post.slug}
      showShareLinks={false}
      likePost={() => !liked && onLike(post.slug)}
      liked={liked}
    />
  );
};
const renderPaginationElements = () => {
  const { LoadMore, Loader } = InfiniteList;
  return [
    <LoadMore key="more">
      <LoadMoreButton>Load More Posts</LoadMoreButton>
    </LoadMore>,
    <Loader key="loader">
      <LoaderButton>
        <LoaderIcon />
      </LoaderButton>
    </Loader>
  ];
};
const Contributions = props => {
  // loadMore & posts by type of contributions
  let loadMore = props.fetchDrafts;
  let posts = props.contributions.drafts;
  let postType = 'drafts';
  if (!props.drafts) {
    postType = 'published';
    loadMore = props.fetchUserPublishedPosts;
    posts = props.contributions.published;
  }

  // show edit icons for logged in user posts
  let editable = false;
  const { loggedInUser } = props;
  const { username } = props.match.params;

  if (username === loggedInUser.username) {
    editable = true;
  }

  // display only user contributions
  const opts = { username };

  return (
    <Container>
      <List>
        <InfiniteList loadMore={loadMore} opts={opts}>
          {posts.map(post => {
            const { likedPosts = [] } = props.loggedInUser;
            const liked = likedPosts.indexOf(post.slug) !== -1;
            const { deletePost, likePost } = props;
            return renderPost(post, editable, deletePost, liked, likePost);
          })}
          {renderPaginationElements()}
        </InfiniteList>
      </List>
      {posts.length === 0 && <NoPosts postType={postType} />}
    </Container>
  );
};

Contributions.defaultProps = {
  drafts: true
};

const mapStateToProps = ({ contributions, user }) => ({
  contributions,
  loggedInUser: user
});
const mapDispatchToProps = {
  fetchDrafts,
  fetchUserPublishedPosts,
  deletePost,
  likePost: likePostDispatchLater
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Contributions)
);
