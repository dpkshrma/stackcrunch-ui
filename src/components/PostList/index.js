import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import Pager from './Pager';
import { PostService } from '../../services';
import { URL_PREFIX } from '../../config';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentWillMount() {
    const pageId = this.getCurrentPageId();
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
  getCurrentPageId = () => {
    const pathParts = this.props.match.path.split('/');
    const pageId = pathParts[pathParts.length - 1];
    return pageId;
  };
  render() {
    return (
      <Wrapper>
        <List>
          {this.state.posts.map(post => <ListItem {...post} key={post.id} />)}
          <Pager currentPageId={this.getCurrentPageId()} />
        </List>
      </Wrapper>
    );
  }
}

export default PostList;
