import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchDrafts, fetchUserPublishedPosts } from '../../actions/post';
import ListItem from '../ListItem';
import { InfiniteList, Loader as LoaderIcon } from '../common';
import {
  Container,
  List,
  LoadMoreButton,
  LoaderButton,
  EditButton
} from './styled';

const renderPost = editable => post => (
  <ListItem
    {...post}
    headerComponent={
      <ListItem.Header.Container>
        <ListItem.Header.CreatedOn timeStamp={post.createdOn} />
        <ListItem.Separator delimiter="|" space={8} />
        <ListItem.Header.TimeToRead ttr={post.ttr.text} />
        {editable && <EditButton to={`write/${post.slug}`} />}
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
          {posts.map(renderPost(editable))}
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
const mapDispatchToProps = { fetchDrafts, fetchUserPublishedPosts };

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Contributions)
);
