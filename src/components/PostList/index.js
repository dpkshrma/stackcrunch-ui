import React from 'react';
import { connect } from 'react-redux';
import promisifySetState from 'promisify-setstate';
import styled from 'styled-components';
import { fetchInitialPosts, fetchMorePosts } from '../../actions/post';
import { URL_PREFIX } from '../../config';
import EndOfList from './EndOfList';
import LoadMore from './LoadMore';
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
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      nextPage: null,
      endOfList: false
    };
  }
  componentDidMount() {
    this.props
      .fetchInitialPosts()
      .then(({ value: { nextPage, remaining } }) => {
        return this.setState({ nextPage, endOfList: remaining <= 0 });
      })
      .catch(err => {
        console.error(err);
        this.props.history.push(`${URL_PREFIX}/404`);
      });
  }
  loadMore = () => {
    const { nextPage } = this.state;
    this.setState({ isLoading: true })
      .then(() => this.props.fetchMorePosts(nextPage))
      .then(({ value: { nextPage, remaining } }) => {
        return this.setState({
          isLoading: false,
          nextPage,
          endOfList: remaining <= 0
        });
      })
      .catch(console.error);
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
        {this.state.endOfList ? (
          <EndOfList />
        ) : (
          <LoadMore isLoading={this.state.isLoading} onClick={this.loadMore} />
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });
const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchInitialPosts: fetchInitialPosts(dispatch),
  fetchMorePosts: fetchMorePosts(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  hooked(promisifySetState(PostList), hooks)
);
