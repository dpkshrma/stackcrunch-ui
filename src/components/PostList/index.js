import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { PostService } from '../../services';
import { URL_PREFIX } from '../../config';

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

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentWillMount() {
    const pathParts = this.props.match.path.split('/');
    const pageId = pathParts[pathParts.length - 1];
    PostService.getPage(pageId || 1)
      .then(({ data: posts }) => {
        this.setState({ posts });
      })
      .catch(err => {
        if (err.message.startsWith('Cannot find module')) {
          // redirect to NotFound page
          this.props.history.push(`${URL_PREFIX}/404`);
        }
        // TODO: handle other errors
      });
  }
  render() {
    return (
      <Wrapper>
        <List>
          {this.state.posts.map(post => <ListItem {...post} key={post.id} />)}
        </List>
        <Sidebar />
      </Wrapper>
    );
  }
}

export default PostList;
