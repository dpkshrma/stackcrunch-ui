import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListItem from './ListItem';
import Pager from './Pager';
import SC from '../common/SC';
import { hooks, getURLSegments } from '../../helpers/routes';
import { PageService } from '../../services';
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

class PostList extends SC {
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
    const pageType = this.getPageType();
    const { onEnter = () => {} } = hooks[pageType.type] || {};
    this.setState({ pageType }, () => {
      onEnter(this.props.dispatch, pageType.id);
    });
  }
  componentDidMount() {
    const { pageType } = this.state;
    const pageId = this.getCurrentPageId();
    PageService.getPage(pageId || 1, pageType.type, pageType.id)
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
  componentWillUnmount() {
    const { pageType } = this.state;
    const { onLeave = () => {} } = hooks[pageType.type] || {};
    onLeave(this.props.dispatch, pageType.id);
  }
  getPageType = () => {
    const { path } = this.props.match;
    const [firstPart, secondPart] = getURLSegments(path);
    if (PAGE_TYPES.SPECIAL[firstPart]) {
      return { id: secondPart, type: PAGE_TYPES.SPECIAL[firstPart] };
    } else if (firstPart.startsWith('@')) {
      const [, pageTypeId] = firstPart.split('@');
      return { id: pageTypeId, type: PAGE_TYPES.SPECIAL.authors };
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

export default connect()(PostList);
