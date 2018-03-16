import React from 'react';
import { connect } from 'react-redux';
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

const renderPost = post => (
  <ListItem
    {...post}
    headerComponent={
      <ListItem.Header.Container>
        <ListItem.Header.CreatedOn timeStamp={post.createdOn} />
        <ListItem.Separator delimiter="|" space={8} />
        <ListItem.Header.TimeToRead ttr={post.ttr.text} />
        <EditButton to={`write/${post.slug}`} />
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
  let loadMore = props.fetchDrafts;
  let posts = props.contributions.drafts;
  if (!props.drafts) {
    loadMore = props.fetchUserPublishedPosts
    posts = props.contributions.published;
  }

  return (
    <Container>
      <List>
        <InfiniteList
          loadMore={loadMore}
        >
          {posts.map(renderPost)}
          {renderPaginationElements()}
        </InfiniteList>
      </List>
    </Container>
  );
};

Contributions.defaultProps = {
  drafts: true,
};

const mapStateToProps = ({ user, contributions }) => ({ user, contributions });
const mapDispatchToProps = { fetchDrafts, fetchUserPublishedPosts };

export default connect(mapStateToProps, mapDispatchToProps)(Contributions);
