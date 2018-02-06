import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListItem from '../ListItem';
import Pager from './Pager';
import { fetchAllPosts } from '../../actions/post';
import { hooks, getURLSegments } from '../../helpers/routes';
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
    const pageType = this.getPageType();
    const { onEnter = () => {} } = hooks[pageType.type] || {};
    this.setState({ pageType }, () => {
      onEnter(this.props.dispatch, pageType.id);
    });
  }
  componentDidMount() {
    const { pageType } = this.state;
    const pageId = this.getCurrentPageId();
    this.props
      .fetchAllPosts(pageId)
      .then(() => {
        const { posts } = this.props;
        this.setState({ posts, pageType });
      })
      .catch(err => {
        console.error(err);
        this.props.history.push(`${URL_PREFIX}/404`);
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
    const { posts, pageType } = this.state;
    return (
      <Wrapper>
        <List>
          {posts &&
            posts.map((post, i) => {
              return <ListItem {...post} key={i} />;
            })}
          <Pager currentPageId={this.getCurrentPageId()} pageType={pageType} />
        </List>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchAllPosts: fetchAllPosts(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
