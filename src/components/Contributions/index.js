import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchDrafts,
  fetchUserPublishedPosts,
  deletePost
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

const renderPost = (editable, onDelete) => post => (
  <ListItem
    {...post}
    headerComponent={
      <ListItem.Header.Container>
        <ListItem.Header.CreatedOn timeStamp={post.createdOn} />
        <ListItem.Separator delimiter="|" space={8} />
        <ListItem.Header.TimeToRead ttr={post.ttr.text} />
        {editable && <EditBtn to={`write/${post.slug}`} />}
        {editable && <DeleteBtn onClick={() => onDelete(post.slug)} />}
      </ListItem.Header.Container>
    }
    key={post.slug}
    showShareLinks={false}
  />
);
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
      <List>
        <InfiniteList loadMore={loadMore} opts={opts}>
          {posts.map(renderPost(editable, props.deletePost))}
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
const mapDispatchToProps = { fetchDrafts, fetchUserPublishedPosts, deletePost };

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Contributions)
);
