import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import Pager from './Pager';
import { PostService } from '../../services';
import { URL_PREFIX } from '../../config';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
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
      posts: [],
      tagId: null
    };
  }
  componentWillMount() {
    const pageId = this.getCurrentPageId();
    const tagId = this.getTagId();
    PostService.getPage(pageId || 1, tagId)
      .then(({ data: posts }) => {
        this.setState({ posts, tagId });
      })
      .catch(err => {
        if (err.message.startsWith('Cannot find module')) {
          // redirect to NotFound page
          console.error(err);
          this.props.history.push(`${URL_PREFIX}/404`);
        }
        // TODO: handle other errors
      });
  }
  getTagId = () => {
    const [firstPart, tagId] = this.props.match.path
      .split('/')
      .filter(part => part.length > 0);
    if (firstPart === 'tags') {
      return tagId;
    }
    return null;
  };
  getCurrentPageId = () => {
    const pathParts = this.props.match.path
      .split('/')
      .filter(part => part.length > 0);
    const pageId = pathParts[pathParts.length - 1];
    return pageId;
  };
  render() {
    const { tagId } = this.state;
    return (
      <Wrapper>
        <List>
          {this.state.posts.map(post => <ListItem {...post} key={post.id} />)}
          <Pager currentPageId={this.getCurrentPageId()} tagId={tagId} />
        </List>
      </Wrapper>
    );
  }
}

export default PostList;
