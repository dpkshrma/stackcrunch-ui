import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getURLSegments } from '../../helpers/routes';
import { fetchAllPosts } from '../../actions/post';
import { URL_PREFIX } from '../../config';
import ListItem from '../ListItem';
import { hooked } from '../common';
import hooks from './hooks';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;

class PostList extends React.Component {
  componentDidMount() {
    const pageId = this.getCurrentPageId();
    this.props.fetchAllPosts(pageId).catch(err => {
      console.error(err);
      this.props.history.push(`${URL_PREFIX}/404`);
    });
  }
  getCurrentPageId = () => {
    const { path } = this.props.match;
    const pathParts = getURLSegments(path);
    const pageId = pathParts[pathParts.length - 1];
    return pageId;
  };
  loadMore = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.onLoadComplete();
    }, 6000);
  };
  onLoadComplete = () => {
    this.setState({ isLoading: false });
  };
  render() {
    const { posts } = this.props;
    return (
      <Wrapper>
        <List>
          {posts &&
            posts.map(post => {
              return <ListItem {...post} key={post.slug} />;
            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(
  hooked(PostList, hooks)
);
