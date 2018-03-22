import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, likePost } from '../../actions/post';
import ListItem from '../ListItem';
import hooks from './hooks';
import {
  InfiniteList,
  hooked,
  Loader as LoaderIcon,
  FlexSection
} from '../common';
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
  const { user, posts, fetchPosts, match, likePost } = props;
  const { username } = match.params;

  return (
    <Container>
      <Wrapper>
        <FlexSection flex={5}>
          <InfiniteList loadMore={fetchPosts} opts={{ username }}>
            <List>
              {posts.map(post => {
                const liked = user.likedPosts.indexOf(post.slug) !== -1;
                return (
                  <ListItem
                    key={post.slug}
                    {...post}
                    likePost={() => !liked && likePost(post.slug)}
                    liked={liked}
                  />
                );
              })}
            </List>
            {/* TODO: show when a good number of posts are available */}
            {/* <EndOfList>
              <EndOfListMsg>No more posts to show</EndOfListMsg>
            </EndOfList> */}
            <LoadMore>
              <LoadMoreButton>Load More Posts</LoadMoreButton>
            </LoadMore>
            <Loader>
              <LoaderButton>
                <LoaderIcon />
              </LoaderButton>
            </Loader>
          </InfiniteList>
        </FlexSection>
        <FlexSection flex={2}>
          <Sidebar />
        </FlexSection>
      </Wrapper>
    </Container>
  );
};

const mapStateToProps = ({ posts, user }) => ({ posts, user });
const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchPosts: fetchPosts(dispatch),
  likePost: likePost(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  hooked(PostList, hooks)
);
