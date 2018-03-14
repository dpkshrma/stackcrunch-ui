import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/post';
import ListItem from '../ListItem';
import hooks from './hooks';
import { InfiniteList, hooked, Loader as LoaderIcon } from '../common';
import Sidebar from '../Sidebar';
import {
  Container,
  Wrapper,
  List,
  EndOfListMsg,
  LoadMoreButton,
  LoaderButton
} from './styled';

const { EndOfList, LoadMore, Loader } = InfiniteList;

const PostList = props => {
  const { posts, fetchPosts, match } = props;
  const { username } = match.params;

  return (
    <Container>
      <Wrapper>
        <InfiniteList loadMore={fetchPosts} opts={{ username }}>
          <List>
            {posts.map(post => <ListItem {...post} key={post.slug} />)}
          </List>
          <EndOfList>
            <EndOfListMsg>No more posts to show</EndOfListMsg>
          </EndOfList>
          <LoadMore>
            <LoadMoreButton>Load More Posts</LoadMoreButton>
          </LoadMore>
          <Loader>
            <LoaderButton>
              <LoaderIcon />
            </LoaderButton>
          </Loader>
        </InfiniteList>
        <Sidebar />
      </Wrapper>
    </Container>
  );
};

const mapStateToProps = ({ posts }) => ({ posts });
const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchPosts: fetchPosts(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  hooked(PostList, hooks)
);
