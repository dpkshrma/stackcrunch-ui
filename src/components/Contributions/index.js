import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchDrafts,
  fetchUserPublishedPosts,
  deletePost,
  likePostDispatchLater
} from '../../actions/post';
import ListItem from '../ListItem';
import { InfiniteList, Loader as LoaderIcon } from '../common';
import {
  Container,
  List,
  LoadMoreButton,
  LoaderButton,
  EditBtn,
  DeleteBtn
} from './styled';
import { DefaultTooltip } from '../common';

const renderPost = (post, editable, onDelete, liked, onLike) => {
  return (
    <ListItem
      {...post}
      headerComponent={
        <ListItem.Header.Container>
          <ListItem.Header.CreatedOn timeStamp={post.createdOn} />
          <ListItem.Separator delimiter="|" space={8} />
          <ListItem.Header.TimeToRead ttr={post.ttr.text} />
          {editable && (
            <EditBtn data-tip="Edit Post" to={`write/${post.slug}`} />
          )}
          {editable && (
            <DeleteBtn
              data-tip="Delete Post"
              onClick={() => onDelete(post.slug)}
            />
          )}
        </ListItem.Header.Container>
      }
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
  if (!props.drafts) {
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
      <DefaultTooltip />
      <List>
        <InfiniteList loadMore={loadMore} opts={opts}>
          {posts.map(post => {
            const liked =
              props.loggedInUser.likedPosts.indexOf(post.slug) !== -1;
            const { deletePost, likePost } = props;
            return renderPost(post, editable, deletePost, liked, likePost);
          })}
          {renderPaginationElements()}
        </InfiniteList>
      </List>
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
