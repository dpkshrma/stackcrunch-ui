import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { PostService } from '../../services';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 945px;
  margin: auto;
  margin-top: 24px;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-right: 16px;
`;
const Sidebar = styled.div`
  height: 120px;
  width: 30%;
`;

const PostList = ({ match }) => {
  const posts = PostService.getPage(match.params.page || 1);
  return (
    <Wrapper>
      <List>{posts.map(post => <ListItem {...post} key={post.id} />)}</List>
      <Sidebar />
    </Wrapper>
  );
};

export default PostList;
