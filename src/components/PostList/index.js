import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import Pager from './Pager';
import { PostService } from '../../services';
import { URL_PREFIX, PAGE_TYPES } from '../../config';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;

const getURLSegments = urlPath => {
  return urlPath.split('/').filter(segment => segment.length > 0);
};

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      pageType: {
        type: PAGE_TYPES.MAIN
      }
    };
  }
  componentWillMount() {
    const pageId = this.getCurrentPageId();
    const pageType = this.getPageType();

    PostService.getPage(pageId || 1, pageType.type, pageType.id)
      .then(({ data: posts }) => {
        this.setState({ posts, pageType });
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
  getPageType = () => {
    const { path } = this.props.match;
    const [firstPart, pageTypeId] = getURLSegments(path);
    if (PAGE_TYPES.SPECIAL.indexOf(firstPart) !== -1) {
      return { id: pageTypeId, type: firstPart };
    }
    return { type: PAGE_TYPES.MAIN };
  };
  getCurrentPageId = () => {
    const { path } = this.props.match;
    const pathParts = getURLSegments(path);
    const pageId = pathParts[pathParts.length - 1];
    return pageId;
  };
  render() {
    const { pageType } = this.state;
    return (
      <Wrapper>
        <List>
          {this.state.posts.map(post => <ListItem {...post} key={post.id} />)}
          <Pager currentPageId={this.getCurrentPageId()} pageType={pageType} />
        </List>
      </Wrapper>
    );
  }
}

export default PostList;
